using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PWMSBackend.Data;
using PWMSBackend.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNotificationsController : ControllerBase
    {
        private readonly DataContext _context;

        public UserNotificationsController(DataContext context)
        {
            _context = context;
        }
       

        [HttpGet("getUserNotifications/{userId}")]
        public async Task<ActionResult<IEnumerable<UserNotification>>> GetUserNotificationsAsync(string userId)
        {
            var notifications = await _context.UserNotifications
                .Where(n => n.ProcurementEmployee.EmployeeId == userId)
                .ToListAsync();

            return Ok(notifications);
        }
        [HttpPost("notifyUserNotifications/{message}/{type}/{userId}")]
        public async Task<ActionResult<UserNotification>> NotifyUserNotifications(string message, string type, string userId)
        {
            var existingUser = await _context.ProcurementEmployees.FindAsync(userId);

            if (existingUser == null)
            {
                // Handle the case when the user with the specified userId does not exist
                return NotFound();
            }

            var userNotification = new UserNotification
            {
                message = message,
                type = type,
                ProcurementEmployee = existingUser,
                isRead = false,
                timeStamp = DateTime.Now
            };

            _context.UserNotifications.Add(userNotification);
            await _context.SaveChangesAsync();

            return Ok(userNotification);
        }


        [HttpPut("updateUserNotification/{notificationId}/{isRead}")]
        public async Task<IActionResult> UpdateUserNotification(int notificationId, bool isRead)
        {
            var userNotification = await _context.UserNotifications.FindAsync(notificationId);

            if (userNotification == null)
            {
                return NotFound();
            }

            userNotification.isRead = isRead;
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
