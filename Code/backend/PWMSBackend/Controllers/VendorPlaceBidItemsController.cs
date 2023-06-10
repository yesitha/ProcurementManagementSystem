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
    public class VendorPlaceBidItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public VendorPlaceBidItemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/VendorPlaceBidItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendorPlaceBidItem>>> GetVendorPlaceBidItems()
        {
          if (_context.VendorPlaceBidItems == null)
          {
              return NotFound();
          }
            return await _context.VendorPlaceBidItems.ToListAsync();
        }

        // GET: api/VendorPlaceBidItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VendorPlaceBidItem>> GetVendorPlaceBidItem(string id)
        {
          if (_context.VendorPlaceBidItems == null)
          {
              return NotFound();
          }
            var vendorPlaceBidItem = await _context.VendorPlaceBidItems.FindAsync(id);

            if (vendorPlaceBidItem == null)
            {
                return NotFound();
            }

            return vendorPlaceBidItem;
        }

        // PUT: api/VendorPlaceBidItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendorPlaceBidItem(string id, VendorPlaceBidItem vendorPlaceBidItem)
        {
            if (id != vendorPlaceBidItem.VendorId)
            {
                return BadRequest();
            }

            _context.Entry(vendorPlaceBidItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorPlaceBidItemExists(id))
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

        // POST: api/VendorPlaceBidItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VendorPlaceBidItem>> PostVendorPlaceBidItem(VendorPlaceBidItem vendorPlaceBidItem)
        {
          if (_context.VendorPlaceBidItems == null)
          {
              return Problem("Entity set 'DataContext.VendorPlaceBidItems'  is null.");
          }
            _context.VendorPlaceBidItems.Add(vendorPlaceBidItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VendorPlaceBidItemExists(vendorPlaceBidItem.VendorId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVendorPlaceBidItem", new { id = vendorPlaceBidItem.VendorId }, vendorPlaceBidItem);
        }

        // DELETE: api/VendorPlaceBidItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendorPlaceBidItem(string id)
        {
            if (_context.VendorPlaceBidItems == null)
            {
                return NotFound();
            }
            var vendorPlaceBidItem = await _context.VendorPlaceBidItems.FindAsync(id);
            if (vendorPlaceBidItem == null)
            {
                return NotFound();
            }

            _context.VendorPlaceBidItems.Remove(vendorPlaceBidItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendorPlaceBidItemExists(string id)
        {
            return (_context.VendorPlaceBidItems?.Any(e => e.VendorId == id)).GetValueOrDefault();
        }
    }
}
