using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.DTOs.Incoming;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DivisionHODController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DivisionHODController(DataContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }

        [HttpGet("sppIds/{hodId}")]
        public IActionResult GetSppIdsByHodId(string hodId)
        {
            List<string> sppIds = _context.SubProcurementPlans
                .Where(spp => spp.HOD.EmployeeId == hodId)
                .Select(spp => spp.SppId)
                .ToList();

            return Ok(sppIds);
        }

        [HttpGet("divisionName/{hodId}")]
        public IActionResult GetDivisionName(string hodId)
        {
            string divisionName = _context.Divisions
                .Where(division => division.HOD.EmployeeId == hodId)
                .Select(division => division.DivisionName)
                .FirstOrDefault();

            if (divisionName != null)
            {
                return Ok(divisionName);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("SubProcurementPlanItems/{sppId}")]
        public IActionResult GetSubProcurementPlanItem(string sppId)
        {
            var items = _context.SubProcurementPlanItems
                .Where(spi => spi.SppId == sppId)
                .Select(spi => new
                {
                    spi.Item.ItemId,
                    spi.Item.ItemName,
                    spi.Item.Specification,
                    spi.Quantity,
                    spi.ExpectedDeliveryDate,
                    spi.RecommendedVendor
                })
                .ToList();

            return Ok(items);
        }

        [HttpDelete("{itemId}")]
        public IActionResult DeleteItem(string itemId)
        {
            // Find the subprocurementplan item with the given ItemId
            var subProcurementPlanItem = _context.SubProcurementPlanItems.FirstOrDefault(item => item.ItemId == itemId);

            if (subProcurementPlanItem == null)
            {
                // Item not found, return an appropriate response
                return NotFound();
            }

            // Remove the subprocurementplan item from the context
            _context.SubProcurementPlanItems.Remove(subProcurementPlanItem);
            _context.SaveChanges();

            // Return a success response
            return Ok();
        }


        [HttpGet("ItemNameList")]
        public IActionResult GetItems()
        {
            var items = _context.Items
                .Select(item => new
                {
                    item.ItemId,
                    item.ItemName,
                    item.Specification
                })
                .ToList();

            return Ok(items);
        }


        [HttpPost("AddItemToSubProcurementPlan")]
        public IActionResult CreateSubProcurementPlanItem(CreateSubProcurementPlanItemDTO itemDto)
        {
            // Create a new SubProcurementPlanItem instance
            var newItem = new SubProcurementPlanItem
            {
                SppId = itemDto.SppId,
                ItemId = itemDto.ItemId,
                RecommendedVendor = itemDto.RecommendedVendor,
                EvidenceOfAuthorization = itemDto.EvidenceOfAuthorization,
                ExpectedDeliveryDate = itemDto.ExpectedDeliveryDate,
                EstimatedBudget = itemDto.EstimatedBudget,
                Quantity = itemDto.Quantity
            };

            // Add the new item to the context
            _context.SubProcurementPlanItems.Add(newItem);

            // Save changes to the database
            _context.SaveChanges();

            return Ok(newItem);
        }


        [HttpGet("CategoryNameList")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories
                .ToListAsync();

            var categoryList = categories.Select(c => new { CategoryId = c.CategoryId, CategoryName = c.CategoryName }).ToList();

            return Ok(categoryList);
        }

        [HttpPost]
        public IActionResult AddItem(string itemName, string specification, string categoryId)
        {
            // Create a new instance of the Item class
            var newItem = new Item
            {
                ItemName = itemName,
                Specification = specification
            };

            // Set the Category reference using the provided categoryId
            Category category = _context.Categories.FirstOrDefault(c => c.CategoryId == categoryId);
            newItem.Category = category;

            // Add the new item to the database
            _context.Items.Add(newItem);
            _context.SaveChanges();

            // Return a response indicating success and the newly generated ItemId
            return Ok(newItem.ItemId);
        }


    }
}
