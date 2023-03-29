using System;
namespace PWMSBackend.Models
{
	public class SubProcurementPlan
	{


		public string SppId { get; set; }


		public double EstimatedTotal { get; set; }
		


        //One to many relationships
        public MasterProcurementPlan MasterProcurementPlan { get; set; }

        //Many to many Relationships
        public ICollection<SubProcurementPlanItem> subProcurementPlanItems { get; set; }
    
		public ICollection<SubProcurementApprovedItems> SubProcurementApprovedItems { get; set; }
	}

}

