using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcurementCommitteeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProcurementCommitteeController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // ProcurementCommittee View MasterProcurementPlan page Controllers (1-GET)

        [HttpGet("GetMasterProcurementPlans")]
        public IActionResult GetMasterProcurementPlans()
        {
            var plans = _context.MasterProcurementPlans
                .Select(mpp => new
                {
                    mpp.MppId,
                    mpp.EstimatedGrandTotal,
                    mpp.CreationDate,
                })
                .ToList();

            return Ok(plans);
        }

        // ProcurementCommittee Approval for MasterProcurementPlan page Controllers (2-GET)

        [HttpGet("GetMasterProcurementPlans{mppId}")]
        public IActionResult GetMasterProcurementPlan(string mppId)
        {
            var plan = _context.MasterProcurementPlans
                .FirstOrDefault(mpp => mpp.MppId == mppId);

            if (plan == null)
            {
                return NotFound("MasterProcurementPlan not found.");
            }

            var result = new
            {
                plan.EstimatedGrandTotal,
                plan.CreationDate,
            };

            return Ok(result);
        }



        [HttpGet("GetItemList/{mppId}")]
        public IActionResult GetItemList(string mppId)
        {
            var itemDetails = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.FirstOrDefault().Item.ItemName,
                    TotalQuantity = group.Sum(item => item.Quantity),
                    EstimatedBudget = group.Sum(item => item.EstimatedBudget)
                })
                .ToList();

            return Ok(itemDetails);
        }

        // Item Details page Controllers (1-GET 1-PUT)


        [HttpGet("GetItemDetails/{itemId}/{mppId}")]
        public IActionResult GetItemDetails(string itemId, string mppId)
        {
            var itemDetails = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ItemId == itemId)
                .Where(item => item.TecCommitteeStatus != null && item.ProcuremnetCommitteeStatus == null)
                .Select(item => new
                {
                    item.SppId,
                    DivisionName = item.SubProcurementPlan.HOD.Division.DivisionName,
                    item.Quantity,
                    item.Item.Specification,
                    RecommendedVendors = item.RecommendedVendor,
                    item.ExpectedDeliveryDate,
                    item.EvidenceOfAuthorization,
                    item.TecCommitteeStatus,
                    item.TecCommitteeComment
                })
            .ToList();

            var creationDate = _context.MasterProcurementPlans
                 .Where(mpp => mpp.MppId == mppId)
                 .Select(mpp => mpp.CreationDate)
            .FirstOrDefault();

            var itemName = _context.Items
                .Where(item => item.ItemId == itemId)
                .Select(item => item.ItemName)
                .FirstOrDefault();

            if (itemDetails == null || creationDate == default(DateTime))
            {
                return NotFound("Item or MppId not found.");
            }

            var result = new
            {
                ItemDetails = itemDetails,
                CreationDate = creationDate,
                ItemName = itemName
            };

            return Ok(result);
        }

        [HttpPut("UpdateProcurementCommitteeStatus")]
        public IActionResult UpdateProcurementCommitteeStatus(string sppId, string itemId, string procurementCommitteeStatus, string procurementCommitteeComment)
        {
            var subProcurementPlanItem = _context.SubProcurementPlanItems
                .FirstOrDefault(item => item.SppId == sppId && item.ItemId == itemId);

            if (subProcurementPlanItem == null)
            {
                return NotFound("SubProcurementPlanItem not found.");
            }

            // Update the properties
            subProcurementPlanItem.ProcuremnetCommitteeStatus = procurementCommitteeStatus;
            if (procurementCommitteeStatus != "approve")
            {
                subProcurementPlanItem.ProcurementCommitteeComment = procurementCommitteeComment;
            }


            _context.SaveChanges();

            if (procurementCommitteeStatus == "approve")
            {
                var existingApprovedItem = _context.SubProcurementApprovedItems
                    .FirstOrDefault(approvedItem => approvedItem.SppId == sppId && approvedItem.ItemId == itemId);

                if (existingApprovedItem == null)
                {
                    // Create a new record in SubProcurementApprovedItems table
                    var approvedItem = new SubProcurementApprovedItems
                    {
                        SppId = sppId,
                        ItemId = itemId,
                        SubProcurementPlan = subProcurementPlanItem.SubProcurementPlan,
                        ApprovedItem = subProcurementPlanItem.Item as ApprovedItem,
                    };

                    _context.SubProcurementApprovedItems.Add(approvedItem);
                    _context.SaveChanges();
                }
            }

            return Ok("ProcurementCommitteeStatus and ProcurementCommitteeComment updated successfully.");
        }



        // Approved Items page Controllers (1-GET)

        [HttpGet("GetApprovedItems/{mppId}")]
        public IActionResult GetApprovedItems(string mppId)
        {
            var approvedItems = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve")
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.First().Item.ItemName,
                    TotalQuantity = group.Sum(item => item.Quantity),
                    RecommendedVendors = group.Select(item => item.RecommendedVendor).ToList()
                })
                .ToList();

            return Ok(approvedItems);
        }


        // TEC Report page Controllers (1-GET)

        [HttpGet("GetBidDetails")]
        public async Task<ActionResult<IEnumerable<object>>> GetBidDetails()
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems.Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date <= currentDate)
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
                                 quantity = planItem.Quantity,
                                 expectedDeliveryDate = planItem.ExpectedDeliveryDate,
                                 auctionOpeningDate = input.AuctionOpeningDate,
                                 auctionClosingDate = input.AuctionClosingDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         totalQuantity = group.Sum(x => x.quantity),
                                         expectedDeliveryDate = group.Select(x => x.expectedDeliveryDate).Distinct().Min(),
                                         auctionOpeningDate = group.Select(x => x.auctionOpeningDate).Distinct().FirstOrDefault(),
                                         auctionClosingDate = group.Select(x => x.auctionClosingDate).Distinct().FirstOrDefault()
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
                             auctionOpeningDate = input.auctionOpeningDate,
                             auctionClosingDate = input.auctionClosingDate
                         };

            //get Bid details


            var bidDetails = from input in result
                             join vendor in _context.VendorPlaceBidItems
                             on input.itemId equals vendor.ItemId
                             where vendor.DateAndTime >= input.auctionOpeningDate && vendor.DateAndTime <= input.auctionClosingDate
                             group vendor by vendor.ItemId into g
                             select new
                             {
                                 itemId = g.Key,
                                 bidCount = g.Count()
                             };

            var bidDetails1 = from input in result
                              join vendor in _context.VendorPlaceBidItems
                              on input.itemId equals vendor.ItemId
                              where vendor.DateAndTime >= input.auctionOpeningDate && vendor.DateAndTime <= input.auctionClosingDate && vendor.BidStatus == "Selected"
                              join v in _context.Vendors
                              on vendor.VendorId equals v.VendorId
                              group new { vendor.VendorId, vendor.BidValue, v.FirstName, v.LastName } by vendor.ItemId into g
                              select new
                              {
                                  itemId = g.Key,
                                  bidValues = g.Select(v => new
                                  {
                                      bidValue = v.BidValue,
                                      vendorFullName = v.FirstName + " " + v.LastName
                                  }).FirstOrDefault()
                              };

            var combinedResult = from b1 in bidDetails1
                                 join b2 in bidDetails on b1.itemId equals b2.itemId
                                 select new
                                 {
                                     itemId = b1.itemId,
                                     bidValues = b1.bidValues,
                                     bidCount = b2.bidCount
                                 };


            var result2 = from input in result
                          join bidDetail in combinedResult
                          on input.itemId equals bidDetail.itemId into gj
                          from vendor in gj.DefaultIfEmpty()
                          select new
                          {
                              itemId = input.itemId,
                              itemName = input.itemName,
                              Specification = input.Specification,
                              totalQuantity = input.totalQuantity,
                              expectedDeliveryDate = input.expectedDeliveryDate,
                              bidValue = vendor.bidValues.bidValue,
                              selectedVendorName = vendor.bidValues.vendorFullName,
                              bidCount = vendor.bidCount
                          };

            return Ok(result2);
        }


        [HttpGet("GetItemBidDetails/{itemId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetItemBidDetails(string itemId)
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems.Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date <= currentDate)
                .OrderByDescending(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value.Date)
                .FirstOrDefault();

            var items = await _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == closestDate)
                .Where(a => a.ItemId == itemId)
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
                                 auctionOpeningDate = input.AuctionOpeningDate,
                                 auctionClosingDate = input.AuctionClosingDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         auctionOpeningDate = group.Select(x => x.auctionOpeningDate).Distinct().FirstOrDefault(),
                                         auctionClosingDate = group.Select(x => x.auctionClosingDate).Distinct().FirstOrDefault()
                                     });

            //get item name and Specification
            var itemDetails = _context.Items.Where(item => itemId.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName })
                                            .ToList();

            var result = from input in filteredData
                         join itemDetail in itemDetails
                         on input.itemId equals itemDetail.ItemId
                         select new
                         {
                             itemId = input.itemId,
                             itemName = itemDetail.ItemName,
                             auctionOpeningDate = input.auctionOpeningDate,
                             auctionClosingDate = input.auctionClosingDate
                         };

            //get Bid details

            var bidValues = _context.VendorPlaceBidItems
                                .Where(vendor => vendor.ItemId == result.Select(x => x.itemId).FirstOrDefault())
                                .Where(vendor => vendor.DateAndTime >= result.Select(x => x.auctionOpeningDate).FirstOrDefault() && vendor.DateAndTime <= result.Select(x => x.auctionClosingDate).FirstOrDefault())
                                .Select(vendor => new
                                {
                                    vendor.BidValue,
                                    vendor.DateAndTime,
                                    VendorFullName = vendor.Vendor.FirstName + " " + vendor.Vendor.LastName
                                })
                                .ToList();

            var output = new
            {
                bidValues = bidValues,
                itemName = result.Select(x => x.itemName).FirstOrDefault()
            };

            return Ok(output);
        }


        // Finalized Master Procurement Plan

        [HttpGet("GetFinalizedMasterProcurementPlan")]

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

    }
}
