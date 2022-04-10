using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Grupos
    {
        public Grupos()
        {
            Chamado = new HashSet<Chamado>();
        }

        public short idGrupo { get; set; }
        public string? vNomeGrupo { get; set; }
        public string? vSQLMarcacao { get; set; }

        public virtual ICollection<Chamado> Chamado { get; set; }
    }
}
