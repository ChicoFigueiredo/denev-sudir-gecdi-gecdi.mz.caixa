#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PushAPI.Helpers;
using PushAPI.Models.Sites;
using PushAPI.Requests;
using PushAPI.Services;
using PushAPI.Helpers;

namespace PushAPI.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly dbSites _dbSites;
        private IUserService _userService;
        private readonly HttpClient _client;

        public UserController(dbSites context, IUserService userService)
        {
            _dbSites = context;
            _userService = userService;
            _client = new HttpClient(new HttpClientHandler(){ AllowAutoRedirect = false });
        }


        [HttpPost("login")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response     = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }


        // GET: api/User
        [Authorize(Role.Admin)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuario(int lim = -1, string busca = "")
        {
            _dbSites.ChangeTracker.LazyLoadingEnabled = false;
            if (lim == -1) { 
                if ((busca??"").Trim() == "")
                    return await _dbSites.Usuario.IgnoreAutoIncludes().ToListAsync();
                else
                    return await _dbSites.Usuario.IgnoreAutoIncludes().Where(w => w.cUsuario.Contains(busca) || w.Nome.Contains(busca)).ToListAsync();
            } else { 
                if ((busca ?? "").Trim() == "")
                    return await _dbSites.Usuario.IgnoreAutoIncludes().Take(lim).ToListAsync();
                else
                    return await _dbSites.Usuario.IgnoreAutoIncludes().Where(w => w.cUsuario.Contains(busca) || w.Nome.Contains(busca)).Take(lim).ToListAsync();
            }
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _dbSites.Usuario.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }


        // GET: api/User/Roles
        [HttpGet("Roles")]
        public async Task<IEnumerable<Roles>> GetRoles()
        {
            return await _dbSites.Roles.ToListAsync();
        }


        // GET: api/User/whoami
        [HttpGet("{id}/avatar", Name = "GetAvatar")]
        public async Task<IActionResult> GetAvatar(string id)
        {
            try
            {
                string matricula = id.ToLower();
                var request = HttpContext.CreateProxyHttpRequest(new Uri($"http://tdv.caixa/img/{matricula}.jpg"));
                var response = await _client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, HttpContext.RequestAborted);
                await HttpContext.CopyProxyHttpResponse(response);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        // GET: api/User/register
        [HttpPost("register", Name = "PostRegister")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> PostRegister(RequestNewUser newUser)
        {
            try
            {
                Usuario u = _userService.GetByMatricula(newUser.matricula);
                if (u != null)
                    return Ok(u);
                newUser.matricula = newUser.matricula.ToLower();
                u = await _userService.RegisterUser(newUser.matricula, newUser.role);
                if (u == null)
                    return NotFound(new { matricula = newUser.matricula, role = newUser.role, message =  "Usuário não encontrado no LDAP/Rede NT" });
                return Ok(u);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.idUsuario)
            {
                return BadRequest();
            }

            _dbSites.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _dbSites.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _dbSites.Usuario.Add(usuario);
            await _dbSites.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.idUsuario }, usuario);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _dbSites.Usuario.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _dbSites.Usuario.Remove(usuario);
            await _dbSites.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _dbSites.Usuario.Any(e => e.idUsuario == id);
        }
    }
}
