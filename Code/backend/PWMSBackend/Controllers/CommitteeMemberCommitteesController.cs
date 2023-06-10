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
    public class CommitteeMemberCommitteesController : ControllerBase
    {
        private readonly DataContext _context;

        public CommitteeMemberCommitteesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CommitteeMemberCommittees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommitteeMemberCommittee>>> GetCommitteeMemberCommittees()
        {
          if (_context.CommitteeMemberCommittees == null)
          {
              return NotFound();
          }
            return await _context.CommitteeMemberCommittees.ToListAsync();
        }

        // GET: api/CommitteeMemberCommittees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommitteeMemberCommittee>> GetCommitteeMemberCommittee(string id)
        {
          if (_context.CommitteeMemberCommittees == null)
          {
              return NotFound();
          }
            var committeeMemberCommittee = await _context.CommitteeMemberCommittees.FindAsync(id);

            if (committeeMemberCommittee == null)
            {
                return NotFound();
            }

            return committeeMemberCommittee;
        }

        // PUT: api/CommitteeMemberCommittees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommitteeMemberCommittee(string id, CommitteeMemberCommittee committeeMemberCommittee)
        {
            if (id != committeeMemberCommittee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(committeeMemberCommittee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommitteeMemberCommitteeExists(id))
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

        // POST: api/CommitteeMemberCommittees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CommitteeMemberCommittee>> PostCommitteeMemberCommittee(CommitteeMemberCommittee committeeMemberCommittee)
        {
          if (_context.CommitteeMemberCommittees == null)
          {
              return Problem("Entity set 'DataContext.CommitteeMemberCommittees'  is null.");
          }
            _context.CommitteeMemberCommittees.Add(committeeMemberCommittee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CommitteeMemberCommitteeExists(committeeMemberCommittee.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCommitteeMemberCommittee", new { id = committeeMemberCommittee.EmployeeId }, committeeMemberCommittee);
        }

        // DELETE: api/CommitteeMemberCommittees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommitteeMemberCommittee(string id)
        {
            if (_context.CommitteeMemberCommittees == null)
            {
                return NotFound();
            }
            var committeeMemberCommittee = await _context.CommitteeMemberCommittees.FindAsync(id);
            if (committeeMemberCommittee == null)
            {
                return NotFound();
            }

            _context.CommitteeMemberCommittees.Remove(committeeMemberCommittee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommitteeMemberCommitteeExists(string id)
        {
            return (_context.CommitteeMemberCommittees?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}
