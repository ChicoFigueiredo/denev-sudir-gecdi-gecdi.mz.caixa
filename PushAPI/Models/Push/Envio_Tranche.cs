using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Envio_Tranche
    {
        public Envio_Tranche()
        {
            Envio_CPF = new HashSet<Envio_CPF>();
        }

        public int idEnvio_Tranche { get; set; }
        public int idEnvio_Mensagem { get; set; }
        public short Tranche { get; set; }
        public DateTime? Data_Envio { get; set; }
        public TimeSpan? Hora_Envio { get; set; }
        public string? Nome_Do_Arquivo { get; set; }
        public int? Limite_Clientes { get; set; }
        public int? Limite_PUSH { get; set; }
        public int? Quantidade_PUSH_Reportado { get; set; }
        public bool Enviado { get; set; }
        public int? Retorno { get; set; }
        public int? Milisegundos { get; set; }
        public short ParametroLote { get; set; }
        public bool NaoExecutado { get; set; }

        public virtual Mensagem idEnvio_MensagemNavigation { get; set; } = null!;
        public virtual ICollection<Envio_CPF> Envio_CPF { get; set; }
    }
}
