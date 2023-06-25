using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class Invoice
    {
        public string InvoiceId { get; set; }

        public double Total { get; set; }

        public double Tax { get; set; }

        public DateTime Date { get; set; }

        public GRN GRN { get; set; }

        [ForeignKey("GRN")]
        public string GrnId { get; set; }
    }
}