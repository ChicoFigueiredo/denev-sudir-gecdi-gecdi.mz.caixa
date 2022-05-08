using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Solicitacao_Upload
    {
        public long idSolicitacao_Upload { get; set; }
        public int idSolicitacao_PUSH { get; set; }
        public DateTime? Data_Upload { get; set; }
        public string? Matricula_Upload { get; set; }
        public string Arquivo { get; set; } = null!;
        public bool Processado { get; set; }
        public DateTime? Data_Processamento { get; set; }
        public bool Rejeitado { get; set; }
        public int Registros_Total { get; set; }
        public int Registros_Aceitos { get; set; }
        public int Registros_Rejeitados { get; set; }
        public string? Resultado_Processamento { get; set; }

        public virtual Solicitacao idSolicitacao_PUSHNavigation { get; set; } = null!;
    }
}
