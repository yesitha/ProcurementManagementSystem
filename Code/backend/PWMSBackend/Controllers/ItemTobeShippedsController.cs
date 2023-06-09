using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemTobeShippedsController : ControllerBase
    {
        private readonly DataContext _context;

        public ItemTobeShippedsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ItemTobeShippeds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemTobeShipped>>> GetItemTobeShippeds()
        {
            if (_context.ItemTobeShippeds == null)
            {
                return NotFound();
            }
            return await _context.ItemTobeShippeds.ToListAsync();
        }

        // GET: api/ItemTobeShippeds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemTobeShipped>> GetItemTobeShipped(string id)
        {
            if (_context.ItemTobeShippeds == null)
            {
                return NotFound();
            }
            var itemTobeShipped = await _context.ItemTobeShippeds.FindAsync(id);

            if (itemTobeShipped == null)
            {
                return NotFound();
            }

            return itemTobeShipped;
        }

        // PUT: api/ItemTobeShippeds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemTobeShipped(string id, ItemTobeShipped itemTobeShipped)
        {
            if (id != itemTobeShipped.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(itemTobeShipped).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemTobeShippedExists(id))
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

        // POST: api/ItemTobeShippeds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemTobeShipped>> PostItemTobeShipped(ItemTobeShipped itemTobeShipped)
        {
            if (_context.ItemTobeShippeds == null)
            {
                return Problem("Entity set 'DataContext.ItemTobeShippeds'  is null.");
            }
            _context.ItemTobeShippeds.Add(itemTobeShipped);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemTobeShippedExists(itemTobeShipped.ItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItemTobeShipped", new { id = itemTobeShipped.ItemId }, itemTobeShipped);
        }

        // DELETE: api/ItemTobeShippeds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemTobeShipped(string id)
        {
            if (_context.ItemTobeShippeds == null)
            {
                return NotFound();
            }
            var itemTobeShipped = await _context.ItemTobeShippeds.FindAsync(id);
            if (itemTobeShipped == null)
            {
                return NotFound();
            }

            _context.ItemTobeShippeds.Remove(itemTobeShipped);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemTobeShippedExists(string id)
        {
            return (_context.ItemTobeShippeds?.Any(e => e.ItemId == id)).GetValueOrDefault();
        }
    }
}