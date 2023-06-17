using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.CustomIdGenerator;
using PWMSBackend.Data;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TECCommitteeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TECCommitteeController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // TEC Committee View MasterProcurementPlan page Controllers (1-GET)

        [HttpGet("GetMasterProcurementPlans")]
        public IActionResult GetMasterProcurementPlans()
        {
            var plans = _context.MasterProcurementPlans
                .Where(mpp => mpp.TecCommitteeId != null)
                .Select(mpp => new
                {
                    mpp.MppId,
                    mpp.EstimatedGrandTotal,
                    mpp.CreationDate,
                })
                .ToList();

            return Ok(plans);
        }

        // TEC Committee Approval for MasterProcurementPlan page Controllers (2-GET)

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
                .Where(item => item.TecCommitteeStatus == null && item.ProcuremnetCommitteeStatus == null)
                .Select(item => new
                {
                    item.SppId,
                    DivisionName = item.SubProcurementPlan.HOD.Division.DivisionName,
                    item.Quantity,
                    item.Item.Specification,
                    RecommendedVendors = item.RecommendedVendor,
                    item.ExpectedDeliveryDate,
                    item.EvidenceOfAuthorization
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


        [HttpPut("UpdateTecCommitteeStatus")]
        public IActionResult UpdateTecCommitteeStatus(string sppId, string itemId, string tecCommitteeStatus, string tecCommitteeComment)
        {
            var subProcurementPlanItem = _context.SubProcurementPlanItems
                .FirstOrDefault(item => item.SppId == sppId && item.ItemId == itemId);

            if (subProcurementPlanItem == null)
            {
                return NotFound("SubProcurementPlanItem not found.");
            }

            // Update the properties
            subProcurementPlanItem.TecCommitteeStatus = tecCommitteeStatus;
            if (tecCommitteeStatus != "approve")
            {
                subProcurementPlanItem.TecCommitteeComment = tecCommitteeComment;
            }

            _context.SaveChanges();

            return Ok("TecCommitteeStatus and TecCommitteeComment updated successfully.");
        }

        //Vendor Selection

        [HttpGet("GetBidDetails")]
        public async Task<ActionResult<IEnumerable<object>>> GetBidDetails()
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date >= currentDate)
                .OrderBy(a => a.PreBidMeetingDate.Value)
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

            //var bidDetails = _context.VendorPlaceBidItems
            //                                 .Where(vendor => itemIds.Contains(vendor.ItemId))
            //                                 .GroupBy(vendor => vendor.ItemId)
            //                                 .Select(group => new
            //                                 {
            //                                     itemId = group.Key,
            //                                     bidValues = group.Select(vendor => vendor.BidValue).ToList()
            //                                 })
            //                                 .ToList();

            //var bidDetails = from input in result
            //                 join vendor in _context.VendorPlaceBidItems
            //                 on input.itemId equals vendor.ItemId
            //                 where vendor.DateAndTime >= input.auctionOpeningDate && vendor.DateAndTime <= input.auctionClosingDate
            //                 group vendor by vendor.ItemId into g
            //                 select new
            //                 {
            //                     itemId = g.Key,
            //                     bidValues = g.Select(v => new { vendorId = v.VendorId, bidValue = v.BidValue }).ToList()
            //                 };
            var bidDetails = from input in result
                             join vendor in _context.VendorPlaceBidItems
                             on input.itemId equals vendor.ItemId
                             join vendorInfo in _context.Vendors
                             on vendor.VendorId equals vendorInfo.VendorId
                             where vendor.DateAndTime >= input.auctionOpeningDate && vendor.DateAndTime <= input.auctionClosingDate
                             group new { 
                                 vendor.VendorId, 
                                 vendor.BidValue, 
                                 vendorInfo.FirstName, 
                                 vendorInfo.LastName, 
                                 vendorInfo.BusinessRegistrationDoc,
                                 vendorInfo.TaxIdentificationDoc,
                                 vendorInfo.InsuaranceCertificate,
                                 vendorInfo.OtherDocs
                             } by vendor.ItemId into g
                             select new
                             {
                                 itemId = g.Key,
                                 bidInfo = g.Select(v => new { 
                                     vendorId = v.VendorId, 
                                     vendorName = v.FirstName + " " + v.LastName, 
                                     bidValue = v.BidValue,
                                     vendorInfo = new
                                     {
                                            v.BusinessRegistrationDoc,
                                            v.TaxIdentificationDoc,
                                            v.InsuaranceCertificate,
                                            v.OtherDocs
                                        }
                                 }).ToList()
                             };

            var result2 = from input in result
                          join bidDetail in bidDetails
                          on input.itemId equals bidDetail.itemId into gj
                          from vendor in gj.DefaultIfEmpty()
                          select new
                          {
                              itemId = input.itemId,
                              itemName = input.itemName,
                              Specification = input.Specification,
                              totalQuantity = input.totalQuantity,
                              expectedDeliveryDate = input.expectedDeliveryDate,
                              bidinfo = vendor.bidInfo
                          };

            return Ok(result2);
        }

        [HttpPost("VendorSelection/{vendorId}/{itemId}")]

        public async Task<ActionResult> VendorSelection(String vendorId, String itemId)
        {


            return Ok();
        }
    }
}
