namespace PWMSBackend.Models
{
    public class Invoice
    {
        public string InvoiceId { get; set; }

        public double Tax { get; set; }

        public DateTime Date { get; set; }

        public GRN GRN { get; set; }
    }
}