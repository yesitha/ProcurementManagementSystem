using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class Item
    {
        [Key]
        public string ItemId { get; set; }

        public Item()
        {
            ItemId = CustomIdGenerator.GenerateCustomId();
        }
        public string ItemName { get; set; }
        public string Specification { get; set; }
        public ICollection<VendorhasItem> VendorhasItems { get; set; }

        //One to many Relationships
        public Category Category { get; set; }

        //Many to many Relationships
        public ICollection<SubProcurementPlanItem> subProcurementPlanItems { get; set; }
    }

    public static class CustomIdGenerator
    {
        private static int counter = 1; // Starting counter value
        private const string prefix = "ITM"; // Prefix for the ID

        public static string GenerateCustomId()
        {
            string numericPart = counter.ToString("D5"); // Pad the counter with leading zeros
            string customId = prefix + numericPart;
            counter++; // Increment the counter for the next ID generation
            return customId;
        }
    }
}