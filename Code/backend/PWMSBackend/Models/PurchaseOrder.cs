namespace PWMSBackend.Models
{
    public class PurchaseOrder
    {
        public string POId { get; set; }

        public DateTime Date { get; set; }

        public double TotalAmount { get; set; }

        public IFormFile Agreement { get; set; }

        public IFormFile Bond { get; set; }

        public IFormFile BankGuarantee { get; set; }

        public IFormFile CommentsForSpecialInstruction { get; set; }

        public IFormFile LetterOfAcceptance { get; set; }

        public IFormFile ProcumentOfficerStatus { get; set; }

        public ICollection<ApprovedItemPurchaseOrder> ApprovedItemPurchaseOrders { get; set; }
        public ICollection<PurchaseOrder_ItemTobeShipped> purchaseOrder_ItemTobeShippeds { get; set; }
    }
}