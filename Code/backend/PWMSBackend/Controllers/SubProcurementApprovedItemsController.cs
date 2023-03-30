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
    public class SubProcurementApprovedItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public SubProcurementApprovedItemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/SubProcurementApprovedItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubProcurementApprovedItems>>> GetSubProcurementApprovedItems()
        {
          if (_context.SubProcurementApprovedItems == null)
          {
              return NotFound();
          }
            return await _context.SubProcurementApprovedItems.ToListAsync();
        }

        // GET: api/SubProcurementApprovedItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubProcurementApprovedItems>> GetSubProcurementApprovedItems(string id)
        {
          if (_context.SubProcurementApprovedItems == null)
          {
              return NotFound();
          }
            var subProcurementApprovedItems = await _context.SubProcurementApprovedItems.FindAsync(id);

            if (subProcurementApprovedItems == null)
            {
                return NotFound();
            }

            return subProcurementApprovedItems;
        }

        // PUT: api/SubProcurementApprovedItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubProcurementApprovedItems(string id, SubProcurementApprovedItems subProcurementApprovedItems)
        {
            if (id != subProcurementApprovedItems.SppId)
            {
                return BadRequest();
            }

            _context.Entry(subProcurementApprovedItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubProcurementApprovedItemsExists(id))
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

        // POST: api/SubProcurementApprovedItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubProcurementApprovedItems>> PostSubProcurementApprovedItems(SubProcurementApprovedItems subProcurementApprovedItems)
        {
          if (_context.SubProcurementApprovedItems == null)
          {
              return Problem("Entity set 'DataContext.SubProcurementApprovedItems'  is null.");
          }
            _context.SubProcurementApprovedItems.Add(subProcurementApprovedItems);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SubProcurementApprovedItemsExists(subProcurementApprovedItems.SppId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSubProcurementApprovedItems", new { id = subProcurementApprovedItems.SppId }, subProcurementApprovedItems);
        }

        // DELETE: api/SubProcurementApprovedItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubProcurementApprovedItems(string id)
        {
            if (_context.SubProcurementApprovedItems == null)
            {
                return NotFound();
            }
            var subProcurementApprovedItems = await _context.SubProcurementApprovedItems.FindAsync(id);
            if (subProcurementApprovedItems == null)
            {
                return NotFound();
            }

            _context.SubProcurementApprovedItems.Remove(subProcurementApprovedItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubProcurementApprovedItemsExists(string id)
        {
            return (_context.SubProcurementApprovedItems?.Any(e => e.SppId == id)).GetValueOrDefault();
        }
    }
}
