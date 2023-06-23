using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class PurchaseOrder
    {
        public string PoId { get; set; }

        public DateTime Date { get; set; }

        public double TotalAmount { get; set; }

        public string? Agreement { get; set; }

        public string? Bond { get; set; }

        public string? BankGuarantee { get; set; }

        public string? CommentsForSpecialInstruction { get; set; }

        public string? ProcumentOfficerStatus { get; set; }

        public ICollection<ApprovedItemPurchaseOrder> ApprovedItemPurchaseOrders { get; set; }
        public ICollection<PurchaseOrder_ItemTobeShipped> purchaseOrder_ItemTobeShippeds { get; set; }

        public Vendor Vendor { get; set; }

        [ForeignKey("Vendor")]
        public string VendorId { get; set; }

        [ForeignKey("MasterProcuementPlan")]
        public string MppId { get; set; } // add this beacasue there need to be a relationship between MPP and PO otherwise difficult to get PO details from MPP
    }
}