namespace PWMSBackend.Models
{
    public class Invoice
    {
        public string InvoiceId { get; set; }

        public double Tax { get; set; }

        public DateOnly Date { get; set; }

        public GRN GRN { get; set; }
    }
}