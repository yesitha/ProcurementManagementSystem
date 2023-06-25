using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class Item
    {
        [Key]
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public string Itemtype { get; set; }
        public string Specification { get; set; }
        public ICollection<VendorhasItem> VendorhasItems { get; set; }

        //One to many Relationships
        public Category? Category { get; set; }

        [ForeignKey("Category")]
        public string CategoryId { get; set; }

        //Many to many Relationships
        public ICollection<SubProcurementPlanItem> subProcurementPlanItems { get; set; }
    }
}