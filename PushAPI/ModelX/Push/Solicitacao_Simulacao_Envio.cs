using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PushAPI.Models.Push
{
    /// <summary>
    /// 0
    /// </summary>
    public partial class Solicitacao_Simulacao_Envio
    {
        [NotMapped]
        public string HoraFormatado { 
            get => Hora.ToString(@"hh\:mm"); 
            set => Hora = TimeSpan.Parse(value); 
        }
        
    }
}
