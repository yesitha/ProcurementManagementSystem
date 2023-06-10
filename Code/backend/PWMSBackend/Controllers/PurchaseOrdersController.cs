using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public PurchaseOrdersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PurchaseOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseOrder>>> GetPurchaseOrders()
        {
            if (_context.PurchaseOrders == null)
            {
                return NotFound();
            }
            return await _context.PurchaseOrders.ToListAsync();
        }

        // GET: api/PurchaseOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseOrder>> GetPurchaseOrder(string id)
        {
            if (_context.PurchaseOrders == null)
            {
                return NotFound();
            }
            var purchaseOrder = await _context.PurchaseOrders.FindAsync(id);

            if (purchaseOrder == null)
            {
                return NotFound();
            }

            return purchaseOrder;
        }

        // PUT: api/PurchaseOrders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaseOrder(string id, PurchaseOrder purchaseOrder)
        {
            if (id != purchaseOrder.PoId)
            {
                return BadRequest();
            }

            _context.Entry(purchaseOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseOrderExists(id))
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

        // POST: api/PurchaseOrders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PurchaseOrder>> PostPurchaseOrder(PurchaseOrder purchaseOrder)
        {
            if (_context.PurchaseOrders == null)
            {
                return Problem("Entity set 'DataContext.PurchaseOrders'  is null.");
            }
            _context.PurchaseOrders.Add(purchaseOrder);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PurchaseOrderExists(purchaseOrder.PoId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPurchaseOrder", new { id = purchaseOrder.PoId }, purchaseOrder);
        }

        // DELETE: api/PurchaseOrders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseOrder(string id)
        {
            if (_context.PurchaseOrders == null)
            {
                return NotFound();
            }
            var purchaseOrder = await _context.PurchaseOrders.FindAsync(id);
            if (purchaseOrder == null)
            {
                return NotFound();
            }

            _context.PurchaseOrders.Remove(purchaseOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseOrderExists(string id)
        {
            return (_context.PurchaseOrders?.Any(e => e.PoId == id)).GetValueOrDefault();
        }
    }
}