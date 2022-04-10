using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Tipo_Resposta_Padrao
    {
        public Tipo_Resposta_Padrao()
        {
            Chamado = new HashSet<Chamado>();
        }

        public int idTipoRespostaPadrao { get; set; }
        public string? vRespostaPadrao { get; set; }
        public string? vSQLMarcacao { get; set; }

        public virtual ICollection<Chamado> Chamado { get; set; }
    }
}
