using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemInStocksController : ControllerBase
    {
        private readonly DataContext _context;

        public ItemInStocksController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ItemInStocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemInStock>>> GetItemInStocks()
        {
            if (_context.ItemInStocks == null)
            {
                return NotFound();
            }
            return await _context.ItemInStocks.ToListAsync();
        }

        // GET: api/ItemInStocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemInStock>> GetItemInStock(string id)
        {
            if (_context.ItemInStocks == null)
            {
                return NotFound();
            }
            var itemInStock = await _context.ItemInStocks.FindAsync(id);

            if (itemInStock == null)
            {
                return NotFound();
            }

            return itemInStock;
        }

        // PUT: api/ItemInStocks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemInStock(string id, ItemInStock itemInStock)
        {
            if (id != itemInStock.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(itemInStock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemInStockExists(id))
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

        // POST: api/ItemInStocks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemInStock>> PostItemInStock(ItemInStock itemInStock)
        {
            if (_context.ItemInStocks == null)
            {
                return Problem("Entity set 'DataContext.ItemInStocks'  is null.");
            }
            _context.ItemInStocks.Add(itemInStock);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemInStockExists(itemInStock.ItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItemInStock", new { id = itemInStock.ItemId }, itemInStock);
        }

        // DELETE: api/ItemInStocks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemInStock(string id)
        {
            if (_context.ItemInStocks == null)
            {
                return NotFound();
            }
            var itemInStock = await _context.ItemInStocks.FindAsync(id);
            if (itemInStock == null)
            {
                return NotFound();
            }

            _context.ItemInStocks.Remove(itemInStock);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemInStockExists(string id)
        {
            return (_context.ItemInStocks?.Any(e => e.ItemId == id)).GetValueOrDefault();
        }
    }
}