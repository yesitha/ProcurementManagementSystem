using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PWMSBackend.CustomIdGenerator;
using PWMSBackend.Data;
using PWMSBackend.Models;
using System.Drawing;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using SendGrid.Helpers.Mail;
using SendGrid;
using SendGrid.Helpers.Mail.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNotificationsController : ControllerBase
    {
        private readonly DataContext _context;
        private NotificationIdGenerator _NotificationIdGenerator;

        public UserNotificationsController(DataContext context, NotificationIdGenerator notificationIdGenerator)
        {
            _context = context;
            _NotificationIdGenerator = notificationIdGenerator;
        }


        //[HttpGet("getUserNotifications/{userId}")]
        //public async Task<ActionResult<IEnumerable<UserNotification>>> GetUserNotificationsAsync(string userId)
        //{
        //    var notifications = await _context.UserNotifications
        //        .Where(n => n.ProcurementEmployee.EmployeeId == userId)
        //        .ToListAsync();

        //    return Ok(notifications);
        //}
        //[HttpPost("notifyUserNotifications/{message}/{type}/{userId}")]
        //public async Task<ActionResult<UserNotification>> NotifyUserNotifications(string message, string type, string userId)
        //{
        //    var existingUser = await _context.ProcurementEmployees.FindAsync(userId);

        //    if (existingUser == null)
        //    {
        //        // Handle the case when the user with the specified userId does not exist
        //        return NotFound();
        //    }

        //    var userNotification = new UserNotification
        //    {
        //        message = message,
        //        type = type,
        //        ProcurementEmployee = existingUser,
        //        isRead = false,
        //        timeStamp = DateTime.Now
        //    };

        //    _context.UserNotifications.Add(userNotification);
        //    await _context.SaveChangesAsync();

        //    return Ok(userNotification);
        //}


        //[HttpPut("updateUserNotification/{notificationId}/{isRead}")]
        //public async Task<IActionResult> UpdateUserNotification(int notificationId, bool isRead)
        //{
        //    var userNotification = await _context.UserNotifications.FindAsync(notificationId);

        //    if (userNotification == null)
        //    {
        //        return NotFound();
        //    }

        //    userNotification.isRead = isRead;
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //Purchasing Division HOD Notification

       public class Notification
        {
            public string message { get; set; }
            public string type { get; set; }
            public string DivisionName { get; set; }
        }


        [HttpPost("CreateUserNotification")]
        public IActionResult CreateUserNotification(Notification notification)
        {
            var employeeIds = _context.ProcurementEmployees
                .Where(p => p.Division.DivisionName == notification.DivisionName)
                .Select(p => p.EmployeeId)
                .ToList();

            string notificationId = _NotificationIdGenerator.GenerateNotificationId();

            var userNotification = new UserNotification
            {
                notificationId = notificationId,
                message = notification.message,
                type = notification.type,
                isRead = false,
                timeStamp = DateTime.Now,
                //ProcurementEmployee = _context.ProcurementEmployees.Where(p => p.Division.DivisionName == notification.DivisionName).FirstOrDefault()
                UserNotificationProcurementEmployees = employeeIds.Select(e => new UserNotificationProcurementEmployee
                {
                    ProcurementEmployeeId = e,
                    NotificationId = notificationId
                }).ToList()
            };

            // Your code to save the userNotification to the database using your data access layer
            _context.UserNotifications.Add(userNotification);
            _context.SaveChanges();

            //send emails
            foreach (var employeeId in employeeIds)
            {
                // Get the employee's email address based on the employee ID
                var employee = _context.ProcurementEmployees.Where(p => p.EmployeeId == employeeId).FirstOrDefault();

                if (employee != null && !string.IsNullOrEmpty(employee.EmailAddress))
                {
                    sendEmail(notification.type,employee.EmailAddress,notification.message).Wait();
                   
                }
            }

            return Ok("UserNotification created successfully.");
        }

        private async Task sendEmail(string subjectC, string toMail, string content)
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("ml2252327@gmail.com", "PWMS System");
            var subject = subjectC;
            var to = new EmailAddress(toMail, "PWMS User");
            var plainTextContent = content;
            var htmlContent = $"<strong>{content}</strong>"; 
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg); 
        }

        [HttpGet("GetUserNotifications/{employeeId}")]

        public IActionResult GetUserNotifications(string employeeId)
        {
            var userNotifications = _context.UserNotifications
                .Where(u => u.UserNotificationProcurementEmployees.FirstOrDefault().ProcurementEmployeeId == employeeId && u.isRead == false)
                .Select(u => new
                {
                    u.notificationId,
                    u.message,
                    u.type,
                    u.isRead,
                    u.timeStamp
                })
                .ToList();

            return Ok(userNotifications);
        }

        [HttpPut("UpdateUserNotification/{notificationId}")]
        public IActionResult UpdateUserNotification(string notificationId)
        {
            var userNotification = _context.UserNotifications
                .Where(u => u.notificationId == notificationId)
                .FirstOrDefault();

            if (userNotification == null)
            {
                return NotFound();
            }

            userNotification.isRead = true;
            _context.SaveChanges();

            return Ok("UserNotification updated successfully.");
        }

        // Notification for Committee members

        public class CommitteeNotification
        {
            public string message { get; set; }
            public string type { get; set; }
            public string mppId { get; set; }
            public string committeeType { get; set; }
        }

        [HttpPost("CreateCommitteeNotification")]
        public IActionResult CreateCommitteeNotification(CommitteeNotification notification)
        {
            string committeeId;

            if (notification.committeeType == "Tec")
            {
                committeeId = _context.MasterProcurementPlans.Where(c => c.MppId == notification.mppId).FirstOrDefault().TecCommitteeId;
            }
            else if (notification.committeeType == "BidOpening")
            {
                committeeId = _context.MasterProcurementPlans.Where(c => c.MppId == notification.mppId).FirstOrDefault().BidOpeningCommitteeId;
            }
            else
            {
                committeeId = _context.MasterProcurementPlans.Where(c => c.MppId == notification.mppId).FirstOrDefault().ProcurementCommittee.CommitteeId;
            }

            var employeeIds = _context.CommitteeMemberCommittees
                .Where(cmc => cmc.CommitteeId == committeeId)
                .Select(cmc => cmc.EmployeeId)
                .ToList();

            string notificationId = _NotificationIdGenerator.GenerateNotificationId();

            var userNotification = new UserNotification
            {
                notificationId = notificationId,
                message = notification.message,
                type = notification.type,
                isRead = false,
                timeStamp = DateTime.Now,
                //ProcurementEmployee = _context.ProcurementEmployees.Where(p => p.Division.DivisionName == notification.DivisionName).FirstOrDefault()
                UserNotificationProcurementEmployees = employeeIds.Select(e => new UserNotificationProcurementEmployee
                {
                    ProcurementEmployeeId = e,
                    NotificationId = notificationId
                }).ToList()
            };

            // Your code to save the userNotification to the database using your data access layer
            _context.UserNotifications.Add(userNotification);
            _context.SaveChanges();

            return Ok("UserNotifications created successfully.");
        }

    }
}
