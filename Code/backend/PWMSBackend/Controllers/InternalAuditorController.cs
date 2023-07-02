using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWMSBackend.Data;
using PWMSBackend.Models;
using System.Net.NetworkInformation;

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
            //var approvedItems = _context.MasterProcurementPlans
            //    .Where(mpp => mpp.MppId == mppId)
            //    .SelectMany(mpp => mpp.SubProcurementPlans)
            //    .SelectMany(spp => spp.subProcurementPlanItems)
            //    .Where(item => item.ProcuremnetCommitteeStatus == "approve")
            //    .OrderBy(item => item.ItemId)
            //    .Select(item => new
            //    {
            //        ItemId = item.ItemId,
            //        ItemName = item.Item.ItemName,
            //        Specification = item.Item.Specification,
            //        quantity = item.Quantity,
            //        SppId = item.SppId,
            //        division = item.SubProcurementPlan.HOD.Division.DivisionName,
            //        expectedDeliverDate = item.ExpectedDeliveryDate,
            //        selectedVendor = item.SelectedVendor,
            //        BidValue = _context.VendorPlaceBidItems
            //                        .Where(vpb => vpb.Vendor.VendorId == _context.Vendors
            //                                                                .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
            //                                                                .Select(v => v.VendorId)
            //                                                                .FirstOrDefault()
            //                                                          && vpb.ItemId == item.ItemId)
            //                        .Select(vpb => vpb.BidValue)
            //                        .FirstOrDefault(),
            //        SelectedVendorInfo = new
            //        {
            //            BusinessRegistrationDoc = _context.Vendors
            //                                        .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
            //                                        .Select(v => v.BusinessRegistrationDoc)
            //                                        .FirstOrDefault(),
            //            TaxIdentificationDoc = _context.Vendors
            //                                        .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
            //                                        .Select(v => v.TaxIdentificationDoc)
            //                                        .FirstOrDefault(),
            //            InsuranceCertificate = _context.Vendors
            //                                        .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
            //                                        .Select(v => v.InsuaranceCertificate)
            //                                        .FirstOrDefault(),
            //            OtherDocs = _context.Vendors
            //                                        .Where(v => v.FirstName + " " + v.LastName == item.SelectedVendor)
            //                                        .Select(v => v.OtherDocs)
            //                                        .FirstOrDefault(),

            //        }
            //    })
            //    .ToList();

            var approvedItems = _context.MasterProcurementPlans
                    .Where(mpp => mpp.MppId == mppId)
                    .SelectMany(mpp => mpp.SubProcurementPlans)
                    .SelectMany(spp => spp.subProcurementPlanItems)
                    .Where(item => item.ProcuremnetCommitteeStatus == "approve")
                    .OrderBy(item => item.ItemId)
                    .GroupBy(item => item.ItemId) // Group the items by ItemId
                    .Select(group => new
                    {
                        ItemId = group.Key,
                        ItemName = group.First().Item.ItemName, // Use First() to retrieve the ItemName (assuming it's the same within the group)
                        Specification = group.First().Item.Specification, // Use First() to retrieve the Specification
                        Quantity = group.Sum(item => item.Quantity), // Calculate the sum of Quantity within the group
                        MinExpectedDeliveryDate = group.Min(item => item.ExpectedDeliveryDate), // Get the min expected Delivery Date within the group
                        SelectedVendor = group.First().SelectedVendor, // Use First() to retrieve the SelectedVendor (assuming it's the same within the group)
                        BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == _context.Vendors
                                                                            .Where(v => v.FirstName + " " + v.LastName ==group.FirstOrDefault().SelectedVendor)
                                                                            .Select(v => v.VendorId)
                                                                            .FirstOrDefault()
                                                                      && vpb.ItemId == group.FirstOrDefault().ItemId)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),
                        SelectedVendorInfo = group.First().SelectedVendor != null ? new
                            {
                                BusinessRegistrationDoc = _context.Vendors
                                    .Where(v => v.FirstName + " " + v.LastName == group.First().SelectedVendor)
                                    .Select(v => v.BusinessRegistrationDoc)
                                    .FirstOrDefault(),
                                TaxIdentificationDoc = _context.Vendors
                                    .Where(v => v.FirstName + " " + v.LastName == group.First().SelectedVendor)
                                    .Select(v => v.TaxIdentificationDoc)
                                    .FirstOrDefault(),
                                InsuranceCertificate = _context.Vendors
                                    .Where(v => v.FirstName + " " + v.LastName == group.First().SelectedVendor)
                                    .Select(v => v.InsuaranceCertificate)
                                    .FirstOrDefault(),
                                OtherDocs = _context.Vendors
                                    .Where(v => v.FirstName + " " + v.LastName == group.First().SelectedVendor)
                                    .Select(v => v.OtherDocs)
                                    .FirstOrDefault()
                            }: null,
                            internalAuditorStatus = group.First().InternalAuditorStatus,
                            internalAuditorComment = group.First().InternalAuditorComment
                    })
                    .ToList();


            return Ok(approvedItems);
        }

        //[HttpPut("UpdateInternalAuditorStatus")]
        //public IActionResult UpdateInternalAuditorStatus(string sppId, string itemId, string internalAuditorStatus, string internalAuditorComment)
        //{
        //    var subProcurementPlanItem = _context.SubProcurementPlanItems
        //        .FirstOrDefault(item => item.SppId == sppId && item.ItemId == itemId);

        //    if (subProcurementPlanItem == null)
        //    {
        //        return NotFound("SubProcurementPlanItem not found.");
        //    }

        //    // Update the properties
        //    subProcurementPlanItem.InternalAuditorStatus = internalAuditorStatus;
        //    if (internalAuditorStatus != "approve")
        //    {
        //        subProcurementPlanItem.InternalAuditorComment = internalAuditorComment;
        //    }

        //    _context.SaveChanges();

        //    return Ok("InternalAuditorStatus and InternalAuditorComment updated successfully.");
        //}

        [HttpPut("UpdateInternalAuditorStatus")]
        public IActionResult UpdateInternalAuditorStatus(string mppId, string itemId, string internalAuditorStatus, string internalAuditorComment)
        {
            var subProcurementPlanItems = _context.SubProcurementPlanItems
                .Where(item => item.SubProcurementPlan.MasterProcurementPlan.MppId == mppId && item.ProcuremnetCommitteeStatus == "approve")
                .ToList();

            if (subProcurementPlanItems.Count == 0)
            {
                return NotFound("No matching SubProcurementPlanItems found for the given MppId.");
            }

            // Update the properties for matching SubProcurementPlanItems
            foreach (var subProcurementPlanItem in subProcurementPlanItems)
            {
                if (subProcurementPlanItem.ItemId == itemId)
                {
                    subProcurementPlanItem.InternalAuditorStatus = internalAuditorStatus;
                    if (internalAuditorStatus != "approve")
                    {
                        subProcurementPlanItem.InternalAuditorComment = internalAuditorComment;

                        // update rejected vendor details

                        subProcurementPlanItem.RejectedVendor = subProcurementPlanItem.SelectedVendor;

                        var vendorId = _context.Vendors
                            .Where(v => v.FirstName + " " + v.LastName == subProcurementPlanItem.SelectedVendor)
                            .Select(v => v.VendorId)
                            .FirstOrDefault();

                        var vendorPlaceBidItem = _context.VendorPlaceBidItems.FirstOrDefault(item => item.VendorId == vendorId && item.ItemId == itemId);

                        if (vendorPlaceBidItem == null)
                        {
                            continue;
                        }

                        // Update the property
                        vendorPlaceBidItem.BidStatus = "Not Selected";

                        _context.SaveChanges();
                    }
                }
            }
            //Update the status of the MasterProcurementPlan
            var mpp = _context.MasterProcurementPlans
                .FirstOrDefault(mpp => mpp.MppId == mppId);
            mpp.Status = _context.Statuses.FirstOrDefault(s => s.StatusId == "STS00005");
            mpp.StatusDate = DateTime.Now;

            _context.SaveChanges();

            return Ok("InternalAuditorStatus and InternalAuditorComment updated successfully.");
        }


    }
}
