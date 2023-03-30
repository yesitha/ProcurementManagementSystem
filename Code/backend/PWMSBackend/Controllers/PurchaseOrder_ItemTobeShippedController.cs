using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrder_ItemTobeShippedController : ControllerBase
    {
        private readonly DataContext _context;

        public PurchaseOrder_ItemTobeShippedController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PurchaseOrder_ItemTobeShipped
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseOrder_ItemTobeShipped>>> GetPurchaseOrder_ItemTobeShippeds()
        {
          if (_context.PurchaseOrder_ItemTobeShippeds == null)
          {
              return NotFound();
          }
            return await _context.PurchaseOrder_ItemTobeShippeds.ToListAsync();
        }

        // GET: api/PurchaseOrder_ItemTobeShipped/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseOrder_ItemTobeShipped>> GetPurchaseOrder_ItemTobeShipped(string id)
        {
          if (_context.PurchaseOrder_ItemTobeShippeds == null)
          {
              return NotFound();
          }
            var purchaseOrder_ItemTobeShipped = await _context.PurchaseOrder_ItemTobeShippeds.FindAsync(id);

            if (purchaseOrder_ItemTobeShipped == null)
            {
                return NotFound();
            }

            return purchaseOrder_ItemTobeShipped;
        }

        // PUT: api/PurchaseOrder_ItemTobeShipped/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaseOrder_ItemTobeShipped(string id, PurchaseOrder_ItemTobeShipped purchaseOrder_ItemTobeShipped)
        {
            if (id != purchaseOrder_ItemTobeShipped.PoId)
            {
                return BadRequest();
            }

            _context.Entry(purchaseOrder_ItemTobeShipped).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseOrder_ItemTobeShippedExists(id))
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

        // POST: api/PurchaseOrder_ItemTobeShipped
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PurchaseOrder_ItemTobeShipped>> PostPurchaseOrder_ItemTobeShipped(PurchaseOrder_ItemTobeShipped purchaseOrder_ItemTobeShipped)
        {
          if (_context.PurchaseOrder_ItemTobeShippeds == null)
          {
              return Problem("Entity set 'DataContext.PurchaseOrder_ItemTobeShippeds'  is null.");
          }
            _context.PurchaseOrder_ItemTobeShippeds.Add(purchaseOrder_ItemTobeShipped);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PurchaseOrder_ItemTobeShippedExists(purchaseOrder_ItemTobeShipped.PoId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPurchaseOrder_ItemTobeShipped", new { id = purchaseOrder_ItemTobeShipped.PoId }, purchaseOrder_ItemTobeShipped);
        }

        // DELETE: api/PurchaseOrder_ItemTobeShipped/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseOrder_ItemTobeShipped(string id)
        {
            if (_context.PurchaseOrder_ItemTobeShippeds == null)
            {
                return NotFound();
            }
            var purchaseOrder_ItemTobeShipped = await _context.PurchaseOrder_ItemTobeShippeds.FindAsync(id);
            if (purchaseOrder_ItemTobeShipped == null)
            {
                return NotFound();
            }

            _context.PurchaseOrder_ItemTobeShippeds.Remove(purchaseOrder_ItemTobeShipped);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseOrder_ItemTobeShippedExists(string id)
        {
            return (_context.PurchaseOrder_ItemTobeShippeds?.Any(e => e.PoId == id)).GetValueOrDefault();
        }
    }
}
