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
        [HttpGet("UserLogin/{email}/{password}")]
        public async Task<ActionResult<ProcurementEmployee>> UserLogin(string email, string password)
        {
            var user = await _context.ProcurementEmployees.FirstOrDefaultAsync(u => u.EmailAddress == email);

            if (user == null)
            {
                return NotFound();
            }

            // Perform password comparison using a secure hashing algorithm
            // For example, using bcrypt:
            bool isPasswordValid = (password == user.Password);

            if (isPasswordValid)
            {
                return Ok(user);
            }

            return BadRequest();
        }
    }

       
    }
