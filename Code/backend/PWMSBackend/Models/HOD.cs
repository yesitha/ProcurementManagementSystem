using System;
namespace PWMSBackend.Models
{
	public class HOD:ProcurementEmployee
	{
        //One to one relationships
        public Division Division { get; set; }

    }
}

