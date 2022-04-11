/*
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
    [Authorize]
    public partial class ChamadosController : ControllerBase
    {

        // GET: api/chamados/{id}/tratado
        //[HttpPut("{id}/tratado")]
        [HttpPut("{id}/tratado")]
        public async Task<ActionResult<Chamado>> PutMarcarTratado(long id, RequestTratarChamado rtc)
        {

            if (id != rtc.idChamado)
                return BadRequest(new { msg = "Chamado mal chamado" });

            Atendente at = await _context.Atendentes.FindAsync(rtc.apelidoAtendente);
            if (at == null)
                return BadRequest(new { msg = "Atendente não encontrado" });

            Chamado chamado = await _context.Chamados.FindAsync(id);
            if (at == null)
                return BadRequest(new { msg = "Chamado não encontrado" });

            chamado.bFoiTratado = rtc.foiTratado;
            chamado.vApelidoAtendenteTratou = at.vApelidoAtendente;
            chamado.dDataHoraTratamento = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
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

    public class RequestTratarChamado
    {
        public long idChamado { get; set; }
        public bool foiTratado { get; set; } = false;
        public string apelidoAtendente { get; set; }
    }
}
*/