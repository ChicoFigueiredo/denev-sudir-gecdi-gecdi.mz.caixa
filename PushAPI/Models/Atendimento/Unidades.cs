using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Unidades
    {
        public Unidades()
        {
            Templates_Respostas = new HashSet<Templates_Respostas>();
        }

        public int CGC { get; set; }
        public string? Nome_Exibicao { get; set; }
        public int? Superior { get; set; }
        public int NAO_SEI { get; set; }
        public string? Nome { get; set; }
        public string? Sigla { get; set; }
        public string? Cidade { get; set; }
        public string? Estado { get; set; }
        public string? Tipo { get; set; }
        public string? Gestor { get; set; }
        public string? vJustificativaTransferencia { get; set; }
        public bool bDeletado { get; set; }

        public virtual ICollection<Templates_Respostas> Templates_Respostas { get; set; }
    }
}
