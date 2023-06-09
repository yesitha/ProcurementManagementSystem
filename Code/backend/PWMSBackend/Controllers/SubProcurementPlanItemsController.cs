using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubProcurementPlanItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public SubProcurementPlanItemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/SubProcurementPlanItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubProcurementPlanItem>>> GetSubProcurementPlanItems()
        {
            if (_context.SubProcurementPlanItems == null)
            {
                return NotFound();
            }
            return await _context.SubProcurementPlanItems.ToListAsync();
        }

        // GET: api/SubProcurementPlanItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubProcurementPlanItem>> GetSubProcurementPlanItem(string id)
        {
            if (_context.SubProcurementPlanItems == null)
            {
                return NotFound();
            }
            var subProcurementPlanItem = await _context.SubProcurementPlanItems.FindAsync(id);

            if (subProcurementPlanItem == null)
            {
                return NotFound();
            }

            return subProcurementPlanItem;
        }

        // PUT: api/SubProcurementPlanItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubProcurementPlanItem(string id, SubProcurementPlanItem subProcurementPlanItem)
        {
            if (id != subProcurementPlanItem.SppId)
            {
                return BadRequest();
            }

            _context.Entry(subProcurementPlanItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubProcurementPlanItemExists(id))
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

        // POST: api/SubProcurementPlanItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubProcurementPlanItem>> PostSubProcurementPlanItem(SubProcurementPlanItem subProcurementPlanItem)
        {
            if (_context.SubProcurementPlanItems == null)
            {
                return Problem("Entity set 'DataContext.SubProcurementPlanItems'  is null.");
            }
            _context.SubProcurementPlanItems.Add(subProcurementPlanItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SubProcurementPlanItemExists(subProcurementPlanItem.SppId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSubProcurementPlanItem", new { id = subProcurementPlanItem.SppId }, subProcurementPlanItem);
        }

        // DELETE: api/SubProcurementPlanItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubProcurementPlanItem(string id)
        {
            if (_context.SubProcurementPlanItems == null)
            {
                return NotFound();
            }
            var subProcurementPlanItem = await _context.SubProcurementPlanItems.FindAsync(id);
            if (subProcurementPlanItem == null)
            {
                return NotFound();
            }

            _context.SubProcurementPlanItems.Remove(subProcurementPlanItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubProcurementPlanItemExists(string id)
        {
            return (_context.SubProcurementPlanItems?.Any(e => e.SppId == id)).GetValueOrDefault();
        }
    }
}