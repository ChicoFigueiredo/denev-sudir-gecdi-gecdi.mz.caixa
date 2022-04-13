using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PushAPI.Models.Push
{
    public partial class Curva_Envio_Tranches
    {
        [NotMapped]
        public string? Hora_EnvioFormatado { get => Hora_Envio?.ToString(@"hh\:mm"); set => Hora_Envio = TimeSpan.Parse(value); }

    }
}
