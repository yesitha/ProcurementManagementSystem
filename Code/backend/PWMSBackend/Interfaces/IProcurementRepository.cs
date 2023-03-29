using PWMSBackend.Models;

namespace PWMSBackend.Interfaces
{
    public interface IProcurementRepository
    {
        ICollection<ProcurementEmployee> GetProcurementEmployees();
    }
}