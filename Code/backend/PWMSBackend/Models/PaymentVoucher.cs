namespace PWMSBackend.Models
{
    public class PaymentVoucher
    {
        public string PVId { get; set; }

        public string Evidence { get; set; }

        public InvoiceTobePay InvoiceTobePay { get; set; }
    }
}