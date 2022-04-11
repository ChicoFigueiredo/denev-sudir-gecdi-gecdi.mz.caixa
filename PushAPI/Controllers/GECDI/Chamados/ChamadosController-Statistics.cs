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
    public partial class ChamadosController : ControllerBase
    {

        // GET: api/chamados/estatisticas
        [HttpGet("estatisticas")]
        public async Task<ActionResult<EstatisticasChamadosPorSistema>> GetEstatisticas(string id)
        {
            return null;
        }
    }

    public class EstatisticasChamados
    {
        EstatisticasChamados(dbAtenderDigital db)
        {
            DateTime hoje = DateTime.Now;
            var porSistema = db.Chamados.Where(w => !w.bFechado).GroupBy(g => new { Origem = g.vOrigem, Situacao = (g.dDataVencimento.Value.Date == hoje.Date) ? "VenceHoje" : (g.dDataVencimento.Value.Date < hoje.Date) ? "Vencida" : "AVencer" }).ToList();
            //this.ChamadosAbertos.Servicos = porSistema[0]["Origem"]
        }
        public DateTime dataHoraEstatistica { get; set; } = DateTime.Now;
        public EstatisticasChamadosPorSistema ChamadosAbertos { get; set; } 
        public EstatisticasChamadosPorSistema ChamadosVencidos { get; set; }
        public EstatisticasChamadosPorSistema ChamadosVencendoHoje { get; set; }
        public int OuvidoriasAbertas { get; set; }

    }

    public class EstatisticasChamadosPorSistema
    {
        public EstatisticasChamadosPorSistema(int total=0, int atender=0, int servicos = 0)
        {
            this.Total = total;
            this.Atender = atender;
            this.Servicos = servicos;
        }
        public int Total { get; set; } = 0;
        public int Atender { get; set; } = 0;
        public int Servicos { get; set; } = 0;
    }
}
