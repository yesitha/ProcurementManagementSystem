using System;
namespace PWMSBackend.Models
{
	public class ApprovedItem:Item
	{
        //One to many relationships
        public FinalizedMasterProcuementPlan FinalizedMasterProcuementPlan { get; set; }

    }
}

