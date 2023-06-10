namespace PWMSBackend.Models
{
    public class SubProcurementApprovedItems
    {
        public string SppId { get; set; } = null!;
        public string ItemId { get; set; }
        public SubProcurementPlan SubProcurementPlan { get; set; }
        public ApprovedItem ApprovedItem { get; set; }
        public DateTime AuctionClosingDate { get; set; }
        public DateTime AuctionOpeningDate { get; set; }
        public DateTime PreBidMeetingDate { get; set; }
    }
}