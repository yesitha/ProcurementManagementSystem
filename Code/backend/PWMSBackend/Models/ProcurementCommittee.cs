namespace PWMSBackend.Models
{
    public class ProcurementCommittee : Committee
    {
        //One to many relationships
        public ICollection<MasterProcurementPlan> MasterProcurementPlans { get; set; }
    }
}