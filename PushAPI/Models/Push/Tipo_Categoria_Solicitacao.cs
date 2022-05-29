using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Tipo_Categoria_Solicitacao
    {
        public Tipo_Categoria_Solicitacao()
        {
            Solicitacao = new HashSet<Solicitacao>();
        }

        public short Tipo_Categoria_Solicitacao1 { get; set; }
        public string Apelido_Tipo_Categoria_Solicitacao { get; set; } = null!;
        public string Nome_Tipo_Categoria_Solicitacao { get; set; } = null!;
        public int Minimo_Tranche { get; set; }
        public int Maximo_Tranche { get; set; }
        public short Ordem { get; set; }
        public string Cor { get; set; } = null!;
        public int idCurva_Envio { get; set; }
        public int? idCurva_Envio_2 { get; set; }
        public int? idCurva_Envio_3 { get; set; }

        public virtual Curva_Envio idCurva_EnvioNavigation { get; set; } = null!;
        public virtual Curva_Envio? idCurva_Envio_2Navigation { get; set; }
        public virtual Curva_Envio? idCurva_Envio_3Navigation { get; set; }
        public virtual ICollection<Solicitacao> Solicitacao { get; set; }
    }
}
