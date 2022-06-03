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
using PushAPI.Models.Sites;

namespace PushAPI.Controllers.PUSH.Solicitacoes_Clientes
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClientesController : ControllerBase
    {
        private readonly dbPUSH _dbPUSH;

        public ClientesController(dbPUSH context)
        {
            _dbPUSH = context;
        }

        // GET: api/Clientes
        [HttpGet]
        [Authorize(Role.Admin)]
        public async Task<ActionResult<IEnumerable<Solicitacao_Clientes>>> GetSolicitacao_Clientes()
        {
            return await _dbPUSH.Solicitacao_Clientes.ToListAsync();
        }

        // GET: api/Clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solicitacao_Clientes>> GetSolicitacao_Clientes(long id)
        {
            var solicitacao_Clientes = await _dbPUSH.Solicitacao_Clientes.FindAsync((int)id);

            if (solicitacao_Clientes == null)
            {
                return NotFound();
            }

            return solicitacao_Clientes;
        }

                // GET: api/Clientes/solicitacao/5
        [HttpGet("solicitacao/{id}")]
        public async Task<ActionResult<List<Solicitacao_Clientes>>> GetSolicitacao_Clientes_da_Solicitacao(int id, int skip = 0, int lim = 30, string cpf="")
        {
            Usuario u = HttpContext.Items["User"] as Usuario;
            if (lim > 100 && u.idRole == 1) 
                lim = 100;

            List<Solicitacao_Clientes> clientes_sol = (cpf??"").Trim() == "" ?
                   await _dbPUSH.Solicitacao_Clientes
                                .AsNoTracking()
                                .Where(w => w.idSolicitacao_PUSH == id)
                                .Include(i => i.idSolicitacao_PUSHNavigation)
                                .Skip(skip)
                                .Take(lim)
                                .ToListAsync<Solicitacao_Clientes>()
                  : await _dbPUSH.Solicitacao_Clientes
                                .AsNoTracking()
                                .Where(w => w.idSolicitacao_PUSH == id && w.CPF == long.Parse(cpf.Trim()))
                                .Include(i => i.idSolicitacao_PUSHNavigation)
                                .Skip(skip)
                                .Take(lim)
                                .ToListAsync<Solicitacao_Clientes>();

            return Ok(clientes_sol);
        }



        // PUT: api/Clientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolicitacao_Clientes(long id, Solicitacao_Clientes solicitacao_Clientes)
        {
            if (id != solicitacao_Clientes.idSolicitacao_Cliente)
            {
                return BadRequest();
            }

            _dbPUSH.Entry(solicitacao_Clientes).State = EntityState.Modified;

            try
            {
                await _dbPUSH.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Solicitacao_ClientesExists(id))
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

        // POST: api/Clientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Solicitacao_Clientes>> PostSolicitacao_Clientes(Solicitacao_Clientes solicitacao_Clientes)
        {
            _dbPUSH.Solicitacao_Clientes.Add(solicitacao_Clientes);
            await _dbPUSH.SaveChangesAsync();

            return CreatedAtAction("GetSolicitacao_Clientes", new { id = solicitacao_Clientes.idSolicitacao_Cliente }, solicitacao_Clientes);
        }

        // DELETE: api/Clientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolicitacao_Clientes(long id)
        {
            var solicitacao_Clientes = await _dbPUSH.Solicitacao_Clientes.FindAsync(id);
            if (solicitacao_Clientes == null)
            {
                return NotFound();
            }

            _dbPUSH.Solicitacao_Clientes.Remove(solicitacao_Clientes);
            await _dbPUSH.SaveChangesAsync();

            return NoContent();
        }

        private bool Solicitacao_ClientesExists(long id)
        {
            return _dbPUSH.Solicitacao_Clientes.Any(e => e.idSolicitacao_Cliente == id);
        }
    }
}
