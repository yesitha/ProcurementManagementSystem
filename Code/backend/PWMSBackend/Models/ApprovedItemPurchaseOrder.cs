namespace PWMSBackend.Models
{
    public class ApprovedItemPurchaseOrder
    {
        public string ItemId { get; set; }
        public string PoId { get; set; }

        public ApprovedItem ApprovedItem { get; set; }
        public PurchaseOrder PurchaseOrder { get; set; }
    }
}