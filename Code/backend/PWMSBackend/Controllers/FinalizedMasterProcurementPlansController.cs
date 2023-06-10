using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinalizedMasterProcurementPlansController : ControllerBase
    {
        private readonly DataContext _context;

        public FinalizedMasterProcurementPlansController(DataContext context)
        {
            _context = context;
        }

        // GET: api/FinalizedMasterProcurementPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FinalizedMasterProcurementPlan>>> GetFinalizedMasterProcurementPlans()
        {
            if (_context.FinalizedMasterProcurementPlans == null)
            {
                return NotFound();
            }
            return await _context.FinalizedMasterProcurementPlans.ToListAsync();
        }

        // GET: api/FinalizedMasterProcurementPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FinalizedMasterProcurementPlan>> GetFinalizedMasterProcurementPlan(string id)
        {
            if (_context.FinalizedMasterProcurementPlans == null)
            {
                return NotFound();
            }
            var finalizedMasterProcurementPlan = await _context.FinalizedMasterProcurementPlans.FindAsync(id);

            if (finalizedMasterProcurementPlan == null)
            {
                return NotFound();
            }

            return finalizedMasterProcurementPlan;
        }

        // PUT: api/FinalizedMasterProcurementPlans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFinalizedMasterProcurementPlan(string id, FinalizedMasterProcurementPlan finalizedMasterProcurementPlan)
        {
            if (id != finalizedMasterProcurementPlan.FmppId)
            {
                return BadRequest();
            }

            _context.Entry(finalizedMasterProcurementPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FinalizedMasterProcurementPlanExists(id))
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

        // POST: api/FinalizedMasterProcurementPlans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FinalizedMasterProcurementPlan>> PostFinalizedMasterProcurementPlan(FinalizedMasterProcurementPlan finalizedMasterProcurementPlan)
        {
            if (_context.FinalizedMasterProcurementPlans == null)
            {
                return Problem("Entity set 'DataContext.FinalizedMasterProcurementPlans'  is null.");
            }
            _context.FinalizedMasterProcurementPlans.Add(finalizedMasterProcurementPlan);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FinalizedMasterProcurementPlanExists(finalizedMasterProcurementPlan.FmppId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFinalizedMasterProcurementPlan", new { id = finalizedMasterProcurementPlan.FmppId }, finalizedMasterProcurementPlan);
        }

        // DELETE: api/FinalizedMasterProcurementPlans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFinalizedMasterProcurementPlan(string id)
        {
            if (_context.FinalizedMasterProcurementPlans == null)
            {
                return NotFound();
            }
            var finalizedMasterProcurementPlan = await _context.FinalizedMasterProcurementPlans.FindAsync(id);
            if (finalizedMasterProcurementPlan == null)
            {
                return NotFound();
            }

            _context.FinalizedMasterProcurementPlans.Remove(finalizedMasterProcurementPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FinalizedMasterProcurementPlanExists(string id)
        {
            return (_context.FinalizedMasterProcurementPlans?.Any(e => e.FmppId == id)).GetValueOrDefault();
        }
    }
}