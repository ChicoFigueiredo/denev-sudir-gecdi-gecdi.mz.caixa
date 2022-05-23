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
    [Authorize(Role.Admin,Role.GECDI,Role.GestorTI,Role.Solicitante,Role.Transmissor,Role.User)]
    public class UnidadesController : ControllerBase
    {
        private readonly dbAtendimento _context;

        public UnidadesController(dbAtendimento context)
        {
            _context = context;
        }

        // GET: api/Unidades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Unidades>>> GetUnidades(string q = "",int limit=5)
        {
            if (limit<=-1){
                if(q.Trim()=="")
                    return await _context.Unidades.ToListAsync();
                else
                    return await _context.Unidades.Where(w => w.CGC.ToString().Contains(q) || w.Nome_Exibicao.ToLower().Contains(q.ToLower())).ToListAsync();
            }
            else 
            {
                if(q.Trim()=="")
                    return await _context.Unidades.Take(limit).ToListAsync();
                else
                    return await _context.Unidades.Where(w => w.CGC.ToString().Contains(q) || w.Nome_Exibicao.ToLower().Contains(q.ToLower())).Take(limit).ToListAsync();
            }
        }

        // GET: api/Unidades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Unidades>> GetUnidades(int id)
        {
            var unidades = await _context.Unidades.FindAsync(id);

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

            _context.Entry(unidades).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
            _context.Unidades.Add(unidades);
            try
            {
                await _context.SaveChangesAsync();
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
            var unidades = await _context.Unidades.FindAsync(id);
            if (unidades == null)
            {
                return NotFound();
            }

            _context.Unidades.Remove(unidades);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UnidadesExists(int id)
        {
            return _context.Unidades.Any(e => e.CGC == id);
        }
    }
}
