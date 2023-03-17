namespace ProcurementManagementBackend.Services.CommitteeService
{
    public interface ICommitteeService
    {

        Task<List<Committee>> GetAllCommittees();
        Task<Committee> GetCommitteeName(string id);
    }
}
