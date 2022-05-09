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

namespace PushAPI.Controllers.PUSH.Simulacao_Upload
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Solicitacao_UploadController : ControllerBase
    {
        private readonly dbPUSH _context;

        public Solicitacao_UploadController(dbPUSH context)
        {
            _context = context;
        }

        // GET: api/Solicitacao_Upload
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solicitacao_Upload>>> GetSolicitacao_Upload()
        {
            return await _context.Solicitacao_Upload.ToListAsync();
        }

        // GET: api/Solicitacao_Upload/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solicitacao_Upload>> GetSolicitacao_Upload(long id)
        {
            var solicitacao_Upload = await _context.Solicitacao_Upload.FindAsync(id);

            if (solicitacao_Upload == null)
            {
                return NotFound();
            }

            return solicitacao_Upload;
        }

        // PUT: api/Solicitacao_Upload/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolicitacao_Upload(long id, Solicitacao_Upload solicitacao_Upload)
        {
            if (id != solicitacao_Upload.idSolicitacao_Upload)
            {
                return BadRequest();
            }

            _context.Entry(solicitacao_Upload).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Solicitacao_UploadExists(id))
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

        // POST: api/Solicitacao_Upload
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Solicitacao_Upload>> PostSolicitacao_Upload(Solicitacao_Upload solicitacao_Upload)
        {
            _context.Solicitacao_Upload.Add(solicitacao_Upload);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSolicitacao_Upload", new { id = solicitacao_Upload.idSolicitacao_Upload }, solicitacao_Upload);
        }

        // DELETE: api/Solicitacao_Upload/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolicitacao_Upload(long id)
        {
            var solicitacao_Upload = await _context.Solicitacao_Upload.FindAsync(id);
            if (solicitacao_Upload == null)
            {
                return NotFound();
            }

            _context.Solicitacao_Upload.Remove(solicitacao_Upload);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Solicitacao_UploadExists(long id)
        {
            return _context.Solicitacao_Upload.Any(e => e.idSolicitacao_Upload == id);
        }
    }
}
