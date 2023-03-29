namespace PWMSBackend.Models
{
    public class MasterProcurementPlan
    {
        public string MPPId { get; set; }
        public DateTime CreationDate { get; set; }
        public int EstimatedGrandTotal { get; set; }

        //One to one relationships
        public TecCommittee TecCommittee { get; set; }

        public BidOpeningCommittee BidOpeningCommittee { get; set; }
        public FinalizedMasterProcuementPlan FinalizedMasterProcuementPlan { get; set; }

        //One to many relationships
        public ProcurementCommittee ProcurementCommittee { get; set; }

        public ICollection<SubProcurementPlan> SubProcurementPlans { get; set; }

        //Many to many relationships
        public ICollection<MasterProcurementPlanStatus> MasterProcurementPlanStatuses { get; set; }
    }
}