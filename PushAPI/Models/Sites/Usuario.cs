using System;
using System.Collections.Generic;

namespace PushAPI.Models.Sites
{
    public partial class Usuario
    {
        public int idUsuario { get; set; }
        public string? cUsuario { get; set; }
        public string? Nome { get; set; }
        public short? CGC { get; set; }
        public int idRole { get; set; }

        public virtual Roles idRoleNavigation { get; set; } = null!;
    }
}
