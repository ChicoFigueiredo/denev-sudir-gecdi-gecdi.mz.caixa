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

namespace PushAPI.Controllers.PUSH.Envio
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EnviosController : ControllerBase
    {
        private readonly dbPUSH _dbPush;

        public EnviosController(dbPUSH context)
        {
            _dbPush = context;
        }

        // GET: api/Envios
        [HttpGet("lista")]
        public async Task<ActionResult<IEnumerable<Solicitacao_Simulacao_Envio>>> GetSolicitacao_Simulacao_Envio(DateTime? De, DateTime? Ate, int Enviados = 0, bool NaoEnviadosAntigos = true)
        {
            DateTime xDe = DateTime.Now.Date;
            DateTime xAte = DateTime.Now.Date;

            if (De != null)
                xDe = (DateTime)De;

            if (Ate != null)
                xAte = (DateTime)De;

            if (Enviados < 0)
            {

                if (NaoEnviadosAntigos)
                    return await _dbPush.Solicitacao_Simulacao_Envio
                                        .Include(r => r.idSolicitacao_PUSHNavigation)
                                        .Where(x => (x.Data >= xDe && x.Data <= xAte || (x.Data < xAte && x.Enviado == false)))
                                        .OrderBy(o => o.Data)
                                        .ThenBy(o => o.Hora)
                                        .ToListAsync();
                else
                    return await _dbPush.Solicitacao_Simulacao_Envio
                                        .Include(r => r.idSolicitacao_PUSHNavigation)
                                        .Where(x => (x.Data >= xDe && x.Data <= xAte))
                                        .OrderBy(o => o.Data)
                                        .ThenBy(o => o.Hora)
                                        .ToListAsync();
            }
            else
            {
                bool bEnvio = Enviados == 0 ? false : true;
            
                if (NaoEnviadosAntigos)
                    return await _dbPush.Solicitacao_Simulacao_Envio
                                        .Include(r => r.idSolicitacao_PUSHNavigation)
                                        .Where(x => (x.Data >= xDe && x.Data <= xAte) || (x.Data < xAte && x.Enviado == bEnvio))
                                        .OrderBy(o => o.Data)
                                        .ThenBy(o => o.Hora)
                                        .ToListAsync();
                else
                    return await _dbPush.Solicitacao_Simulacao_Envio
                                        .Include(r => r.idSolicitacao_PUSHNavigation)
                                        .Where(x => x.Data >= xDe && x.Data <= xAte)
                                        .OrderBy(o => o.Data)
                                        .ThenBy(o => o.Hora)
                                        .ToListAsync();
            }
            
        }

        // GET: api/Envios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solicitacao_Simulacao_Envio>> GetSolicitacao_Simulacao_Envio(long id)
        {
            var solicitacao_Simulacao_Envio = await _dbPush.Solicitacao_Simulacao_Envio.FindAsync(id);

            if (solicitacao_Simulacao_Envio == null)
                return NotFound();

            return solicitacao_Simulacao_Envio;
        }


        // GET: api/Envios/5/MarcarEnviado
        [HttpPost("{id}/MarcarEnviado")]
        public async Task<ActionResult<Solicitacao_Simulacao_Envio>> GetSolicitacao_Simulacao_Envio_MarcarEnvio(long id, bool MarcarEnvioRealizado = true)
        {
            var solicitacao_Simulacao_Envio = await _dbPush.Solicitacao_Simulacao_Envio.FindAsync(id);

            if (solicitacao_Simulacao_Envio == null)
                return NotFound();

            if (solicitacao_Simulacao_Envio.Homologado)
            {
                solicitacao_Simulacao_Envio.Enviado = MarcarEnvioRealizado;
                await _dbPush.SaveChangesAsync();

                return Ok(solicitacao_Simulacao_Envio);

            }
            else
                return BadRequest(new { Error = 1000, Message = "Não é possível marcar enviado em um envio simulado e não homologado" });
        }

        // GET: api/Envios/5/MarcarCancelado
        [HttpPost("{id}/MarcarCancelado")]
        public async Task<ActionResult<Solicitacao_Simulacao_Envio>> GetSolicitacao_Simulacao_Envio_MarcarCancelamento(long id, bool MarcarCancelado = false)
        {
            var solicitacao_Simulacao_Envio = await _dbPush.Solicitacao_Simulacao_Envio.FindAsync(id);

            if (solicitacao_Simulacao_Envio == null)
                return NotFound();

            if (solicitacao_Simulacao_Envio.Homologado)
            {
                solicitacao_Simulacao_Envio.Cancelado = MarcarCancelado;
                await _dbPush.SaveChangesAsync();

                return Ok(solicitacao_Simulacao_Envio);

            }
            else
                return BadRequest(new { Error = 1000, Message = "Não é possível marcar cancelado em um envio simulado e não homologado" });
        }

        // PUT: api/Envios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolicitacao_Simulacao_Envio(long id, Solicitacao_Simulacao_Envio solicitacao_Simulacao_Envio)
        {
            if (id != solicitacao_Simulacao_Envio.idSolicitacao_Simulacao_Envio)
            {
                return BadRequest();
            }

            _dbPush.Entry(solicitacao_Simulacao_Envio).State = EntityState.Modified;

            try
            {
                await _dbPush.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Solicitacao_Simulacao_EnvioExists(id))
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

        // POST: api/Envios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Role.Admin)]
        public async Task<ActionResult<Solicitacao_Simulacao_Envio>> PostSolicitacao_Simulacao_Envio(Solicitacao_Simulacao_Envio solicitacao_Simulacao_Envio)
        {
            _dbPush.Solicitacao_Simulacao_Envio.Add(solicitacao_Simulacao_Envio);
            await _dbPush.SaveChangesAsync();

            return CreatedAtAction("GetSolicitacao_Simulacao_Envio", new { id = solicitacao_Simulacao_Envio.idSolicitacao_Simulacao_Envio }, solicitacao_Simulacao_Envio);
        }

        // DELETE: api/Envios/5/delete
        [HttpPost("{id}/delete")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> DeleteSolicitacao_Simulacao_Envio(long id)
        {
            var solicitacao_Simulacao_Envio = await _dbPush.Solicitacao_Simulacao_Envio.FindAsync(id);
            if (solicitacao_Simulacao_Envio == null)
                return NotFound();

            _dbPush.Solicitacao_Simulacao_Envio.Remove(solicitacao_Simulacao_Envio);
            await _dbPush.SaveChangesAsync();

            return NoContent();
        }

        private bool Solicitacao_Simulacao_EnvioExists(long id)
        {
            return _dbPush.Solicitacao_Simulacao_Envio.Any(e => e.idSolicitacao_Simulacao_Envio == id);
        }
    }
}
