using ProcurementManagementBackend.Models;
using ProcurementManagementBackend.Services.EmployeeServices;

namespace ProcurementManagementBackend.Services.EmloyeeServices
{
    public class EmployeeServices : IEmployeeServices
    {
        private readonly DataContext _context;
        public EmployeeServices(DataContext context) {
            _context = context;
        }
        public async Task<List<Employee>?> AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return await _context.Employees.ToListAsync();
        }

        public async Task<List<Employee>?> DeleteEmployee(string id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) { return null; }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return await _context.Employees.ToListAsync();
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return (employees);
        }

        public async Task<Employee?> GetSingleEmployee(string id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) { return null; }
            return (employee);
        }

        public async Task<List<Employee>?> UpdateEmployee(string id, Employee request)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) { return null; }
            employee.employeeId = request.employeeId != null ? request.employeeId : employee.employeeId;
            employee.employeeName = request.employeeName!=null?request.employeeName:employee.employeeName;
            employee.committeeId = request.committeeId != null ? request.committeeId : employee.committeeId;



            await _context.SaveChangesAsync();

            return await _context.Employees.ToListAsync();
        }
    }
}
