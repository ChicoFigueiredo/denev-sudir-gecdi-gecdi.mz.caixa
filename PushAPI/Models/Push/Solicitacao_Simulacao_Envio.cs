using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    /// <summary>
    /// 0
    /// </summary>
    public partial class Solicitacao_Simulacao_Envio
    {
        public Solicitacao_Simulacao_Envio()
        {
            Solicitacao_Clientes = new HashSet<Solicitacao_Clientes>();
        }

        public long idSolicitacao_Simulacao_Envio { get; set; }
        public int idSolicitacao_PUSH { get; set; }
        public int idEnvio_Mensagem { get; set; }
        public int Tranche { get; set; }
        public DateTime Data { get; set; }
        public TimeSpan Hora { get; set; }
        public bool Homologado { get; set; }
        public int Quantidade { get; set; }
        public string? Nome_Arquivo { get; set; }
        public bool Enviado { get; set; }
        public string? Matricula_Enviante { get; set; }
        public int? Quantidade_Reportada { get; set; }
        public DateTime? Data_Hora_Envio { get; set; }
        public DateTime? Data_Hora_Atualizacao { get; set; }
        public bool Bloqueado_TI { get; set; }
        public string? Matricula_Bloqueio_TI { get; set; }
        public DateTime? Data_Hora_Bloqueio { get; set; }
        public string? REQ_Envio { get; set; }
        public bool Gerado { get; set; }
        public short ParametroLote { get; set; }
        public bool Cancelado { get; set; }
        public string? Comando_PowerShell { get; set; }

        public virtual Requisicoes_Envio? REQ_EnvioNavigation { get; set; }
        public virtual Solicitacao idSolicitacao_PUSHNavigation { get; set; } = null!;
        public virtual ICollection<Solicitacao_Clientes> Solicitacao_Clientes { get; set; }
    }
}
