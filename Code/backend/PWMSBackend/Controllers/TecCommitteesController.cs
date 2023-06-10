using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TecCommitteesController : ControllerBase
    {
        private readonly DataContext _context;

        public TecCommitteesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/TecCommittees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TecCommittee>>> GetTecCommittees()
        {
            if (_context.TecCommittees == null)
            {
                return NotFound();
            }
            return await _context.TecCommittees.ToListAsync();
        }

        // GET: api/TecCommittees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TecCommittee>> GetTecCommittee(string id)
        {
            if (_context.TecCommittees == null)
            {
                return NotFound();
            }
            var tecCommittee = await _context.TecCommittees.FindAsync(id);

            if (tecCommittee == null)
            {
                return NotFound();
            }

            return tecCommittee;
        }

        // PUT: api/TecCommittees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTecCommittee(string id, TecCommittee tecCommittee)
        {
            if (id != tecCommittee.CommitteeId)
            {
                return BadRequest();
            }

            _context.Entry(tecCommittee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TecCommitteeExists(id))
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

        // POST: api/TecCommittees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TecCommittee>> PostTecCommittee(TecCommittee tecCommittee)
        {
            if (_context.TecCommittees == null)
            {
                return Problem("Entity set 'DataContext.TecCommittees'  is null.");
            }
            _context.TecCommittees.Add(tecCommittee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TecCommitteeExists(tecCommittee.CommitteeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTecCommittee", new { id = tecCommittee.CommitteeId }, tecCommittee);
        }

        // DELETE: api/TecCommittees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTecCommittee(string id)
        {
            if (_context.TecCommittees == null)
            {
                return NotFound();
            }
            var tecCommittee = await _context.TecCommittees.FindAsync(id);
            if (tecCommittee == null)
            {
                return NotFound();
            }

            _context.TecCommittees.Remove(tecCommittee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TecCommitteeExists(string id)
        {
            return (_context.TecCommittees?.Any(e => e.CommitteeId == id)).GetValueOrDefault();
        }
    }
}