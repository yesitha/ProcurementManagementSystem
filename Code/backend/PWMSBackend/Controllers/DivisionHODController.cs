using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;

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

        [HttpGet("sppIds")]
        public IActionResult GetSppIds()
        {
            List<string> sppIds = _context.SubProcurementPlans.Select(spp => spp.SppId).ToList();
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

    }
}
