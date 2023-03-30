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
    public class GRNsController : ControllerBase
    {
        private readonly DataContext _context;

        public GRNsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/GRNs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GRN>>> GetGRNs()
        {
          if (_context.GRNs == null)
          {
              return NotFound();
          }
            return await _context.GRNs.ToListAsync();
        }

        // GET: api/GRNs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GRN>> GetGRN(string id)
        {
          if (_context.GRNs == null)
          {
              return NotFound();
          }
            var gRN = await _context.GRNs.FindAsync(id);

            if (gRN == null)
            {
                return NotFound();
            }

            return gRN;
        }

        // PUT: api/GRNs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGRN(string id, GRN gRN)
        {
            if (id != gRN.GrnId)
            {
                return BadRequest();
            }

            _context.Entry(gRN).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GRNExists(id))
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

        // POST: api/GRNs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GRN>> PostGRN(GRN gRN)
        {
          if (_context.GRNs == null)
          {
              return Problem("Entity set 'DataContext.GRNs'  is null.");
          }
            _context.GRNs.Add(gRN);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GRNExists(gRN.GrnId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGRN", new { id = gRN.GrnId }, gRN);
        }

        // DELETE: api/GRNs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGRN(string id)
        {
            if (_context.GRNs == null)
            {
                return NotFound();
            }
            var gRN = await _context.GRNs.FindAsync(id);
            if (gRN == null)
            {
                return NotFound();
            }

            _context.GRNs.Remove(gRN);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GRNExists(string id)
        {
            return (_context.GRNs?.Any(e => e.GrnId == id)).GetValueOrDefault();
        }
    }
}
