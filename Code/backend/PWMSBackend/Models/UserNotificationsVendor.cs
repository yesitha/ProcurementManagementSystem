namespace PWMSBackend.Models
{
    public class UserNotificationsVendor
    {
        public string VendorId { get; set; }
        public string NotificationId { get; set; }
        public Vendor Vendor { get; set; }
        public UserNotification UserNotification { get; set; }
    }
}
