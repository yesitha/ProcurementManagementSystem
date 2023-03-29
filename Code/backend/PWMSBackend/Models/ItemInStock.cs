using System;
namespace PWMSBackend.Models
{
	public class ItemInStock : Item
	{
		public DateTime Date { get; set; }

        public double UnitPrice { get; set; }

        public int QuantityAvailable { get; set; }



    }
}

