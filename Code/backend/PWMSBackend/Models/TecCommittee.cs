using System;
namespace PWMSBackend.Models
{
	public class TecCommittee: Committee
    {
        //One to one relationships
        public MasterProcurementPlan MasterProcurementPlan { get; set; }
    }
}

