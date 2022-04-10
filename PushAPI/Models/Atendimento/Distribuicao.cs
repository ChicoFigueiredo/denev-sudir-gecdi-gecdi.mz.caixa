using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Distribuicao
    {
        public Distribuicao()
        {
            Distribuicao_Atendentes = new HashSet<Distribuicao_Atendentes>();
            Distribuicao_Chamados = new HashSet<Distribuicao_Chamados>();
        }

        public int idDistribuicao { get; set; }
        public DateTime dDataHoraDistribuicao { get; set; }
        public DateTime dDataDistribuicao { get; set; }
        public string? vAtendenteIniciarNormal { get; set; }
        public string? vAtendenteIniciarOuvidoria { get; set; }
        public int iAtendimentosRealizados { get; set; }
        public int iAtendimentosRespondidosAutomaticamente { get; set; }
        public int iQuantidadeEmpregadosAtendendo { get; set; }
        public int iQuantidadeOuvidoriasNovas { get; set; }
        public int iQuantidadeChamadosNovos { get; set; }

        public virtual ICollection<Distribuicao_Atendentes> Distribuicao_Atendentes { get; set; }
        public virtual ICollection<Distribuicao_Chamados> Distribuicao_Chamados { get; set; }
    }
}
