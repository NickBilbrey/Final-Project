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
    public class DictionariesController : ControllerBase
    {
        private readonly SmalltalKContext _context;

        public DictionariesController(SmalltalKContext context)
        {
            _context = context;
        }

        // GET: api/Dictionaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dictionary>>> GetDictionaries()
        {
          if (_context.Dictionaries == null)
          {
              return NotFound();
          }
            return await _context.Dictionaries.ToListAsync();
        }

        // GET: api/Dictionaries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Dictionary>>> GetDictionaries(int id)
        {
            if (_context.Dictionaries == null)
            {
                return NotFound();
            }
            var dictionaries = await _context.Dictionaries.Where(x => x.UserId == id).ToListAsync();

            if (dictionaries == null)
            {
                return NotFound();
            }

            return dictionaries;
        }

        // PUT: api/Dictionaries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDictionary(int id, Dictionary dictionary)
        {
            if (id != dictionary.DictionaryId)
            {
                return BadRequest();
            }

            _context.Entry(dictionary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DictionaryExists(id))
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

        // POST: api/Dictionaries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Dictionary>> PostDictionary(Dictionary dictionary)
        {
          if (_context.Dictionaries == null)
          {
              return Problem("Entity set 'SmalltalKContext.Dictionaries' is null.");
          }
            _context.Dictionaries.Add(dictionary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDictionary", new { id = dictionary.DictionaryId }, dictionary);
        }

        // DELETE: api/Dictionaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDictionary(int id)
        {
            if (_context.Dictionaries == null)
            {
                return NotFound();
            }
            var dictionary = await _context.Dictionaries.FindAsync(id);
            if (dictionary == null)
            {
                return NotFound();
            }

            _context.Dictionaries.Remove(dictionary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DictionaryExists(int id)
        {
            return (_context.Dictionaries?.Any(e => e.DictionaryId == id)).GetValueOrDefault();
        }
    }
}
