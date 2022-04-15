using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Curva_Envio
    {
        public Curva_Envio()
        {
            Curva_Envio_Tranches = new HashSet<Curva_Envio_Tranches>();
            SolicitacaoQuantidade_Maxima_AutorizadaNavigation = new HashSet<Solicitacao>();
            SolicitacaoidCurvaNavigation = new HashSet<Solicitacao>();
        }

        public int idCurva_Envio { get; set; }
        public string Apelido_Curva_Envio { get; set; } = null!;
        public string Nome_Curva_Envio { get; set; } = null!;

        public virtual ICollection<Curva_Envio_Tranches> Curva_Envio_Tranches { get; set; }
        public virtual ICollection<Solicitacao> SolicitacaoQuantidade_Maxima_AutorizadaNavigation { get; set; }
        public virtual ICollection<Solicitacao> SolicitacaoidCurvaNavigation { get; set; }
    }
}
