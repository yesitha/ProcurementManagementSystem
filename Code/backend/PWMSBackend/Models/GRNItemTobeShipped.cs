namespace PWMSBackend.Models
{
    public class GRNItemTobeShipped
    {
        public string GRNId { get; set; }
        public string ItemId { get; set; }

        public DateTime ShippingDate { get; set; }

        public GRN GRN { get; set; }

        public ItemTobeShipped ItemTobeShipped { get; set; }

        public string GRNComment { get; set; }

        public int Received_Qty { get; set; }
    }
}