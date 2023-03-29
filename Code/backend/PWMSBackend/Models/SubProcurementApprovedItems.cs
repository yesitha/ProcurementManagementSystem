namespace PWMSBackend.Models
{
    public class SubProcurementApprovedItems
    { 
        public string SPPId { get; set; } = null!;
        public string ItemId { get; set; }
        public SubProcurementPlan SubProcurementPlan { get; set; }
        public ApprovedItem ApprovedItem { get; set; }
        public  DateOnly AuctionClosingDate { get; set; }
        public  DateOnly AuctionOpeningDate { get; set; }
        public DateOnly  PreBidMeetingDate { get; set; }

        public 
    }
}