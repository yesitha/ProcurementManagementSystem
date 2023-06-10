namespace PWMSBackend.DTOs.Outgoing
{
    public class TenderItemDetailsDTO
    {
        public string ItemName { get; set; }
        public string Specification { get; set; }

        public DateTime expectedDeliveryDate { get; set; }
        public int Quantity { get; set; }
    }
}