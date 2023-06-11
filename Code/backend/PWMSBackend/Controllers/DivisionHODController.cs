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
    public class DivisionHODController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DivisionHODController(DataContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }

        [HttpGet("sppIds/{hodId}")]
        public IActionResult GetSppIdsByHodId(string hodId)
        {
            List<string> sppIds = _context.SubProcurementPlans
                .Where(spp => spp.HOD.EmployeeId == hodId)
                .Select(spp => spp.SppId)
                .ToList();

            return Ok(sppIds);
        }

        [HttpGet("divisionName/{hodId}")]
        public IActionResult GetDivisionName(string hodId)
        {
            string divisionName = _context.Divisions
                .Where(division => division.HOD.EmployeeId == hodId)
                .Select(division => division.DivisionName)
                .FirstOrDefault();

            if (divisionName != null)
            {
                return Ok(divisionName);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("SubProcurementPlanItems/{sppId}")]
        public IActionResult GetSubProcurementPlanItem(string sppId)
        {
            var items = _context.SubProcurementPlanItems
                .Where(spi => spi.SppId == sppId)
                .Select(spi => new
                {
                    spi.Item.ItemId,
                    spi.Item.ItemName,
                    spi.Item.Specification,
                    spi.Quantity,
                    spi.ExpectedDeliveryDate,
                    spi.RecommendedVendor
                })
                .ToList();

            return Ok(items);
        }

        [HttpDelete("{itemId}")]
        public IActionResult DeleteItem(string itemId)
        {
            // Find the subprocurementplan item with the given ItemId
            var subProcurementPlanItem = _context.SubProcurementPlanItems.FirstOrDefault(item => item.ItemId == itemId);

            if (subProcurementPlanItem == null)
            {
                // Item not found, return an appropriate response
                return NotFound();
            }

            // Remove the subprocurementplan item from the context
            _context.SubProcurementPlanItems.Remove(subProcurementPlanItem);
            _context.SaveChanges();

            // Return a success response
            return Ok();
        }


        [HttpGet("ItemNameList")]
        public IActionResult GetItems()
        {
            var items = _context.Items
                .Select(item => new
                {
                    item.ItemId,
                    item.ItemName,
                    item.Specification
                })
                .ToList();

            return Ok(items);
        }

    }
}
