using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Distribuicao_Chamados
    {
        public int idDistribuicao { get; set; }
        public long idChamado { get; set; }
        public bool bE_Ouvidoria { get; set; }
        public string vApelidoAtendente { get; set; } = null!;

        public virtual Chamado idChamadoNavigation { get; set; } = null!;
        public virtual Distribuicao idDistribuicaoNavigation { get; set; } = null!;
        public virtual Atendentes vApelidoAtendenteNavigation { get; set; } = null!;
    }
}
