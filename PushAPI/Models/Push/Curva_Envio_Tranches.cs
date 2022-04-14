using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Curva_Envio_Tranches
    {
        public int idCurva_Envio_Tranches { get; set; }
        public int idCurva_Envio { get; set; }
        public TimeSpan? Hora_Envio { get; set; }
        public short Tranche { get; set; }
        public int? Quantidade_Normal { get; set; }
        public int? Quantidade_Reduzida { get; set; }

        public virtual Curva_Envio idCurva_EnvioNavigation { get; set; } = null!;
    }
}
