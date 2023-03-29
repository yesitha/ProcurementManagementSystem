using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class HOD : ProcurementEmployee
    {
        public ICollection<SubProcurementPlan> SubProcurementPlans { get; set; }

        //One to one relationships
        public Division Division { get; set; }

        [ForeignKey("Division")]
        public string DivisionId { get; set; }
    }
}