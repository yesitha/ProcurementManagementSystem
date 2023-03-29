namespace PWMSBackend.Models
{
    public class CommitteeMember : ProcurementEmployee
    {
        public ICollection<CommitteeMemberCommittee> CommitteeMembersCommittees { get; set; }
    }
}