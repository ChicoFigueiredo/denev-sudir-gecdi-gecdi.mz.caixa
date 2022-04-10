using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Tipos_Chamados
    {
        public Tipos_Chamados()
        {
            Templates_Respostas = new HashSet<Templates_Respostas>();
        }

        public string TipoChamado { get; set; } = null!;
        public string? Nome { get; set; }

        public virtual ICollection<Templates_Respostas> Templates_Respostas { get; set; }
    }
}
