using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Clientes
    {
        public Clientes()
        {
            Envio_CPF = new HashSet<Envio_CPF>();
        }

        public long CPF { get; set; }
        public bool? Tem_App_CAIXA { get; set; }
        public bool? Tem_CAIXA_Tem { get; set; }
        public byte Qtd { get; set; }
        public byte Base_Origem { get; set; }

        public virtual ICollection<Envio_CPF> Envio_CPF { get; set; }
    }
}
