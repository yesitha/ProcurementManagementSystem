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
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date >= currentDate)
                .OrderBy(a => a.PreBidMeetingDate.Value)
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
        public async Task<IActionResult> CreateVendorPlaceBidItem(string vendorId, string itemId, double bidValue, byte[] proofDocument)
        {
            // Create a new VendorPlaceBidItem instance
            var newVendorPlaceBidItem = new VendorPlaceBidItem
            {
                VendorId = vendorId,
                ItemId = itemId,
                BidValue = bidValue,
                ProofDocument = proofDocument,
                DateAndTime = DateTime.Now, // Set the current date and time
                BidStatus = "Pending" // Set the initial bid status as "Pending" or provide the desired default value
            };

            // Save the newVendorPlaceBidItem to the database using your data context (_context)
            _context.VendorPlaceBidItems.Add(newVendorPlaceBidItem);
            await _context.SaveChangesAsync();

            // Return a success response 
            return Ok("Bid Placed Successfully");
        }
    }
}
