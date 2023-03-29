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
    public class ProcurementCommitteesController : ControllerBase
    {
        private readonly DataContext _context;

        public ProcurementCommitteesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ProcurementCommittees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProcurementCommittee>>> GetProcurementCommittees()
        {
          if (_context.ProcurementCommittees == null)
          {
              return NotFound();
          }
            return await _context.ProcurementCommittees.ToListAsync();
        }

        // GET: api/ProcurementCommittees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProcurementCommittee>> GetProcurementCommittee(string id)
        {
          if (_context.ProcurementCommittees == null)
          {
              return NotFound();
          }
            var procurementCommittee = await _context.ProcurementCommittees.FindAsync(id);

            if (procurementCommittee == null)
            {
                return NotFound();
            }

            return procurementCommittee;
        }

        // PUT: api/ProcurementCommittees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcurementCommittee(string id, ProcurementCommittee procurementCommittee)
        {
            if (id != procurementCommittee.CommitteeId)
            {
                return BadRequest();
            }

            _context.Entry(procurementCommittee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcurementCommitteeExists(id))
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

        // POST: api/ProcurementCommittees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProcurementCommittee>> PostProcurementCommittee(ProcurementCommittee procurementCommittee)
        {
          if (_context.ProcurementCommittees == null)
          {
              return Problem("Entity set 'DataContext.ProcurementCommittees'  is null.");
          }
            _context.ProcurementCommittees.Add(procurementCommittee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProcurementCommitteeExists(procurementCommittee.CommitteeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProcurementCommittee", new { id = procurementCommittee.CommitteeId }, procurementCommittee);
        }

        // DELETE: api/ProcurementCommittees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcurementCommittee(string id)
        {
            if (_context.ProcurementCommittees == null)
            {
                return NotFound();
            }
            var procurementCommittee = await _context.ProcurementCommittees.FindAsync(id);
            if (procurementCommittee == null)
            {
                return NotFound();
            }

            _context.ProcurementCommittees.Remove(procurementCommittee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProcurementCommitteeExists(string id)
        {
            return (_context.ProcurementCommittees?.Any(e => e.CommitteeId == id)).GetValueOrDefault();
        }
    }
}
