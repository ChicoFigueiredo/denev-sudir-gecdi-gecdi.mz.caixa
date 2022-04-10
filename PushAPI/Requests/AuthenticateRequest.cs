using System.ComponentModel.DataAnnotations;

namespace PushAPI.Requests
{
    public class AuthenticateRequest
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }

        public string Username { get => this.email; }
    }
}
