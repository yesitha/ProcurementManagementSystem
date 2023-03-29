namespace PWMSBackend.Models
{
    public class BidOpeningCommittee : Committee
    {
        //One to one relationships
        public MasterProcurementPlan MasterProcurementPlan { get; set; }
    }
}