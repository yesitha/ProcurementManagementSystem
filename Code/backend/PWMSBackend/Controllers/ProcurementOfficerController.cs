using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.CustomIdGenerator;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcurementOfficerController : ControllerBase
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private CommitteeIdGenerator _committeeIdGenerator;

        public ProcurementOfficerController(DataContext context, IMapper mapper, CommitteeIdGenerator committeeIdGenerator)
        {
            _context = context;
            _mapper = mapper;
            _committeeIdGenerator = committeeIdGenerator;
        }

        //Master Procurement Plan page Controllers (1-GET 2-POST)

        [HttpGet("GetMasterProcurementPlans")]
        public IActionResult GetMasterProcurementPlans()
        {
            var plans = _context.MasterProcurementPlans
                .Select(mpp => new
                {
                    mpp.MppId,
                    mpp.EstimatedGrandTotal,
                    mpp.CreationDate,
                })
                .ToList();

            return Ok(plans);
        }

        [HttpPost("CreateNewTECCommitteeID")]
        public IActionResult CreateNewTECCommittee(string mppId)
        {
            // Generate a new CommitteeId
            string committeeId = _committeeIdGenerator.GenerateCommitteeId();

            // Find the MasterProcurementPlan by the provided MppId
            var masterProcurementPlan = _context.MasterProcurementPlans.FirstOrDefault(m => m.MppId == mppId);
            if (masterProcurementPlan == null)
            {
                return BadRequest("Invalid MppId. MasterProcurementPlan not found.");
            }

            // Assign the generated CommitteeId to the TecCommitteeId property
            masterProcurementPlan.TecCommitteeId = committeeId;

            // Create a new Committee instance
            var committee = new Committee
            {
                CommitteeId = committeeId
            };

            _context.Committees.Add(committee);
            _context.SaveChanges();

            return Ok(committee.CommitteeId);
        }

        [HttpPost("CreateNewBidOpeningCommitteeID")]
        public IActionResult CreateNewBidOpeningCommittee(string mppId)
        {
            // Generate a new CommitteeId
            string committeeId = _committeeIdGenerator.GenerateCommitteeId();

            // Find the MasterProcurementPlan by the provided MppId
            var masterProcurementPlan = _context.MasterProcurementPlans.FirstOrDefault(m => m.MppId == mppId);
            if (masterProcurementPlan == null)
            {
                return BadRequest("Invalid MppId. MasterProcurementPlan not found.");
            }

            // Assign the generated CommitteeId to the TecCommitteeId property
            masterProcurementPlan.BidOpeningCommitteeId = committeeId;

            // Create a new Committee instance
            var committee = new Committee
            {
                CommitteeId = committeeId
            };

            _context.Committees.Add(committee);
            _context.SaveChanges();

            return Ok(committee.CommitteeId);
        }


        // View Master Procurement Plan page Controllers (2-GET)

        [HttpGet("GetMasterProcurementPlansIDList")]

        public IActionResult GetMasterProcurementPlansIDList()
        {
            var mppIdList = _context.MasterProcurementPlans
                .Select(mpp => mpp.MppId)
                .ToList();

            return Ok(mppIdList);
        }


        [HttpGet("GetSubProcurementPlanItemsByMppId/{mppId}")]
        public IActionResult GetSubProcurementPlanItemsByMppId(string mppId)
        {
            var subProcurementPlanItems = _context.SubProcurementPlanItems
                .Include(s => s.Item)
                .Include(s => s.SubProcurementPlan.HOD.Division)
                .Where(s => s.SubProcurementPlan.MasterProcurementPlan.MppId == mppId)
                .Select(s => new
                {
                    s.Item.ItemName,
                    s.Item.ItemId,
                    s.Item.Specification,
                    s.ExpectedDeliveryDate,
                    s.RecommendedVendor,
                    s.Quantity,
                    Division = s.SubProcurementPlan.HOD.Division.DivisionName
                    
                 })  
                .ToList();


            return Ok(subProcurementPlanItems);
        }

        // Create TEC Committee page controllers (1-GET 1-POST)

        [HttpGet("ProcurementEmployeeList")]
        public IActionResult GetProcurementEmployees()
        {
            var employees = _context.ProcurementEmployees
                .Include(e => e.Division)
                .Select(e => new
                {
                    e.EmployeeId,
                    e.EmployeeName,
                    DivisionName = e.Division.DivisionName
                })
                .ToList();

            return Ok(employees);
        }

        [HttpPost("AppointTECCommitteeMembers")]
        public IActionResult AppointTECCommitteeMembers(string mppId, List<string> employeeIds)
        {
            // Find the TecCommitteeId from the provided MppId
            var masterProcurementPlan = _context.MasterProcurementPlans
                .FirstOrDefault(m => m.MppId == mppId);

            if (masterProcurementPlan == null || masterProcurementPlan.TecCommitteeId == null)
            {
                return BadRequest("Invalid MppId. MasterProcurementPlan or TecCommittee not found.");
            }

            // Get the TecCommitteeId
            string tecCommitteeId = masterProcurementPlan.TecCommitteeId;

            // Update the CommitteeMemberCommittees table
            foreach (var employeeId in employeeIds)
            {
                var committeeMemberCommittee = new CommitteeMemberCommittee
                {
                    EmployeeId = employeeId,
                    CommitteeId = tecCommitteeId
                };

                _context.CommitteeMemberCommittees.Add(committeeMemberCommittee);
            }

            _context.SaveChanges();

            return Ok("TECCommittee members added successfully.");
        }


        // Create Bid opening Committee page controllers (1-GET(can get from TEC committee page) 1-POST)
        [HttpPost("AppointBidOpeningCommitteeMembers")]
        public IActionResult AppointBidOpeningCommitteeMembers(string mppId, List<string> employeeIds)
        {
            // Find the TecCommitteeId from the provided MppId
            var masterProcurementPlan = _context.MasterProcurementPlans
                .FirstOrDefault(m => m.MppId == mppId);

            if (masterProcurementPlan == null || masterProcurementPlan.BidOpeningCommitteeId == null)
            {
                return BadRequest("Invalid MppId. MasterProcurementPlan or BidOpeningCommittee not found.");
            }

            // Get the TecCommitteeId
            string bidOpeningCommitteeId = masterProcurementPlan.BidOpeningCommitteeId;

            // Update the CommitteeMemberCommittees table
            foreach (var employeeId in employeeIds)
            {
                var committeeMemberCommittee = new CommitteeMemberCommittee
                {
                    EmployeeId = employeeId,
                    CommitteeId = bidOpeningCommitteeId
                };

                _context.CommitteeMemberCommittees.Add(committeeMemberCommittee);
            }

            _context.SaveChanges();

            return Ok("BidOpeningCommittee members added successfully.");
        }


    }
}
