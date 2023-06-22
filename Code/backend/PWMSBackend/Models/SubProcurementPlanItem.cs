namespace PWMSBackend.Models
{
    public class SubProcurementPlanItem
    {
        public string SppId { get; set; }
        public string ItemId { get; set; }
        public string? RecommendedVendor { get; set; }
        public string? EvidenceOfAuthorization { get; set; }
        public string? ProcuremnetCommitteeStatus { get; set; }
        public string? ProcurementCommitteeComment { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpectedDeliveryDate { get; set; }
        public string? TecCommitteeStatus { get; set; }
        public string? TecCommitteeComment { get; set; }
        public string? DGStatus { get; set; }
        public string? DGComment { get; set; }
        public string? RejectedVendor { get; set; }
        public double EstimatedBudget { get; set; }
        public string? SelectedVendor { get; set; }
        public string? InternalAuditorComment { get; set; }
        public string?  InternalAuditorStatus { get; set; }

        public SubProcurementPlan SubProcurementPlan { get; set; }
        public Item Item { get; set; }
    }
}