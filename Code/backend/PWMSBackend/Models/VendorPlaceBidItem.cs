using Microsoft.VisualBasic;

namespace PWMSBackend.Models
{
    public class VendorPlaceBidItem
    {
        public string VendorId { get; set; }
        public string ItemId { get; set; }
        public string BidStatus { get; set; }
        public double BidValue { get; set; }
        public DateTime DateAndTime { get; set; }
        public IFormFile ProofDocument { get; set; }
        public Vendor Vendor { get; set; }
        public ApprovedItem ApprovedItem { get; set; }

        }
}
