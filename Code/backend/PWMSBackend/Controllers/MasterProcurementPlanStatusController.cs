using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterProcurementPlanStatusController : ControllerBase
    {
        private readonly DataContext _context;

        public MasterProcurementPlanStatusController(DataContext context)
        {
            _context = context;
        }

        // GET: api/MasterProcurementPlanStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MasterProcurementPlanStatus>>> GetMasterProcurementPlanStatuses()
        {
            if (_context.MasterProcurementPlanStatuses == null)
            {
                return NotFound();
            }
            return await _context.MasterProcurementPlanStatuses.ToListAsync();
        }

        // GET: api/MasterProcurementPlanStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MasterProcurementPlanStatus>> GetMasterProcurementPlanStatus(string id)
        {
            if (_context.MasterProcurementPlanStatuses == null)
            {
                return NotFound();
            }
            var masterProcurementPlanStatus = await _context.MasterProcurementPlanStatuses.FindAsync(id);

            if (masterProcurementPlanStatus == null)
            {
                return NotFound();
            }

            return masterProcurementPlanStatus;
        }

        // PUT: api/MasterProcurementPlanStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMasterProcurementPlanStatus(string id, MasterProcurementPlanStatus masterProcurementPlanStatus)
        {
            if (id != masterProcurementPlanStatus.MppId)
            {
                return BadRequest();
            }

            _context.Entry(masterProcurementPlanStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MasterProcurementPlanStatusExists(id))
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

        // POST: api/MasterProcurementPlanStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MasterProcurementPlanStatus>> PostMasterProcurementPlanStatus(MasterProcurementPlanStatus masterProcurementPlanStatus)
        {
            if (_context.MasterProcurementPlanStatuses == null)
            {
                return Problem("Entity set 'DataContext.MasterProcurementPlanStatuses'  is null.");
            }
            _context.MasterProcurementPlanStatuses.Add(masterProcurementPlanStatus);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MasterProcurementPlanStatusExists(masterProcurementPlanStatus.MppId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMasterProcurementPlanStatus", new { id = masterProcurementPlanStatus.MppId }, masterProcurementPlanStatus);
        }

        // DELETE: api/MasterProcurementPlanStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMasterProcurementPlanStatus(string id)
        {
            if (_context.MasterProcurementPlanStatuses == null)
            {
                return NotFound();
            }
            var masterProcurementPlanStatus = await _context.MasterProcurementPlanStatuses.FindAsync(id);
            if (masterProcurementPlanStatus == null)
            {
                return NotFound();
            }

            _context.MasterProcurementPlanStatuses.Remove(masterProcurementPlanStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MasterProcurementPlanStatusExists(string id)
        {
            return (_context.MasterProcurementPlanStatuses?.Any(e => e.MppId == id)).GetValueOrDefault();
        }
    }
}