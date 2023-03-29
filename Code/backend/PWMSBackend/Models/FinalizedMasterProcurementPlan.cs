namespace PWMSBackend.Models
{
    public class FinalizedMasterProcurementPlan
    {
        public string FMPPId { get; set; }
        public double GrandTotal { get; set; }

        //One to one relationships
        public MasterProcurementPlan MasterProcurementPlan { get; set; }

        //One to many relationships
        public ICollection<ApprovedItem> ApprovedItems { get; set; }
    }
}