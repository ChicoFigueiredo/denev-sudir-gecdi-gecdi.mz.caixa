using PushAPI.Models.Push;
using System.DirectoryServices;

namespace PushAPI.Classes
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public Usuario User { get; set; }


        public AuthenticateResponse(Usuario _Usuario, string token, DirectoryEntry xDE, SearchResult xSR)
        {
            Id = _Usuario.iID_Matriz_Permissao;
            Username = _Usuario.cUsuario;
            Token = token;
            User = _Usuario;
        }
    }
}
