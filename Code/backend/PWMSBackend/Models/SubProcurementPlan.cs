using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PWMSBackend.Models
{
	public class SubProcurementPlan
	{
		[Required]
		public string SPPId { get; set; } = null!;

		public double? EstimatedTotal { get; set; }

		public MasterProcurementPlan MasterProcurementPlan { get; set; }

		public HOD HOD { get; set; }

	}
}

