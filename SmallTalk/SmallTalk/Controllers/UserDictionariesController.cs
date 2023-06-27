using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmallTalk;

namespace SmallTalk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDictionariesController : ControllerBase
    {
        private readonly SmalltalKContext _context;

        public UserDictionariesController(SmalltalKContext context)
        {
            _context = context;
        }

        // GET: api/UserDictionaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDictionary>>> GetUserDictionaries()
        {
          if (_context.UserDictionaries == null)
          {
              return NotFound();
          }
            return await _context.UserDictionaries.ToListAsync();
        }

        // GET: api/UserDictionaries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<UserDictionary>>> GetUserDictionary(int id)
        {
          if (_context.UserDictionaries == null)
          {
              return NotFound();
          }
            var userDictionary = await _context.UserDictionaries.Where(ud => ud.DictionaryId == id).ToListAsync();

            if (userDictionary == null)
            {
                return NotFound();
            }

            return userDictionary;
        }

        // PUT: api/UserDictionaries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserDictionary(int id, UserDictionary userDictionary)
        {
            if (id != userDictionary.EntryId)
            {
                return BadRequest();
            }

            _context.Entry(userDictionary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDictionaryExists(id))
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

        // POST: api/UserDictionaries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserDictionary>> PostUserDictionary(UserDictionary userDictionary)
        {
          if (_context.UserDictionaries == null)
          {
              return Problem("Entity set 'SmalltalKContext.UserDictionaries' is null.");
          }
            _context.UserDictionaries.Add(userDictionary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserDictionary", new { id = userDictionary.EntryId }, userDictionary);
        }

        // DELETE: api/UserDictionaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserDictionary(int id)
        {
            if (_context.UserDictionaries == null)
            {
                return NotFound();
            }
            var userDictionary = await _context.UserDictionaries.FindAsync(id);
            if (userDictionary == null)
            {
                return NotFound();
            }

            _context.UserDictionaries.Remove(userDictionary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserDictionaryExists(int id)
        {
            return (_context.UserDictionaries?.Any(e => e.EntryId == id)).GetValueOrDefault();
        }
    }
}
