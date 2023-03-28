using System;
namespace PWMSBackend.Models
{
	public class PurchaseOrder
	{
		public string POId { get; set; }

        public DateTime Date { get; set; }

        public double TotalAmount { get; set; }

    }
}

