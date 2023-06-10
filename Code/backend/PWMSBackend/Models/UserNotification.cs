using Newtonsoft.Json;

namespace PWMSBackend.Models
{
    public class UserNotification
    {
        public int notificationId { get; set; }
        public string message { get; set; }

        public string type { get; set; }
        public bool isRead { get; set; } = false;
        
        public DateTime timeStamp { get; set; }

        //One to many relationships
        [JsonIgnore]
        public Users User { get; set; }
    }
}
