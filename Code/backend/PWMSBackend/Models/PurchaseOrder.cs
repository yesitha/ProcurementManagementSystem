namespace PWMSBackend.Models
{
    public class PurchaseOrder
    {
        public string POId { get; set; }

        public DateTime Date { get; set; }

        public double TotalAmount { get; set; }

        public byte[] Agreement { get; set; }

        public byte[] Bond { get; set; }

        public byte[] BankGuarantee { get; set; }

        public byte[] CommentsForSpecialInstruction { get; set; }

        public byte[] LetterOfAcceptance { get; set; }

        public byte[] ProcumentOfficerStatus { get; set; }


        public ICollection<ApprovedItemPurchaseOrder> ApprovedItemPurchaseOrders { get; set; }
        public ICollection<PurchaseOrder_ItemTobeShipped> purchaseOrder_ItemTobeShippeds { get; set; }


        public Vendor Vendor { get; set; }



    }
}