using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Templates_Respostas
    {
        public Templates_Respostas()
        {
            Chamado = new HashSet<Chamado>();
        }

        public string vTemplateResposta { get; set; } = null!;
        public string? vAssunto { get; set; }
        public string? vResposta { get; set; }
        public DateTime? dLastUse { get; set; }
        public long? iCount { get; set; }
        public string vAcao { get; set; } = null!;
        public int? CGC_Tranferencia { get; set; }
        public bool? bE_Ativo { get; set; }
        public string TipoChamado { get; set; } = null!;
        public string? idGrupoSuporte { get; set; }

        public virtual Unidades? CGC_TranferenciaNavigation { get; set; }
        public virtual Tipos_Chamados TipoChamadoNavigation { get; set; } = null!;
        public virtual SIGSC_Grupos_Suporte? idGrupoSuporteNavigation { get; set; }
        public virtual Acoes vAcaoNavigation { get; set; } = null!;
        public virtual ICollection<Chamado> Chamado { get; set; }
    }
}
