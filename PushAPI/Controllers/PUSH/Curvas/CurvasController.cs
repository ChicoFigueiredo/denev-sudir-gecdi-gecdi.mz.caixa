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

namespace PushAPI.Controllers.PUSH.Curvas
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurvasController : ControllerBase
    {
        private readonly dbPUSH _dbPUSH;

        public CurvasController(dbPUSH context)
        {
            _dbPUSH = context;
        }

        // GET: api/Curvas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curva_Envio>>> GetCurva_Envio()
        {
            return await _dbPUSH.Curva_Envio
                                 .Include(c => c.Curva_Envio_Tranches)
                                 .ToListAsync();
        }

        // GET: api/Curvas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curva_Envio>> GetCurva_Envio(int id)
        {
            var curva_Envio = await _dbPUSH.Curva_Envio.FindAsync(id);

            if (curva_Envio == null)
            {
                return NotFound();
            }

            return curva_Envio;
        }

        // PUT: api/Curvas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> PutCurva_Envio(int id, Curva_Envio curva_Envio)
        {
            if (id != curva_Envio.idCurva_Envio)
            {
                return BadRequest();
            }

            _dbPUSH.Entry(curva_Envio).State = EntityState.Modified;

            try
            {
                await _dbPUSH.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Curva_EnvioExists(id))
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

        // POST: api/Curvas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Role.Admin)]
        public async Task<ActionResult<Curva_Envio>> PostCurva_Envio(Curva_Envio curva_Envio)
        {
            _dbPUSH.Curva_Envio.Add(curva_Envio);
            await _dbPUSH.SaveChangesAsync();

            return CreatedAtAction("GetCurva_Envio", new { id = curva_Envio.idCurva_Envio }, curva_Envio);
        }

        // DELETE: api/Curvas/5
        [HttpDelete("{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> DeleteCurva_Envio(int id)
        {
            var curva_Envio = await _dbPUSH.Curva_Envio.FindAsync(id);
            if (curva_Envio == null)
            {
                return NotFound();
            }

            _dbPUSH.Curva_Envio.Remove(curva_Envio);
            await _dbPUSH.SaveChangesAsync();

            return NoContent();
        }

        private bool Curva_EnvioExists(int id)
        {
            return _dbPUSH.Curva_Envio.Any(e => e.idCurva_Envio == id);
        }
    }
}
