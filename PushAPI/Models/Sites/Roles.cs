using System;
using System.Collections.Generic;

namespace PushAPI.Models.Sites
{
    public partial class Roles
    {
        public Roles()
        {
            Usuario = new HashSet<Usuario>();
        }

        public int idRole { get; set; }
        public string Role { get; set; } = null!;
        public string Nome_Role { get; set; } = null!;
        public short Ordem { get; set; }
        public string Rota { get; set; } = null!;
        public bool Tem_Permissao_Geral { get; set; }
        public bool E_Admin { get; set; }
        public bool Pode_Marcar_Envio { get; set; }
        public bool Pode_Geranciar_Simulacao { get; set; }
        public bool Pode_Ver_Relatorio { get; set; }
        public bool Pode_Gerenciar_Solicitacao { get; set; }
        public bool Pode_Gerenciar_Envios { get; set; }
        public bool Pode_Gerenciar_Curvas { get; set; }
        public bool Pode_Suspender_Envios { get; set; }

        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
