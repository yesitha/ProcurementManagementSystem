namespace ProcurementManagementBackend.Models
{
    public class Employee
    {
        public string employeeId { get; set; }
        public string employeeFirstName { get; set; }
        public string employeeLastName { get; set; }
        public string committeeId { get; set; } = string.Empty;

        public string employeeDesignation { get; set; } 
    }
}
