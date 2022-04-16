using PushAPI.Helpers;

namespace PushAPI.Requests
{
    public class RequestNewUser
    {
        public string matricula { get; set; }
        public Role role { get; set; } = Role.User;
    }
}
