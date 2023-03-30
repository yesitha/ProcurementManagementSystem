using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using PWMSBackend.Models;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommitteeMembersController : ControllerBase
    {
        private readonly DataContext _context;

        public CommitteeMembersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CommitteeMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommitteeMember>>> GetCommitteeMembers()
        {
          if (_context.CommitteeMembers == null)
          {
              return NotFound();
          }
            return await _context.CommitteeMembers.ToListAsync();
        }

        // GET: api/CommitteeMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommitteeMember>> GetCommitteeMember(string id)
        {
          if (_context.CommitteeMembers == null)
          {
              return NotFound();
          }
            var committeeMember = await _context.CommitteeMembers.FindAsync(id);

            if (committeeMember == null)
            {
                return NotFound();
            }

            return committeeMember;
        }

        // PUT: api/CommitteeMembers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommitteeMember(string id, CommitteeMember committeeMember)
        {
            if (id != committeeMember.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(committeeMember).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommitteeMemberExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CommitteeMembers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CommitteeMember>> PostCommitteeMember(CommitteeMember committeeMember)
        {
          if (_context.CommitteeMembers == null)
          {
              return Problem("Entity set 'DataContext.CommitteeMembers'  is null.");
          }
            _context.CommitteeMembers.Add(committeeMember);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CommitteeMemberExists(committeeMember.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCommitteeMember", new { id = committeeMember.EmployeeId }, committeeMember);
        }

        // DELETE: api/CommitteeMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommitteeMember(string id)
        {
            if (_context.CommitteeMembers == null)
            {
                return NotFound();
            }
            var committeeMember = await _context.CommitteeMembers.FindAsync(id);
            if (committeeMember == null)
            {
                return NotFound();
            }

            _context.CommitteeMembers.Remove(committeeMember);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommitteeMemberExists(string id)
        {
            return (_context.CommitteeMembers?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}
