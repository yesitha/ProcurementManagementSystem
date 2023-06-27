using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWMSBackend.CustomIdGenerator;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinanceDivisionAccountantController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        private PaymentVoucherIdGenerator _paymentVoucherIdGenerator;

        public FinanceDivisionAccountantController(DataContext context, IMapper mapper, PaymentVoucherIdGenerator paymentVoucherIdGenerator)
        {
            _context = context;
            _mapper = mapper;
            _paymentVoucherIdGenerator = paymentVoucherIdGenerator;
        }


        [HttpGet("InvoicesList")]
        public IActionResult InvoicesList()
        {
            // Retrieve the invoice details with total, tax, and payment status
            var invoiceDetails = _context.InvoiceTobePays
                    .Where(i => i.PaymentStatus != null)
                    .Join(
                        _context.GRNs,
                        invoice => invoice.GrnId,
                        grn => grn.GrnId,
                        (invoice, grn) => new { Invoice = invoice, GRN = grn }
                    )
                    .Join(
                        _context.PurchaseOrders,
                        joinResult => joinResult.GRN.PoId,
                        purchaseOrder => purchaseOrder.PoId,
                        (joinResult, purchaseOrder) => new { joinResult.Invoice, PurchaseOrder = purchaseOrder }
                    )
                    .Join(
                        _context.Vendors,
                        joinResult => joinResult.PurchaseOrder.VendorId,
                        vendor => vendor.VendorId,
                        (joinResult, vendor) => new
                        {
                            joinResult.Invoice.InvoiceId,
                            joinResult.Invoice.Total,
                            joinResult.Invoice.Tax,
                            VendorName = vendor.FirstName + " " + vendor.LastName,
                            joinResult.Invoice.PaymentStatus
                        }
                    )
                    .ToList();

            return Ok(invoiceDetails);

        }


        [HttpGet("GetInvoiceDetails/{invoiceId}")]
        public async Task<IActionResult> GetInvoiceDetails(string invoiceId)
        {
            // Retrieve the invoice based on the provided invoiceId
            Invoice invoice = _context.Invoices.FirstOrDefault(i => i.InvoiceId == invoiceId);

            if (invoice == null)
            {
                return NotFound("Invoice not found for the given invoiceId.");
            }

            // Create a DTO object with only the required properties
            var invoiceDto = new
            {
                InvoiceId = invoice.InvoiceId,
                Date = invoice.Date,
                TotalAmount = invoice.Total,
                Tax = invoice.Tax,
            };

            var grnId = _context.Invoices
                .Where(i => i.InvoiceId == invoiceId)
                .Select(i => i.GrnId)
                .FirstOrDefault();


            var PoId = _context.GRNs
                .Where(grn => grn.GrnId == grnId)
                .Select(grn => grn.PoId)
                .FirstOrDefault();

            var mppId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.MppId)
                .FirstOrDefault();

            var vendorId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.VendorId)
                .FirstOrDefault();

            var itemList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve"
                                && item.SelectedVendor == _context.Vendors
                                                                .Where(v => v.VendorId == vendorId)
                                                                .Select(v => v.FirstName + " " + v.LastName)
                                                                .FirstOrDefault())
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.First().Item.ItemName,
                    Specification = group.First().Item.Specification,
                    OrderedQuantity = group.Sum(item => item.Quantity),
                    BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == vendorId && vpb.ItemId == group.Key)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),
                })
                .ToList();

            var itemList1 = _context.PurchaseOrder_ItemTobeShippeds
                .Where(Ok => Ok.PoId == PoId)
                .Select(Ok => new
                {
                    Ok.ItemId,
                    Ok.Shipped_Qty
                })
                .ToList();

            // Get total received quantity for each item

            var grnIdList = _context.GRNs
                .Where(grn => grn.PoId == PoId)
                .Select(grn => grn.GrnId)
                .ToList();

            var itemList0 = _context.GRNItemsToBeShipped
                    .Where(grn => grnIdList.Contains(grn.GrnId))
                    .GroupBy(grn => grn.ItemId)
                    .Select(group => new
                    {
                        ItemId = group.Key,
                        TotalReceived_Qty = group.Sum(grn => grn.Received_Qty)
                    })
                    .ToList();

            var itemList2 = _context.GRNItemsToBeShipped
                .Where(Ok => Ok.GrnId == grnId)
                .Select(Ok => new
                {
                    Ok.ItemId,
                    Ok.Received_Qty,
                    Ok.GRNComment
                })
                .ToList();


            var combinedList = from item in itemList
                               join orderItem in itemList1 on item.ItemId equals orderItem.ItemId into orderItems
                               from oi in orderItems.DefaultIfEmpty()
                               join grnItem in itemList2 on item.ItemId equals grnItem.ItemId into grnItems
                               from gi in grnItems.DefaultIfEmpty()
                               join grnItem0 in itemList0 on item.ItemId equals grnItem0.ItemId into grnItems0
                               from gi0 in grnItems0.DefaultIfEmpty()
                               where itemList2.Select(x => x.ItemId).Contains(item.ItemId)
                               select new
                               {
                                   item.ItemId,
                                   item.ItemName,
                                   item.Specification,
                                   item.OrderedQuantity,
                                   Shipped_Qty = oi?.Shipped_Qty ?? 0,
                                   Received_Qty = gi?.Received_Qty ?? 0,
                                   TotalReceived_Qty = gi0?.TotalReceived_Qty ?? 0,
                                   BidValue = item.BidValue,
                               };

            var result = combinedList.ToList();

            var vendorDetails = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => new
                {
                    vendorId = po.VendorId,
                    VendorName = po.Vendor.FirstName + " " + po.Vendor.LastName,
                    CompanyName = po.Vendor.CompanyFullName,
                    Contact = po.Vendor.EmailAddress,
                    address = po.Vendor.Address1 + "," + po.Vendor.State,
                    city = po.Vendor.City + "," + po.Vendor.PostalCode

                })
                .FirstOrDefault();

            return Ok(new { invoiceDto, vendorDetails, result });
        }

        [HttpPut("UpdateInvoicePaymentStatus")]
        public IActionResult UpdateInvoicePaymentStatus(string invoiceId)
        {
            // Retrieve the invoice based on the provided invoiceId
            InvoiceTobePay invoice = _context.InvoiceTobePays.FirstOrDefault(i => i.InvoiceId == invoiceId);

            if (invoice == null)
            {
                return NotFound("Invoice not found for the given Invoice ID.");
            }

            // Update the invoice details
            invoice.PaymentStatus = "success";

            // Save the changes to the database
            _context.SaveChanges();

            return Ok("Invoice payment status updated successfully.");
        }

        [HttpPost("CreatePaymentVoucher")]
        public IActionResult CreatePaymentVoucher(string invoiceId, string paymentVoucherEvidence)
        {
            // Check if the associated GRN exists
            InvoiceTobePay invoice = _context.InvoiceTobePays.FirstOrDefault(g => g.InvoiceId == invoiceId);
            if (invoice == null)
            {
                return BadRequest("Invalid invoiceId. Invoice not found.");
            }

            string paymentVoucherId = _paymentVoucherIdGenerator.GeneratePaymentVoucherId();

            // Create the new PaymentVoucher
            var paymentVoucher = new PaymentVoucher
            {
                PvId = paymentVoucherId,
                InvoiceTobePay = invoice,
                InvoiceTobePayId = invoiceId,
                PaymentVoucherEvidence = paymentVoucherEvidence,
                // Set other properties of the PaymentVoucher as needed
            };

            // Add the PaymentVoucher to the database
            _context.PaymentVouchers.Add(paymentVoucher);
            _context.SaveChanges();

            return Ok("Payment voucher created successfully.");
        }

    }
}
