using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using PushAPI.Models.Atendimento;
using PushAPI.Helpers;

namespace gecdi.mz.caixa.Controllers.GECDI.TemplatesChamados
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Templates_RespostaController : ControllerBase
    {
        private readonly dbAtendimento _dbAtendimento;

        public Templates_RespostaController(dbAtendimento context)
        {
            _dbAtendimento = context;
        }

        // GET: api/Templates_Resposta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Templates_Respostas>>> GetTemplates_Respostas()
        {
            List<Templates_Respostas> tr = await _dbAtendimento.Templates_Respostas
                                                        .Include(i => i.CGC_TranferenciaNavigation)
                                                        .ToListAsync<Templates_Respostas>();
            return tr;
        }

        // GET: api/Templates_Resposta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Templates_Respostas>> GetTemplates_Resposta(string id)
        {
            var templates_Resposta = await _dbAtendimento.Templates_Respostas.FindAsync(id);

            if (templates_Resposta == null)
            {
                return NotFound();
            }

            return templates_Resposta;
        }

        // PUT: api/Templates_Resposta/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTemplates_Resposta(string id, Templates_Respostas templates_Resposta)
        {
            if (id != templates_Resposta.vTemplateResposta)
            {
                return BadRequest();
            }

            _dbAtendimento.Entry(templates_Resposta).State = EntityState.Modified;

            try
            {
                await _dbAtendimento.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Templates_RespostaExists(id))
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

        // POST: api/Templates_Resposta
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Templates_Respostas>> PostTemplates_Resposta(Templates_Respostas templates_Resposta)
        {
            _dbAtendimento.Templates_Respostas.Add(templates_Resposta);
            try
            {
                await _dbAtendimento.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Templates_RespostaExists(templates_Resposta.vTemplateResposta))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTemplates_Resposta", new { id = templates_Resposta.vTemplateResposta }, templates_Resposta);
        }

        // DELETE: api/Templates_Resposta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplates_Resposta(string id)
        {
            var templates_Resposta = await _dbAtendimento.Templates_Respostas.FindAsync(id);
            if (templates_Resposta == null)
            {
                return NotFound();
            }

            _dbAtendimento.Templates_Respostas.Remove(templates_Resposta);
            await _dbAtendimento.SaveChangesAsync();

            return NoContent();
        }

        private bool Templates_RespostaExists(string id)
        {
            return _dbAtendimento.Templates_Respostas.Any(e => e.vTemplateResposta == id);
        }
    }
}
