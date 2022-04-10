using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Canais
    {
        public Canais()
        {
            Solicitacao = new HashSet<Solicitacao>();
        }

        public string Canal { get; set; } = null!;
        public string? Nome_Canal { get; set; }
        public bool? Disponivel { get; set; }

        public virtual ICollection<Solicitacao> Solicitacao { get; set; }
    }
}
