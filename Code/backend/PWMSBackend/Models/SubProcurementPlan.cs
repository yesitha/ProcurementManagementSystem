using System.ComponentModel.DataAnnotations;

namespace PWMSBackend.Models
{
    public class SubProcurementPlan
    {
        [Required]
        public string SppId { get; set; } = null!;

        public SubProcurementPlan()
        {
            SppId = CustomSppIdGenerator.GenerateSppId();
        }

        public double EstimatedTotal { get; set; }

        //One to many relationships
        public MasterProcurementPlan? MasterProcurementPlan { get; set; }

        //Many to many Relationships
        public ICollection<SubProcurementPlanItem> subProcurementPlanItems { get; set; }

        public ICollection<SubProcurementApprovedItems> SubProcurementApprovedItems { get; set; }
        public FinalizedMasterProcurementPlan? FinalizedMasterProcuementPlan { get; set; }
        public HOD HOD { get; set; }
    }

    public static class CustomSppIdGenerator
    {
        private static int counter = 1; // Starting counter value
        private const string prefix = "SPP"; // Prefix for the ID

        public static string GenerateSppId()
        {
            string numericPart = counter.ToString("D5"); // Pad the counter with leading zeros
            string customId = prefix + numericPart;
            counter++; // Increment the counter for the next ID generation
            return customId;
        }
    }

}