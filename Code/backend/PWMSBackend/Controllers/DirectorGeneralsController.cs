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
    public class DirectorGeneralsController : ControllerBase
    {
        private readonly DataContext _context;

        public DirectorGeneralsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/DirectorGenerals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DirectorGeneral>>> GetDirectorGenerals()
        {
          if (_context.DirectorGenerals == null)
          {
              return NotFound();
          }
            return await _context.DirectorGenerals.ToListAsync();
        }

        // GET: api/DirectorGenerals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DirectorGeneral>> GetDirectorGeneral(string id)
        {
          if (_context.DirectorGenerals == null)
          {
              return NotFound();
          }
            var directorGeneral = await _context.DirectorGenerals.FindAsync(id);

            if (directorGeneral == null)
            {
                return NotFound();
            }

            return directorGeneral;
        }

        // PUT: api/DirectorGenerals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDirectorGeneral(string id, DirectorGeneral directorGeneral)
        {
            if (id != directorGeneral.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(directorGeneral).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DirectorGeneralExists(id))
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

        // POST: api/DirectorGenerals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DirectorGeneral>> PostDirectorGeneral(DirectorGeneral directorGeneral)
        {
          if (_context.DirectorGenerals == null)
          {
              return Problem("Entity set 'DataContext.DirectorGenerals'  is null.");
          }
            _context.DirectorGenerals.Add(directorGeneral);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DirectorGeneralExists(directorGeneral.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDirectorGeneral", new { id = directorGeneral.EmployeeId }, directorGeneral);
        }

        // DELETE: api/DirectorGenerals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDirectorGeneral(string id)
        {
            if (_context.DirectorGenerals == null)
            {
                return NotFound();
            }
            var directorGeneral = await _context.DirectorGenerals.FindAsync(id);
            if (directorGeneral == null)
            {
                return NotFound();
            }

            _context.DirectorGenerals.Remove(directorGeneral);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DirectorGeneralExists(string id)
        {
            return (_context.DirectorGenerals?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}
