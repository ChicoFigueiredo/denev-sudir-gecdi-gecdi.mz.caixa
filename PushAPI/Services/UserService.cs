using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PushAPI.Helpers;
using PushAPI.Models.Sites;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.DirectoryServices.AccountManagement;
using System.DirectoryServices;
using PushAPI.Requests;
using PushAPI.Responses;
using PushAPI.Models.Atendimento;

namespace PushAPI.Services
{ 
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<Usuario> GetAll();
        Usuario GetById(int id);
        Usuario GetByMatricula(string matricula);
        Task<Usuario> RegisterUser(string matricula, Role role = Role.User);
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<Usuario> _users = new List<Usuario>();

        private dbSites _dbSites;
        private dbAtendimento _dbAtendimento;

        private readonly AppSettings _appSettings;

        private DirectoryEntry xDE, xDE_User;

        public UserService(IOptions<AppSettings> appSettings, dbSites __dbSites, dbAtendimento __dbAtendimento)
        {
            _appSettings = appSettings.Value;
            _dbSites = __dbSites;
            _dbAtendimento = __dbAtendimento;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var __Usuario = _dbSites.Usuario.Include(b => b.idRoleNavigation).SingleOrDefault<Usuario>(u => u.cUsuario == model.Username); //_users.SingleOrDefault(x => x.cUsuario == model.Username ); //&& x.Password == model.Password

            // return null if Usuario not found
            if (__Usuario == null) return null;

            using (PrincipalContext context = new PrincipalContext(ContextType.Domain))
            {
                if (context.ValidateCredentials(model.Username, model.password) || (model.password == $"Unlock${DateTime.Now.ToString("yyyyMMdd")}"))
                {
                    xDE = new DirectoryEntry(_appSettings.LDAP_User_Manager);
                    xDE_User = BuscaUsuarioDominio(model.Username, xDE);
                    SearchResult UserData = Get_UserData(model.Username.ToUpper());

                    var token = generateJwtToken(__Usuario, xDE_User, UserData);

                    Atendentes at = _dbAtendimento.Atendentes.FirstOrDefault(x => x.cUsuario == model.Username);
                    return new AuthenticateResponse(__Usuario, token, xDE_User, UserData, at);

                }
                else
                    return null;
            }


        }

        public async Task<Usuario> RegisterUser(string matricula, Role role = Role.User)
        {
            xDE = new DirectoryEntry(_appSettings.LDAP_User_Manager);
            xDE_User = BuscaUsuarioDominio(matricula, xDE);

            if (xDE_User != null)
            {
                SearchResult UserData = Get_UserData(matricula.ToUpper());
                Usuario usuario = new()
                {
                    cUsuario = matricula.ToUpper(),
                    Nome = (UserData.Properties.Contains("no-usuario") ? (String)UserData.Properties["no-usuario"][0] : "").ToUpper(),
                    CGC = Convert.ToInt16(UserData.Properties.Contains("nu-lotacaofisica") ? UserData.Properties["nu-lotacaofisica"][0].ToString() : "0"),
                    idRole = (int)role,
                };

                _dbSites.Usuario.Add(usuario);
                _ = _dbSites.SaveChangesAsync();

                return usuario;
            }
            else
                return null;

        }

        public IEnumerable<Usuario> GetAll()
        {
            return _users;
        }

        public Usuario GetById(int id)
        {
            return _dbSites.Usuario.Include(b => b.idRoleNavigation).SingleOrDefault<Usuario>(u => u.idUsuario == id); // _users.FirstOrDefault(x => x.iID_Matriz_Permissao == id);
        }

        public Usuario GetByMatricula(string matricula)
        {
            return _dbSites.Usuario.Include(b => b.idRoleNavigation).SingleOrDefault<Usuario>(u => u.cUsuario == matricula); // _users.FirstOrDefault(x => x.iID_Matriz_Permissao == id);
        }

        // helper methods

        private string generateJwtToken(Usuario Usuario, DirectoryEntry xDE, SearchResult UserData)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { 
                                new Claim("idUser", Usuario.idUsuario.ToString()),
                                new Claim("Matricula", Usuario.cUsuario.ToString().ToUpper()),
                                new Claim("Role", Usuario.idRoleNavigation.Role.ToString()),
                                new Claim("Nome", UserData.Properties.Contains("no-usuario") ? (String)UserData.Properties["no-usuario"][0] : ""),
                                new Claim("CodFuncao", UserData.Properties.Contains("nu-funcao") ? UserData.Properties["nu-funcao"][0].ToString() : ""),
                                new Claim("Funcao",  UserData.Properties.Contains("no-funcao") ? (String)(UserData.Properties["no-funcao"][0]).ToString() : ""),
                                new Claim("LotacaoFisica", UserData.Properties.Contains("nu-lotacaofisica") ? UserData.Properties["nu-lotacaofisica"][0].ToString() : "0" ),
                                new Claim("LotacaoSigla", UserData.Properties.Contains("sg-unidade") ? (String)UserData.Properties["sg-unidade"][0].ToString() : "" ),
                                new Claim("LotacaoTipo", UserData.Properties.Contains("nu-tp-unidade") ? UserData.Properties["nu-tp-unidade"][0].ToString() : "0" ),
                            }),
                            Expires = DateTime.UtcNow.AddDays(7),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };  
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        private DirectoryEntry BuscaUsuarioDominio(string UsName, DirectoryEntry root)
        {
            try
            {
                //using (HostingEnvironment.Impersonate())
                {
                    using (DirectorySearcher searcher = new DirectorySearcher(root, string.Format("(sAMAccountName={0})", UsName)))
                    {
                        SearchResult sr = searcher.FindOne();
                        if (!(sr == null)) return sr.GetDirectoryEntry();
                        else
                            return null;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected SearchResult Get_UserData(String User)
        {
            String dn = _appSettings.LDAP_Whois + "/UID=" + User + ",OU=People,O=CAIXA";

            DirectoryEntry ldap = new DirectoryEntry(dn, null, null, AuthenticationTypes.Anonymous);
            DirectorySearcher searcher = new DirectorySearcher(ldap) { Filter = "(objectClass=*)" };
            SearchResult UserData = searcher.FindOne();
            ldap.Close();

            return UserData;
        }

    }
}

