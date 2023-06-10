using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HODsController : ControllerBase
    {
        private readonly DataContext _context;

        public HODsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/HODs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HOD>>> GetHODs()
        {
            if (_context.HODs == null)
            {
                return NotFound();
            }
            return await _context.HODs.ToListAsync();
        }

        // GET: api/HODs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HOD>> GetHOD(string id)
        {
            if (_context.HODs == null)
            {
                return NotFound();
            }
            var hOD = await _context.HODs.FindAsync(id);

            if (hOD == null)
            {
                return NotFound();
            }

            return hOD;
        }

        // PUT: api/HODs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHOD(string id, HOD hOD)
        {
            if (id != hOD.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(hOD).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HODExists(id))
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

        // POST: api/HODs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HOD>> PostHOD(HOD hOD)
        {
            if (_context.HODs == null)
            {
                return Problem("Entity set 'DataContext.HODs'  is null.");
            }
            _context.HODs.Add(hOD);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (HODExists(hOD.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHOD", new { id = hOD.EmployeeId }, hOD);
        }

        // DELETE: api/HODs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHOD(string id)
        {
            if (_context.HODs == null)
            {
                return NotFound();
            }
            var hOD = await _context.HODs.FindAsync(id);
            if (hOD == null)
            {
                return NotFound();
            }

            _context.HODs.Remove(hOD);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HODExists(string id)
        {
            return (_context.HODs?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}