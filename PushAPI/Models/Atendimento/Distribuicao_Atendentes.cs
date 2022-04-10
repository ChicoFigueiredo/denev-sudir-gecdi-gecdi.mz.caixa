using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Distribuicao_Atendentes
    {
        public int idDistribuicao { get; set; }
        public string vApelidoAtendente { get; set; } = null!;
        public bool bRecebeChamado { get; set; }
        public bool bRecebeOuvidoria { get; set; }
        public int iQuantidadeBackLogChamados { get; set; }
        public int iQuantidadeBackLogOuvidorias { get; set; }
        public int iQuantidadeChamadosNovos { get; set; }
        public int iQuantidadeOuvidoriaNovos { get; set; }
        public int iTotalChamados { get; set; }
        public int iTotalOuvidorias { get; set; }
        public int iTotalGeralChamados { get; set; }

        public virtual Distribuicao idDistribuicaoNavigation { get; set; } = null!;
        public virtual Atendentes vApelidoAtendenteNavigation { get; set; } = null!;
    }
}
