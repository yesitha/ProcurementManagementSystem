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
    public class ItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public ItemsController(DataContext context)
        {
            _context = context;

            _mapper = mapper;
        }

        //// GET: api/GetTenderItemDetailsDTO/5
        [HttpGet("TenderItemDetails/{mppId}/{itemId}")]
        public async Task<ActionResult<IEnumerable<TenderItemDetailsDTO>>> GetTenderItemDetails(string mppId,
            string itemId)

        {
            var subProcurementPlans = await _context.SubProcurementPlans
                .Include(plan => plan.subProcurementPlanItems)
                .Where(plan => plan.MasterProcurementPlan.MppId == mppId)
                .ToListAsync();

            var totalQuantity = subProcurementPlans
                .SelectMany(plan => plan.subProcurementPlanItems)
                .Where(item => item.ItemId == itemId)

                .Sum(item => item.Quantity);


    
            var tenderItemDetails = new TenderItemDetailsDTO
            {
                ItemName = _context.Items.Find(itemId).ItemName,
                Quantity = totalQuantity,
                Specification = _context.Items.Find(itemId).Specification,
                expectedDeliveryDate = subProcurementPlans
                    .SelectMany(plan => plan.subProcurementPlanItems)
                    .Where(item => item.ItemId == itemId)
                    .Select(item => item.ExpectedDeliveryDate)
                    .OrderBy(date => date) // Sort the dates in ascending order
                    .FirstOrDefault()
            };

            return Ok(tenderItemDetails);
            
        }


        //// GET: api/GetTenderItemDetailsDTO/5
        [HttpGet("TenderItemsDetails/{mppId}")]
        public async Task<ActionResult<TenderItemDetailsDTO>> GetTenderItemsDetails(string mppId,
            string itemId)

        {



            return Ok();

        }






        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
          if (_context.Items == null)
          {
              return NotFound();
          }
            return await _context.Items.ToListAsync();
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(string id)
        {
          if (_context.Items == null)
          {
              return NotFound();
          }
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // PUT: api/Items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(string id, Item item)
        {
            if (id != item.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
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

        // POST: api/Items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
          if (_context.Items == null)
          {
              return Problem("Entity set 'DataContext.Items'  is null.");
          }
            _context.Items.Add(item);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemExists(item.ItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItem", new { id = item.ItemId }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(string id)
        {
            if (_context.Items == null)
            {
                return NotFound();
            }
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(string id)
        {
            return (_context.Items?.Any(e => e.ItemId == id)).GetValueOrDefault();
        }
    }
}
