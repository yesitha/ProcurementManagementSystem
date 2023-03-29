using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PWMSBackend.Models
{
	public class SubProcurementPlan
	{

        [Required]
        public string SPPId { get; set; } = null!;

        public double EstimatedTotal { get; set; }
		
        //One to many relationships
        public MasterProcurementPlan MasterProcurementPlan { get; set; }

        //Many to many Relationships
        public ICollection<SubProcurementPlanItem> subProcurementPlanItems { get; set; }
    
		    public ICollection<SubProcurementApprovedItems> SubProcurementApprovedItems { get; set; }
        
        public HOD HOD { get; set; }
	}

}

