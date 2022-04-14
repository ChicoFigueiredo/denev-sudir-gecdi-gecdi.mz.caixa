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
    [Authorize(Role.Admin)]
    public class CurvaHorariosController : ControllerBase
    {
        private readonly dbPUSH _dbPush;

        public CurvaHorariosController(dbPUSH context)
        {
            _dbPush = context;
        }

        // GET: api/CurvaHorarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curva_Envio_Tranches>>> GetCurva_Envio_Tranches()
        {
            return await _dbPush.Curva_Envio_Tranches.ToListAsync();
        }

        // GET: api/CurvaHorarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curva_Envio_Tranches>> GetCurva_Envio_Tranches(int id)
        {
            var curva_Envio_Tranches = await _dbPush.Curva_Envio_Tranches.FindAsync(id);

            if (curva_Envio_Tranches == null)
            {
                return NotFound();
            }

            return curva_Envio_Tranches;
        }

        // PUT: api/CurvaHorarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurva_Envio_Tranches(int id, Curva_Envio_Tranches curva_Envio_Tranches)
        {
            if (id != curva_Envio_Tranches.idCurva_Envio_Tranches)
            {
                return BadRequest();
            }

            _dbPush.Entry(curva_Envio_Tranches).State = EntityState.Modified;

            try
            {
                await _dbPush.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Curva_Envio_TranchesExists(id))
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

        // POST: api/CurvaHorarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Curva_Envio_Tranches>> PostCurva_Envio_Tranches(Curva_Envio_Tranches curva_Envio_Tranches)
        {
            _dbPush.Curva_Envio_Tranches.Add(curva_Envio_Tranches);
            await _dbPush.SaveChangesAsync();

            return CreatedAtAction("GetCurva_Envio_Tranches", new { id = curva_Envio_Tranches.idCurva_Envio_Tranches }, curva_Envio_Tranches);
        }

        // DELETE: api/CurvaHorarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurva_Envio_Tranches(int id)
        {
            var curva_Envio_Tranches = await _dbPush.Curva_Envio_Tranches.FindAsync(id);
            if (curva_Envio_Tranches == null)
            {
                return NotFound();
            }

            _dbPush.Curva_Envio_Tranches.Remove(curva_Envio_Tranches);
            await _dbPush.SaveChangesAsync();

            return NoContent();
        }

        private bool Curva_Envio_TranchesExists(int id)
        {
            return _dbPush.Curva_Envio_Tranches.Any(e => e.idCurva_Envio_Tranches == id);
        }
    }
}
