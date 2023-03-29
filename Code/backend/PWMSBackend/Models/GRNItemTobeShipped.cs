namespace PWMSBackend.Models
{
    public class GRNItemTobeShipped
    {
        public string GRNId { get; set; }

        public DateOnly ShippingDate { get; set; }

        public GRN GRN { get; set; }

        public ItemTobeShipped ItemTobeShipped { get; set; }

        public string GRNComment { get; set; }

        public int Received_Qty { get; set; }




    }
}
