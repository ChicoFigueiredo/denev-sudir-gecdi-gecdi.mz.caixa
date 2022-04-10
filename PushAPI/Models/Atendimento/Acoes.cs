using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Acoes
    {
        public Acoes()
        {
            Chamado = new HashSet<Chamado>();
            Templates_Respostas = new HashSet<Templates_Respostas>();
        }

        public string vAcao { get; set; } = null!;
        public string? vNome_Acao { get; set; }

        public virtual ICollection<Chamado> Chamado { get; set; }
        public virtual ICollection<Templates_Respostas> Templates_Respostas { get; set; }
    }
}
