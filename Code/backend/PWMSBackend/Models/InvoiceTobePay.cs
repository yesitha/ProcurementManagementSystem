using System;
namespace PWMSBackend.Models
{
	public class InvoiceTobePay:Invoice
	{
		public string PaymentStatus { get; set; }

		public PaymentVoucher PaymentVoucher  { get; set; }

	}
}

