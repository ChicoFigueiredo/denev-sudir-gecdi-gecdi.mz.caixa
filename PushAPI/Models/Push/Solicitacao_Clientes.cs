using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Solicitacao_Clientes
    {
        public long idSolicitacao_Cliente { get; set; }
        public int? idSolicitacao_PUSH { get; set; }
        public long? idSolicitacao_Simulacao_Envio { get; set; }
        public long CPF { get; set; }
        public string? Campo1 { get; set; }
        public string? Campo2 { get; set; }
        public string? Campo3 { get; set; }
        public string? Campo4 { get; set; }
        public string? Campo5 { get; set; }
        public bool Agendado { get; set; }
        public bool Enviado { get; set; }

        public virtual Solicitacao? idSolicitacao_PUSHNavigation { get; set; }
        public virtual Solicitacao_Simulacao_Envio? idSolicitacao_Simulacao_EnvioNavigation { get; set; }
    }
}
