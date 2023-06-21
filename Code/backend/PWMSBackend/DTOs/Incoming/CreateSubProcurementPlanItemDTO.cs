namespace PWMSBackend.DTOs.Incoming
{
    public class CreateSubProcurementPlanItemDTO
    {
        public string SppId { get; set; }
        public string ItemId { get; set; }
        public string RecommendedVendor { get; set; }
        
        public string? EvidenceOfAuthorization { get; set; }
        public DateTime ExpectedDeliveryDate { get; set; }
        public double EstimatedBudget { get; set; }
        public int Quantity { get; set; }
    }
}
