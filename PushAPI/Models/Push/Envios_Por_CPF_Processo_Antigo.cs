using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Envios_Por_CPF_Processo_Antigo
    {
        public int idEnvio_Mensagem { get; set; }
        public int idEnvio_Tranche { get; set; }
        public string Mensagem { get; set; } = null!;
        public DateTime? Data_Envio { get; set; }
        public TimeSpan? Hora_Envio { get; set; }
        public long CPF { get; set; }
        public string? canal { get; set; }
        public string? Nome_Do_Arquivo { get; set; }
    }
}
