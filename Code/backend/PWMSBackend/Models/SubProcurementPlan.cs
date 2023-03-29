using System;
namespace PWMSBackend.Models
{
	public class SubProcurementPlan
	{
		public string SPPId { get; set; }
		public double EstimatedTotal { get; set; }
		public object MyProperty { get; set; }

        //One to many relationships
        public MasterProcurementPlan MasterProcurementPlan { get; set; }

        //Many to many Relationships
        public ICollection<SubProcurementPlanItem> subProcurementPlanItems { get; set; }
    }
}

