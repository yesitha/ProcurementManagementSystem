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
    public class CoOperativeCommitteeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CoOperativeCommitteeController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("ClosestPreBidMeetingDate")]
        public IActionResult GetClosestPreBidMeetingDate()
        {
            // Retrieve the PreBidMeetingDate closest to the current date
            var closestDate = _context.SubProcurementApprovedItems
                .Where(item => item.PreBidMeetingDate != null && item.PreBidMeetingDate >= DateTime.Now)
                .OrderBy(item => item.PreBidMeetingDate)
                .Select(item => item.PreBidMeetingDate)
                .FirstOrDefault();

            return Ok(closestDate);
        }

        // GET: api/ApprovedItems/{preBidMeetingDate}
        [HttpGet("{preBidMeetingDate}")]
        public IActionResult GetApprovedItems(DateTime preBidMeetingDate)
        {
            DateTime dateOnly = preBidMeetingDate.Date;

            var approvedItems = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == dateOnly)
                .Select(a => new
                {
                    a.ItemId,
                    a.ApprovedItem.ItemName,
                    TotalQuantity = _context.SubProcurementPlanItems
                        .Where(s => s.ItemId == a.ItemId && s.SppId == a.SppId)
                        .Sum(s => s.Quantity)
                })
                .ToList();

            return Ok(approvedItems);
        }

        // GET: api/Items/{itemId}
        [HttpGet("GetApprovedItemDetails/{itemId}")]
        public IActionResult GetItemDetails(string itemId)
        {
            var item = _context.Items
                .Include(i => i.Category)
                .FirstOrDefault(i => i.ItemId == itemId);

            if (item == null)
            {
                return NotFound();
            }

            var approvedItemIds = _context.SubProcurementApprovedItems
                .Where(a => a.ItemId == itemId)
                .Select(a => a.SppId)
                .ToList();

            var approvedTotalQuantity = _context.SubProcurementPlanItems
                .Where(s => approvedItemIds.Contains(s.SppId) && s.ItemId == itemId)
                .Sum(s => s.Quantity);

            var itemDetails = new
            {
                item.ItemId,
                item.ItemName,
                ApprovedTotalQuantity = approvedTotalQuantity,
                item.Specification,
                Category = item.Category?.CategoryName
            };

            return Ok(itemDetails);
        }


    }
}
