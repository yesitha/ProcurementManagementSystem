using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWMSBackend.CustomIdGenerator;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryManagerController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ItemIdGenerator _itemIdGenerator;

        public InventoryManagerController(DataContext context, IMapper mapper, ItemIdGenerator itemIdGenerator)
        {
            _context = context;
            _mapper = mapper;
            _itemIdGenerator = itemIdGenerator;
        }

        [HttpGet("GetStockDetails")]
        public IActionResult GetStockDetails()
        {
            var stockDetails = _context.ItemInStocks
                .Where(x => x.Itemtype == "Stock")
                .Select(x => new
                {
                    Date = x.Date != null ? x.Date : new System.DateTime(),
                    x.ItemId,
                    x.ItemName,
                    x.Specification,
                    UnitPrice = x.UnitPrice != null ? x.UnitPrice : 0,
                    QuantityAvailable = x.QuantityAvailable != null ? x.QuantityAvailable : 0,
                    TotalPurchasePrice = x.TotalPurchasePrice != null ? x.TotalPurchasePrice : 0,
                    TotalIssuePrice = x.TotalIssuePrice != null ? x.TotalIssuePrice : 0
                })
                .ToList();

            return Ok(stockDetails);
        }

        [HttpGet("GetAssetsDetails")]
        public IActionResult GetAssetsDetails()
        {
            var assetsDetails = _context.ItemInStocks
                .Where(x => x.Itemtype == "Assets")
                .Select(x => new
                {
                    Date = x.Date != null ? x.Date : new System.DateTime(),
                    x.ItemId,
                    x.ItemName,
                    x.Specification,
                    UnitPrice = x.UnitPrice != null ? x.UnitPrice : 0,
                    QuantityAvailable = x.QuantityAvailable != null ? x.QuantityAvailable : 0,
                    TotalPurchasePrice = x.TotalPurchasePrice != null ? x.TotalPurchasePrice : 0.0,
                    TotalIssuePrice = x.TotalIssuePrice != null ? x.TotalIssuePrice : 0.0
                })
                .ToList();

            return Ok(assetsDetails);
        }

        [HttpPost("AddItem")]
        public IActionResult AddItem(string itemName, string specification, string categoryId, string itemType)
        {
            string itemId = _itemIdGenerator.GenerateItemId();

            // Find the category with the provided categoryId
            var category = _context.Categories.FirstOrDefault(c => c.CategoryId == categoryId);

            if (category == null)
            {
                return BadRequest("Invalid CategoryId. Category not found.");
            }

            // Create a new instance of the Item class
            var newItem = new ItemInStock
            {
                ItemId = itemId,
                ItemName = itemName,
                Specification = specification,
                Category = category,
                Itemtype = itemType
            };

            // Add the new item to the database
            _context.Items.Add(newItem);
            _context.SaveChanges();

            // Return a response indicating success and the newly generated ItemId
            return Ok(newItem.ItemId);
        }

        [HttpGet("GetItemList")]
        public IActionResult GetItemList()
        {
            var itemList = _context.ItemInStocks
                .Select(x => new
                {
                    x.ItemId,
                    x.ItemName,
                    x.Specification,
                    x.Category.CategoryName
                })
                .ToList();

            return Ok(itemList);
        }


        [HttpPut("IssueItem")]
        public IActionResult IssueItem(string itemId, int quantityIssued)
        {
            // Find the item with the provided itemId
            var item = _context.ItemInStocks.FirstOrDefault(i => i.ItemId == itemId);

            if (item == null)
            {
                return BadRequest("Invalid ItemId. Item not found.");
            }

            // Check if the quantity requested is available
            if (item.QuantityAvailable < quantityIssued)
            {
                return BadRequest("Quantity requested is not available.");
            }

            // Update the quantity available
            item.QuantityAvailable -= quantityIssued;

            // Update the total issue price
            item.TotalIssuePrice += quantityIssued * item.UnitPrice;

            // Save the changes to the database
            _context.SaveChanges();

            // Return a response indicating success
            return Ok();
        }


    }
}
