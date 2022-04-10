using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Requisicoes_Envio
    {
        public Requisicoes_Envio()
        {
            Solicitacao_Simulacao_Envio = new HashSet<Solicitacao_Simulacao_Envio>();
        }

        public string REQ_Envio { get; set; } = null!;
        public string? WO_Envio { get; set; }
        public string? Historico { get; set; }
        public DateTime? Abertura { get; set; }
        public DateTime? Fechamento { get; set; }

        public virtual ICollection<Solicitacao_Simulacao_Envio> Solicitacao_Simulacao_Envio { get; set; }
    }
}
