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

            // Find the MasterProcurementPlan by the provided MppId
            var masterProcurementPlan = _context.MasterProcurementPlans.FirstOrDefault(m => m.MppId == mppId);
            if (masterProcurementPlan == null)
            {
                return BadRequest("Invalid MppId. MasterProcurementPlan not found.");
            }

            // Check if a TecCommitteeId is already assigned
            if (!string.IsNullOrEmpty(masterProcurementPlan.TecCommitteeId))
            {
                return BadRequest("TEC Committee already created for this MasterProcurementPlan.");
            }

            // Generate a new CommitteeId
            string committeeId = _committeeIdGenerator.GenerateCommitteeId();

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

            // Find the MasterProcurementPlan by the provided MppId
            var masterProcurementPlan = _context.MasterProcurementPlans.FirstOrDefault(m => m.MppId == mppId);
            if (masterProcurementPlan == null)
            {
                return BadRequest("Invalid MppId. MasterProcurementPlan not found.");
            }

            // Check if a TecCommitteeId is already assigned
            if (!string.IsNullOrEmpty(masterProcurementPlan.BidOpeningCommitteeId))
            {
                return BadRequest("BidOpening Committee already created for this MasterProcurementPlan.");
            }

            // Generate a new CommitteeId
            string committeeId = _committeeIdGenerator.GenerateCommitteeId();

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

        //Modify TEC Committee page controllers (1-GET 1-POST)

        [HttpGet("GetEmployeesInTECCommittee/{mppId}")]
        public IActionResult GetEmployeesInTECCommittee(string mppId)
        {
            // Retrieve the TecCommitteeId from the MasterProcurementPlan
            var tecCommitteeId = _context.MasterProcurementPlans
                .Where(m => m.MppId == mppId)
                .Select(m => m.TecCommitteeId)
                .FirstOrDefault();

            if (tecCommitteeId == null)
            {
                // TecCommitteeId for the provided MppId does not exist
                return NotFound();
            }

            // Retrieve the list of employee IDs in the TEC Committee
            var tecCommitteeEmployeeIds = _context.CommitteeMemberCommittees
                .Where(c => c.CommitteeId == tecCommitteeId)
                .Select(c => c.EmployeeId)
                .ToList();

            // Retrieve the employees in the TEC Committee and their division information
            var employeesInTECCommittee = _context.ProcurementEmployees
                .Where(e => tecCommitteeEmployeeIds.Contains(e.EmployeeId))
                .Select(e => new
                {
                    e.EmployeeId,
                    e.EmployeeName,
                    DivisionName = e.Division.DivisionName
                })
                .ToList();

            // Retrieve all employees and their division information
            var allEmployees = _context.ProcurementEmployees
                .Include(e => e.Division)
                .Select(e => new
                {
                    e.EmployeeId,
                    e.EmployeeName,
                    DivisionName = e.Division.DivisionName
                })
                .ToList();

            // Determine the other employees (not in the TEC Committee)
            var otherEmployees = allEmployees
                .Where(e => !tecCommitteeEmployeeIds.Contains(e.EmployeeId))
                .ToList();

            // Prepare the response data
            var response = new
            {
                EmployeesInTECCommittee = employeesInTECCommittee,
                OtherEmployees = otherEmployees
            };

            return Ok(response);
        }


        [HttpPost("ModifyTECCommitteeMembers/{mppId}")]
        public IActionResult ModifyTECCommitteeMembers(string mppId, List<string> employeeIds)
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

            // Retrieve the existing employeeIds in the TecCommittee
            var existingEmployeeIds = _context.CommitteeMemberCommittees
                .Where(c => c.CommitteeId == tecCommitteeId)
                .Select(c => c.EmployeeId)
                .ToList();

            // Remove employees who are not in the new list from the TecCommittee
            var employeesToRemove = existingEmployeeIds.Except(employeeIds).ToList();
            var committeeMembersToRemove = _context.CommitteeMemberCommittees
                .Where(c => c.CommitteeId == tecCommitteeId && employeesToRemove.Contains(c.EmployeeId))
                .ToList();

            _context.CommitteeMemberCommittees.RemoveRange(committeeMembersToRemove);

            // Add employees who are not in the existing list to the TecCommittee
            var employeesToAdd = employeeIds.Except(existingEmployeeIds).ToList();
            foreach (var employeeId in employeesToAdd)
            {
                var committeeMemberCommittee = new CommitteeMemberCommittee
                {
                    EmployeeId = employeeId,
                    CommitteeId = tecCommitteeId
                };

                _context.CommitteeMemberCommittees.Add(committeeMemberCommittee);
            }

            _context.SaveChanges();

            return Ok("TECCommittee members updated successfully.");
        }

        //Modify BidOpening Committee page controllers (1-GET 1-POST)

        [HttpGet("GetEmployeesInBidOpeningCommittee/{mppId}")]
        public IActionResult GetEmployeesInBidOpeningCommittee(string mppId)
        {
            // Retrieve the BidOpeningCommitteeId from the MasterProcurementPlan
            var bidOpeningCommitteeId = _context.MasterProcurementPlans
                .Where(m => m.MppId == mppId)
                .Select(m => m.BidOpeningCommitteeId)
                .FirstOrDefault();

            if (bidOpeningCommitteeId == null)
            {
                // BidOpeningCommitteeId for the provided MppId does not exist
                return NotFound();
            }

            // Retrieve the list of employee IDs in the TEC Committee
            var bidOpeningCommitteeEmployeeIds = _context.CommitteeMemberCommittees
                .Where(c => c.CommitteeId == bidOpeningCommitteeId)
                .Select(c => c.EmployeeId)
                .ToList();

            // Retrieve the employees in the BidOpening Committee and their division information
            var employeesInBidOpeningCommittee = _context.ProcurementEmployees
                .Where(e => bidOpeningCommitteeEmployeeIds.Contains(e.EmployeeId))
                .Select(e => new
                {
                    e.EmployeeId,
                    e.EmployeeName,
                    DivisionName = e.Division.DivisionName
                })
                .ToList();

            // Retrieve all employees and their division information
            var allEmployees = _context.ProcurementEmployees
                .Include(e => e.Division)
                .Select(e => new
                {
                    e.EmployeeId,
                    e.EmployeeName,
                    DivisionName = e.Division.DivisionName
                })
                .ToList();

            // Determine the other employees (not in the TEC Committee)
            var otherEmployees = allEmployees
                .Where(e => !bidOpeningCommitteeEmployeeIds.Contains(e.EmployeeId))
                .ToList();

            // Prepare the response data
            var response = new
            {
                EmployeesInBidOpeningCommittee = employeesInBidOpeningCommittee,
                OtherEmployees = otherEmployees
            };

            return Ok(response);
        }


        [HttpPost("ModifyBidOpeningCommitteeMembers/{mppId}")]
        public IActionResult ModifyBidOpeningCommitteeMembers(string mppId, List<string> employeeIds)
        {
            // Find the BidOpeningCommitteeId from the provided MppId
            var masterProcurementPlan = _context.MasterProcurementPlans
                .FirstOrDefault(m => m.MppId == mppId);

            if (masterProcurementPlan == null || masterProcurementPlan.BidOpeningCommitteeId == null)
            {
                return BadRequest("Invalid MppId. MasterProcurementPlan or BidOpeningCommittee not found.");
            }

            // Get the BidOpeningCommitteeId
            string bidOpeningCommitteeId = masterProcurementPlan.BidOpeningCommitteeId;

            // Retrieve the existing employeeIds in the TecCommittee
            var existingEmployeeIds = _context.CommitteeMemberCommittees
                .Where(c => c.CommitteeId == bidOpeningCommitteeId)
                .Select(c => c.EmployeeId)
                .ToList();

            // Remove employees who are not in the new list from the TecCommittee
            var employeesToRemove = existingEmployeeIds.Except(employeeIds).ToList();
            var committeeMembersToRemove = _context.CommitteeMemberCommittees
                .Where(c => c.CommitteeId == bidOpeningCommitteeId && employeesToRemove.Contains(c.EmployeeId))
                .ToList();

            _context.CommitteeMemberCommittees.RemoveRange(committeeMembersToRemove);

            // Add employees who are not in the existing list to the BidOpeningCommittee
            var employeesToAdd = employeeIds.Except(existingEmployeeIds).ToList();
            foreach (var employeeId in employeesToAdd)
            {
                var committeeMemberCommittee = new CommitteeMemberCommittee
                {
                    EmployeeId = employeeId,
                    CommitteeId = bidOpeningCommitteeId
                };

                _context.CommitteeMemberCommittees.Add(committeeMemberCommittee);
            }

            _context.SaveChanges();

            return Ok("BidOpeningCommittee members updated successfully.");
        }

        // Set pre bid meeting date (1-POST)

        [HttpPost("SetPreBidMeetingDate")]
        public IActionResult SetPreBidMeetingDate([FromBody] DateTime date)
        {
            // Retrieve the SubProcurementApprovedItems where PreBidMeetingDate is null
            var items = _context.SubProcurementApprovedItems
                .Where(item => item.PreBidMeetingDate == null)
                .ToList();

            // Set PreBidMeetingDate for each item
            foreach (var item in items)
            {
                item.PreBidMeetingDate = date;
            }

            // Save the changes to the database
            _context.SaveChanges();

            return Ok();
        }

        // Bid Details

        [HttpGet("GetBidDetails")]
        public async Task<ActionResult<IEnumerable<object>>> GetBidDetails()
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date >= currentDate)
                .OrderBy(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value.Date)
                .FirstOrDefault();

            var items = await _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == closestDate)
                .Select(a => new { a.SppId, a.ItemId, a.AuctionOpeningDate, a.AuctionClosingDate})
                .ToListAsync();

            if (items == null)
            {
                return NotFound();
            }

            //join sppId and itemId from SubProcurementPlanItems and SubProcurementApprovedItems

            var joinedData = from input in items
                             join planItem in _context.SubProcurementPlanItems
                             on new { input.SppId, input.ItemId } equals new { planItem.SppId, planItem.ItemId }
                             select new
                             {
                                 sppId = input.SppId,
                                 itemId = input.ItemId,
                                 quantity = planItem.Quantity,
                                 expectedDeliveryDate = planItem.ExpectedDeliveryDate,
                                 actionOpeningDate = input.AuctionOpeningDate,
                                 actionClosingDate = input.AuctionClosingDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         totalQuantity = group.Sum(x => x.quantity),
                                         expectedDeliveryDate = group.Select(x => x.expectedDeliveryDate).Distinct().Min(),
                                         actionOpeningDate = group.Select(x => x.actionOpeningDate).Distinct().FirstOrDefault(),
                                         actionClosingDate = group.Select(x => x.actionClosingDate).Distinct().FirstOrDefault()
                                     });

            //get item names

            var itemIds = filteredData.Select(x => x.itemId).Distinct().ToList();
            var itemDetails = _context.Items.Where(item => itemIds.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName, item.Specification })
                                            .ToList();

            var result = from input in filteredData
                         join itemDetail in itemDetails
                         on input.itemId equals itemDetail.ItemId
                         select new
                         {
                             itemId = input.itemId,
                             itemName = itemDetail.ItemName,
                             Specification = itemDetail.Specification,
                             totalQuantity = input.totalQuantity,
                             expectedDeliveryDate = input.expectedDeliveryDate,
                             actionOpeningDate = input.actionOpeningDate,
                             actionClosingDate = input.actionClosingDate
                         };

            //get Bid details

            //var bidDetails = _context.VendorPlaceBidItems
            //                                 .Where(vendor => itemIds.Contains(vendor.ItemId))
            //                                 .GroupBy(vendor => vendor.ItemId)
            //                                 .Select(group => new
            //                                 {
            //                                     itemId = group.Key,
            //                                     bidValues = group.Select(vendor => vendor.BidValue).ToList()
            //                                 })
            //                                 .ToList();

            var bidDetails = from input in result
                             join vendor in _context.VendorPlaceBidItems
                             on input.itemId equals vendor.ItemId
                             where vendor.DateAndTime >= input.actionOpeningDate && vendor.DateAndTime <= input.actionClosingDate
                             group vendor by vendor.ItemId into g
                             select new
                             {
                                 itemId = g.Key,
                                 bidValues = g.Select(v => v.BidValue).ToList()
                             };

            var result2 = from input in result
                          join bidDetail in bidDetails
                          on input.itemId equals bidDetail.itemId into gj
                          from vendor in gj.DefaultIfEmpty()
                          let bidValuesCount = vendor?.bidValues.Count ?? 0
                          let minBidValue = vendor?.bidValues.Min()
                          select new
                          {
                              itemId = input.itemId,
                              itemName = input.itemName,
                              Specification = input.Specification,
                              totalQuantity = input.totalQuantity,
                              expectedDeliveryDate = input.expectedDeliveryDate,
                              minBidValue = minBidValue,
                              bidValuesCount = bidValuesCount
                          };

            return Ok(result2);
        }


        [HttpGet("GetItemBidDetails/{itemId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetItemBidDetails(string itemId)
        {
            DateTime currentDate = DateTime.Today;

            var closestDate = _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date >= currentDate)
                .OrderBy(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value.Date)
                .FirstOrDefault();

            var items = await _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == closestDate)
                .Where(a => a.ItemId == itemId)
                .Select(a => new { a.SppId, a.ItemId, a.AuctionOpeningDate, a.AuctionClosingDate })
                .ToListAsync();

            if (items == null)
            {
                return NotFound();
            }

            //join sppId and itemId from SubProcurementPlanItems and SubProcurementApprovedItems

            var joinedData = from input in items
                             join planItem in _context.SubProcurementPlanItems
                             on new { input.SppId, input.ItemId } equals new { planItem.SppId, planItem.ItemId }
                             select new
                             {
                                 sppId = input.SppId,
                                 itemId = input.ItemId,
                                 actionOpeningDate = input.AuctionOpeningDate,
                                 actionClosingDate = input.AuctionClosingDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         actionOpeningDate = group.Select(x => x.actionOpeningDate).Distinct().FirstOrDefault(),
                                         actionClosingDate = group.Select(x => x.actionClosingDate).Distinct().FirstOrDefault()
                                     });

            //get item name and Specification
            var itemDetails = _context.Items.Where(item => itemId.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName})
                                            .ToList();

            var result = from input in filteredData
                         join itemDetail in itemDetails
                         on input.itemId equals itemDetail.ItemId
                         select new
                         {
                             itemId = input.itemId,
                             itemName = itemDetail.ItemName,
                             actionOpeningDate = input.actionOpeningDate,
                             actionClosingDate = input.actionClosingDate
                         };

            //get Bid details

            var bidValues = _context.VendorPlaceBidItems
                                .Where(vendor => vendor.ItemId == result.Select(x=> x.itemId).FirstOrDefault())
                                .Where(vendor => vendor.DateAndTime >= result.Select(x => x.actionOpeningDate).FirstOrDefault() && vendor.DateAndTime <= result.Select(x => x.actionClosingDate).FirstOrDefault())
                                .Select(vendor => new 
                                    { 
                                        vendor.BidValue,
                                        vendor.DateAndTime,
                                        VendorFullName = vendor.Vendor.FirstName + " " + vendor.Vendor.LastName
                                })
                                .ToList();

            var output = new
            {
                bidValues = bidValues,
                itemName = result.Select(x => x.itemName).FirstOrDefault()
            };

            return Ok(output);
        }


    }
}
