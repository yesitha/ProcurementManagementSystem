using System;
namespace PWMSBackend.Models
{
	public class FinalizedMasterProcuementPlan
	{
		public string FMPPId { get; set; }

        public double GrandTotal { get; set; }
		public ICollection<SubProcurementPlan> SubProcurementPlans { get; set; }

    }
}

