using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Datas
    {
        public DateTime dData { get; set; }
        public short Ano { get; set; }
        public byte Mes { get; set; }
        public byte Dia { get; set; }
        public string DiaSemana { get; set; } = null!;
        public string Curva_Envio { get; set; } = null!;
        public bool? É_Dia_Util { get; set; }
        public bool É_Dia_Nao_Util { get; set; }
        public bool Fim_de_Semana { get; set; }
        public bool Feriado { get; set; }
        public string Efemeride { get; set; } = null!;
        public DateTime Dia_Anterior { get; set; }
        public DateTime Dia_Posterior { get; set; }
        public DateTime Dia_Util_Anterior { get; set; }
        public DateTime Dia_Util_Posterior { get; set; }
        public short Contagem_Dia_Ano { get; set; }
        public short Contagem_Dia_Util_Ano { get; set; }
        public short Contagem_Dia_Mes { get; set; }
        public short Contagem_Dia_Util_Mes { get; set; }
        public short Dias_Mes { get; set; }
        public short Dias_Util_Mes { get; set; }
        public short Dias_Ano { get; set; }
        public short Dias_Util_Ano { get; set; }
        public bool Alto_Trafego { get; set; }
    }
}
