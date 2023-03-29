using System;
namespace PWMSBackend.Models
{
	public abstract class Item
	{
		public string ItemId { get; set; }

        public string ItemName { get; set; }

        public string Specification { get; set; }

        public Category category { get; set; }

    }
}

