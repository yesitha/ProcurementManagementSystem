using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class GRN
    {
        public string GrnId { get; set; }

        public string? Checkedby { get; set; }

        public DateTime? Date { get; set; }

        public Invoice Invoice { get; set; }

        public ICollection<GRNItemTobeShipped> GRNItemTobeShippeds { get; set; }

        [ForeignKey("PurchaseOrder")]
        public string PoId { get; set; }
    }
}