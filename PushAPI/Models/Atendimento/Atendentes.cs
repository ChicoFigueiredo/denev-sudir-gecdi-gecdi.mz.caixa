using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Atendentes
    {
        public Atendentes()
        {
            Chamado = new HashSet<Chamado>();
            Distribuicao_Atendentes = new HashSet<Distribuicao_Atendentes>();
            Distribuicao_Chamados = new HashSet<Distribuicao_Chamados>();
        }

        public string vApelidoAtendente { get; set; } = null!;
        public string cUsuario { get; set; } = null!;
        public bool bRecebeChamado { get; set; }
        public bool bRecebeOuvidoria { get; set; }
        public bool bE_Ativo { get; set; }

        public virtual SISRH cUsuarioNavigation { get; set; } = null!;
        public virtual ICollection<Chamado> Chamado { get; set; }
        public virtual ICollection<Distribuicao_Atendentes> Distribuicao_Atendentes { get; set; }
        public virtual ICollection<Distribuicao_Chamados> Distribuicao_Chamados { get; set; }
    }
}
