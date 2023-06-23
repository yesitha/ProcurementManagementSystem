namespace PWMSBackend.DTOs.outgoing
{
    public class BidTenderItemDetailsDTO
    {
        public string ItemName { get; set; }
        public string Specification { get; set; }

        public DateTime expectedDeliveryDate { get; set; }
        public int Quantity { get; set; }

        public string BidStatus { get; set; }
    }
}
