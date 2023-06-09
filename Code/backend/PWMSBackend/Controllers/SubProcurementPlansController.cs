using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubProcurementPlansController : ControllerBase
    {
        private readonly DataContext _context;

        public SubProcurementPlansController(DataContext context)
        {
            _context = context;
        }

        // GET: api/SubProcurementPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubProcurementPlan>>> GetSubProcurementPlans()
        {
            if (_context.SubProcurementPlans == null)
            {
                return NotFound();
            }
            return await _context.SubProcurementPlans.ToListAsync();
        }

        // GET: api/SubProcurementPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubProcurementPlan>> GetSubProcurementPlan(string id)
        {
            if (_context.SubProcurementPlans == null)
            {
                return NotFound();
            }
            var subProcurementPlan = await _context.SubProcurementPlans.FindAsync(id);

            if (subProcurementPlan == null)
            {
                return NotFound();
            }

            return subProcurementPlan;
        }

        // PUT: api/SubProcurementPlans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubProcurementPlan(string id, SubProcurementPlan subProcurementPlan)
        {
            if (id != subProcurementPlan.SppId)
            {
                return BadRequest();
            }

            _context.Entry(subProcurementPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubProcurementPlanExists(id))
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

        // POST: api/SubProcurementPlans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubProcurementPlan>> PostSubProcurementPlan(SubProcurementPlan subProcurementPlan)
        {
            if (_context.SubProcurementPlans == null)
            {
                return Problem("Entity set 'DataContext.SubProcurementPlans'  is null.");
            }
            _context.SubProcurementPlans.Add(subProcurementPlan);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SubProcurementPlanExists(subProcurementPlan.SppId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSubProcurementPlan", new { id = subProcurementPlan.SppId }, subProcurementPlan);
        }

        // DELETE: api/SubProcurementPlans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubProcurementPlan(string id)
        {
            if (_context.SubProcurementPlans == null)
            {
                return NotFound();
            }
            var subProcurementPlan = await _context.SubProcurementPlans.FindAsync(id);
            if (subProcurementPlan == null)
            {
                return NotFound();
            }

            _context.SubProcurementPlans.Remove(subProcurementPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubProcurementPlanExists(string id)
        {
            return (_context.SubProcurementPlans?.Any(e => e.SppId == id)).GetValueOrDefault();
        }
    }
}