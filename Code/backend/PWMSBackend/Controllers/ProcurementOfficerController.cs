using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.CustomIdGenerator;
using PWMSBackend.Data;
using PWMSBackend.Models;
using System.Drawing;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcurementOfficerController : ControllerBase
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private CommitteeIdGenerator _committeeIdGenerator;
        private POIdGenerator _poIdGenerator;
        private GRNIdGenerator _grnIdGenerator;
        public ProcurementOfficerController(DataContext context, IMapper mapper, CommitteeIdGenerator committeeIdGenerator, POIdGenerator poIdGenerator, GRNIdGenerator gRNIdGenerator)
        {
            _context = context;
            _mapper = mapper;
            _committeeIdGenerator = committeeIdGenerator;
            _poIdGenerator = poIdGenerator;
            _grnIdGenerator = gRNIdGenerator;
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
                .Where(e => !(e is HOD) && !(e is InternalAuditor) && !(e is DirectorGeneral))
                .Include(e => e.Division)
                .Select(e => new
                {
                    e.EmployeeId,
                    e.EmployeeName,
                    DivisionName = e.Division.DivisionName,
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
                .Where(e => !(e is HOD) && !(e is InternalAuditor) && !(e is DirectorGeneral))
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

            var closestDate = _context.SubProcurementApprovedItems.Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date <= currentDate)
                .OrderByDescending(a => a.PreBidMeetingDate.Value)
                .Select(a => a.PreBidMeetingDate.Value.Date)
                .FirstOrDefault();

            var items = await _context.SubProcurementApprovedItems
                .Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date == closestDate)
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
                                 quantity = planItem.Quantity,
                                 expectedDeliveryDate = planItem.ExpectedDeliveryDate,
                                 auctionOpeningDate = input.AuctionOpeningDate,
                                 auctionClosingDate = input.AuctionClosingDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         totalQuantity = group.Sum(x => x.quantity),
                                         expectedDeliveryDate = group.Select(x => x.expectedDeliveryDate).Distinct().Min(),
                                         auctionOpeningDate = group.Select(x => x.auctionOpeningDate).Distinct().FirstOrDefault(),
                                         auctionClosingDate = group.Select(x => x.auctionClosingDate).Distinct().FirstOrDefault()
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
                             auctionOpeningDate = input.auctionOpeningDate,
                             auctionClosingDate = input.auctionClosingDate
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
                             where vendor.DateAndTime >= input.auctionOpeningDate && vendor.DateAndTime <= input.auctionClosingDate
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

            var closestDate = _context.SubProcurementApprovedItems.Where(a => a.PreBidMeetingDate.HasValue && a.PreBidMeetingDate.Value.Date <= currentDate)
                .OrderByDescending(a => a.PreBidMeetingDate.Value)
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
                                 auctionOpeningDate = input.AuctionOpeningDate,
                                 auctionClosingDate = input.AuctionClosingDate
                             };

            //filter data by itemId and sum quantity

            var filteredData = joinedData.GroupBy(x => x.itemId)
                                     .Select(group => new
                                     {
                                         itemId = group.Key,
                                         auctionOpeningDate = group.Select(x => x.auctionOpeningDate).Distinct().FirstOrDefault(),
                                         auctionClosingDate = group.Select(x => x.auctionClosingDate).Distinct().FirstOrDefault()
                                     });

            //get item name and Specification
            var itemDetails = _context.Items.Where(item => itemId.Contains(item.ItemId))
                                            .Select(item => new { item.ItemId, item.ItemName })
                                            .ToList();

            var result = from input in filteredData
                         join itemDetail in itemDetails
                         on input.itemId equals itemDetail.ItemId
                         select new
                         {
                             itemId = input.itemId,
                             itemName = itemDetail.ItemName,
                             auctionOpeningDate = input.auctionOpeningDate,
                             auctionClosingDate = input.auctionClosingDate
                         };

            //get Bid details

            var bidValues = _context.VendorPlaceBidItems
                                .Where(vendor => vendor.ItemId == result.Select(x => x.itemId).FirstOrDefault())
                                .Where(vendor => vendor.DateAndTime >= result.Select(x => x.auctionOpeningDate).FirstOrDefault() && vendor.DateAndTime <= result.Select(x => x.auctionClosingDate).FirstOrDefault())
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

        // Audit reoprt

        [HttpGet("GetFinalizedMasterProcurementPlan/{mppId}")]
        public IActionResult GetFinalizedMasterProcurementPlan(string mppId)
        {
            var approvedItems = _context.MasterProcurementPlans
                    .Where(mpp => mpp.MppId == mppId)
                    .SelectMany(mpp => mpp.SubProcurementPlans)
                    .SelectMany(spp => spp.subProcurementPlanItems)
                    .Where(item => item.ProcuremnetCommitteeStatus == "approve")
                    .OrderBy(item => item.ItemId)
                    .GroupBy(item => item.ItemId) // Group the items by ItemId
                    .Select(group => new
                    {
                        ItemId = group.Key,
                        ItemName = group.First().Item.ItemName, // Use First() to retrieve the ItemName (assuming it's the same within the group)
                        Specification = group.First().Item.Specification, // Use First() to retrieve the Specification
                        Quantity = group.Sum(item => item.Quantity), // Calculate the sum of Quantity within the group
                        MinExpectedDeliveryDate = group.Min(item => item.ExpectedDeliveryDate), // Get the min expected Delivery Date within the group
                        SelectedVendor = group.First().SelectedVendor, // Use First() to retrieve the SelectedVendor (assuming it's the same within the group)
                        BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == _context.Vendors
                                                                            .Where(v => v.FirstName + " " + v.LastName == group.FirstOrDefault().SelectedVendor)
                                                                            .Select(v => v.VendorId)
                                                                            .FirstOrDefault()
                                                                      && vpb.ItemId == group.FirstOrDefault().ItemId)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),
                        SelectedVendorInfo = group.First().SelectedVendor != null ? new
                        {
                            vendorId = _context.Vendors
                                    .Where(v => v.FirstName + " " + v.LastName == group.First().SelectedVendor)
                                    .Select(v => v.VendorId)
                                    .FirstOrDefault(),
                            
                        } : null,
                        internalAuditorStatus = group.First().InternalAuditorStatus,
                        internalAuditorComment = group.First().InternalAuditorComment
                    })
                    .ToList();


            return Ok(approvedItems);
        }


        // Create PO vendor wise 

        [HttpGet("GetSelectedVendorList/{mppId}")]
        public IActionResult GetSelectedVendorList(string mppId)
        {
            var selectedVendorList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve")
                .GroupBy(item => item.ItemId)
                //.Select(group => new
                //{
                //    ItemId = group.Key,
                //    ItemName = group.First().Item.ItemName,
                //    TotalQuantity = group.Sum(item => item.Quantity),
                //    SelecetdVendor = group.Select(item => item.SelectedVendor).ToList()
                //})
                .Select(item => item.FirstOrDefault().SelectedVendor)
                .Distinct()
                .ToList();

            return Ok(selectedVendorList);
        }

        [HttpGet("GetVendorDetails/{vendorFullName}")]

        public IActionResult GetVendorDetails(string vendorFullName)
        {
            var vendorDetails = _context.Vendors
                .Where(vendor => vendor.FirstName + " " + vendor.LastName == vendorFullName)
                .Select(vendor => new
                {
                    vendor.VendorId,
                    address = vendor.Address1 + "," + vendor.State + "," + vendor.City
                })
                .FirstOrDefault();

            return Ok(vendorDetails);
        }

        [HttpGet("GetSelectedvendorListWithvendorDetails/{mppId}")]

        public IActionResult GetSelectedvendorListWithvendorDetails(string mppId)
        {
            var selectedVendorList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve")
                .GroupBy(item => item.ItemId)
                .Select(item => item.FirstOrDefault().SelectedVendor)
                .Distinct()
                .ToList();

            var vendorDetails = _context.Vendors
                .Where(vendor => selectedVendorList.Contains(vendor.FirstName + " " + vendor.LastName))
                .Select(vendor => new
                {
                    selectedVendorName = vendor.FirstName + " " + vendor.LastName,
                    vendor.VendorId,
                    address = vendor.Address1 + "," + vendor.State + "," + vendor.City
                })
                .ToList();

            return Ok(vendorDetails);
        }
        
        [HttpGet("GetApprovedItemDetailsforPO/{mppId}/{vendorId}")]
        public IActionResult GetApprovedItemDetailsforPO(string mppId, string vendorId)
        {
            var vendorFullName = _context.Vendors
                .Where(v => v.VendorId == vendorId)
                .Select(v => v.FirstName + " " + v.LastName)
                .FirstOrDefault();

            var selectedVendorList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve" && item.SelectedVendor == vendorFullName)
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.First().Item.ItemName,
                    Specifications = group.First().Item.Specification,
                    TotalQuantity = group.Sum(item => item.Quantity),
                    BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == _context.Vendors
                                                                            .Where(v => v.FirstName + " " + v.LastName == vendorFullName)
                                                                            .Select(v => v.VendorId)
                                                                            .FirstOrDefault()
                                                                      && vpb.ItemId == group.Key)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),
                })
                .ToList();

            return Ok(selectedVendorList);
        }

        [HttpPost("CreatePO/{mppId}/{vendorId}")]
        public IActionResult CreatePO(string mppId, string vendorId)
        {
            var purchaseOrder = _context.PurchaseOrders
                .FirstOrDefault(po => po.VendorId == vendorId && po.MppId == mppId);

            if (purchaseOrder != null)
            {
                return Ok(purchaseOrder.PoId); // Purchase Order found
            }

            var selectedVendorList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve"
                                && item.SelectedVendor == _context.Vendors
                                                                .Where(v => v.VendorId == vendorId)
                                                                .Select(v => v.FirstName + " " + v.LastName)
                                                                .FirstOrDefault())
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.First().Item.ItemName,
                    Specifications = group.First().Item.Specification,
                    TotalQuantity = group.Sum(item => item.Quantity),
                    BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == vendorId && vpb.ItemId == group.Key)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),
                })
                .ToList();

            double sumOfBidValue = selectedVendorList.Sum(item => item.BidValue);

            // Generate a new PoId
            string PoId = _poIdGenerator.GeneratePOId();


            // Create a new PurchaseOrder instance
            var PO = new PurchaseOrder
            {
                PoId = PoId,
                Date = DateTime.Now,
                TotalAmount = sumOfBidValue,
                VendorId = vendorId,
                MppId = mppId
            };

            _context.PurchaseOrders.Add(PO);
            _context.SaveChanges();

            return Ok(PO.PoId);
        }

        [HttpPost("CreateApprovedItemsPurchaseOrderRecords")]
        public IActionResult CreateApprovedItemsPurchaseOrderRecords(string PoId, List<string> itemIds)
        {
            // Retrieve the Purchase Order based on the provided PoId
            var purchaseOrder = _context.PurchaseOrders.FirstOrDefault(po => po.PoId == PoId);

            // Check if the Purchase Order exists
            if (purchaseOrder == null)
            {
                return BadRequest("Invalid PoId. Purchase Order not found.");
            }

            // Create a list to store the duplicate itemIds
            var duplicateItemIds = new List<string>();

            // Iterate through the list of ItemIds and create ApprovedItemPurchaseOrder records
            foreach (string itemId in itemIds)
            {
                // Check if the ApprovedItemPurchaseOrder record already exists
                bool recordExists = _context.ApprovedItemPurchaseOrders.Any(aipo =>
                    aipo.PoId == PoId && aipo.ItemId == itemId);

                if (recordExists)
                {
                    // Add the duplicate itemId to the list
                    duplicateItemIds.Add(itemId);
                    continue; // Skip to the next iteration
                }

                // Retrieve the Approved Item based on the ItemId
                var approvedItem = _context.Items.FirstOrDefault(item => item.ItemId == itemId);

                // Check if the Approved Item exists
                if (approvedItem == null)
                {
                    return BadRequest($"Invalid ItemId '{itemId}'. Approved Item not found.");
                }

                // Create a new ApprovedItemPurchaseOrder record
                var approvedItemPurchaseOrder = new ApprovedItemPurchaseOrder
                {
                    ItemId = itemId,
                    PoId = PoId
                };

                // Add the record to the context
                _context.ApprovedItemPurchaseOrders.Add(approvedItemPurchaseOrder);
            }

            // Save the changes to the database
            _context.SaveChanges();

            if (duplicateItemIds.Count > 0)
            {
                return BadRequest($"The following ItemIds are already associated with the Purchase Order '{PoId}': {string.Join(", ", duplicateItemIds)}");
            }

            return Ok("ApprovedItemPurchaseOrder records created successfully.");
        }


        [HttpGet("GetPOVendorDetails/{PoId}")]

        public IActionResult GetPOVendorDetails(string PoId)
        {
            var poVendorDetails = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => new
                {
                    po.PoId,
                    po.Date,
                    po.TotalAmount,
                    VendorFullName = po.Vendor.FirstName + " " + po.Vendor.LastName,
                    CompanyName = po.Vendor.CompanyFullName,
                    Contact = po.Vendor.EmailAddress,
                    address = po.Vendor.Address1 + "," + po.Vendor.State,
                    city = po.Vendor.City + "," + po.Vendor.PostalCode
                })
                .FirstOrDefault();

            return Ok(poVendorDetails);
        }

        [HttpGet("GetPOItemDetails/{mppId}/{vendorId}")]
        public IActionResult GetPOItemDetails(string mppId, string vendorId)
        {
            var itemList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve"
                                && item.SelectedVendor == _context.Vendors
                                                                .Where(v => v.VendorId == vendorId)
                                                                .Select(v => v.FirstName + " " + v.LastName)
                                                                .FirstOrDefault())
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.First().Item.ItemName,
                    Specifications = group.First().Item.Specification,
                    TotalQuantity = group.Sum(item => item.Quantity),
                    BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == vendorId && vpb.ItemId == group.Key)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),
                })
                .ToList();

            return Ok(itemList);
        }

        [HttpPut("AddComment")]
        public IActionResult AddComment(string poId, String comment)
        {
            var po = _context.PurchaseOrders
                .Where(po => po.PoId == poId)
                .FirstOrDefault();

            if (po == null)
            {
                return BadRequest("PO not found");
            }

            po.CommentsForSpecialInstruction = comment;

            _context.SaveChanges();

            return Ok("Add comment successfully");
        }

        //Evaluate vendor finance state page 

        [HttpGet("GetVendorFinanceStatedetails")]
        public IActionResult GetVendorFinanceStatedetails()
        {
            var vendorFinanceStateDetails = _context.PurchaseOrders
                .Where(po => po.ProcumentOfficerStatus != null)
                .Select(v => new
                {
                    v.PoId,
                    v.VendorId,
                    v.Agreement,
                    v.Bond,
                    v.BankGuarantee
                }) 
                .ToList();

            return Ok(vendorFinanceStateDetails);
                
        }

        [HttpPut("UpdateProcurementOfficerStatus/{vendorId}/{PoId}")]
        public IActionResult UpdateProcurementOfficerStatus(string vendorId, string PoId, string status)
        {
            var po = _context.PurchaseOrders
                .Where(po => po.PoId == PoId && po.VendorId == vendorId)
                .FirstOrDefault();

            if (po == null)
            {
                return BadRequest("PO not found");
            }

            po.ProcumentOfficerStatus = status;

            _context.SaveChanges();

            return Ok("Procurement Officer Status updated successfully");
        }

        // Create GRN

        [HttpGet("GetPOItemDetailsForGRN/{PoId}")]
        public IActionResult GetPOItemDetailsForGRN(string PoId)
        {
            var mppId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.MppId)
                .FirstOrDefault();

            var vendorId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.VendorId)
                .FirstOrDefault();

            var itemList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve"
                                && item.SelectedVendor == _context.Vendors
                                                                .Where(v => v.VendorId == vendorId)
                                                                .Select(v => v.FirstName + " " + v.LastName)
                                                                .FirstOrDefault())
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.First().Item.ItemName,
                    OrderedQuantity = group.Sum(item => item.Quantity)
                })
                .ToList();

            var itemList1= _context.PurchaseOrder_ItemTobeShippeds
                .Where(Ok => Ok.PoId == PoId)
                .Select(Ok => new
                {
                    Ok.ItemId,
                    Ok.Shipped_Qty
                })
                .ToList();
            
            var grnId = _context.GRNs
                .Where(grn => grn.PoId == PoId)
                .Select(grn => grn.GrnId)
                .ToList();

            //if (grnId == null)
            //{
            //    var combinedList0 = itemList.Join(itemList1,
            //           item => item.ItemId,
            //           item1 => item1.ItemId,
            //           (item, item1) => new
            //           {
            //               item.ItemId,
            //               item.ItemName,
            //               item.OrderedQuantity,
            //               item1.Shipped_Qty,
            //               ReceivedQuantity = 0
            //           })
            //            .ToList();

            //    return Ok(combinedList0);
            //}

            var itemList2 = _context.GRNItemsToBeShipped
                    .Where(grn => grnId.Contains(grn.GrnId))
                    .GroupBy(grn => grn.ItemId)
                    .Select(group => new
                    {
                        ItemId = group.Key,
                        Received_Qty = group.Sum(grn => grn.Received_Qty)
                    })
                    .ToList();


            var combinedList = from item in itemList
                               join orderItem in itemList1 on item.ItemId equals orderItem.ItemId into orderItems
                               from oi in orderItems.DefaultIfEmpty()
                               join grnItem in itemList2 on item.ItemId equals grnItem.ItemId into grnItems
                               from gi in grnItems.DefaultIfEmpty()
                               where item.OrderedQuantity > (gi?.Received_Qty ?? 0)
                               select new
                               {
                                   item.ItemId,
                                   item.ItemName,
                                   item.OrderedQuantity,
                                   ShippedQuantity = oi?.Shipped_Qty ?? 0,
                                   ReceivedQuantity = gi != null && item.ItemId == gi.ItemId ? gi.Received_Qty : 0
                               };

            // Convert the combined list to a final list
            var result = combinedList.ToList();

            return Ok(combinedList);
        }

        public class GRNItemInput
        {
            public string ItemId { get; set; }
            public int ReceivedQty { get; set; }
        }


        [HttpPost("CreateGRN")]
        public IActionResult CreateGRN(string poId, List<GRNItemInput> items)
        {
            //Generate GRN ID
            string grnId = _grnIdGenerator.GenerateGRNId();

            // Create the GRN record
            var grn = new GRN
            {
                GrnId = grnId,
                PoId = poId,
                Date = DateTime.Now,
                GRNItemTobeShippeds = new List<GRNItemTobeShipped>()
            };

            // Create GRNItemTobeShipped records for each item
            foreach (var item in items)
            {
                // Check if a GRNItemTobeShipped record with the same grnId and itemId already exists
                bool isDuplicate = _context.GRNItemsToBeShipped
                    .Any(g => g.GrnId == grnId && g.ItemId == item.ItemId);

                if (!isDuplicate)
                {
                    var grnItem = new GRNItemTobeShipped
                    {
                        GrnId = grnId,
                        ItemId = item.ItemId,
                        GRN = grn,
                        Received_Qty = item.ReceivedQty
                    };

                    grn.GRNItemTobeShippeds.Add(grnItem);
                }
            }

            // Save the GRN and associated GRNItemTobeShipped records to the database
            _context.GRNs.Add(grn);
            _context.SaveChanges();

            return Ok(grn.GrnId);
        }

        [HttpGet("GetGRNItemDetails/{PoId}/{grnId}")]
        public IActionResult GetGRNItemDetails(string PoId,string grnId)
        {
            var mppId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.MppId)
                .FirstOrDefault();

            var vendorId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.VendorId)
                .FirstOrDefault();

            var itemList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve"
                                && item.SelectedVendor == _context.Vendors
                                                                .Where(v => v.VendorId == vendorId)
                                                                .Select(v => v.FirstName + " " + v.LastName)
                                                                .FirstOrDefault())
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.First().Item.ItemName,
                    OrderedQuantity = group.Sum(item => item.Quantity)
                })
                .ToList();

            var itemList1 = _context.PurchaseOrder_ItemTobeShippeds
                .Where(Ok => Ok.PoId == PoId)
                .Select(Ok => new
                {
                    Ok.ItemId,
                    Ok.Shipped_Qty
                })
                .ToList();

            // Get total received quantity for each item

            var grnIdList = _context.GRNs
                .Where(grn => grn.PoId == PoId)
                .Select(grn => grn.GrnId)
                .ToList();

            var itemList0 = _context.GRNItemsToBeShipped
                    .Where(grn => grnIdList.Contains(grn.GrnId))
                    .GroupBy(grn => grn.ItemId)
                    .Select(group => new
                    {
                        ItemId = group.Key,
                        TotalReceived_Qty = group.Sum(grn => grn.Received_Qty)
                    })
                    .ToList();

            var itemList2 = _context.GRNItemsToBeShipped
                .Where(Ok => Ok.GrnId == grnId)
                .Select(Ok => new
                {
                    Ok.ItemId,
                    Ok.Received_Qty
                })
                .ToList();

            //var combinedList = itemList.Join(itemList1,
            //  item => item.ItemId,
            //  item1 => item1.ItemId,
            //  (item, item1) => new
            //  {
            //       item.ItemId,
            //       item.ItemName,
            //       item.OrderedQuantity,
            //       item1.Shipped_Qty
            //   })
            //    .Join(itemList2,
            //    item => item.ItemId,
            //    item2 => item2.ItemId,
            //    (item, item2) => new
            //   {
            //       item.ItemId,
            //       item.ItemName,
            //       item.OrderedQuantity,
            //       item.Shipped_Qty,
            //       item2.Received_Qty
            //   })
            //    .ToList();

            //var combinedList = from item in itemList
            //                   join orderItem in itemList1 on item.ItemId equals orderItem.ItemId into orderItems
            //                   from oi in orderItems.DefaultIfEmpty()
            //                   join grnItem in itemList2 on item.ItemId equals grnItem.ItemId into grnItems
            //                   from gi in grnItems.DefaultIfEmpty()
            //                   join grnItem0 in itemList0 on item.ItemId equals grnItem0.ItemId into grnItems0
            //                   from gi0 in grnItems0.DefaultIfEmpty()
            //                   select new
            //                   {
            //                       item.ItemId,
            //                       item.ItemName,
            //                       item.OrderedQuantity,
            //                       Shipped_Qty = oi?.Shipped_Qty ?? 0,
            //                       Received_Qty = gi?.Received_Qty ?? 0,
            //                       TotalReceived_Qty = gi0?.TotalReceived_Qty ?? 0
            //                   };


            var combinedList = from item in itemList
                               join orderItem in itemList1 on item.ItemId equals orderItem.ItemId into orderItems
                               from oi in orderItems.DefaultIfEmpty()
                               join grnItem in itemList2 on item.ItemId equals grnItem.ItemId into grnItems
                               from gi in grnItems.DefaultIfEmpty()
                               join grnItem0 in itemList0 on item.ItemId equals grnItem0.ItemId into grnItems0
                               from gi0 in grnItems0.DefaultIfEmpty()
                               where itemList2.Select(x => x.ItemId).Contains(item.ItemId)
                               select new
                               {
                                   item.ItemId,
                                   item.ItemName,
                                   item.OrderedQuantity,
                                   Shipped_Qty = oi?.Shipped_Qty ?? 0,
                                   Received_Qty = gi?.Received_Qty ?? 0,
                                   TotalReceived_Qty = gi0?.TotalReceived_Qty ?? 0
                               };

            var result = combinedList.ToList();



            var vendorName = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.Vendor.FirstName + " " + po.Vendor.LastName)
                .FirstOrDefault();

            var shippingDate = _context.GRNItemsToBeShipped
                .Where(grn => grn.GrnId == grnId)
                .Select(grn => grn.ShippingDate)
                .FirstOrDefault();

            return Ok(new { result, vendorName, shippingDate });
        }

        public class GRNItemComment
        {
            public string ItemId { get; set; }
            public string GRNComment { get; set; }
        }



        [HttpPut("UpdateGRNItemCommentAndCheckedBy/{grnId}")]
        public IActionResult UpdateGRNItemCommentAndCheckedBy(string grnId, List<GRNItemComment> inputs,string checkedBy)
        {
            // Find the GRN record by the provided grnId
            var grn = _context.GRNs.FirstOrDefault(g => g.GrnId == grnId);

            if (grn == null)
            {
                return NotFound("GRN not found.");
            }

            // Update the GRN properties
            grn.Checkedby = checkedBy;

            // Save the changes to the database
            _context.SaveChanges();

            foreach (var input in inputs)
            {
                // Find the GRNItemTobeShipped record by the provided grnId and itemId
                var grnItem = _context.GRNItemsToBeShipped.FirstOrDefault(gi => gi.GrnId == grnId && gi.ItemId == input.ItemId);

                if (grnItem != null)
                {
                    // Update the GRNItemTobeShipped properties
                    grnItem.GRNComment = input.GRNComment;
                }
            }

            // Save the changes to the database
            _context.SaveChanges();

            return Ok("GRN checkedBy and GRN items comment updated successfully.");
        }


        [HttpGet("InvoicesToBePay")]
        public IActionResult InvoicesToBePay()
        {
            // Retrieve the invoice details with total, tax, and payment status
            var invoiceDetails = _context.InvoiceTobePays
                    .Where(i => i.PaymentStatus == null)
                    .Join(
                        _context.GRNs,
                        invoice => invoice.GrnId,
                        grn => grn.GrnId,
                        (invoice, grn) => new { Invoice = invoice, GRN = grn }
                    )
                    .Join(
                        _context.PurchaseOrders,
                        joinResult => joinResult.GRN.PoId,
                        purchaseOrder => purchaseOrder.PoId,
                        (joinResult, purchaseOrder) => new { joinResult.Invoice, PurchaseOrder = purchaseOrder }
                    )
                    .Join(
                        _context.Vendors,
                        joinResult => joinResult.PurchaseOrder.VendorId,
                        vendor => vendor.VendorId,
                        (joinResult, vendor) => new
                        {
                            joinResult.Invoice.InvoiceId,
                            joinResult.Invoice.Total,
                            joinResult.Invoice.Tax,
                            VendorName = vendor.FirstName + " " + vendor.LastName
                        }
                    )
                    .ToList();

            return Ok(invoiceDetails);

        }

        [HttpGet("InvoicesPaid")]
        public IActionResult InvoicesPaid()
        {
            // Retrieve the invoice details with total, tax, and payment status
            var invoiceDetails = _context.InvoiceTobePays
                    .Where(i => i.PaymentStatus != null)
                    .Join(
                        _context.GRNs,
                        invoice => invoice.GrnId,
                        grn => grn.GrnId,
                        (invoice, grn) => new { Invoice = invoice, GRN = grn }
                    )
                    .Join(
                        _context.PurchaseOrders,
                        joinResult => joinResult.GRN.PoId,
                        purchaseOrder => purchaseOrder.PoId,
                        (joinResult, purchaseOrder) => new { joinResult.Invoice, PurchaseOrder = purchaseOrder }
                    )
                    .Join(
                        _context.Vendors,
                        joinResult => joinResult.PurchaseOrder.VendorId,
                        vendor => vendor.VendorId,
                        (joinResult, vendor) => new
                        {
                            joinResult.Invoice.InvoiceId,
                            joinResult.Invoice.Total,
                            joinResult.Invoice.Tax,
                            VendorName = vendor.FirstName + " " + vendor.LastName,
                            joinResult.Invoice.PaymentStatus
                        }
                    )
                    .ToList();

            return Ok(invoiceDetails);

        }




        [HttpGet("GetInvoiceDetails/{invoiceId}")]
        public async Task<IActionResult> GetInvoiceDetails(string invoiceId)
        {
            // Retrieve the invoice based on the provided invoiceId
            Invoice invoice = _context.Invoices.FirstOrDefault(i => i.InvoiceId == invoiceId);

            if (invoice == null)
            {
                return NotFound("Invoice not found for the given invoiceId.");
            }

            // Create a DTO object with only the required properties
            var invoiceDto = new
            {
                InvoiceId = invoice.InvoiceId,
                Date = invoice.Date,
                TotalAmount = invoice.Total,
                Tax = invoice.Tax,
            };

            var grnId = _context.Invoices
                .Where(i => i.InvoiceId == invoiceId)
                .Select(i => i.GrnId)
                .FirstOrDefault();


            var PoId = _context.GRNs
                .Where(grn => grn.GrnId == grnId)
                .Select(grn => grn.PoId)
                .FirstOrDefault();

            var mppId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.MppId)
                .FirstOrDefault();

            var vendorId = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => po.VendorId)
                .FirstOrDefault();

            var itemList = _context.MasterProcurementPlans
                .Where(mpp => mpp.MppId == mppId)
                .SelectMany(mpp => mpp.SubProcurementPlans)
                .SelectMany(spp => spp.subProcurementPlanItems)
                .Where(item => item.ProcuremnetCommitteeStatus == "approve" && item.DGStatus == "approve"
                                && item.SelectedVendor == _context.Vendors
                                                                .Where(v => v.VendorId == vendorId)
                                                                .Select(v => v.FirstName + " " + v.LastName)
                                                                .FirstOrDefault())
                .GroupBy(item => item.ItemId)
                .Select(group => new
                {
                    ItemId = group.Key,
                    ItemName = group.First().Item.ItemName,
                    Specification = group.First().Item.Specification,
                    OrderedQuantity = group.Sum(item => item.Quantity),
                    BidValue = _context.VendorPlaceBidItems
                                    .Where(vpb => vpb.Vendor.VendorId == vendorId && vpb.ItemId == group.Key)
                                    .Select(vpb => vpb.BidValue)
                                    .FirstOrDefault(),
                })
                .ToList();

            var itemList1 = _context.PurchaseOrder_ItemTobeShippeds
                .Where(Ok => Ok.PoId == PoId)
                .Select(Ok => new
                {
                    Ok.ItemId,
                    Ok.Shipped_Qty
                })
                .ToList();

            // Get total received quantity for each item

            var grnIdList = _context.GRNs
                .Where(grn => grn.PoId == PoId)
                .Select(grn => grn.GrnId)
                .ToList();

            var itemList0 = _context.GRNItemsToBeShipped
                    .Where(grn => grnIdList.Contains(grn.GrnId))
                    .GroupBy(grn => grn.ItemId)
                    .Select(group => new
                    {
                        ItemId = group.Key,
                        TotalReceived_Qty = group.Sum(grn => grn.Received_Qty)
                    })
                    .ToList();

            var itemList2 = _context.GRNItemsToBeShipped
                .Where(Ok => Ok.GrnId == grnId)
                .Select(Ok => new
                {
                    Ok.ItemId,
                    Ok.Received_Qty,
                    Ok.GRNComment
                })
                .ToList();


            var combinedList = from item in itemList
                               join orderItem in itemList1 on item.ItemId equals orderItem.ItemId into orderItems
                               from oi in orderItems.DefaultIfEmpty()
                               join grnItem in itemList2 on item.ItemId equals grnItem.ItemId into grnItems
                               from gi in grnItems.DefaultIfEmpty()
                               join grnItem0 in itemList0 on item.ItemId equals grnItem0.ItemId into grnItems0
                               from gi0 in grnItems0.DefaultIfEmpty()
                               where itemList2.Select(x => x.ItemId).Contains(item.ItemId)
                               select new
                               {
                                   item.ItemId,
                                   item.ItemName,
                                   item.Specification,
                                   item.OrderedQuantity,
                                   Shipped_Qty = oi?.Shipped_Qty ?? 0,
                                   Received_Qty = gi?.Received_Qty ?? 0,
                                   TotalReceived_Qty = gi0?.TotalReceived_Qty ?? 0,
                                   BidValue = item.BidValue,
                               };

            var result = combinedList.ToList();

            var vendorDetails = _context.PurchaseOrders
                .Where(po => po.PoId == PoId)
                .Select(po => new
                {
                    VendorName = po.Vendor.FirstName + " " + po.Vendor.LastName,
                    CompanyName = po.Vendor.CompanyFullName,
                    Contact = po.Vendor.EmailAddress,
                    address = po.Vendor.Address1 + "," + po.Vendor.State,
                    city = po.Vendor.City + "," + po.Vendor.PostalCode

                })
                .FirstOrDefault();

            return Ok(new { invoiceDto, vendorDetails, result });
        }

        [HttpPut("UpdateInvoicePaymentStatus")]
        public IActionResult UpdateInvoicePaymentStatus(string invoiceId)
        {
            // Retrieve the invoice based on the provided invoiceId
            InvoiceTobePay invoice = _context.InvoiceTobePays.FirstOrDefault(i => i.InvoiceId == invoiceId);

            if (invoice == null)
            {
                return NotFound("Invoice not found for the given Invoice ID.");
            }

            // Update the invoice details
            invoice.PaymentStatus = "pending";

            // Save the changes to the database
            _context.SaveChanges();

            return Ok("Invoice payment status updated successfully.");
        }

    }
}
