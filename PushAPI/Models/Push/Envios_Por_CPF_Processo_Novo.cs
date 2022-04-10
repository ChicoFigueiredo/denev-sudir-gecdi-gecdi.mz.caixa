using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Envios_Por_CPF_Processo_Novo
    {
        public int idEnvio_Mensagem { get; set; }
        public long idEnvio_Tranche { get; set; }
        public string Mensagem { get; set; } = null!;
        public DateTime Data_Envio { get; set; }
        public TimeSpan Hora_Envio { get; set; }
        public long CPF { get; set; }
        public string Canal { get; set; } = null!;
        public string? Nome_Do_Arquivo { get; set; }
    }
}
