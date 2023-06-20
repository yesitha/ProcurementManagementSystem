using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class PurchaseOrder
    {
        public string PoId { get; set; }

        public DateTime Date { get; set; }

        public double TotalAmount { get; set; }

        public byte[]? Agreement { get; set; }

        public byte[]? Bond { get; set; }

        public byte[]? BankGuarantee { get; set; }

        public string? CommentsForSpecialInstruction { get; set; }

        public byte[]? LetterOfAcceptance { get; set; }

        public string? ProcumentOfficerStatus { get; set; }

        public ICollection<ApprovedItemPurchaseOrder> ApprovedItemPurchaseOrders { get; set; }
        public ICollection<PurchaseOrder_ItemTobeShipped> purchaseOrder_ItemTobeShippeds { get; set; }

        public Vendor Vendor { get; set; }

        [ForeignKey("Vendor")]
        public string VendorId { get; set; }
    }
}