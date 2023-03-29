namespace PWMSBackend.Models
{
    public class Status
    {
        public string StatusId { get; set; }
        public string StatusName { get; set; }

        //Many to many relationships
        public ICollection<MasterProcurementPlanStatus> MasterProcurementPlanStatuses { get; set; }
    }
}