namespace PWMSBackend.Models
{
    public class PurchaseOrder_ItemTobeShipped
    {
        public string POId { get; set; }

        public string ItemId { get; set; }

        public PurchaseOrder PurchaseOrder { get; set; }

        public ItemTobeShipped ItemTobeShipped { get; set; }

        public int Shipped_Qty { get; set; }
    }
}