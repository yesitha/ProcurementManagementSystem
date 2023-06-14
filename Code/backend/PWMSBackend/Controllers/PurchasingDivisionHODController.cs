using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.CustomIdGenerator;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasingDivisionHODController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private MppIdGenerator _mppIdGenerator;

        public PurchasingDivisionHODController(DataContext context, IMapper mapper, MppIdGenerator mppIdGenerator)
        {
            _context = context;
            _mapper = mapper;
            _mppIdGenerator = mppIdGenerator;
        }

        //Master Procurement Plan page Controllers (1-GET 1-POST)

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

        [HttpPost("CreateNewMasterProcurementPlanID")]

        public IActionResult CreateNewMasterProcurementPlan()
        {
            string mppId = _mppIdGenerator.GenerateMppId();
            var mpp = new MasterProcurementPlan
            {
                MppId = mppId,
                CreationDate = DateTime.Now,
                EstimatedGrandTotal = 0,
            };

            _context.MasterProcurementPlans.Add(mpp);
            _context.SaveChanges();

            return Ok(mpp.MppId);
        }


        // Create a new MasterProcurementPlan page Controllers (2-GET 2-POST)

        [HttpGet("GetMasterProcurementPlansIDList")]
        public IActionResult GetMasterProcurementPlansIDList()
        {
            var masterProcurementPlans = _context.MasterProcurementPlans
                .Select(mpp => mpp.MppId)
                .ToList();

            return Ok(masterProcurementPlans);
        }


        [HttpGet("GetSubProcurementPlans")]
        public IActionResult GetSubProcurementPlans()
        {
            var plans = _context.SubProcurementPlans
                .Include(spp => spp.HOD)
                    .ThenInclude(hod => hod.Division)
                .Include(spp => spp.subProcurementPlanItems)
                    .ThenInclude(item => item.Item)
                .Where(spp => spp.MasterProcurementPlan.MppId == null) // Filter by MppId
                .Select(spp => new
                {
                    spp.SppId,
                    DivisionName = spp.HOD.Division.DivisionName,
                    TotalEstimatedBudget = spp.subProcurementPlanItems.Sum(item => item.EstimatedBudget)
                })
                .ToList();

            return Ok(plans);
        }


        [HttpPut("UpdateSubProcurementPlan")]
        public IActionResult UpdateSubProcurementPlan(string sppId, string mppId, double estimatedTotal)
        {
            // Find the SubProcurementPlan by SppId
            var subProcurementPlan = _context.SubProcurementPlans.FirstOrDefault(s => s.SppId == sppId);
            if (subProcurementPlan == null)
            {
                return NotFound();
            }

            // Find the associated MasterProcurementPlan by MppId
            var masterProcurementPlan = _context.MasterProcurementPlans.FirstOrDefault(m => m.MppId == mppId);
            if (masterProcurementPlan == null)
            {
                return NotFound("MasterProcurementPlan not found.");
            }

            // Update the properties
            subProcurementPlan.MasterProcurementPlan = masterProcurementPlan;
            subProcurementPlan.EstimatedTotal = estimatedTotal;

            // Save the changes
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut("RevertSubProcurementPlan")]
        public IActionResult RevertSubProcurementPlan(string sppId,string mppId)
        {
            // Find the SubProcurementPlan by SppId
            var subProcurementPlan = _context.SubProcurementPlans.FirstOrDefault(s => s.SppId == sppId);
            if (subProcurementPlan == null)
            {
                return NotFound();
            }
            // Find the associated MasterProcurementPlan by MppId
            var masterProcurementPlan = _context.MasterProcurementPlans.FirstOrDefault(m => m.MppId == mppId);
            if (masterProcurementPlan == null)
            {
                return NotFound("MasterProcurementPlan not found.");
            }

            // Revert the properties
            subProcurementPlan.MasterProcurementPlan = null;
            subProcurementPlan.EstimatedTotal = 0;

            // Save the changes
            _context.SaveChanges();

            return NoContent();
        }

        // Sub Procurement Plan page Controllers (can get from Division HOD )

    }
}
