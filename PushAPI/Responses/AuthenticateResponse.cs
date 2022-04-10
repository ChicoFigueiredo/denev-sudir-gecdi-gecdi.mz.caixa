using PushAPI.Models.Sites;
using System.DirectoryServices;

namespace PushAPI.Responses
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Username { get; set; }
        public string token { get; set; }
        public Usuario User { get; set; }


        public AuthenticateResponse(Usuario _Usuario, string _token, DirectoryEntry xDE, SearchResult xSR)
        {
            Id = _Usuario.idUsuario;
            Username = _Usuario.cUsuario;
            token = _token;
            User = _Usuario;
            if (xDE.Properties["thumbnailPhoto"] != null)
                Photo = "data:image/png;base64," + Convert.ToBase64String((byte[])xDE.Properties["thumbnailPhoto"].Value);

        }
    }
 }
