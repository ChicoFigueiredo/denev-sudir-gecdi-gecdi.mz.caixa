using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Fila
    {
        public long idFila { get; set; }
        public int idEnvio_Mensagem { get; set; }
        public int Qtd { get; set; }

        public virtual Mensagem idEnvio_MensagemNavigation { get; set; } = null!;
    }
}
