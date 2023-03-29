using System;
namespace PWMSBackend.Models
{
	public class SubProcurementPlan
	{
		public string SppId { get; set; }

		public double EstimatedTotal { get; set; }

		public object MyProperty { get; set; }

		public ICollection<SubProcurementApprovedItems> SubProcurementApprovedItems { get; set; }
	}
}

