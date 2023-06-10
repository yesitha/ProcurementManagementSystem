using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GRNItemTobeShippedsController : ControllerBase
    {
        private readonly DataContext _context;

        public GRNItemTobeShippedsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/GRNItemTobeShippeds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GRNItemTobeShipped>>> GetGRNItemsToBeShipped()
        {
            if (_context.GRNItemsToBeShipped == null)
            {
                return NotFound();
            }
            return await _context.GRNItemsToBeShipped.ToListAsync();
        }

        // GET: api/GRNItemTobeShippeds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GRNItemTobeShipped>> GetGRNItemTobeShipped(string id)
        {
            if (_context.GRNItemsToBeShipped == null)
            {
                return NotFound();
            }
            var gRNItemTobeShipped = await _context.GRNItemsToBeShipped.FindAsync(id);

            if (gRNItemTobeShipped == null)
            {
                return NotFound();
            }

            return gRNItemTobeShipped;
        }

        // PUT: api/GRNItemTobeShippeds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGRNItemTobeShipped(string id, GRNItemTobeShipped gRNItemTobeShipped)
        {
            if (id != gRNItemTobeShipped.GrnId)
            {
                return BadRequest();
            }

            _context.Entry(gRNItemTobeShipped).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GRNItemTobeShippedExists(id))
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

        // POST: api/GRNItemTobeShippeds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GRNItemTobeShipped>> PostGRNItemTobeShipped(GRNItemTobeShipped gRNItemTobeShipped)
        {
            if (_context.GRNItemsToBeShipped == null)
            {
                return Problem("Entity set 'DataContext.GRNItemsToBeShipped'  is null.");
            }
            _context.GRNItemsToBeShipped.Add(gRNItemTobeShipped);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GRNItemTobeShippedExists(gRNItemTobeShipped.GrnId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGRNItemTobeShipped", new { id = gRNItemTobeShipped.GrnId }, gRNItemTobeShipped);
        }

        // DELETE: api/GRNItemTobeShippeds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGRNItemTobeShipped(string id)
        {
            if (_context.GRNItemsToBeShipped == null)
            {
                return NotFound();
            }
            var gRNItemTobeShipped = await _context.GRNItemsToBeShipped.FindAsync(id);
            if (gRNItemTobeShipped == null)
            {
                return NotFound();
            }

            _context.GRNItemsToBeShipped.Remove(gRNItemTobeShipped);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GRNItemTobeShippedExists(string id)
        {
            return (_context.GRNItemsToBeShipped?.Any(e => e.GrnId == id)).GetValueOrDefault();
        }
    }
}