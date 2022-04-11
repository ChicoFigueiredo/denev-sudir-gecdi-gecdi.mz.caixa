using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gecdi.mz.caixa.Models.AtenderDigital;

namespace gecdi.mz.caixa.Controllers.CacheParametros
{
    [Route("api/[controller]")]
    [ApiController]
    public class CacheParametroesController : ControllerBase
    {
        private readonly dbAtenderDigital _context;

        public CacheParametroesController(dbAtenderDigital context)
        {
            _context = context;
        }

        // GET: api/CacheParametroes
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<CacheParametro>>> GetCacheParametros()
        //{
        //    return await _context.CacheParametros.ToListAsync();
        //}

        // GET: api/CacheParametroes/5
        [HttpGet("{id?}")]
        public async Task<ActionResult<CacheParametro>> GetCacheParametro(byte id=1)
        {
            var cacheParametro = await _context.CacheParametros.FindAsync(id);

            if (cacheParametro == null)
            {
                return NotFound();
            }

            return cacheParametro;
        }

        // PUT: api/CacheParametroes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCacheParametro(byte id, CacheParametro cacheParametro)
        {
            if (id != cacheParametro.idCacheParametros)
            {
                return BadRequest();
            }

            _context.Entry(cacheParametro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CacheParametroExists(id))
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

        // POST: api/CacheParametroes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CacheParametro>> PostCacheParametro(CacheParametro cacheParametro)
        {
            _context.CacheParametros.Add(cacheParametro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCacheParametro", new { id = cacheParametro.idCacheParametros }, cacheParametro);
        }

        // DELETE: api/CacheParametroes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCacheParametro(byte id)
        {
            var cacheParametro = await _context.CacheParametros.FindAsync(id);
            if (cacheParametro == null)
            {
                return NotFound();
            }

            _context.CacheParametros.Remove(cacheParametro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CacheParametroExists(byte id)
        {
            return _context.CacheParametros.Any(e => e.idCacheParametros == id);
        }
    }
}
