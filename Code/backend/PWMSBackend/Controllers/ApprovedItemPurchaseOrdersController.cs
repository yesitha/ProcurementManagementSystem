using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApprovedItemPurchaseOrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public ApprovedItemPurchaseOrdersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ApprovedItemPurchaseOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApprovedItemPurchaseOrder>>> GetApprovedItemPurchaseOrders()
        {
            if (_context.ApprovedItemPurchaseOrders == null)
            {
                return NotFound();
            }
            return await _context.ApprovedItemPurchaseOrders.ToListAsync();
        }

        // GET: api/ApprovedItemPurchaseOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApprovedItemPurchaseOrder>> GetApprovedItemPurchaseOrder(string id)
        {
            if (_context.ApprovedItemPurchaseOrders == null)
            {
                return NotFound();
            }
            var approvedItemPurchaseOrder = await _context.ApprovedItemPurchaseOrders.FindAsync(id);

            if (approvedItemPurchaseOrder == null)
            {
                return NotFound();
            }

            return approvedItemPurchaseOrder;
        }

        // PUT: api/ApprovedItemPurchaseOrders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApprovedItemPurchaseOrder(string id, ApprovedItemPurchaseOrder approvedItemPurchaseOrder)
        {
            if (id != approvedItemPurchaseOrder.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(approvedItemPurchaseOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApprovedItemPurchaseOrderExists(id))
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

        // POST: api/ApprovedItemPurchaseOrders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ApprovedItemPurchaseOrder>> PostApprovedItemPurchaseOrder(ApprovedItemPurchaseOrder approvedItemPurchaseOrder)
        {
            if (_context.ApprovedItemPurchaseOrders == null)
            {
                return Problem("Entity set 'DataContext.ApprovedItemPurchaseOrders'  is null.");
            }
            _context.ApprovedItemPurchaseOrders.Add(approvedItemPurchaseOrder);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ApprovedItemPurchaseOrderExists(approvedItemPurchaseOrder.ItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetApprovedItemPurchaseOrder", new { id = approvedItemPurchaseOrder.ItemId }, approvedItemPurchaseOrder);
        }

        // DELETE: api/ApprovedItemPurchaseOrders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApprovedItemPurchaseOrder(string id)
        {
            if (_context.ApprovedItemPurchaseOrders == null)
            {
                return NotFound();
            }
            var approvedItemPurchaseOrder = await _context.ApprovedItemPurchaseOrders.FindAsync(id);
            if (approvedItemPurchaseOrder == null)
            {
                return NotFound();
            }

            _context.ApprovedItemPurchaseOrders.Remove(approvedItemPurchaseOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ApprovedItemPurchaseOrderExists(string id)
        {
            return (_context.ApprovedItemPurchaseOrders?.Any(e => e.ItemId == id)).GetValueOrDefault();
        }
    }
}