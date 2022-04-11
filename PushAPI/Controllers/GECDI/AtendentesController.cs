using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gecdi.mz.caixa.Models.AtenderDigital;

namespace gecdi.mz.caixa.Controllers.GECDI
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtendentesController : ControllerBase
    {
        private readonly dbAtenderDigital _context;

        public AtendentesController(dbAtenderDigital context)
        {
            _context = context;
        }

        // GET: api/Atendentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Atendente>>> GetAtendentes(bool adicionarTodos = true, bool adicionarVazios = true, bool? incluirInativos = false)
        {
            List<Atendente> listaAtendentes = new List<Atendente>();

            if (adicionarTodos)
                listaAtendentes.Add(new Atendente { vApelidoAtendente = "<Todos>" });

            if (adicionarVazios)
                listaAtendentes.Add(new Atendente { vApelidoAtendente = "-VAZIO-" });

            listaAtendentes.AddRange(await _context.Atendentes.Where(w=> w.bE_Ativo == (incluirInativos == null || (bool)incluirInativos) ? w.bE_Ativo : true).ToListAsync());

            return listaAtendentes;
        }

        // GET: api/Atendentes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Atendente>> GetAtendente(string id)
        {
            var atendente = await _context.Atendentes.FindAsync(id);

            if (atendente == null)
            {
                return NotFound();
            }

            return atendente;
        }

        // PUT: api/Atendentes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAtendente(string id, Atendente atendente)
        {
            if (id != atendente.vApelidoAtendente)
            {
                return BadRequest();
            }

            _context.Entry(atendente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
        public async Task<ActionResult<Atendente>> PostAtendente(Atendente atendente)
        {
            _context.Atendentes.Add(atendente);
            try
            {
                await _context.SaveChangesAsync();
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
            var atendente = await _context.Atendentes.FindAsync(id);
            if (atendente == null)
            {
                return NotFound();
            }

            _context.Atendentes.Remove(atendente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AtendenteExists(string id)
        {
            return _context.Atendentes.Any(e => e.vApelidoAtendente == id);
        }
    }
}
