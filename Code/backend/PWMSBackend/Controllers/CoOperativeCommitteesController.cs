using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoOperativeCommitteesController : ControllerBase
    {
        private readonly DataContext _context;

        public CoOperativeCommitteesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CoOperativeCommittees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoOperativeCommittee>>> GetCoOperativeCommittees()
        {
            if (_context.CoOperativeCommittees == null)
            {
                return NotFound();
            }
            return await _context.CoOperativeCommittees.ToListAsync();
        }

        // GET: api/CoOperativeCommittees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CoOperativeCommittee>> GetCoOperativeCommittee(string id)
        {
            if (_context.CoOperativeCommittees == null)
            {
                return NotFound();
            }
            var coOperativeCommittee = await _context.CoOperativeCommittees.FindAsync(id);

            if (coOperativeCommittee == null)
            {
                return NotFound();
            }

            return coOperativeCommittee;
        }

        // PUT: api/CoOperativeCommittees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoOperativeCommittee(string id, CoOperativeCommittee coOperativeCommittee)
        {
            if (id != coOperativeCommittee.CommitteeId)
            {
                return BadRequest();
            }

            _context.Entry(coOperativeCommittee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoOperativeCommitteeExists(id))
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

        // POST: api/CoOperativeCommittees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CoOperativeCommittee>> PostCoOperativeCommittee(CoOperativeCommittee coOperativeCommittee)
        {
            if (_context.CoOperativeCommittees == null)
            {
                return Problem("Entity set 'DataContext.CoOperativeCommittees'  is null.");
            }
            _context.CoOperativeCommittees.Add(coOperativeCommittee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CoOperativeCommitteeExists(coOperativeCommittee.CommitteeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCoOperativeCommittee", new { id = coOperativeCommittee.CommitteeId }, coOperativeCommittee);
        }

        // DELETE: api/CoOperativeCommittees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoOperativeCommittee(string id)
        {
            if (_context.CoOperativeCommittees == null)
            {
                return NotFound();
            }
            var coOperativeCommittee = await _context.CoOperativeCommittees.FindAsync(id);
            if (coOperativeCommittee == null)
            {
                return NotFound();
            }

            _context.CoOperativeCommittees.Remove(coOperativeCommittee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CoOperativeCommitteeExists(string id)
        {
            return (_context.CoOperativeCommittees?.Any(e => e.CommitteeId == id)).GetValueOrDefault();
        }
    }
}