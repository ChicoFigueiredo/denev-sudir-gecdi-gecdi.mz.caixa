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

namespace PushAPI.Controllers.PUSH.Fila
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FilaController : ControllerBase
    {
        private readonly dbPUSH _dbPUSH;

        public FilaController(dbPUSH context)
        {
            _dbPUSH = context;
        }

        // GET: api/Verifica_Status_Fila
        [HttpGet("Status")]
        public async Task<ActionResult<IEnumerable<spVerifica_Status_Fila>>> GetspVerifica_Status_Fila(bool recount = false)
        {
            if (recount)
                _ = await _dbPUSH.Database.ExecuteSqlRawAsync("EXEC DB5138_PUSH.FILA.Atualiza_Contagem_de_Solicitacoes -1");

            return await _dbPUSH.spVerifica_Status_Fila
                                .FromSqlRaw("EXEC DB5138_PUSH.Fila.Verifica_Status_Fila")
                                .ToListAsync();
        }

        [HttpGet("Historico")]
        public async Task<ActionResult<IEnumerable<spVerifica_Historico_Fila>>> GetspVerifica_Historico_Fila(bool recount = false)
        {
            if (recount)
                _ = await _dbPUSH.Database.ExecuteSqlRawAsync("EXEC DB5138_PUSH.FILA.Atualiza_Contagem_de_Solicitacoes -1");

            return await _dbPUSH.spVerifica_Historico_Fila
                                .FromSqlRaw("EXEC DB5138_PUSH.Fila.Verifica_Historico_Fila")
                                .ToListAsync();
        }

    }
}
