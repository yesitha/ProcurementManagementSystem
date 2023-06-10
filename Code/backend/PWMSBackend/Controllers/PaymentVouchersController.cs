using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentVouchersController : ControllerBase
    {
        private readonly DataContext _context;

        public PaymentVouchersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PaymentVouchers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentVoucher>>> GetPaymentVouchers()
        {
            if (_context.PaymentVouchers == null)
            {
                return NotFound();
            }
            return await _context.PaymentVouchers.ToListAsync();
        }

        // GET: api/PaymentVouchers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentVoucher>> GetPaymentVoucher(string id)
        {
            if (_context.PaymentVouchers == null)
            {
                return NotFound();
            }
            var paymentVoucher = await _context.PaymentVouchers.FindAsync(id);

            if (paymentVoucher == null)
            {
                return NotFound();
            }

            return paymentVoucher;
        }

        // PUT: api/PaymentVouchers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentVoucher(string id, PaymentVoucher paymentVoucher)
        {
            if (id != paymentVoucher.PvId)
            {
                return BadRequest();
            }

            _context.Entry(paymentVoucher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentVoucherExists(id))
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

        // POST: api/PaymentVouchers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentVoucher>> PostPaymentVoucher(PaymentVoucher paymentVoucher)
        {
            if (_context.PaymentVouchers == null)
            {
                return Problem("Entity set 'DataContext.PaymentVouchers'  is null.");
            }
            _context.PaymentVouchers.Add(paymentVoucher);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PaymentVoucherExists(paymentVoucher.PvId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPaymentVoucher", new { id = paymentVoucher.PvId }, paymentVoucher);
        }

        // DELETE: api/PaymentVouchers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentVoucher(string id)
        {
            if (_context.PaymentVouchers == null)
            {
                return NotFound();
            }
            var paymentVoucher = await _context.PaymentVouchers.FindAsync(id);
            if (paymentVoucher == null)
            {
                return NotFound();
            }

            _context.PaymentVouchers.Remove(paymentVoucher);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentVoucherExists(string id)
        {
            return (_context.PaymentVouchers?.Any(e => e.PvId == id)).GetValueOrDefault();
        }
    }
}