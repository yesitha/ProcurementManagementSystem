using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcurementOfficerController : ControllerBase
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProcurementOfficerController(DataContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }

        //Master Procurement Plan page Controllers (1-GET)

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

        // View Master Procurement Plan page Controllers



    }
}
