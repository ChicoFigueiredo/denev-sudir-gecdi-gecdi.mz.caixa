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

namespace PushAPI.Controllers.PUSH.Solicitacao_PUSH
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SolicitacaoController : ControllerBase
    {
        private readonly dbPUSH _dbPush;

        public SolicitacaoController(dbPUSH context)
        {
            _dbPush = context;

        }

        // GET: api/Solicitacoes
        [HttpGet("lista")]
        public async Task<ActionResult<IEnumerable<Solicitacao>>> GetSolicitacao(bool prior = true, bool recount = true)
        {
            return await GetSolicitacaoCGC(-1, DateTime.Now.AddDays(-50000), prior, recount);
        }


        // GET: api/Solicitacoes/5325
        [HttpGet("lista/{cgc}")]
        public async Task<ActionResult<IEnumerable<Solicitacao>>> GetSolicitacaoCGC(int CGC, DateTime? De = null, bool prior = true, bool recount = true)
        {
            if (recount)
                _ = await _dbPush.Database.ExecuteSqlRawAsync("EXEC DB5138_PUSH.FILA.Atualiza_Contagem_de_Solicitacoes -1");

            if (De == null)
                De = DateTime.Now.AddDays(-90);


            if (prior)
            {
                if (CGC < 0)
                    return await _dbPush.Solicitacao
                        .Include(i => i.idEnvio_MensagemNavigation)
                        .OrderBy(o => (o.Quantidade_Agendada + o.Quantidade_Total_Restante == 0 || o.Cancelado) ? 1 : 0)
                        .ThenBy(o => o.Prioridade)
                        .ThenBy(o => o.Quantidade_Total_Restante)
                        .Where(x => x.Data_Cadastramento >= (DateTime)De).ToListAsync();
                else
                    return await _dbPush.Solicitacao
                        .Include(i => i.idEnvio_MensagemNavigation)
                        .OrderBy(o => (o.Quantidade_Agendada + o.Quantidade_Total_Restante == 0 || o.Cancelado) ? 1 : 0)
                        .ThenBy(o => o.Prioridade)
                        .ThenBy(o => o.Quantidade_Total_Restante)
                        .Where(x => (x.CGCDemandante == CGC || x.CGCExecutora == CGC) && x.Data_Cadastramento >= (DateTime)De).ToListAsync();
                /*
                 
            CASE WHEN Quantidade_Agendada + Quantidade_Total_Restante > 0 OR Cancelado = 0 OR Finalizado=1 THEN 0 ELSE 1 END
           ,CASE WHEN Quantidade_Agendada + Quantidade_Total_Restante > 0 THEN Prioridade ELSE Prioridade*100 END
           ,Quantidade_Total_Restante
                 */
            }
            else
            {
                if (CGC < 0)
                    return await _dbPush.Solicitacao
                        .Include(i => i.idEnvio_MensagemNavigation)
                        .Where(x => x.Data_Cadastramento >= (DateTime)De).ToListAsync();
                else
                    return await _dbPush.Solicitacao
                        .Include(i => i.idEnvio_MensagemNavigation)
                        .Where(x => (x.CGCDemandante == CGC || x.CGCExecutora == CGC) && x.Data_Cadastramento >= (DateTime)De).ToListAsync();
            }

        }

        // GET: api/Solicitacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solicitacao>> GetSolicitacao(int id)
        {
            var solicitacao = await _dbPush.Solicitacao.FindAsync(id);

            if (solicitacao == null)
            {
                return NotFound();
            }

            return solicitacao;
        }

        // PUT: api/Solicitacao/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolicitacao(int id, Solicitacao solicitacao)
        {
            if (id != solicitacao.idSolicitacao_PUSH)
            {
                return BadRequest();
            }

            _dbPush.Entry(solicitacao).State = EntityState.Modified;

            try
            {
                await _dbPush.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolicitacaoExists(id))
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

        // POST: api/Solicitacao
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Solicitacao>> PostSolicitacao(Solicitacao solicitacao)
        {
            _dbPush.Solicitacao.Add(solicitacao);
            await _dbPush.SaveChangesAsync();

            return CreatedAtAction("GetSolicitacao", new { id = solicitacao.idSolicitacao_PUSH }, solicitacao);
        }

        // DELETE: api/Solicitacao/5
        [HttpDelete("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> DeleteSolicitacao(int id)
        {
            var solicitacao = await _dbPush.Solicitacao.FindAsync(id);
            if (solicitacao == null)
            {
                return NotFound();
            }

            _dbPush.Solicitacao.Remove(solicitacao);
            await _dbPush.SaveChangesAsync();

            return NoContent();
        }

        private bool SolicitacaoExists(int id)
        {
            return _dbPush.Solicitacao.Any(e => e.idSolicitacao_PUSH == id);
        }
    }
}
