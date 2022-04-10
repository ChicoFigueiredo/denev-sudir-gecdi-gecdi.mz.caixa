using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Permissoes
    {
        public int iID_Matriz_Permissao { get; set; }
        public short? iCodigo_Unidade { get; set; }
        public string? cUsuario { get; set; }
        public int iID_Perfil { get; set; }

        public virtual Perfil iID_PerfilNavigation { get; set; } = null!;
    }
}
