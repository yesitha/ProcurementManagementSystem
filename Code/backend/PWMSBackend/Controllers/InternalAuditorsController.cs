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
    public class InternalAuditorsController : ControllerBase
    {
        private readonly DataContext _context;

        public InternalAuditorsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/InternalAuditors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternalAuditor>>> GetInternalAuditors()
        {
          if (_context.InternalAuditors == null)
          {
              return NotFound();
          }
            return await _context.InternalAuditors.ToListAsync();
        }

        // GET: api/InternalAuditors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InternalAuditor>> GetInternalAuditor(string id)
        {
          if (_context.InternalAuditors == null)
          {
              return NotFound();
          }
            var internalAuditor = await _context.InternalAuditors.FindAsync(id);

            if (internalAuditor == null)
            {
                return NotFound();
            }

            return internalAuditor;
        }

        // PUT: api/InternalAuditors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInternalAuditor(string id, InternalAuditor internalAuditor)
        {
            if (id != internalAuditor.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(internalAuditor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InternalAuditorExists(id))
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

        // POST: api/InternalAuditors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InternalAuditor>> PostInternalAuditor(InternalAuditor internalAuditor)
        {
          if (_context.InternalAuditors == null)
          {
              return Problem("Entity set 'DataContext.InternalAuditors'  is null.");
          }
            _context.InternalAuditors.Add(internalAuditor);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (InternalAuditorExists(internalAuditor.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetInternalAuditor", new { id = internalAuditor.EmployeeId }, internalAuditor);
        }

        // DELETE: api/InternalAuditors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInternalAuditor(string id)
        {
            if (_context.InternalAuditors == null)
            {
                return NotFound();
            }
            var internalAuditor = await _context.InternalAuditors.FindAsync(id);
            if (internalAuditor == null)
            {
                return NotFound();
            }

            _context.InternalAuditors.Remove(internalAuditor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InternalAuditorExists(string id)
        {
            return (_context.InternalAuditors?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}
