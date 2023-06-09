using Microsoft.AspNetCore.Mvc;
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

        // GET: api/UserLogin/5
        [HttpGet("{email}{password}")]
        public async Task<ActionResult<Users>> UserLogin(string email,string password )
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user= await _context.Users.FindAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            if (user.Password == password) {
                return Ok(user);
            }
            
            return BadRequest();
        
        }
    }
}
