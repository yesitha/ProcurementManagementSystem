using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasingDivisionHODController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PurchasingDivisionHODController(DataContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }
        [HttpGet("GetMasterProcurementPlans")]
        public IActionResult GetMasterProcurementPlans()
        {
            var plans = _context.MasterProcurementPlans
                .Include(mpp => mpp.MasterProcurementPlanStatuses)
                    .ThenInclude(mpps => mpps.Status)
                .Select(mpp => new
                {
                    mpp.MppId,
                    mpp.EstimatedGrandTotal,
                    mpp.CreationDate,
                    StatusName = mpp.MasterProcurementPlanStatuses
                        .Select(mpps => mpps.Status.StatusName)
                        .FirstOrDefault()
                })
                .ToList();

            return Ok(plans);
        }

        [HttpGet("GetSubProcurementPlans")]
        public IActionResult GetSubProcurementPlans()
        {
            var plans = _context.SubProcurementPlans
                .Include(spp => spp.HOD)
                    .ThenInclude(hod => hod.Division)
                .Include(spp => spp.subProcurementPlanItems)
                    .ThenInclude(item => item.Item)
                .Select(spp => new
                {
                    spp.SppId,
                    DivisionName = spp.HOD.Division.DivisionName,
                    TotalEstimatedBudget = spp.subProcurementPlanItems.Sum(item => item.EstimatedBudget)
                })
                .ToList();

            return Ok(plans);
        }
    }
}
