namespace PWMSBackend.Models
{
    public class CommitteeMember : ProcurementEmployee
    {
        public ICollection<CommitteeMemberCommitee> CommitteeMembersCommittees { get; set; }
    }
}