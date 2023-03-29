using System;
namespace PWMSBackend.Models
{
	public class ApprovedItem:Item
	{
        public ICollection<SubProcurementApprovedItems> SubProcurementApprovedItems { get; set; }
		public  ICollection<ApprovedItemPurchaseOrder>  ApprovedItemPurchaseOrders { get; set; }
        public FinalizedMasterProcuementPlan FinalizedMasterProcurementPlan { get;set; }
	}
}

