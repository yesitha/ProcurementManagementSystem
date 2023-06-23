using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class PaymentVoucher
    {
        public string PvId { get; set; }

        public string? PaymentVoucherEvidence { get; set; }

        public InvoiceTobePay InvoiceTobePay { get; set; }

        [ForeignKey("InvoiceTobePay")]
        public string InvoiceTobePayId { get; set; }
    }
}