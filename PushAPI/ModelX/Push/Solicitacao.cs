using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PushAPI.Models.Push
{
    public partial class Solicitacao
    {
        [NotMapped] 
        public string? Enviar_Horario_InicialFormatado { get => Enviar_Horario_Inicial?.ToString(@"hh\:mm"); set => Enviar_Horario_Inicial = TimeSpan.Parse(value); }
        [NotMapped] 
        public string? Enviar_Horario_FinalFormatado { get => Enviar_Horario_Final?.ToString(@"hh\:mm"); set => Enviar_Horario_Final = TimeSpan.Parse(value); }
     
    }
}
