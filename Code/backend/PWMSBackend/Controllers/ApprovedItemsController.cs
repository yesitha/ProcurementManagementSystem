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
    public class ApprovedItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public ApprovedItemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ApprovedItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApprovedItem>>> GetApprovedItems()
        {
          if (_context.ApprovedItems == null)
          {
              return NotFound();
          }
            return await _context.ApprovedItems.ToListAsync();
        }

        // GET: api/ApprovedItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApprovedItem>> GetApprovedItem(string id)
        {
          if (_context.ApprovedItems == null)
          {
              return NotFound();
          }
            var approvedItem = await _context.ApprovedItems.FindAsync(id);

            if (approvedItem == null)
            {
                return NotFound();
            }

            return approvedItem;
        }

        // PUT: api/ApprovedItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApprovedItem(string id, ApprovedItem approvedItem)
        {
            if (id != approvedItem.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(approvedItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApprovedItemExists(id))
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

        // POST: api/ApprovedItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ApprovedItem>> PostApprovedItem(ApprovedItem approvedItem)
        {
          if (_context.ApprovedItems == null)
          {
              return Problem("Entity set 'DataContext.ApprovedItems'  is null.");
          }
            _context.ApprovedItems.Add(approvedItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ApprovedItemExists(approvedItem.ItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetApprovedItem", new { id = approvedItem.ItemId }, approvedItem);
        }

        // DELETE: api/ApprovedItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApprovedItem(string id)
        {
            if (_context.ApprovedItems == null)
            {
                return NotFound();
            }
            var approvedItem = await _context.ApprovedItems.FindAsync(id);
            if (approvedItem == null)
            {
                return NotFound();
            }

            _context.ApprovedItems.Remove(approvedItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ApprovedItemExists(string id)
        {
            return (_context.ApprovedItems?.Any(e => e.ItemId == id)).GetValueOrDefault();
        }
    }
}
