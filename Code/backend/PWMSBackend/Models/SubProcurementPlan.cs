using System.ComponentModel.DataAnnotations;

namespace PWMSBackend.Models
{
    public class SubProcurementPlan
    {
        [Required]
        public string SppId { get; set; } = null!;

        public double EstimatedTotal { get; set; }

        //One to many relationships
        public MasterProcurementPlan? MasterProcurementPlan { get; set; }

        //Many to many Relationships
        public ICollection<SubProcurementPlanItem> subProcurementPlanItems { get; set; }

        public ICollection<SubProcurementApprovedItems> SubProcurementApprovedItems { get; set; }
        public FinalizedMasterProcurementPlan? FinalizedMasterProcuementPlan { get; set; }
        public HOD HOD { get; set; }
    }


}