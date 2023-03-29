namespace PWMSBackend.Models
{
    public class CommitteeMemberCommittee
    {
        public CommitteeMember CommitteeMember { get; set; }
        public Committee Committee { get; set; }

        public string EmployeeId { get; set; }
        public string CommitteeId { get; set; }
    }
}