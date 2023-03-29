using System;
namespace PWMSBackend.Models
{
	public class HOD:ProcurementEmployee
	{
      public ICollection<SubProcurementPlan> SubProcurementPlans { get; set; }
      //One to one relationships
      public Division Division { get; set; }

    }
}

