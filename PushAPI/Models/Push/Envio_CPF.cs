using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Envio_CPF
    {
        public long idEnvio_CPF { get; set; }
        public int idEnvio_Mensagem { get; set; }
        public int idEnvio_Tranche { get; set; }
        public long CPF { get; set; }
        public byte Qtd { get; set; }
        public string? V1 { get; set; }
        public string? canal { get; set; }

        public virtual Clientes CPFNavigation { get; set; } = null!;
        public virtual Mensagem idEnvio_MensagemNavigation { get; set; } = null!;
        public virtual Envio_Tranche idEnvio_TrancheNavigation { get; set; } = null!;
    }
}
