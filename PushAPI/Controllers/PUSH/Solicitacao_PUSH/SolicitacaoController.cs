#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PushAPI.Helpers;
using PushAPI.Models.Push;
using PushAPI.Models.Sites;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Options;

namespace PushAPI.Controllers.PUSH.Solicitacao_PUSH
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SolicitacaoController : ControllerBase
    {
        private readonly dbPUSH _dbPush;
        private readonly AppSettings _appSettings;

        public SolicitacaoController(dbPUSH context, IOptions<AppSettings> appSettings)
        {
            _dbPush = context;
            _appSettings = appSettings.Value;
        }

        // GET: api/Solicitacoes
        [HttpGet("lista")]
        public async Task<ActionResult<IEnumerable<Solicitacao>>> GetSolicitacao(DateTime? De = null, bool prior = true, bool recount = true, string order = "priority", bool soFila = true, int limit = 100)
        {
            return await GetSolicitacaoCGC(-1, DateTime.Now.AddDays(-50000), prior, recount, order, soFila, limit);
        }


        // GET: api/Solicitacoes/5325
        [HttpGet("lista/{cgc}")]
        public async Task<ActionResult<IEnumerable<Solicitacao>>> GetSolicitacaoCGC(int CGC, DateTime? De = null, bool prior = true, bool recount = true, string order = "priority", bool soFila = true, int limit = 100)
        {
            if (recount)
                _ = await _dbPush.Database.ExecuteSqlRawAsync("EXEC DB5138_PUSH.FILA.Atualiza_Contagem_de_Solicitacoes -1");

            if (De == null)
                De = DateTime.Now.AddDays(-90);

            System.Linq.Expressions.Expression<Func<Solicitacao, int>> orderFunc; //necessário para solicitar o ToListAsync encadeado
            System.Linq.Expressions.Expression<Func<Solicitacao, bool>> whereFunc; //necessário para solicitar o ToListAsync encadeado

            // filtros
            if (CGC < 0)
            {
                if (soFila)
                    whereFunc = x => x.Data_Cadastramento >= (DateTime)De && !x.Finalizado && !x.Cancelado;
                else
                    whereFunc = x => x.Data_Cadastramento >= (DateTime)De;
            }
            else
            {
                if (soFila)
                    whereFunc = x => (x.CGCDemandante == CGC || x.CGCExecutora == CGC) && x.Data_Cadastramento >= (DateTime)De && !x.Finalizado && !x.Cancelado;
                else
                    whereFunc = x => (x.CGCDemandante == CGC || x.CGCExecutora == CGC) && x.Data_Cadastramento >= (DateTime)De;
            }

            // ordenação
            switch (order.ToLower())
            {
                case "registro":
                case "id":
                case "idsolicitacao_push":
                    orderFunc = o => o.idSolicitacao_PUSH;
                    break;

                case "registrodesc":
                case "iddesc":
                case "idsolicitacao_pushdesc":
                    orderFunc = o => -o.idSolicitacao_PUSH;
                    break;

                case "priority":
                case "prioridade":
                    orderFunc = o => (o.Quantidade_Agendada + o.Quantidade_Total_Restante == 0 || o.Cancelado) ? 1 : 0;
                    break;

                default:
                    orderFunc = o => (o.Quantidade_Agendada + o.Quantidade_Total_Restante == 0 || o.Cancelado) ? 1 : 0;
                    break;
            }

            if (prior)
            {
                return await _dbPush.Solicitacao
                    .Include(i => i.idEnvio_MensagemNavigation)
                    .Include(i => i.Solicitacao_Upload)
                    .Include(i => i.idCurvaNavigation)
                    .OrderBy(orderFunc)
                    .ThenBy(o => o.Prioridade)
                    .ThenBy(o => o.Quantidade_Total_Restante)
                    .Where(whereFunc)
                    .ToListAsync<Solicitacao>();
            }
            else
            {
                if (CGC < 0)
                    return await _dbPush.Solicitacao
                        .Include(i => i.idEnvio_MensagemNavigation)
                        .Include(i => i.Solicitacao_Upload)
                        .Include(i => i.idCurvaNavigation)
                        .Where(x => x.Data_Cadastramento >= (DateTime)De).ToListAsync();
                else
                    return await _dbPush.Solicitacao
                        .Include(i => i.idEnvio_MensagemNavigation)
                        .Include(i => i.Solicitacao_Upload)
                        .Include(i => i.idCurvaNavigation)
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


        // GET: api/Solicitacao/5/MarcarCancelado
        [HttpPost("{id}/MarcarCancelado")]
        public async Task<ActionResult<Solicitacao>> PostSolicitacao_MarcarCancelado(int id, bool MarcarCancelado = false)
        {
            var solicitacao = await _dbPush.Solicitacao.FindAsync(id);

            if (solicitacao == null)
                return NotFound();

            if (solicitacao.Finalizado)
                return BadRequest(new { Error = 1001, Message = "Não é possível marcar cancelado em uma solicitação já finalizada" });
            else
            {
                solicitacao.Cancelado = MarcarCancelado;
                await _dbPush.SaveChangesAsync();

                return Ok(solicitacao);
            }
        }


        // GET: api/Solicitacao/5/set-prioridade
        [HttpPost("{id}/set-prioridade")]
        public async Task<ActionResult<Solicitacao>> PostSolicitacao_SetPrioridade(int id, byte prioridade = 100)
        {
            var solicitacao = await _dbPush.Solicitacao.FindAsync(id);

            if (solicitacao == null)
                return NotFound();

            solicitacao.Prioridade = prioridade;
            await _dbPush.SaveChangesAsync();

            return Ok(solicitacao);

        }

        // GET: api/Solicitacao/5/set-curva
        [HttpPost("{id}/set-curva")]
        public async Task<ActionResult<Solicitacao>> PostSolicitacao_SetCurva(int id, byte curva = 34)
        {
            var solicitacao = await _dbPush.Solicitacao.FindAsync(id);

            if (solicitacao == null)
                return NotFound();

            solicitacao.idCurva = curva;
            await _dbPush.SaveChangesAsync();

            return Ok(solicitacao);

        }

        // GET: api/Solicitacao/5/Autorizar
        [HttpPost("{id}/Autorizar")]
        public async Task<ActionResult<Solicitacao>> PostSolicitacao_MarcarAutorizado(int id, bool MarcarAutorizado = true)
        {
            var solicitacao = await _dbPush.Solicitacao.FindAsync(id);

            if (solicitacao == null)
                return NotFound();

            if (solicitacao.Finalizado)
                return BadRequest(new { Error = 1001, Message = "Não é possível mexer na autorização em uma solicitação já finalizada" });
            else
            {
                solicitacao.Autorizacao_Gestor_PUSH = MarcarAutorizado;
                await _dbPush.SaveChangesAsync();

                return Ok(solicitacao);
            }
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
        public async Task<ActionResult<Solicitacao>> PostSolicitacao([FromBody] object _solicitacao) // _solicitacao virou object para que possa ser desserializado aqui no controle devido a 'erros' quando entregue ao core da webapi e suas validações
        {
            Solicitacao solicitacao = JsonSerializer.Deserialize<Solicitacao>(_solicitacao.ToString(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true, NumberHandling = JsonNumberHandling.AllowReadingFromString,  }) ; 
            if (solicitacao.idSolicitacao_PUSH <= 0)
            {
                solicitacao.idSolicitacao_PUSH = 0;

                if (solicitacao.idEnvio_Mensagem == -1)
                {
                    Mensagem msg = await _dbPush.Mensagem.FirstOrDefaultAsync(f => f.Mensagem1 == solicitacao.Mensagem.Trim());
                    if (msg == null)
                    {
                        msg = new();
                        msg.Mensagem1 = solicitacao.Mensagem;
                        var msgAdd = await _dbPush.Mensagem.AddAsync(msg);
                        await _dbPush.SaveChangesAsync();
                    }
                    solicitacao.idEnvio_Mensagem = msg.idEnvio_Mensagem;
                }

                solicitacao.Data_Cadastramento = DateTime.Now;
                solicitacao.CGCExecutora = 5135;
                Usuario u = HttpContext.Items["User"] as Usuario;
                solicitacao.Matricula_Cadastramento = u.cUsuario;
                solicitacao.CGCDemandante = (short)u.CGC;

                _dbPush.Solicitacao.Add(solicitacao);
                await _dbPush.SaveChangesAsync();

                return CreatedAtAction("GetSolicitacao", new { id = solicitacao.idSolicitacao_PUSH }, solicitacao);
            }
            else 
            {
                var solicitacaoDB = await _dbPush.Solicitacao.FindAsync(solicitacao.idSolicitacao_PUSH);
                if (solicitacaoDB == null)
                    return NotFound();
                
                if ( solicitacaoDB.Mensagem.ToLower().Trim() != solicitacao.Mensagem.ToLower().Trim() ){
                    Mensagem msg = await _dbPush.Mensagem.FirstOrDefaultAsync(f => f.Mensagem1 == solicitacao.Mensagem.Trim());
                    if (msg == null)
                    {
                        msg = new();
                        msg.Mensagem1 = solicitacao.Mensagem;
                        var msgAdd = await _dbPush.Mensagem.AddAsync(msg);
                        await _dbPush.SaveChangesAsync();
                    }
                    solicitacaoDB.idEnvio_Mensagem = msg.idEnvio_Mensagem;
                    solicitacaoDB.Mensagem = solicitacao.Mensagem.Trim();
                }

                solicitacaoDB.Nome_Solicitacao = solicitacaoDB.Nome_Solicitacao.ToLower().Trim() != solicitacao.Nome_Solicitacao.ToLower().Trim() ? solicitacao.Nome_Solicitacao.Trim() : solicitacaoDB.Nome_Solicitacao;
                solicitacaoDB.REQ_WO_Aprovacao_Mensagem = solicitacaoDB.REQ_WO_Aprovacao_Mensagem.ToLower().Trim() != solicitacao.REQ_WO_Aprovacao_Mensagem.ToLower().Trim() ? solicitacao.REQ_WO_Aprovacao_Mensagem.Trim() : solicitacaoDB.REQ_WO_Aprovacao_Mensagem;
                
                solicitacaoDB.WF_GECRM = (solicitacaoDB.WF_GECRM ?? -1) != (solicitacao.WF_GECRM ?? -1) ? solicitacao.WF_GECRM : solicitacaoDB.WF_GECRM;

                solicitacaoDB.idTipoMensagem = solicitacaoDB.idTipoMensagem  != solicitacao.idTipoMensagem ? solicitacao.idTipoMensagem : solicitacaoDB.idTipoMensagem;
                solicitacaoDB.Canal = solicitacaoDB.Canal.ToLower().Trim() != solicitacao.Canal.ToLower().Trim() ? solicitacao.Canal.ToLower().Trim() : solicitacaoDB.Canal;
                solicitacaoDB.Quantidade_Total = solicitacaoDB.Quantidade_Total  != solicitacao.Quantidade_Total ? solicitacao.Quantidade_Total : solicitacaoDB.Quantidade_Total;
                solicitacaoDB.Limitacao_Tranche = solicitacaoDB.Limitacao_Tranche  != solicitacao.Limitacao_Tranche ? solicitacao.Limitacao_Tranche : solicitacaoDB.Limitacao_Tranche;
                solicitacaoDB.Impactos_Previstos = solicitacaoDB.Impactos_Previstos.ToLower().Trim() != solicitacao.Impactos_Previstos.ToLower().Trim() ? solicitacao.Impactos_Previstos.Trim() : solicitacaoDB.Impactos_Previstos;
                solicitacaoDB.Limitacao_Tranche = solicitacaoDB.Limitacao_Tranche  != solicitacao.Limitacao_Tranche ? solicitacao.Limitacao_Tranche : solicitacaoDB.Limitacao_Tranche;
                
                solicitacaoDB.Enviar_a_partir_de= (solicitacaoDB.Enviar_a_partir_de ?? new DateTime(0)) != (solicitacao.Enviar_a_partir_de ?? new DateTime(0)) ? solicitacao.Enviar_a_partir_de : solicitacaoDB.Enviar_a_partir_de;
                solicitacaoDB.Enviar_no_maximo_ate= (solicitacaoDB.Enviar_no_maximo_ate ?? new DateTime(0)) != (solicitacao.Enviar_no_maximo_ate ?? new DateTime(0)) ? solicitacao.Enviar_no_maximo_ate : solicitacaoDB.Enviar_no_maximo_ate;
                
                solicitacaoDB.Enviar_Horario_InicialFormatado = (solicitacaoDB.Enviar_Horario_InicialFormatado.ToLower().Trim() ?? "") != (solicitacao.Enviar_Horario_InicialFormatado.ToLower().Trim() ?? "") ? solicitacao.Enviar_Horario_InicialFormatado.ToLower().Trim() : solicitacaoDB.Enviar_Horario_InicialFormatado;
                solicitacaoDB.Enviar_Horario_FinalFormatado   = (solicitacaoDB.Enviar_Horario_FinalFormatado.ToLower().Trim() ?? "")   != (solicitacao.Enviar_Horario_FinalFormatado.ToLower().Trim() ?? "")   ? solicitacao.Enviar_Horario_FinalFormatado.ToLower().Trim()   : solicitacaoDB.Enviar_Horario_FinalFormatado;

                solicitacaoDB.Enviar_DOM =  solicitacaoDB.Enviar_DOM != solicitacao.Enviar_DOM ? solicitacao.Enviar_DOM : solicitacaoDB.Enviar_DOM;
                solicitacaoDB.Enviar_SEG =  solicitacaoDB.Enviar_SEG != solicitacao.Enviar_SEG ? solicitacao.Enviar_SEG : solicitacaoDB.Enviar_SEG;
                solicitacaoDB.Enviar_TER =  solicitacaoDB.Enviar_TER != solicitacao.Enviar_TER ? solicitacao.Enviar_TER : solicitacaoDB.Enviar_TER;
                solicitacaoDB.Enviar_QUA =  solicitacaoDB.Enviar_QUA != solicitacao.Enviar_QUA ? solicitacao.Enviar_QUA : solicitacaoDB.Enviar_QUA;
                solicitacaoDB.Enviar_QUI =  solicitacaoDB.Enviar_QUI != solicitacao.Enviar_QUI ? solicitacao.Enviar_QUI : solicitacaoDB.Enviar_QUI;
                solicitacaoDB.Enviar_SEX =  solicitacaoDB.Enviar_SEX != solicitacao.Enviar_SEX ? solicitacao.Enviar_SEX : solicitacaoDB.Enviar_SEX;
                solicitacaoDB.Enviar_SAB =  solicitacaoDB.Enviar_SAB != solicitacao.Enviar_SAB ? solicitacao.Enviar_SAB : solicitacaoDB.Enviar_SAB;

                solicitacaoDB.CGCDemandante =  solicitacaoDB.CGCDemandante != solicitacao.CGCDemandante ? solicitacao.CGCDemandante : solicitacaoDB.CGCDemandante;
                solicitacaoDB.Observacoes = solicitacaoDB.Observacoes.ToLower().Trim() != solicitacao.Observacoes.ToLower().Trim() ? solicitacao.Observacoes.Trim() : solicitacaoDB.Observacoes;


                solicitacaoDB.Limite_Mensagens_Por_Dia = solicitacaoDB.Limite_Mensagens_Por_Dia  != solicitacao.Limite_Mensagens_Por_Dia ? solicitacao.Limite_Mensagens_Por_Dia : solicitacaoDB.Limite_Mensagens_Por_Dia;
                await _dbPush.SaveChangesAsync();

                return Ok(solicitacaoDB);
            }
            //return BadRequest(new { error = 1002, message = "Solicitação de criação/atualização de Solicitação com problemas" });
            
        }

        // DELETE: api/Solicitacao/5/delete
        [HttpPost("{id}/delete")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> DeleteSolicitacao(int id)
        {
            var solicitacao = await _dbPush.Solicitacao.FindAsync(id);
            if (solicitacao == null)
                return NotFound();

            if (solicitacao.Quantidade_Enviada > 0)
                return StatusCode(418, new { error = 1003, message = "Solicitações com envios não podem ser apagadas em virtude de preservação de histórico." });

            _ = await _dbPush.Database.ExecuteSqlRawAsync($"DELETE FROM [DB5138_PUSH].[FILA].[Solicitacao_Clientes] WHERE idSolicitacao_PUSH = {id} AND idSolicitacao_Simulacao_Envio IS NULL");

            int quantidadeClientes = await _dbPush.Solicitacao_Clientes.CountAsync(c => c.idSolicitacao_PUSH == id);
            if (quantidadeClientes > 0)
                return StatusCode(418, new { error = 1004, message = "Solicitações com envios não podem ser apagadas em virtude de preservação de histórico." });
            
            _ = await _dbPush.Database.ExecuteSqlRawAsync($"DELETE FROM [DB5138_PUSH].[FILA].[Solicitacao_Simulacao_Envio] WHERE idSolicitacao_PUSH = {id}");

            _dbPush.Solicitacao.Remove(solicitacao);
            await _dbPush.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Solicitacao/5/delete
        [HttpPost("{id}/upload")]
        [Authorize(Role.Admin,Role.Solicitante,Role.GECDI)]
        public async Task<IActionResult> UploadFileOnSolicitacao(int id, int idPUSH) //([FromRoute]  int ID, [FromForm] IFormFile file0, [FromQuery] int idPUSH)
        {
            //ID = ID > 0 ? ID : idPUSH;
            var solicitacao = await _dbPush.Solicitacao.FindAsync(id);
            if (solicitacao == null)
                return NotFound();

            HttpRequest httpRequest = HttpContext.Request;
            if (httpRequest.Form.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (var file in httpRequest.Form.Files)
                {
                    if (file != null)
                    {
                        Solicitacao_Upload su = await _dbPush.Solicitacao_Upload.FirstOrDefaultAsync(a => a.idSolicitacao_PUSH == id) ?? new();
                        if (su.idSolicitacao_PUSH == 0) 
                            _dbPush.Solicitacao_Upload.Add(su);
                        su.idSolicitacao_PUSH = id;
                        su.Data_Upload = DateTime.Now;
                        su.Processado = false;
                        su.Registros_Aceitos = 0;
                        su.Registros_Rejeitados = 0;
                        su.Registros_Total = 0;
                        _ = await _dbPush.SaveChangesAsync();
                        var filePath = @$"{_appSettings.UploadDir}\upload_id{su.idSolicitacao_Upload.ToString("000000000000")}_" + file.FileName;
                        su.Arquivo = filePath;
                        _ = await _dbPush.SaveChangesAsync();
                        using (var stream = System.IO.File.Create(filePath))
                        {
                            await file.CopyToAsync(stream);
                        }
                        return Created(filePath, su); // CreatedAtAction($"id={id}", new { });
                    }
                    else
                        return BadRequest();
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }

        }

        private bool SolicitacaoExists(int id)
        {
            return _dbPush.Solicitacao.Any(e => e.idSolicitacao_PUSH == id);
        }
    }
}
