namespace PWMSBackend.Models
{
    public class UserNotificationProcurementEmployee
    {
        public UserNotification UserNotification { get; set; }
        public ProcurementEmployee ProcurementEmployee { get; set; }  
        public string NotificationId { get; set; }
        public string ProcurementEmployeeId { get; set; }
    }
}
