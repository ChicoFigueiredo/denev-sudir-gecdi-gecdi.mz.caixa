#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PushAPI.Helpers;
using PushAPI.Models.Push;

namespace PushAPI.Controllers.PUSH.CanaisEnvio
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Role.Admin,Role.GECDI,Role.GestorTI,Role.Solicitante,Role.Transmissor,Role.User)]
    public class CanaisController : ControllerBase
    {
        private readonly dbPUSH _dbPUSH;

        public CanaisController(dbPUSH context)
        {
            _dbPUSH = context;
        }

        // GET: api/Canais
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Canais>>> GetCanais(bool soHabilitados = true)
        {
            return soHabilitados ? await _dbPUSH.Canais.Where(c => (c.Disponivel ?? false)).ToListAsync() : await _dbPUSH.Canais.ToListAsync();
        }

        // GET: api/Canais/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Canais>> GetCanais(string id)
        {
            var canais = await _dbPUSH.Canais.FindAsync(id);

            if (canais == null)
            {
                return NotFound();
            }

            return canais;
        }

        // PUT: api/Canais/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> PutCanais(string id, Canais canais)
        {
            if (id != canais.Canal)
            {
                return BadRequest();
            }

            _dbPUSH.Entry(canais).State = EntityState.Modified;

            try
            {
                await _dbPUSH.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CanaisExists(id))
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

        // POST: api/Canais
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Role.Admin)]
        public async Task<ActionResult<Canais>> PostCanais(Canais canais)
        {
            _dbPUSH.Canais.Add(canais);
            await _dbPUSH.SaveChangesAsync();

            return CreatedAtAction("GetCanais", new { id = canais.Canal }, canais);
        }

        // DELETE: api/Canais/5
        [HttpDelete("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> DeleteCanais(string id)
        {
            var canais = await _dbPUSH.Canais.FindAsync(id);
            if (canais == null)
            {
                return NotFound();
            }

            _dbPUSH.Canais.Remove(canais);
            await _dbPUSH.SaveChangesAsync();

            return NoContent();
        }

        private bool CanaisExists(string id)
        {
            return _dbPUSH.Canais.Any(e => e.Canal == id);
        }
    }
}
