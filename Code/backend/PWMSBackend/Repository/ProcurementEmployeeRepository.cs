using PWMSBackend.Data;
using PWMSBackend.Interfaces;
using PWMSBackend.Models;

namespace PWMSBackend.Repository
{
    public class ProcurementEmployeeRepository:IProcurementRepository
    {
        private readonly DataContext _context;

        public ProcurementEmployeeRepository(DataContext context)
        {
            _context = context; 
        }

        public ICollection<ProcurementEmployee> GetProcurementEmployees()
        {
            return _context.ProcurementEmployees.ToList();
        }
    }
}
