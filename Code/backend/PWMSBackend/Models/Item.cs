using System;
namespace PWMSBackend.Models
{
	public abstract class Item
	{
		public string ItemId { get; set; }
        public string ItemName { get; set; }
        public string Specification { get; set; }

        //One to many Relationships
        public Category Category { get; set; }

        //Many to many Relationships
        public ICollection<SubProcurementPlanItem> subProcurementPlanItems { get; set; }

    }
}

