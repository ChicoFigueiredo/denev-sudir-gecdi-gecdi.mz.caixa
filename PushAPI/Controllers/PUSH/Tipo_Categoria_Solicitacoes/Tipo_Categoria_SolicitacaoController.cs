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

namespace PushAPI.Controllers.PUSH.Tipo_Categoria_Solicitacoes
{
    [Route("api/[controller]")]
    [ApiController]
    public class Tipo_Categoria_SolicitacaoController : ControllerBase
    {
        private readonly dbPUSH _dbPUSH;

        public Tipo_Categoria_SolicitacaoController(dbPUSH context)
        {
            _dbPUSH = context;
        }

        // GET: api/Tipo_Categoria_Solicitacao
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tipo_Categoria_Solicitacao>>> GetTipo_Categoria_Solicitacao()
        {
            return await _dbPUSH.Tipo_Categoria_Solicitacao.ToListAsync();
        }

        // GET: api/Tipo_Categoria_Solicitacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tipo_Categoria_Solicitacao>> GetTipo_Categoria_Solicitacao(short id)
        {
            var tipo_Categoria_Solicitacao = await _dbPUSH.Tipo_Categoria_Solicitacao.FindAsync(id);

            if (tipo_Categoria_Solicitacao == null)
            {
                return NotFound();
            }

            return tipo_Categoria_Solicitacao;
        }

        // PUT: api/Tipo_Categoria_Solicitacao/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> PutTipo_Categoria_Solicitacao(short id, Tipo_Categoria_Solicitacao tipo_Categoria_Solicitacao)
        {
            if (id != tipo_Categoria_Solicitacao.Tipo_Categoria_Solicitacao1)
            {
                return BadRequest();
            }

            _dbPUSH.Entry(tipo_Categoria_Solicitacao).State = EntityState.Modified;

            try
            {
                await _dbPUSH.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Tipo_Categoria_SolicitacaoExists(id))
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

        // POST: api/Tipo_Categoria_Solicitacao
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Role.Admin)]
        public async Task<ActionResult<Tipo_Categoria_Solicitacao>> PostTipo_Categoria_Solicitacao(Tipo_Categoria_Solicitacao tipo_Categoria_Solicitacao)
        {
            _dbPUSH.Tipo_Categoria_Solicitacao.Add(tipo_Categoria_Solicitacao);
            await _dbPUSH.SaveChangesAsync();

            return CreatedAtAction("GetTipo_Categoria_Solicitacao", new { id = tipo_Categoria_Solicitacao.Tipo_Categoria_Solicitacao1 }, tipo_Categoria_Solicitacao);
        }

        // DELETE: api/Tipo_Categoria_Solicitacao/5
        [HttpDelete("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> DeleteTipo_Categoria_Solicitacao(short id)
        {
            var tipo_Categoria_Solicitacao = await _dbPUSH.Tipo_Categoria_Solicitacao.FindAsync(id);
            if (tipo_Categoria_Solicitacao == null)
            {
                return NotFound();
            }

            _dbPUSH.Tipo_Categoria_Solicitacao.Remove(tipo_Categoria_Solicitacao);
            await _dbPUSH.SaveChangesAsync();

            return NoContent();
        }

        private bool Tipo_Categoria_SolicitacaoExists(short id)
        {
            return _dbPUSH.Tipo_Categoria_Solicitacao.Any(e => e.Tipo_Categoria_Solicitacao1 == id);
        }
    }
}
