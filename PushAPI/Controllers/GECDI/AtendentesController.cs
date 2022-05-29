using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PushAPI.Helpers;
using PushAPI.Models.Atendimento;

namespace gecdi.mz.caixa.Controllers.GECDI
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AtendentesController : ControllerBase
    {
        private readonly dbAtendimento _dbAtendimentos;

        public AtendentesController(dbAtendimento context)
        {
            _dbAtendimentos = context;
        }

        // GET: api/Atendentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Atendentes>>> GetAtendentes(bool adicionarTodos = true, bool adicionarVazios = true, bool? incluirInativos = false)
        {
            List<Atendentes> listaAtendentes = new List<Atendentes>();

            if (adicionarTodos)
                listaAtendentes.Add(new Atendentes { vApelidoAtendente = "<Todos>" });

            if (adicionarVazios)
                listaAtendentes.Add(new Atendentes { vApelidoAtendente = "-VAZIO-" });

            listaAtendentes.AddRange(await _dbAtendimentos.Atendentes.Where(w=> w.bE_Ativo == (incluirInativos == null || (bool)incluirInativos) ? w.bE_Ativo : true).ToListAsync());

            return listaAtendentes;
        }

        // GET: api/Atendentes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Atendentes>> GetAtendente(string id)
        {
            var atendente = await _dbAtendimentos.Atendentes.FindAsync(id);

            if (atendente == null)
            {
                return NotFound();
            }

            return atendente;
        }

        // PUT: api/Atendentes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAtendente(string id, Atendentes atendente)
        {
            if (id != atendente.vApelidoAtendente)
            {
                return BadRequest();
            }

            _dbAtendimentos.Entry(atendente).State = EntityState.Modified;

            try
            {
                await _dbAtendimentos.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AtendenteExists(id))
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

        // POST: api/Atendentes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Atendentes>> PostAtendente(Atendentes atendente)
        {
            _dbAtendimentos.Atendentes.Add(atendente);
            try
            {
                await _dbAtendimentos.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AtendenteExists(atendente.vApelidoAtendente))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAtendente", new { id = atendente.vApelidoAtendente }, atendente);
        }

        // DELETE: api/Atendentes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAtendente(string id)
        {
            var atendente = await _dbAtendimentos.Atendentes.FindAsync(id);
            if (atendente == null)
            {
                return NotFound();
            }

            _dbAtendimentos.Atendentes.Remove(atendente);
            await _dbAtendimentos.SaveChangesAsync();

            return NoContent();
        }

        private bool AtendenteExists(string id)
        {
            return _dbAtendimentos.Atendentes.Any(e => e.vApelidoAtendente == id);
        }
    }
}
