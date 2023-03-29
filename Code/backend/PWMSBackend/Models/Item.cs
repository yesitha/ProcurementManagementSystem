using System;
namespace PWMSBackend.Models
{
	public class Item
	{
		public string ItemId { get; set; }

        public string ItemName { get; set; }

        public string Specification { get; set; }
        public ICollection<VendorhasItem> VendorhasItems { get; set; }

    }
}

