﻿using System;
namespace PWMSBackend.Models
{
	public class Division
	{
		
		public string DivisionId { get; set; }

		public string? DivisionName { get; set; }

		public ICollection<ProcurementEmployee> procurementEmployees { get; set; }

	} 
}
