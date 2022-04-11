/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gecdi.mz.caixa.Models;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace gecdi.mz.caixa.Controllers.Logger
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly dbCaixaSimMz _context;

        public LogsController(dbCaixaSimMz context)
        {
            _context = context;
        }

        // PUT: api/Logs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLog([FromRoute] long id, [FromBody] Log log)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != log.iID_Log)
            {
                return BadRequest();
            }

            _context.Entry(log).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LogExists(id))
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

        // POST: api/Logs
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostLog([FromBody] Log log)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            log.vToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            try
            {
                JwtSecurityToken jwt = (new JwtSecurityTokenHandler()).ReadToken(log.vToken) as JwtSecurityToken;

                if (jwt != null)
                    if (jwt.Claims.Count() > 0)
                    {
                        List<Claim> claims = jwt.Claims.ToList();
                        if (claims.FirstOrDefault(f => f.Type == "preferred_username") != null)
                            log.cMatricula = claims.FirstOrDefault(f => f.Type == "preferred_username").Value;
                    }
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }


            _context.Log.Add(log);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLog", new { id = log.iID_Log }, log);
        }

        // DELETE: api/Logs/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteLog([FromRoute] long id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var log = await _context.Log.FindAsync(id);
        //    if (log == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Log.Remove(log);
        //    await _context.SaveChangesAsync();

        //    return Ok(log);
        //}

        private bool LogExists(long id)
        {
            return _context.Log.Any(e => e.iID_Log == id);
        }
    }
}*/