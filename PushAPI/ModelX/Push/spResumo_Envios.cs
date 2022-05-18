using System.ComponentModel.DataAnnotations;

namespace PushAPI.Models.Push
{
    public class spResumo_Envios
    {
        [Key]
        public int IDS { get; set; }
        public long WF { get; set; }
        public string Canal { get; set; }
        public int IDM { get; set; }
        public string Mensagem { get; set; }
        public int Qtd_Dia { get; set; }
        public int Enviado { get; set; }
        public double Percentual { get; set; }
        public double Percentual_Dec { get; set; }

    }
}
