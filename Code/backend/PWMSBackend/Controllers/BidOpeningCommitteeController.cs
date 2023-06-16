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
    public class BidOpeningCommitteeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BidOpeningCommitteeController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet("GetSubProcurementApprovedItems")]
        public async Task<ActionResult<IEnumerable<object>>> GetSubProcurementApprovedItems()
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date >= currentDate)
                .OrderBy(a => a.PreBidMeetingDate.Value)
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
                                 recommendedVendor = planItem.RecommendedVendor
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         totalQuantity = group.Sum(x => x.quantity),
                                         recommendedVendors = group.Select(x => x.recommendedVendor).Distinct().ToList()
                                     });

            //get item names

            var itemIds = filteredData.Select(x => x.itemId).Distinct().ToList();
            var itemNames = _context.Items.Where(item => itemIds.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName })
                                            .ToList();

            var result = from input in filteredData
                               join itemName in itemNames
                               on input.itemId equals itemName.ItemId
                               select new
                               {
                                   itemId = input.itemId,
                                   itemName = itemName.ItemName,
                                   totalQuantity = input.totalQuantity,
                                   recommendedVendors = input.recommendedVendors
                               };

            return Ok(result);
        }

        [HttpPut("UpdateAuctionDates")]
        public IActionResult UpdateAuctionDates(string itemId, DateTime auctionOpeningDate, DateTime auctionClosingDate)
        {
            DateTime currentDate = DateTime.Today;

            var items = _context.SubProcurementApprovedItems
                .Where(a => a.ItemId == itemId)
                .ToList();

            if (items.Count == 0)
            {
                return NotFound(); // Item not found
            }

            // Get the closest PreBidMeetingDate to the current date among the items with the same itemId
            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.ItemId == itemId && a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date >= currentDate)
                .OrderBy(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value)
                .FirstOrDefault();


            // Update AuctionOpeningDate and AuctionClosingDate for all items with the same itemId
            foreach (var item in items)
            {
                if (item.PreBidMeetingDate.HasValue && item.PreBidMeetingDate.Value.Date == closestDate.Date)
                {
                    item.AuctionOpeningDate = auctionOpeningDate;
                    item.AuctionClosingDate = auctionClosingDate;
                }
            }

            // Save the changes to the database
            _context.SaveChanges();

            return Ok();
        }




    }
}
