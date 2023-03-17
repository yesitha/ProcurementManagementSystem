
using Microsoft.AspNetCore.Mvc;
using ProcurementManagementBackend.Services.CommitteeService;


namespace ProcurementManagementBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommitteeController : ControllerBase
    {
        public ICommitteeService _CommitteeService { get;  }

        public CommitteeController(ICommitteeService committeeService)
        {
            _CommitteeService = committeeService;
        }





        [HttpGet]
        public async Task<ActionResult<List<Committee>>> GetAllCommittees()
        {
            var result = await _CommitteeService.GetAllCommittees();
            if (result == null)
            {
                return NotFound("No Employees  Found");
            }
            return Ok(result);

        }


        [HttpGet("{id}")]

        public async Task<ActionResult<Committee>> GetCommitteeName(string id)
        {
            var result = await _CommitteeService.GetCommitteeName(id);
            if (result == null)
            {
                return NotFound("Employee Not Found");
            }
            return Ok(result);

        }
    }
}
