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
using PushAPI.Responses;
using System.Data;
using System.Data.SqlClient;

namespace PushAPI.Controllers.PUSH.Envio
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnviosController : ControllerBase
    {
        private readonly dbPUSH _dbPush;

        public EnviosController(dbPUSH context)
        {
            _dbPush = context;
        }

        // GET: api/Envios/lista
        [HttpGet("lista")]
        public async Task<ActionResult<IEnumerable<Solicitacao_Simulacao_Envio>>> GetSolicitacao_Simulacao_Envio(DateTime? De, DateTime? Ate, int Enviados = 0, bool NaoEnviadosAntigos = true, bool simular = false)
        {
            DateTime xDe = DateTime.Now.Date;
            DateTime xAte = DateTime.Now.Date;

            if (De != null)
                xDe = (DateTime)De;

            if (Ate != null)
                xAte = (DateTime)De;

            if (simular)
                _ = await _dbPush.Database.ExecuteSqlRawAsync($"DB5138_PUSH.FILA.Simular_Envio_PUSH @Processar = 1, @Data_Processar = '{xDe.ToString("yyyy-MM-dd")}', @Hora_Inicio = '00:00', @Hora_Fim = '23:59' ");

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


        // GET: api/envios/resumo
        [HttpGet("resumo")]
        public async Task<ActionResult<IEnumerable<spResumo_Envios>>> GetSolicitacao_Simulacao_Envio_Resumo(DateTime? Data_Resumo)
        {
            DateTime Data_Resumo_Apurado = Data_Resumo ?? DateTime.Now.Date;
            return await _dbPush.spResumo_Envios.FromSqlRaw<spResumo_Envios>($"EXEC DB5138_PUSH.Fila.Resumo_Envios '{Data_Resumo_Apurado.ToString("yyyy-MM-dd")}'").ToListAsync();
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
                Usuario u = HttpContext.Items["User"] as Usuario;
                solicitacao_Simulacao_Envio.Enviado = MarcarEnvioRealizado;
                solicitacao_Simulacao_Envio.Matricula_Enviante = u.cUsuario;
                solicitacao_Simulacao_Envio.Data_Hora_Atualizacao = DateTime.Now;
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


        // POST: api/Envios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("execute-robo")]
        [Authorize(Role.Admin)]
        public async Task PostSolicitacao_RoboUploadFiles()
        {
            await ExecuteSQLForWeb.ExecuteSQL(Response, _dbPush.Database.GetDbConnection().ConnectionString,
                @"EXEC FILA.Upload_Executa_Robo  1"
            );
        }

        // POST: api/Envios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("homologar")]
        [Authorize(Role.Admin)]
        public async Task PostSolicitacao_Homologacao(
                bool homologar = true, 
                bool gerar_arquivos = true, 
                DateTime? data = null, 
                string hora_inicio = "07:00", 
                string hora_fim = "21:00",
                string pasta_geracao = @"\\df7436sr671\Sigdb\PUB\!Push\Export",
                string pasta_destino = @"\\Cr7260nt036\sicpu\GECDI\GECDI"
        )
        {
            DateTime data_Final = data ?? DateTime.Now.Date;
            await ExecuteSQLForWeb.ExecuteSQL(Response, _dbPush.Database.GetDbConnection().ConnectionString,
                @$"
                    DECLARE 
                            @Homologar       BIT           = {(homologar ? 1 : 0)},
                            @Gerar_Arquivos  BIT           = {(gerar_arquivos ? 1 : 0)},
                            @Data_Processar  AS DATE       = '{ data_Final.ToString("yyyy-MM-dd")}',
                            @Hora_Inicio     AS TIME(0)    = '{ hora_inicio }',
                            @Hora_Fim        AS TIME(0)    = '{ hora_fim }'
        
                    IF (@Homologar=1) 
                        EXEC DB5138_PUSH.FILA.Homologar_Envios_e_Marcar_CPF 
                                 @Data_Processar  = @Data_Processar  
                                ,@Hora_Inicio     = @Hora_Inicio     
                                ,@Hora_Fim        = @Hora_Fim        

                    if (@Gerar_Arquivos=1)
                        EXEC DB5138_PUSH.FILA.Gerar_Arquivos_do_Dia 
                             @DATA                  = @Data_Processar  
                            ,@ROOT_DIR              = N'{ pasta_geracao }' -- N'\\df7436sr671\Sigdb\PUB\!Push\Export' --N'\\Cr7260nt036\sicpu\GECDI\GECDI' --N'\\df7436sr671\Sigdb\PUB\!Push\Export' --N'\\arquivos.caixa\br\df5325fs201\SUESC\Publico\!PUSH'
                            ,@Segundos_execucao     = 5


                    EXEC Fila.Servico_CAIXA_Geracao_Mensagem 
       	                    @DATA       = @Data_Processar,
                            @ROOT_DIR   = '{ pasta_destino }' --'\\Cr7260nt036\sicpu\GECDI\GECDI',
                            @TIME_INI   = '00:00:00',
                            @TIME_FIM   = '23:59:00'
                "
            );
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
