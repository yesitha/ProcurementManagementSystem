namespace PWMSBackend.Models
{
    public class VendorhasItem
    {
        public string VendorId { get; set; }
        public string ItemId { get; set; }
        public Vendor Vendor { get; set; }
        public Item Item { get; set; }
    }
}