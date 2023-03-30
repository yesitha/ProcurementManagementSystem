namespace PWMSBackend.Models
{
    public class ItemTobeShipped : Item
    {
        public DateTime ShippingDate { get; set; }

        public ICollection<PurchaseOrder_ItemTobeShipped> PurchaseOrder_ItemTobeShippeds { get; set; }

        public ICollection<GRNItemTobeShipped> GRNItemTobeShippeds { get; set; }
    }
}