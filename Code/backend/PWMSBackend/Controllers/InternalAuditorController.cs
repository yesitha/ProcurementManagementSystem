using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWMSBackend.Data;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternalAuditorController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public InternalAuditorController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet("GetFinalizedMasterProcurementPlan")]

        public IActionResult GetFinalizedMasterProcurementPlan()
        {
            var finalPlan = _context.FinalizedMasterProcurementPlans
                .OrderByDescending(fmpp => fmpp.MasterProcurementPlan.CreationDate)
                .Select(fmpp => new
                {
                    fmpp.MppId,
                    fmpp.GrandTotal,
                    fmpp.MasterProcurementPlan.EstimatedGrandTotal,
                    fmpp.MasterProcurementPlan.CreationDate,
                })
                .ToList();

            return Ok(finalPlan);
        }

        [HttpGet("GetFinalizedMasterProcurementPlan/{mppId}")]
        public IActionResult GetFinalizedMasterProcurementPlan(string mppId)
        {
            var approvedItems = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve")
                .OrderBy(item => item.ItemId)
                .Select(item => new
                {
                    ItemId = item.ItemId,
                    ItemName = item.Item.ItemName,
                    Specification = item.Item.Specification,
                    quantity = item.Quantity,
                    SppId = item.SppId,
                    division = item.SubProcurementPlan.HOD.Division.DivisionName,
                    expectedDeliverDate = item.ExpectedDeliveryDate,
                    selectedVendor = item.SelectedVendor,
                    BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == _context.Vendors
                                                                            .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
                                                                            .Select(v => v.VendorId)
                                                                            .FirstOrDefault()
                                                                      && vpb.ItemId == item.ItemId)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),
                    SelectedVendorInfo = new
                    {
                        BusinessRegistrationDoc = _context.Vendors
                                                    .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
                                                    .Select(v => v.BusinessRegistrationDoc)
                                                    .FirstOrDefault(),
                        TaxIdentificationDoc = _context.Vendors
                                                    .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
                                                    .Select(v => v.TaxIdentificationDoc)
                                                    .FirstOrDefault(),
                        InsuranceCertificate = _context.Vendors
                                                    .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
                                                    .Select(v => v.InsuaranceCertificate)
                                                    .FirstOrDefault(),
                        OtherDocs = _context.Vendors
                                                    .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
                                                    .Select(v => v.OtherDocs)
                                                    .FirstOrDefault(),

                    }
                })
                .ToList();

            return Ok(approvedItems);
        }

        [HttpPut("UpdateInternalAuditorStatus")]
        public IActionResult UpdateInternalAuditorStatus(string sppId, string itemId, string internalAuditorStatus, string internalAuditorComment)
        {
            var subProcurementPlanItem = _context.SubProcurementPlanItems
                .FirstOrDefault(item => item.SppId == sppId && item.ItemId == itemId);

            if (subProcurementPlanItem == null)
            {
                return NotFound("SubProcurementPlanItem not found.");
            }

            // Update the properties
            subProcurementPlanItem.InternalAuditorStatus = internalAuditorStatus;
            if (internalAuditorStatus != "approve")
            {
                subProcurementPlanItem.InternalAuditorComment = internalAuditorComment;
            }

            _context.SaveChanges();

            return Ok("InternalAuditorStatus and InternalAuditorComment updated successfully.");
        }

    }
}
