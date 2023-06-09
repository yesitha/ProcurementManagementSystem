using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceTobePaysController : ControllerBase
    {
        private readonly DataContext _context;

        public InvoiceTobePaysController(DataContext context)
        {
            _context = context;
        }

        // GET: api/InvoiceTobePays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceTobePay>>> GetInvoiceTobePays()
        {
            if (_context.InvoiceTobePays == null)
            {
                return NotFound();
            }
            return await _context.InvoiceTobePays.ToListAsync();
        }

        // GET: api/InvoiceTobePays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceTobePay>> GetInvoiceTobePay(string id)
        {
            if (_context.InvoiceTobePays == null)
            {
                return NotFound();
            }
            var invoiceTobePay = await _context.InvoiceTobePays.FindAsync(id);

            if (invoiceTobePay == null)
            {
                return NotFound();
            }

            return invoiceTobePay;
        }

        // PUT: api/InvoiceTobePays/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceTobePay(string id, InvoiceTobePay invoiceTobePay)
        {
            if (id != invoiceTobePay.InvoiceId)
            {
                return BadRequest();
            }

            _context.Entry(invoiceTobePay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceTobePayExists(id))
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

        // POST: api/InvoiceTobePays
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InvoiceTobePay>> PostInvoiceTobePay(InvoiceTobePay invoiceTobePay)
        {
            if (_context.InvoiceTobePays == null)
            {
                return Problem("Entity set 'DataContext.InvoiceTobePays'  is null.");
            }
            _context.InvoiceTobePays.Add(invoiceTobePay);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (InvoiceTobePayExists(invoiceTobePay.InvoiceId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetInvoiceTobePay", new { id = invoiceTobePay.InvoiceId }, invoiceTobePay);
        }

        // DELETE: api/InvoiceTobePays/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceTobePay(string id)
        {
            if (_context.InvoiceTobePays == null)
            {
                return NotFound();
            }
            var invoiceTobePay = await _context.InvoiceTobePays.FindAsync(id);
            if (invoiceTobePay == null)
            {
                return NotFound();
            }

            _context.InvoiceTobePays.Remove(invoiceTobePay);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceTobePayExists(string id)
        {
            return (_context.InvoiceTobePays?.Any(e => e.InvoiceId == id)).GetValueOrDefault();
        }
    }
}