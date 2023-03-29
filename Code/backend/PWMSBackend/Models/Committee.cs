namespace PWMSBackend.Models
{
    public class Committee
    {
        public string CommitteeId { get; set; }
        public ICollection<CommitteeMemberCommitee> CommitteeMembersCommittees { get; set; }
    }
}