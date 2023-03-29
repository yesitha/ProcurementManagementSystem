namespace PWMSBackend.Models
{
    public class GRN
    {
        public string GRNId { get; set; }

        public string Checkedby { get; set; }

        public DateTime Date { get; set; }

        public Invoice Invoice { get; set; }

        public ICollection<GRNItemTobeShipped> GRNItemTobeShippeds { get; set; }
    }
}