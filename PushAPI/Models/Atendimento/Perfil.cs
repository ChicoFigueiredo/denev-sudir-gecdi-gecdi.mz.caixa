using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Perfil
    {
        public Perfil()
        {
            Permissoes = new HashSet<Permissoes>();
        }

        public int iID_Perfil { get; set; }
        public string? vNome_Perfil { get; set; }
        public bool bE_Permissao_Geral { get; set; }
        public short iOrdem { get; set; }
        public bool bE_Admin { get; set; }
        public bool bE_Ver_Chat { get; set; }
        public bool bE_Contratar_CDC { get; set; }
        public bool bE_Associar_Chat { get; set; }
        public bool bVisualiza_Relatorios_Gerais { get; set; }
        public bool bVisualiza_Relatorios_Restritos { get; set; }
        public bool bE_Administrador_Simulador { get; set; }
        public bool? bE_Atendente { get; set; }

        public virtual ICollection<Permissoes> Permissoes { get; set; }
    }
}
