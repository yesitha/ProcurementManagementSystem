namespace PWMSBackend.Models
{
    public class ApprovedItem : Item
    {
        public ICollection<VendorPlaceBidItem> VendorPlaceBidItems { get; set; }
        public ICollection<SubProcurementApprovedItems> SubProcurementApprovedItems { get; set; }
        public ICollection<ApprovedItemPurchaseOrder> ApprovedItemPurchaseOrders { get; set; }
        public FinalizedMasterProcurementPlan FinalizedMasterProcurementPlan { get; set; }
    }
}