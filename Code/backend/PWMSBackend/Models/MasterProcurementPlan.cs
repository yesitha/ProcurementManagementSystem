using MessagePack;
using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class MasterProcurementPlan
    {
        public string MppId { get; set; }
        public DateTime CreationDate { get; set; }
        public int EstimatedGrandTotal { get; set; }

        //One to one relationships
        public TecCommittee TecCommittee { get; set; }

        public BidOpeningCommittee BidOpeningCommittee { get; set; }
        public FinalizedMasterProcurementPlan FinalizedMasterProcuementPlan { get; set; }

        //One to many relationships
        public ProcurementCommittee ProcurementCommittee { get; set; }

        public ICollection<SubProcurementPlan> SubProcurementPlans { get; set; }

        //Many to many relationships
        public ICollection<MasterProcurementPlanStatus> MasterProcurementPlanStatuses { get; set; }

        [ForeignKey("TecCommittee")]
        public string TecCommitteeId { get; set; }

        [ForeignKey("BidOpeningCommittee")]
        public string BidOpeningCommitteeId { get; set; }

    }
}