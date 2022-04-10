using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Feriados
    {
        public DateTime? dData { get; set; }
        public short Nr_Ano { get; set; }
        public short Nr_Mes { get; set; }
        public short Nr_Dia { get; set; }
        public string? Tp_Feriado { get; set; }
        public string Ds_Feriado { get; set; } = null!;
        public string Sg_UF { get; set; } = null!;
    }
}
