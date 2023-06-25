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

        //One to many relationships
        //[JsonIgnore]
        public ProcurementEmployee ProcurementEmployee { get; set; }
    }
}
