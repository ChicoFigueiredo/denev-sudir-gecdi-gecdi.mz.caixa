using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace PushAPI.Models.Push
{
    public partial class Solicitacao
    {
        private Regex testHora = new Regex(@"^\d\d[:]\d\d([:]00){0,1}$");

        [NotMapped] 
        public string? Enviar_Horario_InicialFormatado { 
            get => Enviar_Horario_Inicial?.ToString(@"hh\:mm");
            set {
                if (testHora.IsMatch(value.ToString()))
                    Enviar_Horario_Inicial = TimeSpan.Parse(value);
                else
                {
                    DateTime data = DateTime.Parse(value);
                    Enviar_Horario_Inicial = new TimeSpan(data.Hour,data.Minute,data.Second);
                }

                    
            }
        }
        [NotMapped] 
        public string? Enviar_Horario_FinalFormatado
        {
            get => Enviar_Horario_Final?.ToString(@"hh\:mm");
            set
            {
                if (testHora.IsMatch(value.ToString()))
                    Enviar_Horario_Final = TimeSpan.Parse(value);
                else
                {
                    DateTime data = DateTime.Parse(value);
                    Enviar_Horario_Final = new TimeSpan(data.Hour, data.Minute, data.Second);
                }


            }
        }
     
    }
}
