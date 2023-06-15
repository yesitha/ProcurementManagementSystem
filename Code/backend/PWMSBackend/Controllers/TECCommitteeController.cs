using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWMSBackend.CustomIdGenerator;
using PWMSBackend.Data;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TECCommitteeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TECCommitteeController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // TEC Committee View MasterProcurementPlan page Controllers (1-GET)

        [HttpGet("GetMasterProcurementPlans")]
        public IActionResult GetMasterProcurementPlans()
        {
            var plans = _context.MasterProcurementPlans
                .Where(mpp=> mpp.TecCommitteeId != null)
                .Select(mpp => new
                {
                    mpp.MppId,
                    mpp.EstimatedGrandTotal,
                    mpp.CreationDate,
                })
                .ToList();

            return Ok(plans);
        }

        // TEC Committee Approval for MasterProcurementPlan page Controllers (2-GET)

        [HttpGet("GetMasterProcurementPlans{mppId}")]
        public IActionResult GetMasterProcurementPlan(string mppId)
        {
            var plan = _context.MasterProcurementPlans
                .FirstOrDefault(mpp => mpp.MppId == mppId);

            if (plan == null)
            {
                return NotFound("MasterProcurementPlan not found.");
            }

            var result = new
            {
                plan.EstimatedGrandTotal,
                plan.CreationDate,
            };

            return Ok(result);
        }



        [HttpGet("GetItemList/{mppId}")]
        public IActionResult GetItemList(string mppId)
        {
            var itemDetails = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.FirstOrDefault().Item.ItemName,
                    TotalQuantity = group.Sum(item => item.Quantity),
                    EstimatedBudget = group.Sum(item => item.EstimatedBudget)
                })
                .ToList();

            return Ok(itemDetails);
        }

        // Item Details page Controllers (1-GET 1-PUT)


        [HttpGet("GetItemDetails/{itemId}/{mppId}")]
        public IActionResult GetItemDetails(string itemId, string mppId)
        {
            var itemDetails = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ItemId == itemId)
                .Where(item => item.TecCommitteeStatus == null && item.ProcuremnetCommitteeStatus == null)
                .Select(item => new
                {
                    item.SppId,
                    DivisionName = item.SubProcurementPlan.HOD.Division.DivisionName,
                    item.Quantity,
                    item.Item.Specification,
                    RecommendedVendors = item.RecommendedVendor,
                    item.ExpectedDeliveryDate,
                    item.EvidenceOfAuthorization
                })
                .ToList();

            var creationDate = _context.MasterProcurementPlans
                 .Where(mpp => mpp.MppId == mppId)
                 .Select(mpp => mpp.CreationDate)
                 .FirstOrDefault();

            var itemName = _context.Items
                .Where(item => item.ItemId == itemId)
                .Select(item => item.ItemName)
                .FirstOrDefault();

            if (itemDetails == null || creationDate == default(DateTime))
            {
                return NotFound("Item or MppId not found.");
            }

            var result = new
            {
                ItemDetails = itemDetails,
                CreationDate = creationDate,
                ItemName = itemName
            };

            return Ok(result);
        }


        [HttpPut("UpdateTecCommitteeStatus")]
        public IActionResult UpdateTecCommitteeStatus(string sppId, string itemId, string tecCommitteeStatus, string tecCommitteeComment)
        {
            var subProcurementPlanItem = _context.SubProcurementPlanItems
                .FirstOrDefault(item => item.SppId == sppId && item.ItemId == itemId);

            if (subProcurementPlanItem == null)
            {
                return NotFound("SubProcurementPlanItem not found.");
            }

            // Update the properties
            subProcurementPlanItem.TecCommitteeStatus = tecCommitteeStatus;
            subProcurementPlanItem.TecCommitteeComment = tecCommitteeComment;

            _context.SaveChanges();

            return Ok("TecCommitteeStatus and TecCommitteeComment updated successfully.");
        }
        

    }
}
