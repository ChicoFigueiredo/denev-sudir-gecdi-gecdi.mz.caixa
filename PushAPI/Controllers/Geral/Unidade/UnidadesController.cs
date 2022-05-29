#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PushAPI.Helpers;
using PushAPI.Models.Atendimento;

namespace PushAPI.Controllers.Geral.Unidade
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnidadesController : ControllerBase
    {
        private readonly dbAtendimento _dbAtendimento;

        public UnidadesController(dbAtendimento context)
        {
            _dbAtendimento = context;
        }

        // GET: api/Unidades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Unidades>>> GetUnidades(string q = "",int limit=5)
        {
            if (limit<=-1){
                if(q.Trim()=="")
                    return await _dbAtendimento.Unidades.ToListAsync();
                else
                    return await _dbAtendimento.Unidades.Where(w => w.CGC.ToString().Contains(q) || w.Nome_Exibicao.ToLower().Contains(q.ToLower())).ToListAsync();
            }
            else 
            {
                if(q.Trim()=="")
                    return await _dbAtendimento.Unidades.Take(limit).ToListAsync();
                else
                    return await _dbAtendimento.Unidades.Where(w => w.CGC.ToString().Contains(q) || w.Nome_Exibicao.ToLower().Contains(q.ToLower())).Take(limit).ToListAsync();
            }
        }

        // GET: api/Unidades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Unidades>> GetUnidades(int id)
        {
            var unidades = await _dbAtendimento.Unidades.FindAsync(id);

            if (unidades == null)
            {
                return NotFound();
            }

            return unidades;
        }

        // PUT: api/Unidades/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> PutUnidades(int id, Unidades unidades)
        {
            if (id != unidades.CGC)
            {
                return BadRequest();
            }

            _dbAtendimento.Entry(unidades).State = EntityState.Modified;

            try
            {
                await _dbAtendimento.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UnidadesExists(id))
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

        // POST: api/Unidades
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Role.Admin)]
        public async Task<ActionResult<Unidades>> PostUnidades(Unidades unidades)
        {
            _dbAtendimento.Unidades.Add(unidades);
            try
            {
                await _dbAtendimento.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UnidadesExists(unidades.CGC))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUnidades", new { id = unidades.CGC }, unidades);
        }

        // DELETE: api/Unidades/5
        [HttpDelete("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> DeleteUnidades(int id)
        {
            var unidades = await _dbAtendimento.Unidades.FindAsync(id);
            if (unidades == null)
            {
                return NotFound();
            }

            _dbAtendimento.Unidades.Remove(unidades);
            await _dbAtendimento.SaveChangesAsync();

            return NoContent();
        }

        private bool UnidadesExists(int id)
        {
            return _dbAtendimento.Unidades.Any(e => e.CGC == id);
        }
    }
}
