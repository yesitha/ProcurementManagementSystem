using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;
using System.Linq;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public VendorController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("GetApprovedItemsDetails/{vendorId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetApprovedItemsDetails(string vendorId)
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date <= currentDate)
                .OrderByDescending(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value.Date)
                .FirstOrDefault();

            var items = await _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == closestDate)
                .Select(a => new { a.SppId, a.ItemId, a.AuctionOpeningDate, a.AuctionClosingDate })
                .ToListAsync();

            if (items == null)
            {
                return NotFound();
            }

            //join sppId and itemId from SubProcurementPlanItems and SubProcurementApprovedItems

            var joinedData = from input in items
                             join planItem in _context.SubProcurementPlanItems
                             on new { input.SppId, input.ItemId } equals new { planItem.SppId, planItem.ItemId }
                             select new
                             {
                                 sppId = input.SppId,
                                 itemId = input.ItemId,
                                 actionOpeningDate = input.AuctionOpeningDate,
                                 actionClosingDate = input.AuctionClosingDate,
                                 quantity = planItem.Quantity,
                                 expectedDeliveryDate = planItem.ExpectedDeliveryDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         actionOpeningDate = group.Select(x => x.actionOpeningDate).FirstOrDefault(),
                                         actionClosingDate = group.Select(x => x.actionClosingDate).FirstOrDefault(),
                                         totalQuantity = group.Sum(x => x.quantity),
                                         expectedDeliveryDate = group.Select(x => x.expectedDeliveryDate).Distinct().Min()
                                     });

            //get item names

            var itemIds = filteredData.Select(x => x.itemId).Distinct().ToList();
            var itemDetails = _context.Items.Where(item => itemIds.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName, item.Specification })
                                            .ToList();

            var result = from input in filteredData
                         join itemDetail in itemDetails
                         on input.itemId equals itemDetail.ItemId
                         select new
                         {
                             itemId = input.itemId,
                             itemName = itemDetail.ItemName,
                             Specification = itemDetail.Specification,
                             totalQuantity = input.totalQuantity,
                             expectedDeliveryDate = input.expectedDeliveryDate,
                             actionOpeningDate = input.actionOpeningDate,
                             actionClosingDate = input.actionClosingDate
                         };

            //get vendor details

            var vendorDetails = _context.VendorPlaceBidItems.Where(vendor => vendor.VendorId == vendorId && itemIds.Contains(vendor.ItemId))
                                                            .Select(vendor => new { vendor.VendorId, vendor.ItemId, vendor.BidValue })
                                                            .ToList();

            var result2 = from input in result
                          join vendorDetail in vendorDetails
                          on input.itemId equals vendorDetail.ItemId into gj
                          from vendor in gj.DefaultIfEmpty()
                          select new
                          {
                              itemId = input.itemId,
                              itemName = input.itemName,
                              Specification = input.Specification,
                              totalQuantity = input.totalQuantity,
                              expectedDeliveryDate = input.expectedDeliveryDate,
                              actionOpeningDate = input.actionOpeningDate,
                              actionClosingDate = input.actionClosingDate,
                              bidValue = vendor?.BidValue
                          };

            return Ok(result2);
        }



        [HttpGet("GetApprovedItemDetails/{itemId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetApprovedItemDetails(string itemId)
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date <= currentDate)
                .OrderByDescending(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value.Date)
                .FirstOrDefault();

            var items = await _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == closestDate)
                .Where(a => a.ItemId == itemId)
                .Select(a => new { a.SppId, a.ItemId })
                .ToListAsync();

            if (items == null)
            {
                return NotFound();
            }

            //join sppId and itemId from SubProcurementPlanItems and SubProcurementApprovedItems

            var joinedData = from input in items
                             join planItem in _context.SubProcurementPlanItems
                             on new { input.SppId, input.ItemId } equals new { planItem.SppId, planItem.ItemId }
                             select new
                             {
                                 sppId = input.SppId,
                                 itemId = input.ItemId,
                                 quantity = planItem.Quantity,
                                 expectedDeliveryDate = planItem.ExpectedDeliveryDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         totalQuantity = group.Sum(x => x.quantity),
                                         expectedDeliveryDate = group.Select(x => x.expectedDeliveryDate).Distinct().Min()
                                     });

            //get item name and Specification
            var itemDetails = _context.Items.Where(item => itemId.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName, item.Specification })
                                            .ToList();

            var result = from input in filteredData
                         join itemDetail in itemDetails
                         on input.itemId equals itemDetail.ItemId
                         select new
                         {
                             itemName = itemDetail.ItemName,
                             Specification = itemDetail.Specification,
                             totalQuantity = input.totalQuantity,
                             expectedDeliveryDate = input.expectedDeliveryDate,
                         };

            return Ok(result);
        }


        [HttpPost("CreateVendorPlaceBidItem")]
        public async Task<IActionResult> CreateVendorPlaceBidItem(string vendorId, string itemId, double bidValue)
        {
            // Check if a record already exists for the same vendorId and itemId
            var existingRecord = await _context.VendorPlaceBidItems.FirstOrDefaultAsync(
                x => x.VendorId == vendorId && x.ItemId == itemId);

            if (existingRecord != null)
            {
                // Update the existing record with the new values
                existingRecord.BidValue = bidValue;
                //existingRecord.ProofDocument = proofDocument;
                existingRecord.DateAndTime = DateTime.Now;
                existingRecord.BidStatus = "Pending"; // Set the desired bid status

                await _context.SaveChangesAsync();

                // Return a success response 
                return Ok("Bid Updated Successfully");
            }
            else
            {
                // Create a new VendorPlaceBidItem instance
                var newVendorPlaceBidItem = new VendorPlaceBidItem
                {
                    VendorId = vendorId,
                    ItemId = itemId,
                    BidValue = bidValue,
                    //ProofDocument = proofDocument,
                    DateAndTime = DateTime.Now,
                    BidStatus = "Pending"
                };

                // Save the newVendorPlaceBidItem to the database using your data context (_context)
                _context.VendorPlaceBidItems.Add(newVendorPlaceBidItem);
                await _context.SaveChangesAsync();

                // Return a success response 
                return Ok("Bid Placed Successfully");
            }
        }

        //Bid history for vendor

        [HttpGet("GetBidHistory/{vendorId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetBidHistory(string vendorId)
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date <= currentDate)
                .OrderByDescending(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value.Date)
                .FirstOrDefault();

            var items = await _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == closestDate)
                .Select(a => new { a.SppId, a.ItemId})
                .ToListAsync();

            if (items == null)
            {
                return NotFound();
            }

            //join sppId and itemId from SubProcurementPlanItems and SubProcurementApprovedItems

            var joinedData = from input in items
                             join planItem in _context.SubProcurementPlanItems
                             on new { input.SppId, input.ItemId } equals new { planItem.SppId, planItem.ItemId }
                             select new
                             {
                                 sppId = input.SppId,
                                 itemId = input.ItemId,
                                 quantity = planItem.Quantity,
                                 expectedDeliveryDate = planItem.ExpectedDeliveryDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         totalQuantity = group.Sum(x => x.quantity),
                                         expectedDeliveryDate = group.Select(x => x.expectedDeliveryDate).Distinct().Min()
                                     });

            //get item names

            var itemIds = filteredData.Select(x => x.itemId).Distinct().ToList();
            var itemDetails = _context.Items.Where(item => itemIds.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName, item.Specification })
                                            .ToList();

            var result = from input in filteredData
                         join itemDetail in itemDetails
                         on input.itemId equals itemDetail.ItemId
                         select new
                         {
                             itemId = input.itemId,
                             itemName = itemDetail.ItemName,
                             Specification = itemDetail.Specification,
                             totalQuantity = input.totalQuantity,
                             expectedDeliveryDate = input.expectedDeliveryDate,
                         };

            //get vendor details

            var vendorDetails = _context.VendorPlaceBidItems.Where(vendor => vendor.VendorId == vendorId && itemIds.Contains(vendor.ItemId))
                                                            .Select(vendor => new { vendor.VendorId, vendor.ItemId, vendor.BidValue, vendor.BidStatus, vendor.LetterOfAcceptance })
                                                            .ToList();

            var result2 = from input in result
                          join vendorDetail in vendorDetails
                          on input.itemId equals vendorDetail.ItemId into gj
                          from vendor in gj.DefaultIfEmpty()
                          select new
                          {
                              itemId = input.itemId,
                              itemName = input.itemName,
                              Specification = input.Specification,
                              totalQuantity = input.totalQuantity,
                              expectedDeliveryDate = input.expectedDeliveryDate,
                              bidValue = vendor?.BidValue,
                              bidStatus = vendor?.BidStatus,
                              isletterOfAcceptance = vendor != null && !string.IsNullOrEmpty(vendor.LetterOfAcceptance)
                          };

            return Ok(result2);
        }

        // Letter of Acceptance by itemId 

        [HttpGet("GetLetterOfAcceptanceItemAndVendorDetails/{vendorId}/{itemId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetLetterOfAcceptanceItemAndVendorDetails(string vendorId,string itemId)
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date <= currentDate)
                .OrderByDescending(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value.Date)
                .FirstOrDefault();

            var items = await _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == closestDate)
                .Select(a => new { a.SppId, a.ItemId })
                .ToListAsync();

            if (items == null)
            {
                return NotFound();
            }

            //join sppId and itemId from SubProcurementPlanItems and SubProcurementApprovedItems

            var joinedData = from input in items
                             join planItem in _context.SubProcurementPlanItems
                             on new { input.SppId, input.ItemId } equals new { planItem.SppId, planItem.ItemId }
                             select new
                             {
                                 sppId = input.SppId,
                                 itemId = input.ItemId,
                                 quantity = planItem.Quantity,
                                 expectedDeliveryDate = planItem.ExpectedDeliveryDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         totalQuantity = group.Sum(x => x.quantity),
                                         expectedDeliveryDate = group.Select(x => x.expectedDeliveryDate).Distinct().Min()
                                     });

            //get item names

            var itemIds = filteredData.Select(x => x.itemId).Distinct().ToList();
            var itemDetails = _context.Items.Where(item => itemIds.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName, item.Specification })
                                            .ToList();

            var result = from input in filteredData
                         join itemDetail in itemDetails
                         on input.itemId equals itemDetail.ItemId
                         select new
                         {
                             itemId = input.itemId,
                             itemName = itemDetail.ItemName,
                             Specification = itemDetail.Specification,
                             totalQuantity = input.totalQuantity,
                             expectedDeliveryDate = input.expectedDeliveryDate,
                         };

            //get vendor details

            var vendorDetails = _context.VendorPlaceBidItems.Where(vendor => vendor.VendorId == vendorId && itemIds.Contains(vendor.ItemId))
                                                            .Select(vendor => new { vendor.VendorId, vendor.ItemId, vendor.BidValue})
                                                            .ToList();

            var result2 = (from input in result
                          join vendorDetail in vendorDetails
                          on input.itemId equals vendorDetail.ItemId into gj
                          from vendor in gj.DefaultIfEmpty()
                          select new
                          {
                              itemId = input.itemId,
                              itemName = input.itemName,
                              Specification = input.Specification,
                              totalQuantity = input.totalQuantity,
                              expectedDeliveryDate = input.expectedDeliveryDate,
                              bidValue = vendor?.BidValue
                          })
                         .Where(x => x.itemId == itemId)
                         .FirstOrDefault();

            var vendorD = _context.Vendors
                .Where(vendor => vendor.VendorId == vendorId)
                .Select(po => new
                {
                VendorFullName = po.FirstName + " " + po.LastName,
                CompanyName = po.CompanyFullName,
                Contact = po.EmailAddress,
                address = po.Address1 + "," + po.State,
                city = po.City + "," + po.PostalCode,
                salutation = po.Salutation
                })
                .FirstOrDefault();

            return Ok(new {result2 , vendorD });
        }


        [HttpPut("UpdateLetterOfAcceptance/{vendorId}/{itemId}")]
        public IActionResult UpdateLetterOfAcceptance(string vendorId, string itemId, IFormFile letterOfAcceptance)
        {
            var vendorPlaceBidItem = _context.VendorPlaceBidItems
                .FirstOrDefault(item => item.VendorId == vendorId && item.ItemId == itemId);

            if (vendorPlaceBidItem == null)
            {
                return NotFound();
            }

            if (letterOfAcceptance != null)
            {
                // Generate a unique filename
                string fileName = $"{itemId}_{vendorId}{Path.GetExtension(letterOfAcceptance.FileName)}";
                string filePath = Path.Combine("Uploads/Letter_of_Acceptence", fileName); 

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    letterOfAcceptance.CopyTo(fileStream);
                }

                vendorPlaceBidItem.LetterOfAcceptance = filePath;
            }

           
            _context.SaveChanges();

            return Ok("Letter of Acceptance updated successfully.");
        }



        // PO details for vendor

        [HttpGet("GetPurchaseOrdersByVendorId/{vendorId}")]
        public IActionResult GetPurchaseOrdersByVendorId(string vendorId)
        {
            var purchaseOrders = _context.PurchaseOrders
                .Where(po => po.VendorId == vendorId)
                .OrderByDescending(po => po.Date)
                .Select(po => new
                {
                    PoId = po.PoId,
                    Date = po.Date,
                    TotalAmount = po.TotalAmount,
                    ProcuementOfficerStatus = po.ProcumentOfficerStatus
                })
                .ToList();

            return Ok(purchaseOrders);
        }

        [HttpGet("GetPOVendorDetails/{PoId}")]
        public IActionResult GetPOVendorDetails(string PoId)
        {
            var poVendorDetails = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => new
                {
                    po.PoId,
                    po.Date,
                    po.TotalAmount,
                    po.CommentsForSpecialInstruction,
                    VendorFullName = po.Vendor.FirstName + " " + po.Vendor.LastName,
                    CompanyName = po.Vendor.CompanyFullName,
                    Contact = po.Vendor.EmailAddress,
                    address = po.Vendor.Address1 + "," + po.Vendor.State,
                    city = po.Vendor.City + "," + po.Vendor.PostalCode
                })
                .FirstOrDefault();

            return Ok(poVendorDetails);
        }

        [HttpPost("uploadRequiredDocuments/{PoId}")]
        public IActionResult uploadRequiredDocuments(string PoId, IFormFile? agreement, IFormFile? BankGuarantee,
            IFormFile? bond)
        {
            var po = _context.PurchaseOrders.Where(po => po.PoId == PoId).FirstOrDefault();

            if (po != null)
            {
                if (agreement != null)
                {
                    // Generate a unique filename
                    string fileName = $"{PoId}_Agreement{Path.GetExtension(agreement.FileName)}";
                    string filePath = Path.Combine("Uploads/Vendor_Required_Docs/Agreement", fileName); 

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        agreement.CopyTo(fileStream);
                    }

                    po.Agreement = filePath;
                }

               
                

                if (BankGuarantee != null)
                {
                    {
                        // Generate a unique filename
                        string fileName = $"{PoId}_BankGuarantee{Path.GetExtension(BankGuarantee.FileName)}";
                        string filePath = Path.Combine("Uploads/Vendor_Required_Docs/BankGuarantee", fileName); 

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            BankGuarantee.CopyTo(fileStream);
                        }

                        po.BankGuarantee = filePath;
                    }

                }

                if (bond != null)
                { {
                        // Generate a unique filename
                        string fileName = $"{PoId}_Bond{Path.GetExtension(bond.FileName)}";
                        string filePath = Path.Combine("Uploads/Vendor_Required_Docs/Bond", fileName); 

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            bond.CopyTo(fileStream);
                        }

                        po.Bond = filePath;
                    }
                }

                _context.SaveChanges();

                return Ok("Documents uploaded successfully");
            }
            else
            {
                return BadRequest("No Such PO");
            }
        }


      


        [HttpGet("GetUploadedPdf/{poId}")]
        public IActionResult GetUploadedPdf(string poId)
        { var po = _context.PurchaseOrders.Where(po => po.PoId == poId).FirstOrDefault();
            var baseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";

            if (po == null)
            {
                return NotFound("po not found.");
            }else if (po.Agreement == null && po.BankGuarantee == null && po.Bond == null)
            {
                return NotFound("No documents uploaded.");
            }
            else
            {
                 
                
                var pdfList = new List<object>();

                if (po.Agreement != null)
                {
                    var agreementInfo = new 
                    {
                        Name = $"{poId}_Agreement",
                        Url = $"{baseUrl}/{po.Agreement}"
                    };

                    pdfList.Add(agreementInfo);
                }

                if (po.BankGuarantee != null)
                {
                    var bankGuaranteeInfo = new 
                    {
                        Name = $"{poId}_BankGuarantee",
                        Url = $"{baseUrl}/{po.BankGuarantee}"
                    };

                    pdfList.Add(bankGuaranteeInfo);
                }

                if (po.Bond != null)
                {
                    var bondInfo = new 
                    {
                        Name = $"{poId}_Bond",
                        Url = $"{baseUrl}/{po.Bond}"
                    };

                    pdfList.Add(bondInfo);
                }

                return Ok(pdfList);
            }   
            
            


        }   


        

       
        [HttpGet("GetPOItemDetails/{PoId}")]
        public IActionResult GetPOItemDetails(string PoId)
        {
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
                    Specifications = group.First().Item.Specification,
                    TotalQuantity = group.Sum(item => item.Quantity),
                    BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == vendorId && vpb.ItemId == group.Key)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),

                })
                .ToList();

            var comments = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.CommentsForSpecialInstruction)
                .FirstOrDefault();

            return Ok(new { itemList, comments });
        }


        // PO verification page controller

        [HttpGet("GetPODetails/{PoId}")]
        public IActionResult GetPODetails(string PoId)
        {
            var poDetails = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => new
                {
                    po.PoId,
                    po.Date,
                    po.TotalAmount
                })
                .FirstOrDefault();

            return Ok(poDetails);
        }

        [HttpPut("UploadPurchaseOrderVerificationDocs")]
        public IActionResult UploadPurchaseOrderVerificationDocs(string poId,string agreement,string bond,string bankGuarantee)
        {
            var purchaseOrder = _context.PurchaseOrders.FirstOrDefault(po => po.PoId == poId);

            if (purchaseOrder == null)
            {
                return NotFound("PurchaseOrder not found.");
            }

            // Update the properties
            purchaseOrder.Agreement = agreement;
            purchaseOrder.Bond = bond;
            purchaseOrder.BankGuarantee = bankGuarantee;

            _context.SaveChanges();

            return Ok("PurchaseOrder verification docs updated successfully.");
        }


        // Items to be shipped page controller

        [HttpGet("GetPOIdListByVendorId/{vendorId}")]
        public IActionResult GetPOIdListByVendorId(string vendorId)
        {
            var poIdList = _context.PurchaseOrders
                .Where(po => po.VendorId == vendorId)
                .Select(po => new
                {
                    po.PoId,
                    po.Date
                })
                .ToList();

            return Ok(poIdList);
        }


        [HttpGet("GetItemToBeShippedDetails/{PoId}/{vendorId}")]
        public IActionResult GetItemToBeShippedDetails(string PoId, string vendorId)
        {
            var mppId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.MppId)
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
                    Specifications = group.First().Item.Specification,
                    TotalQuantity = group.Sum(item => item.Quantity),
                    BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == vendorId && vpb.ItemId == group.Key)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),

                })
                .ToList();

            return Ok(itemList);
        }

        public class PurchaseOrderItemToBeShippedInput
        {
            public string ItemId { get; set; }
            public int ShippedQuantity { get; set; }
        }

        //[HttpPost("CreatePurchaseOrderItemsToBeShippedRecords")]
        //public IActionResult CreatePurchaseOrderItemsToBeShippedRecords(string PoId, List<PurchaseOrderItemToBeShippedInput> itemsToBeShipped)
        //{
        //    // Retrieve the Purchase Order based on the provided PoId
        //    var purchaseOrder = _context.PurchaseOrders.FirstOrDefault(po => po.PoId == PoId);

        //    // Check if the Purchase Order exists
        //    if (purchaseOrder == null)
        //    {
        //        return BadRequest("Invalid PoId. Purchase Order not found.");
        //    }

        //    // Create a list to store the duplicate itemIds
        //    var duplicateItemIds = new List<string>();

        //    // Iterate through the list of itemsToBeShipped and create PurchaseOrderItemsToBeShipped records
        //    foreach (var item in itemsToBeShipped)
        //    {
        //        string itemId = item.ItemId;
        //        int shippedQuantity = item.ShippedQuantity;

        //        // Check if the PurchaseOrderItemsToBeShipped record already exists
        //        bool recordExists = _context.PurchaseOrder_ItemTobeShippeds.Any(aipo =>
        //            aipo.PoId == PoId && aipo.ItemId == itemId);

        //        if (recordExists)
        //        {
        //            // Add the duplicate itemId to the list
        //            duplicateItemIds.Add(itemId);
        //            continue; // Skip to the next iteration
        //        }

        //        // Retrieve the Approved Item based on the ItemId
        //        var approvedItem = _context.Items.FirstOrDefault(item => item.ItemId == itemId);

        //        // Check if the Approved Item exists
        //        if (approvedItem == null)
        //        {
        //            return BadRequest($"Invalid ItemId '{itemId}'. Approved Item not found.");
        //        }

        //        // Create a new PurchaseOrder_ItemTobeShipped record
        //        var purchaseOrderItemToBeShipped = new PurchaseOrder_ItemTobeShipped
        //        {
        //            ItemId = itemId,
        //            PoId = PoId,
        //            Shipped_Qty = shippedQuantity
        //        };

        //        // Add the record to the context
        //        _context.PurchaseOrder_ItemTobeShippeds.Add(purchaseOrderItemToBeShipped);
        //    }

        //    // Save the changes to the database
        //    _context.SaveChanges();

        //    if (duplicateItemIds.Count > 0)
        //    {
        //        return BadRequest($"The following ItemIds are already associated with the Purchase Order '{PoId}': {string.Join(", ", duplicateItemIds)}");
        //    }

        //    return Ok("PurchaseOrderItemsToBeShipped records created successfully.");
        //}

        [HttpPost("CreatePurchaseOrderItemsToBeShippedRecords")]
        public IActionResult CreatePurchaseOrderItemsToBeShippedRecords(string PoId, List<PurchaseOrderItemToBeShippedInput> itemsToBeShipped)
        {
            // Retrieve the Purchase Order based on the provided PoId
            var purchaseOrder = _context.PurchaseOrders.FirstOrDefault(po => po.PoId == PoId);

            // Check if the Purchase Order exists
            if (purchaseOrder == null)
            {
                return BadRequest("Invalid PoId. Purchase Order not found.");
            }

            // Iterate through the list of itemsToBeShipped and create/update PurchaseOrderItemsToBeShipped records
            foreach (var item in itemsToBeShipped)
            {
                string itemId = item.ItemId;
                int shippedQuantity = item.ShippedQuantity;

                // Retrieve the existing PurchaseOrderItemsToBeShipped record
                var existingRecord = _context.PurchaseOrder_ItemTobeShippeds.FirstOrDefault(aipo =>
                    aipo.PoId == PoId && aipo.ItemId == itemId);

                if (existingRecord != null)
                {
                    // Update the existing record with the new shipped quantity
                    existingRecord.Shipped_Qty += shippedQuantity;
                }
                else
                {
                    // Retrieve the Approved Item based on the ItemId
                    var approvedItem = _context.Items.FirstOrDefault(item => item.ItemId == itemId);

                    // Check if the Approved Item exists
                    if (approvedItem == null)
                    {
                        return BadRequest($"Invalid ItemId '{itemId}'. Approved Item not found.");
                    }

                    // Create a new PurchaseOrder_ItemTobeShipped record
                    var purchaseOrderItemToBeShipped = new PurchaseOrder_ItemTobeShipped
                    {
                        ItemId = itemId,
                        PoId = PoId,
                        Shipped_Qty = shippedQuantity
                    };

                    // Add the record to the context
                    _context.PurchaseOrder_ItemTobeShippeds.Add(purchaseOrderItemToBeShipped);
                }
            }

            // Save the changes to the database
            _context.SaveChanges();

            return Ok("PurchaseOrderItemsToBeShipped records created/updated successfully.");
        }


        // View GRN page controller

        [HttpGet("GetGRNIdListByVendorId/{vendorId}")]
        public IActionResult GetGRNIdListByVendorId(string vendorId)
        {
            var poIdList = _context.PurchaseOrders
                .Where(po => po.VendorId == vendorId)
                .Select(po => new
                {
                    po.PoId
                })
                .ToList();

            var grnList = _context.GRNs
                .Select(grn => new
                {
                    grn.GrnId,
                    grn.PoId,
                    grn.Date
                })
                .ToList();

            var combinedList = (from poId in poIdList
                                join grn in grnList on poId.PoId equals grn.PoId
                                select new
                                {
                                    GrnId = grn.GrnId,
                                    PoId = grn.PoId,
                                    Date = grn.Date
                                })
                     .ToList();


            return Ok(combinedList);
        }

        [HttpGet("GetGRNItemDetails/{PoId}/{grnId}")]
        public IActionResult GetGRNItemDetails(string PoId, string grnId)
        {
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
                    OrderedQuantity = group.Sum(item => item.Quantity)
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

            var itemList2 = _context.GRNItemsToBeShipped
                .Where(Ok => Ok.GrnId == grnId)
                .Select(Ok => new
                {
                    Ok.ItemId,
                    Ok.Received_Qty
                })
                .ToList();

            var combinedList = itemList.Join(itemList1,
              item => item.ItemId,
              item1 => item1.ItemId,
              (item, item1) => new
              {
                  item.ItemId,
                  item.ItemName,
                  item.OrderedQuantity,
                  item1.Shipped_Qty
              })
                .Join(itemList2,
                item => item.ItemId,
                item2 => item2.ItemId,
                (item, item2) => new
                {
                    item.ItemId,
                    item.ItemName,
                    item.OrderedQuantity,
                    item.Shipped_Qty,
                    item2.Received_Qty
                })
                .ToList();

            var vendorName = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.Vendor.FirstName + " " + po.Vendor.LastName)
                .FirstOrDefault();

            var shippingDate = _context.GRNItemsToBeShipped
                .Where(grn => grn.GrnId == grnId)
                .Select(grn => grn.ShippingDate)
                .FirstOrDefault();

            return Ok(new { combinedList, vendorName, shippingDate });
        }

    }
}
