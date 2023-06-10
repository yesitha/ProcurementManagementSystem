using MessagePack;
using System.ComponentModel.DataAnnotations.Schema;

namespace PWMSBackend.Models
{
    public class FinalizedMasterProcurementPlan
    {
        [Key("FmppId")]
        public string FmppId { get; set; }
        public double GrandTotal { get; set; }

        //One to one relationships
        public MasterProcurementPlan MasterProcurementPlan { get; set; }

        //One to many relationships
        public ICollection<ApprovedItem> ApprovedItems { get; set; }

        [ForeignKey("MasterProcurementPlan")]
        public string MppId { get; set; }
    }
}