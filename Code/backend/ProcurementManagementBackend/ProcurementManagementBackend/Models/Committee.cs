using System.ComponentModel.DataAnnotations;

namespace ProcurementManagementBackend.Models
{
    public class Committee
    {
        [Key]
        public string Id{ get; set; } 
        public string committeeName { get; set;}

        public List<Employee> employees { get; set; }
    }
}
