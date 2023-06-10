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
    public class VendorhasItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public VendorhasItemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/VendorhasItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendorhasItem>>> GetVendorhasItems()
        {
          if (_context.VendorhasItems == null)
          {
              return NotFound();
          }
            return await _context.VendorhasItems.ToListAsync();
        }

        // GET: api/VendorhasItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VendorhasItem>> GetVendorhasItem(string id)
        {
          if (_context.VendorhasItems == null)
          {
              return NotFound();
          }
            var vendorhasItem = await _context.VendorhasItems.FindAsync(id);

            if (vendorhasItem == null)
            {
                return NotFound();
            }

            return vendorhasItem;
        }

        // PUT: api/VendorhasItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendorhasItem(string id, VendorhasItem vendorhasItem)
        {
            if (id != vendorhasItem.VendorId)
            {
                return BadRequest();
            }

            _context.Entry(vendorhasItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorhasItemExists(id))
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

        // POST: api/VendorhasItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VendorhasItem>> PostVendorhasItem(VendorhasItem vendorhasItem)
        {
          if (_context.VendorhasItems == null)
          {
              return Problem("Entity set 'DataContext.VendorhasItems'  is null.");
          }
            _context.VendorhasItems.Add(vendorhasItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VendorhasItemExists(vendorhasItem.VendorId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVendorhasItem", new { id = vendorhasItem.VendorId }, vendorhasItem);
        }

        // DELETE: api/VendorhasItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendorhasItem(string id)
        {
            if (_context.VendorhasItems == null)
            {
                return NotFound();
            }
            var vendorhasItem = await _context.VendorhasItems.FindAsync(id);
            if (vendorhasItem == null)
            {
                return NotFound();
            }

            _context.VendorhasItems.Remove(vendorhasItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendorhasItemExists(string id)
        {
            return (_context.VendorhasItems?.Any(e => e.VendorId == id)).GetValueOrDefault();
        }
    }
}
