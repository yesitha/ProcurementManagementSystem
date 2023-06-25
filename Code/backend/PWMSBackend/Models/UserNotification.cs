using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class UserNotification
    {
        public string notificationId { get; set; }
        public string message { get; set; }

        public string type { get; set; }
        public bool isRead { get; set; } = false;
        
        public DateTime timeStamp { get; set; }

        //Many to many relationships
        //[JsonIgnore]
        public ICollection<UserNotificationProcurementEmployee> UserNotificationProcurementEmployees { get; set; }
    }
}
