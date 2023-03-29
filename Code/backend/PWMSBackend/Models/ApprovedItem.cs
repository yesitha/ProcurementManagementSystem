using System;
namespace PWMSBackend.Models
{
	public class ApprovedItem:Item
	{
        public ICollection<VendorPlaceBidItem> VendorPlaceBidItems { get; set; }
    }
}

