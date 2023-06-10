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
    public class ProcurementEmployeesController : ControllerBase
    {
        private readonly DataContext _context;

        public ProcurementEmployeesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ProcurementEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProcurementEmployee>>> GetProcurementEmployees()
        {
          if (_context.ProcurementEmployees == null)
          {
              return NotFound();
          }
            return await _context.ProcurementEmployees.ToListAsync();
        }

        // GET: api/ProcurementEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProcurementEmployee>> GetProcurementEmployee(string id)
        {
          if (_context.ProcurementEmployees == null)
          {
              return NotFound();
          }
            var procurementEmployee = await _context.ProcurementEmployees.FindAsync(id);

            if (procurementEmployee == null)
            {
                return NotFound();
            }

            return procurementEmployee;
        }

        // PUT: api/ProcurementEmployees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcurementEmployee(string id, ProcurementEmployee procurementEmployee)
        {
            if (id != procurementEmployee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(procurementEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcurementEmployeeExists(id))
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

        // POST: api/ProcurementEmployees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProcurementEmployee>> PostProcurementEmployee(ProcurementEmployee procurementEmployee)
        {
          if (_context.ProcurementEmployees == null)
          {
              return Problem("Entity set 'DataContext.ProcurementEmployees'  is null.");
          }
            _context.ProcurementEmployees.Add(procurementEmployee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProcurementEmployeeExists(procurementEmployee.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProcurementEmployee", new { id = procurementEmployee.EmployeeId }, procurementEmployee);
        }

        // DELETE: api/ProcurementEmployees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcurementEmployee(string id)
        {
            if (_context.ProcurementEmployees == null)
            {
                return NotFound();
            }
            var procurementEmployee = await _context.ProcurementEmployees.FindAsync(id);
            if (procurementEmployee == null)
            {
                return NotFound();
            }

            _context.ProcurementEmployees.Remove(procurementEmployee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProcurementEmployeeExists(string id)
        {
            return (_context.ProcurementEmployees?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}
