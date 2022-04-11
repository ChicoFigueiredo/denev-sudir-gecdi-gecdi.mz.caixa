using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PushAPI.Models.Atendimento;

namespace gecdi.mz.caixa.Controllers.Cache_Parametros
{
    [Route("api/[controller]")]
    [ApiController]
    public class CacheParametroesController : ControllerBase
    {
        private readonly dbAtendimento _dbAtendimento;

        public CacheParametroesController(dbAtendimento context)
        {
            _dbAtendimento = context;
        }

        // GET: api/CacheParametroes
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<CacheParametro>>> GetCacheParametros()
        //{
        //    return await _context.CacheParametros.ToListAsync();
        //}

        // GET: api/CacheParametroes/5
        [HttpGet("{id?}")]
        public async Task<ActionResult<CacheParametros>> GetCacheParametro(byte id=1)
        {
            var cacheParametro = await _dbAtendimento.CacheParametros.FindAsync(id);

            if (cacheParametro == null)
            {
                return NotFound();
            }

            return cacheParametro;
        }

        // PUT: api/CacheParametroes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCacheParametro(byte id, CacheParametros cacheParametro)
        {
            if (id != cacheParametro.idCacheParametros)
            {
                return BadRequest();
            }

            _dbAtendimento.Entry(cacheParametro).State = EntityState.Modified;

            try
            {
                await _dbAtendimento.SaveChangesAsync();
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
        public async Task<ActionResult<CacheParametros>> PostCacheParametro(CacheParametros cacheParametro)
        {
            _dbAtendimento.CacheParametros.Add(cacheParametro);
            await _dbAtendimento.SaveChangesAsync();

            return CreatedAtAction("GetCacheParametro", new { id = cacheParametro.idCacheParametros }, cacheParametro);
        }

        // DELETE: api/CacheParametroes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCacheParametro(byte id)
        {
            var cacheParametro = await _dbAtendimento.CacheParametros.FindAsync(id);
            if (cacheParametro == null)
            {
                return NotFound();
            }

            _dbAtendimento.CacheParametros.Remove(cacheParametro);
            await _dbAtendimento.SaveChangesAsync();

            return NoContent();
        }

        private bool CacheParametroExists(byte id)
        {
            return _dbAtendimento.CacheParametros.Any(e => e.idCacheParametros == id);
        }
    }
}
