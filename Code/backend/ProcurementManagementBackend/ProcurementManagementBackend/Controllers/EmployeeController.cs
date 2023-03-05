using Microsoft.AspNetCore.Mvc;
using ProcurementManagementBackend.Services.EmployeeServices;

namespace ProcurementManagementBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public IEmployeeServices _EmployeeService { get; }

        public EmployeeController(IEmployeeServices employeeServices)
        {
            _EmployeeService = employeeServices;
        }





        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            var result = await _EmployeeService.GetAllEmployees();
            return Ok(result);

        }


        [HttpGet("{id}")]

        public async Task<ActionResult<Employee>> GetSingleEmployee(string id)
        {
            var result = await _EmployeeService.GetSingleEmployee(id);
            if (result == null)
            {
                return NotFound("Employee Not Found");
            }
            return Ok(result);

        }
        [HttpPost]
        public async Task<ActionResult<List<Employee>>> AddEmployee(Employee employee)
        {
            var result = await _EmployeeService.AddEmployee(employee);
            return Ok(result);

        }

        [HttpPut]
        public async Task<ActionResult<List<Employee>>> UpdateEmployee(string id, Employee request)
        {
            var result = await _EmployeeService.UpdateEmployee(id, request);
            if (result == null)
            {
                return NotFound("Employee Not Found");
            }
            return Ok(result);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Employee>>> DeleteEmployee(string id)
        {
            var result = await _EmployeeService.DeleteEmployee(id);
            if (result == null)
            {
                return NotFound("Employee Not Found");
            }
            return Ok(result);
        }



    }
}
