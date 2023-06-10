using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidOpeningCommitteesController : ControllerBase
    {
        private readonly DataContext _context;

        public BidOpeningCommitteesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/BidOpeningCommittees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BidOpeningCommittee>>> GetBidOpeningCommittees()
        {
            if (_context.BidOpeningCommittees == null)
            {
                return NotFound();
            }
            return await _context.BidOpeningCommittees.ToListAsync();
        }

        // GET: api/BidOpeningCommittees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BidOpeningCommittee>> GetBidOpeningCommittee(string id)
        {
            if (_context.BidOpeningCommittees == null)
            {
                return NotFound();
            }
            var bidOpeningCommittee = await _context.BidOpeningCommittees.FindAsync(id);

            if (bidOpeningCommittee == null)
            {
                return NotFound();
            }

            return bidOpeningCommittee;
        }

        // PUT: api/BidOpeningCommittees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBidOpeningCommittee(string id, BidOpeningCommittee bidOpeningCommittee)
        {
            if (id != bidOpeningCommittee.CommitteeId)
            {
                return BadRequest();
            }

            _context.Entry(bidOpeningCommittee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BidOpeningCommitteeExists(id))
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

        // POST: api/BidOpeningCommittees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BidOpeningCommittee>> PostBidOpeningCommittee(BidOpeningCommittee bidOpeningCommittee)
        {
            if (_context.BidOpeningCommittees == null)
            {
                return Problem("Entity set 'DataContext.BidOpeningCommittees'  is null.");
            }
            _context.BidOpeningCommittees.Add(bidOpeningCommittee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BidOpeningCommitteeExists(bidOpeningCommittee.CommitteeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBidOpeningCommittee", new { id = bidOpeningCommittee.CommitteeId }, bidOpeningCommittee);
        }

        // DELETE: api/BidOpeningCommittees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBidOpeningCommittee(string id)
        {
            if (_context.BidOpeningCommittees == null)
            {
                return NotFound();
            }
            var bidOpeningCommittee = await _context.BidOpeningCommittees.FindAsync(id);
            if (bidOpeningCommittee == null)
            {
                return NotFound();
            }

            _context.BidOpeningCommittees.Remove(bidOpeningCommittee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BidOpeningCommitteeExists(string id)
        {
            return (_context.BidOpeningCommittees?.Any(e => e.CommitteeId == id)).GetValueOrDefault();
        }
    }
}