using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        public class LoginModel
        {
            public string email { get; set; }
            public string Password { get; set; }
        }


        [HttpPost("/api/login")]
        //public IActionResult Login([FromBody] LoginModel loginModel)
        //{
        //    // Retrieve the username and password from the request body
        //    var username = loginModel.Username;
        //    var password = loginModel.Password;

        //    // Verify the username and password
        //    if (IsValidCredentials(username, password))
        //    {
        //        // Credentials are valid, perform login logic here
        //        // Return a response indicating successful login
        //        return Ok(new { message = "Login successful" });
        //    }
        //    else
        //    {
        //        // Credentials are invalid, return an error response
        //        return Unauthorized(new { message = "Invalid username or password" });
        //    }
        //}

        //private bool IsValidCredentials(string username, string password)
        //{
        //    // Implement your logic to validate the username and password
        //    // You may check against a database, compare hashed passwords, etc.
        //    // Return true if the credentials are valid, otherwise false
        //    // Example implementation:
        //    return (username == "valid_username" && password == "valid_password");
        //}





        //[HttpGet("UserLogin/{email}/{password}")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var user =  _context.ProcurementEmployees
                .Where(u => u.EmailAddress == loginModel.email)
                .FirstOrDefault();

            if (user == null)
            {
                var user2 = _context.Vendors
                    .Where(u => u.EmailAddress == loginModel.email)
                    .FirstOrDefault();

                if (user2 == null)
                {
                    return NotFound("User Name incorrect");
                }

                bool isPasswordValid1 = (loginModel.Password == user2.Password);

                if (isPasswordValid1)
                {
                    return Ok(new
                    {
                        ID = user2.VendorId,
                        Name =  user2.FirstName + " " + user2.LastName,
                        Email = user2.EmailAddress,
                        Salutation = user2.Salutation,
                        UserType = "Vendor",
                        Designation = "Vendor",
                        Department = ""
                    });
                }
            }

            // Perform password comparison using a secure hashing algorithm
            // For example, using bcrypt:
            bool isPasswordValid = (loginModel.Password == user.Password);

            if (isPasswordValid)
            {
                var committee =  _context.CommitteeMemberCommittees
                    .Where(cmc => cmc.EmployeeId == user.EmployeeId)
                    .FirstOrDefault();

                string committeeType = "ProcurementEmployee";

                if (committee != null)
                {
                    var masterProcurementPlan = _context.MasterProcurementPlans
                        .Where(c =>
                                    c.TecCommitteeId == committee.CommitteeId ||
                                    c.BidOpeningCommitteeId == committee.CommitteeId ||
                                    c.ProcurementCommittee.CommitteeId == committee.CommitteeId)
                        .FirstOrDefault();

                    if (masterProcurementPlan != null)
                    {
                        if (masterProcurementPlan.TecCommitteeId == committee.CommitteeId)
                            committeeType = "TecCommittee";
                        else if (masterProcurementPlan.BidOpeningCommitteeId == committee.CommitteeId)
                            committeeType = "BidOpeningCommittee";
                        else
                            committeeType = "ProcurementCommittee";
                    }
                }

                switch (user.EmployeeId)
                {
                    case "EMP00001":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "PurchaseDivisionHOD",
                            Designation = "Head of Purchasing Division",
                            Department = "Purchasing"
                        });
                    case "EMP00002":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "ProcurementOfficer",
                            Designation = "Head of Finance Division",
                            Department = "Finance"
                        });
                    case "EMP00003":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "InternalAuditor",
                            Designation = "Internal Auditor",
                            Department = "PUCSL"
                        });
                    case "EMP00004":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "DirectorGeneral",
                            Designation = "Director General",
                            Department = "PUCSL"
                        });
                    case "EMP00005":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "FinanceDivisionAccountant",
                            Designation = "Finance Accountant",
                            Department = "Finance"
                        });
                    case "EMP00006":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "InventoryManager",
                            Designation = "Inventory Manager",
                            Department = "Finance"
                        });
                    case "EMP00007":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "HOD",
                            Designation = "Head of Marketing Division",
                            Department = "Marketing"
                        });
                    case "EMP00008":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "HOD",
                            Designation = "Head of IT Division",
                            Department = "IT"
                        });
                    case "EMP00009":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "HOD",
                            Designation = "Head of Sales Division",
                            Department = "Sales"
                        });
                    case "EMP00010":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "HOD",
                            Designation = "Head of Operations Division",
                            Department = "Operations"
                        });
                    case "EMP00011":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "HOD",
                            Designation = "Head of HR Division",
                            Department = "HR"
                        });
                    case "EMP00012":
                        return Ok(new
                        {
                            ID = user.EmployeeId,
                            Name = user.EmployeeName,
                            Email = user.EmailAddress,
                            Salutation = user.Salutation,
                            UserType = "CoparateCommunicationDivision",
                            Designation = "Corporate Committee Member",
                            Department = "PUCSL"
                        });
                    default:
                        if (committeeType == "ProcurementEmployee")
                        {
                            return Ok(new
                            {
                                ID = user.EmployeeId,
                                Name = user.EmployeeName,
                                Email = user.EmailAddress,
                                Salutation = user.Salutation,
                                UserType = "ProcurementEmployee",
                                Designation = "Procurement Employee",
                                Department = "PUCSL"
                            });
                        }
                        else if (committeeType == "TecCommittee")
                        {
                            return Ok(new
                            {
                                ID = user.EmployeeId,
                                Name = user.EmployeeName,
                                Email = user.EmailAddress,
                                Salutation = user.Salutation,
                                UserType = "TecCommitteeMember",
                                Designation = "Technical Committee Member",
                                Department = "PUCSL"
                            });
                        }
                        else if (committeeType == "BidOpeningCommittee")
                        {
                            return Ok(new
                            {
                                ID = user.EmployeeId,
                                Name = user.EmployeeName,
                                Email = user.EmailAddress,
                                Salutation = user.Salutation,
                                UserType = "BidOpeningCommittee",
                                Designation = "Bid Opening Committee Member",
                                Department = "PUCSL"
                            });
                        }
                        else
                        {
                            return Ok(new
                            {
                                ID = user.EmployeeId,
                                Name = user.EmployeeName,
                                Email = user.EmailAddress,
                                Salutation = user.Salutation,
                                UserType = "ProcurementCommittee",
                                Designation = "Procurement Committee Member",
                                Department = "PUCSL"
                            });
                        }
                }

            }

            return BadRequest("Password Incorrect");
        }
    }


}
