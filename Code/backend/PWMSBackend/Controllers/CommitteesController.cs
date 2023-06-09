using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommitteesController : ControllerBase
    {
        private readonly DataContext _context;

        public CommitteesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Committees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Committee>>> GetCommittees()
        {
            if (_context.Committees == null)
            {
                return NotFound();
            }
            return await _context.Committees.ToListAsync();
        }

        // GET: api/Committees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Committee>> GetCommittee(string id)
        {
            if (_context.Committees == null)
            {
                return NotFound();
            }
            var committee = await _context.Committees.FindAsync(id);

            if (committee == null)
            {
                return NotFound();
            }

            return committee;
        }

        // PUT: api/Committees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommittee(string id, Committee committee)
        {
            if (id != committee.CommitteeId)
            {
                return BadRequest();
            }

            _context.Entry(committee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommitteeExists(id))
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

        // POST: api/Committees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Committee>> PostCommittee(Committee committee)
        {
            if (_context.Committees == null)
            {
                return Problem("Entity set 'DataContext.Committees'  is null.");
            }
            _context.Committees.Add(committee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CommitteeExists(committee.CommitteeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCommittee", new { id = committee.CommitteeId }, committee);
        }

        // DELETE: api/Committees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommittee(string id)
        {
            if (_context.Committees == null)
            {
                return NotFound();
            }
            var committee = await _context.Committees.FindAsync(id);
            if (committee == null)
            {
                return NotFound();
            }

            _context.Committees.Remove(committee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommitteeExists(string id)
        {
            return (_context.Committees?.Any(e => e.CommitteeId == id)).GetValueOrDefault();
        }
    }
}