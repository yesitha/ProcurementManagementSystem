using ProcurementManagementBackend.Models;
using ProcurementManagementBackend.Services.CommitteeService;

namespace ProcurementManagementBackend.Services.CommitteeService
   
{
    public class CommitteeService : ICommitteeService
    {
        private readonly DataContext _context;
        public CommitteeService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Committee>> GetAllCommittees()
        {
            var committees = await _context.Committee.ToListAsync();
            return (committees);
        }

        public async Task<Committee?> GetCommitteeName(string id)
        {
            var committee = await _context.Committee.FindAsync(id);
            if (committee == null) { return null; }
            return (committee);
        }

    }
}
