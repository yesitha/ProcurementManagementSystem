using System;
namespace PWMSBackend.Models
{
	public class Committee
	{
		public string CommitteeId { get; set; }
        public ICollection<CommitteeMemberCommittee> CommitteeMembersCommittees { get; set; }
	}
}

