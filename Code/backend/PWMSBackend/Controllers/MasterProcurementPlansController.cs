using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterProcurementPlansController : ControllerBase
    {
        private readonly DataContext _context;

        public MasterProcurementPlansController(DataContext context)
        {
            _context = context;
        }

        // GET: api/MasterProcurementPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MasterProcurementPlan>>> GetMasterProcurementPlans()
        {
          if (_context.MasterProcurementPlans == null)
          {
              return NotFound();
          }
            return await _context.MasterProcurementPlans.ToListAsync();
        }

        // GET: api/MasterProcurementPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MasterProcurementPlan>> GetMasterProcurementPlan(string id)
        {
          if (_context.MasterProcurementPlans == null)
          {
              return NotFound();
          }
            var masterProcurementPlan = await _context.MasterProcurementPlans.FindAsync(id);

            if (masterProcurementPlan == null)
            {
                return NotFound();
            }

            return masterProcurementPlan;
        }

        // PUT: api/MasterProcurementPlans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMasterProcurementPlan(string id, MasterProcurementPlan masterProcurementPlan)
        {
            if (id != masterProcurementPlan.MppId)
            {
                return BadRequest();
            }

            _context.Entry(masterProcurementPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MasterProcurementPlanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MasterProcurementPlans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MasterProcurementPlan>> PostMasterProcurementPlan(MasterProcurementPlan masterProcurementPlan)
        {
          if (_context.MasterProcurementPlans == null)
          {
              return Problem("Entity set 'DataContext.MasterProcurementPlans'  is null.");
          }
            _context.MasterProcurementPlans.Add(masterProcurementPlan);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MasterProcurementPlanExists(masterProcurementPlan.MppId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMasterProcurementPlan", new { id = masterProcurementPlan.MppId }, masterProcurementPlan);
        }

        // DELETE: api/MasterProcurementPlans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMasterProcurementPlan(string id)
        {
            if (_context.MasterProcurementPlans == null)
            {
                return NotFound();
            }
            var masterProcurementPlan = await _context.MasterProcurementPlans.FindAsync(id);
            if (masterProcurementPlan == null)
            {
                return NotFound();
            }

            _context.MasterProcurementPlans.Remove(masterProcurementPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MasterProcurementPlanExists(string id)
        {
            return (_context.MasterProcurementPlans?.Any(e => e.MppId == id)).GetValueOrDefault();
        }
    }
}
