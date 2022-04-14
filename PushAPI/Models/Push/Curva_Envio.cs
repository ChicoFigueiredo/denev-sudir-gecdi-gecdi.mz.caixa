using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Curva_Envio
    {
        public Curva_Envio()
        {
            Curva_Envio_Tranches = new HashSet<Curva_Envio_Tranches>();
            SolicitacaoidCurvaNavigation = new HashSet<Solicitacao>();
            SolicitacaoidCurva_Envio_Dia_CheioNavigation = new HashSet<Solicitacao>();
        }

        public int idCurva_Envio { get; set; }
        public string Apelido_Curva_Envio { get; set; } = null!;
        public string Nome_Curva_Envio { get; set; } = null!;

        public virtual ICollection<Curva_Envio_Tranches> Curva_Envio_Tranches { get; set; }
        public virtual ICollection<Solicitacao> SolicitacaoidCurvaNavigation { get; set; }
        public virtual ICollection<Solicitacao> SolicitacaoidCurva_Envio_Dia_CheioNavigation { get; set; }
    }
}
