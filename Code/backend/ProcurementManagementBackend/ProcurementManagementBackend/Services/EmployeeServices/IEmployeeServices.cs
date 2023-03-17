namespace ProcurementManagementBackend.Services.EmployeeServices
{
    public interface IEmployeeServices
    {
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetSingleEmployee(string id);

        Task<List<Employee>> AddEmployee(Employee employee);

        Task<List<Employee>> UpdateEmployee(string id, Employee request);
        Task<List<Employee>> DeleteEmployee(string id);

    }
}


