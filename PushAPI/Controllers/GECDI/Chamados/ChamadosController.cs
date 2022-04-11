using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gecdi.mz.caixa.Models.AtenderDigital;
using Microsoft.AspNetCore.Authorization;
using System.Text.RegularExpressions;

namespace gecdi.mz.caixa.Controllers.GECDI.Chamados
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public partial class ChamadosController : ControllerBase
    {
        private readonly dbAtendimento _dbAtendimento;

        public ChamadosController(dbAtendimento context)
        {
            _dbAtendimento = context;
        }

        // GET: api/Chamados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetChamados(
            bool? abertos = true, 
            string? sistema = null,
            int top = -1,
            string? atendente = "",
            string? tipo = "<Todos>",
            string? origem = "<Todos>",
            string? item = "<Todos>",
            string? motivo = "<Todos>",
            bool? tratados = null,
            string? listaCampos = "minimo",
            string? ordenamentoCampos = "vencimento,abertura,numeroChamado"
        )
        {

            IQueryable<Chamado> tmp = _dbAtendimento.Chamados.AsQueryable();

            if (listaCampos == "" || listaCampos == null)
                listaCampos = "minimo";


            if (abertos == true)
                tmp = tmp.Where(w => !w.bFechado);
            else if (abertos == false)
                tmp = tmp.Where(w => w.bFechado);

            switch (sistema?.ToUpper())
            {
                case "ATENDER":
                    tmp = tmp.Where(w => w.vOrigem == "ATENDER");
                    break;
                case "SERVICOS":
                    tmp = tmp.Where(w => w.vOrigem == "SERVICOS");
                    break;
                default:
                    break;
            }

            switch (tratados)
            {
                case true:
                    tmp = tmp.Where(w => w.bFoiTratado);
                    break;
                case false:
                    tmp = tmp.Where(w => !w.bFoiTratado); 
                    break;
                default:
                    break;
            }

            if (Regex.IsMatch(atendente??"", @"[Cc]\d{6}"))
            {
                Atendente at = _dbAtendimento.Atendentes.Where(w => w.cUsuario == (atendente??"")).FirstOrDefault();
                if (at != null)
                    atendente = at.vApelidoAtendente;
            }

            if (atendente?.ToUpper() == "-VAZIO-")
                tmp = tmp.Where(w => w.vApelidoAtendente == null || w.vApelidoAtendente == "");
            else if (atendente?.ToUpper() != "<TODOS>" && atendente?.ToUpper() != "TODOS" && atendente?.ToUpper() != "")
                tmp = tmp.Where(w => w.vApelidoAtendente == (atendente??"").ToUpper());

            List<ChamadoMinimo> listagemFinal = null;
            List<Chamado> listagemFinalCompleto = null;

            switch (listaCampos)
            {
                case "minimo":
                    listagemFinal = await tmp.Select(s =>
                            new ChamadoMinimo()
                            {
                                idChamado = s.idChamado,
                                vOrigem = s.vOrigem,
                                bFechado = s.bFechado,
                                iIdentificacaoChamado = s.iIdentificacaoChamado,
                                vCPF_CNPJ_Solicitante = s.vCPF_CNPJ_Solicitante,
                                vNomeSolicitante = s.vNomeSolicitante,
                                dDataVencimento = s.dDataVencimento,
                                dDataHoraAbertura = s.dDataHoraAbertura,
                                dDataMaximaTransferencia = s.dDataMaximaTransferencia,
                                vTipoOcorrencia = s.vTipoOcorrencia,
                                vNatureza = s.vNatureza,
                                vAssunto = s.vAssunto,
                                vMotivo = s.vMotivo,
                                vItem = s.vItem,
                                vSituacaoGECDI = s.vSituacaoGECDI,
                                vApelidoAtendente = s.vApelidoAtendente,
                                vAcao = s.vAcao,
                                vTemplateResposta = s.vTemplateResposta,
                                bFoiTratado = s.bFoiTratado,
                                vApelidoAtendenteTratou = s.vApelidoAtendenteTratou,
                                dDataHoraTratamento = s.dDataHoraTratamento,
                                cUsuario = s.vApelidoAtendenteNavigation.cUsuario
                            }).ToListAsync<ChamadoMinimo>();
        
                   break;
                default:
                    listagemFinalCompleto = await tmp.ToListAsync<Chamado>();
                    break;
            }

            if (listagemFinal != null)
            {
                IOrderedEnumerable<ChamadoMinimo> oListagemFinal = null;
                bool primeiroCampoOrdenado = true;
                ordenamentoCampos.Split(new char[] { '|', ',', ';' }).ToList().ForEach(cp =>
                {
                    switch (cp.ToLower())
                    {
                        case "vencimento":
                        case "vencimento:a":
                            if (primeiroCampoOrdenado)
                                oListagemFinal = listagemFinal.OrderBy(o => o.dDataVencimento);
                            else
                                oListagemFinal = oListagemFinal.ThenBy(o => o.dDataVencimento);
                            primeiroCampoOrdenado = false;
                            break;

                        case "vencimento:d":
                            if (primeiroCampoOrdenado)
                                oListagemFinal = listagemFinal.OrderByDescending(o => o.dDataVencimento);
                            else
                                oListagemFinal = oListagemFinal.ThenByDescending(o => o.dDataVencimento);
                            primeiroCampoOrdenado = false;
                            break;

                        case "abertura:d":
                            if (primeiroCampoOrdenado)
                                oListagemFinal = listagemFinal.OrderByDescending(o => o.dDataHoraAbertura);
                            else
                                oListagemFinal = oListagemFinal.ThenByDescending(o => o.dDataHoraAbertura);
                            primeiroCampoOrdenado = false;
                            break;

                        case "abertura":
                        case "abertura:a":
                            if (primeiroCampoOrdenado)
                                oListagemFinal = listagemFinal.OrderBy(o => o.dDataHoraAbertura);
                            else
                                oListagemFinal = oListagemFinal.ThenBy(o => o.dDataHoraAbertura);
                            primeiroCampoOrdenado = false;
                            break;

                        case "numerochamado":
                        case "numerochamado:a":
                            if (primeiroCampoOrdenado)
                                oListagemFinal = listagemFinal.OrderBy(o => o.iIdentificacaoChamado);
                            else
                                oListagemFinal = oListagemFinal.ThenBy(o => o.iIdentificacaoChamado);
                            primeiroCampoOrdenado = false;
                            break;

                        case "numerochamado:d":
                            if (primeiroCampoOrdenado)
                                oListagemFinal = listagemFinal.OrderByDescending(o => o.iIdentificacaoChamado);
                            else
                                oListagemFinal = oListagemFinal.ThenByDescending(o => o.iIdentificacaoChamado);
                            primeiroCampoOrdenado = false;
                            break;

                        default:
                            if (primeiroCampoOrdenado)
                                oListagemFinal = listagemFinal.OrderBy(o => true);
                            break;
                    }

                });

                return oListagemFinal.ToList();
            }
            else if (listagemFinalCompleto != null)
            {
                IOrderedEnumerable<Chamado> oListagemFinalFull = null;
                bool primeiroCampoOrdenado = true;
                ordenamentoCampos.Split(new char[] { '|', ',', ';' }).ToList().ForEach(cp =>
                {
                    switch (cp.ToLower())
                    {
                        case "vencimento":
                        case "vencimento:a":
                            if (primeiroCampoOrdenado)
                                oListagemFinalFull = listagemFinalCompleto.OrderBy(o => o.dDataVencimento);
                            else
                                oListagemFinalFull = oListagemFinalFull.ThenBy(o => o.dDataVencimento);
                            primeiroCampoOrdenado = false;
                            break;

                        case "vencimento:d":
                            if (primeiroCampoOrdenado)
                                oListagemFinalFull = listagemFinalCompleto.OrderByDescending(o => o.dDataVencimento);
                            else
                                oListagemFinalFull = oListagemFinalFull.ThenByDescending(o => o.dDataVencimento);
                            primeiroCampoOrdenado = false;
                            break;

                        case "abertura":
                        case "abertura:d":
                            if (primeiroCampoOrdenado)
                                oListagemFinalFull = listagemFinalCompleto.OrderByDescending(o => o.dDataHoraAbertura);
                            else
                                oListagemFinalFull = oListagemFinalFull.ThenByDescending(o => o.dDataHoraAbertura);
                            primeiroCampoOrdenado = false;
                            break;

                        case "abertura:a":
                            if (primeiroCampoOrdenado)
                                oListagemFinalFull = listagemFinalCompleto.OrderBy(o => o.dDataHoraAbertura);
                            else
                                oListagemFinalFull = oListagemFinalFull.ThenBy(o => o.dDataHoraAbertura);
                            primeiroCampoOrdenado = false;
                            break;

                        case "numeroChamado":
                        case "numeroChamado:a":
                            if (primeiroCampoOrdenado)
                                oListagemFinalFull = listagemFinalCompleto.OrderBy(o => o.iIdentificacaoChamado);
                            else
                                oListagemFinalFull = oListagemFinalFull.ThenBy(o => o.iIdentificacaoChamado);
                            primeiroCampoOrdenado = false;
                            break;

                        case "numeroChamado:d":
                            if (primeiroCampoOrdenado)
                                oListagemFinalFull = listagemFinalCompleto.OrderByDescending(o => o.iIdentificacaoChamado);
                            else
                                oListagemFinalFull = oListagemFinalFull.ThenByDescending(o => o.iIdentificacaoChamado);
                            primeiroCampoOrdenado = false;
                            break;

                        default:
                            if (primeiroCampoOrdenado)
                                oListagemFinalFull = oListagemFinalFull.OrderBy(o => true);
                            break;
                    }

                });

                return oListagemFinalFull.ToList();
            }
            else
                return null;


        }

        // GET: api/Chamados/5
        [HttpPost("{id}/carimbar")]
        [HttpPost("{id}/descarimbar")]
        public async Task<ActionResult<Chamado>> PostCarimbaChamado(long id, string carimbo="")
        {
            var chamado = await _dbAtendimento.Chamados.FindAsync(id);
            if (chamado == null)
                return NotFound();

            if (carimbo.Trim() != "")
            {
                Templates_Resposta tr = await _dbAtendimento.Templates_Respostas.FindAsync(carimbo);
                if (tr == null)
                {
                    chamado.vAcao = null;
                    chamado.vTemplateResposta = null;
                    _ = await _dbAtendimento.SaveChangesAsync();
                    return chamado;
                }
                else
                {
                    chamado.vAcao = tr.vAcao;
                    chamado.vTemplateResposta = tr.vTemplateResposta;
                    _ = await _dbAtendimento.SaveChangesAsync();
                    return chamado;
                }
            }
            else
            {
                chamado.vAcao = null;
                chamado.vTemplateResposta = null;
                _ = await _dbAtendimento.SaveChangesAsync();
                return chamado;
            }
        }

        // GET: api/Chamados/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Chamado>> GetChamado(long id)
        {
            var chamado = await _dbAtendimento.Chamados
                                        .Where(w => w.idChamado == id || w.iIdentificacaoChamado == id)
                                        .Include(p => p.vTemplateRespostaNavigation)
                                        .FirstOrDefaultAsync<Chamado>();

            if (chamado == null)
                return NotFound();
            return chamado;
        }

        // PUT: api/Chamados/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChamado(long id, Chamado chamado)
        {
            if (id != chamado.idChamado)
                return BadRequest();

            _dbAtendimento.Entry(chamado).State = EntityState.Modified;

            try
            {
                await _dbAtendimento.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChamadoExists(id))
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

        // POST: api/Chamados
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Chamado>> PostChamado(Chamado chamado)
        {
            _dbAtendimento.Chamados.Add(chamado);
            await _dbAtendimento.SaveChangesAsync();

            return CreatedAtAction("GetChamado", new { id = chamado.idChamado }, chamado);
        }

        // DELETE: api/Chamados/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChamado(long id)
        {
            var chamado = await _dbAtendimento.Chamados.FindAsync(id);
            if (chamado == null)
            {
                return NotFound();
            }

            _dbAtendimento.Chamados.Remove(chamado);
            await _dbAtendimento.SaveChangesAsync();

            return NoContent();
        }

        private bool ChamadoExists(long id)
        {
            return _dbAtendimento.Chamados.Any(e => e.idChamado == id);
        }


        // GET: api/chamados/{id}/tratado
        //[HttpPut("{id}/tratado")]
        //[HttpPut("{id}")]
        [HttpPost("{id}/tratado")]
        //public async Task<ActionResult<Chamado>> PutMarcarTratado(long id, RequestTratarChamado rtc)
        public async Task<ActionResult<Chamado>> PutMarcarTratado(long id, string apelidoAtendente = "", bool foiTratado = false)
        {

            //if (id != rtc.idChamado)
            //    return BadRequest(new { msg = "Chamado mal chamado" });

            Atendente at = await _dbAtendimento.Atendentes.FindAsync(apelidoAtendente);
            if (at == null)
                return BadRequest(new { msg = "Atendente não encontrado" });

            Chamado chamado = await _dbAtendimento.Chamados.FindAsync(id);
            if (at == null)
                return BadRequest(new { msg = "Chamado não encontrado" });

            chamado.bFoiTratado = foiTratado;
            chamado.vApelidoAtendenteTratou = at.vApelidoAtendente;
            chamado.dDataHoraTratamento = DateTime.Now;

            try
            {
                await _dbAtendimento.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChamadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return chamado;
        }
    }


    public class ChamadoMinimo
    {
        public ChamadoMinimo() { }
        public ChamadoMinimo(Chamado s)
        {
            this.idChamado = s.idChamado;
            this.vOrigem = s.vOrigem;
            this.bFechado = s.bFechado;
            this.iIdentificacaoChamado = s.iIdentificacaoChamado;
            this.vCPF_CNPJ_Solicitante = s.vCPF_CNPJ_Solicitante;
            this.vNomeSolicitante = s.vNomeSolicitante;
            this.dDataVencimento = s.dDataVencimento;
            this.dDataHoraAbertura = s.dDataHoraAbertura;
            this.vTipoOcorrencia = s.vTipoOcorrencia;
            this.dDataMaximaTransferencia = s.dDataMaximaTransferencia;
            this.vNatureza = s.vNatureza;
            this.vAssunto = s.vAssunto;
            this.vMotivo = s.vMotivo;
            this.vItem = s.vItem;
            this.vSituacaoGECDI = s.vSituacaoGECDI;
            this.vApelidoAtendente = s.vApelidoAtendente;
            this.vAcao = s.vAcao;
            this.vTemplateResposta = s.vTemplateResposta;
            this.bFoiTratado = s.bFoiTratado;
            this.vApelidoAtendenteTratou = s.vApelidoAtendenteTratou;
            this.dDataHoraTratamento = s.dDataHoraTratamento;
            this.cUsuario = s.vApelidoAtendenteNavigation.cUsuario;
    }

        public long idChamado { get; set; }
        public string vOrigem { get; set; }
        public long iIdentificacaoChamado { get; set; }
        public string vNatureza { get; set; }
        public string vTipoOcorrencia { get; set; }
        public string vAssunto { get; set; }
        public string vMotivo { get; set; }
        public string vItem { get; set; }
        public string vCPF_CNPJ_Solicitante { get; set; }
        public string vNomeSolicitante { get; set; }
        public DateTime? dDataHoraAbertura { get; set; }
        public DateTime? dDataVencimento { get; set; }
        public DateTime? dDataMaximaTransferencia { get; set; }
        public bool bFechado { get; set; }
        public string vREQ { get; set; }
        public string vAcao { get; set; }
        public string vTemplateResposta { get; set; }
        public string vSituacaoGECDI { get; set; }
        public string vApelidoAtendente { get; set; }
        public bool bFoiTratado { get; set; }
        public string vApelidoAtendenteTratou { get; set; }
        public DateTime? dDataHoraTratamento { get; set; }
        public string cUsuario { get; set; }
    }

    public class RequestTratarChamado
    {
        public long idChamado { get; set; }
        public bool foiTratado { get; set; } = false;
        public string apelidoAtendente { get; set; }
    }
}
