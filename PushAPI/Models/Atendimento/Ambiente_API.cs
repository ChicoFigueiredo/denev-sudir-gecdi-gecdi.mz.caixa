using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Ambiente_API
    {
        public int iIdAmbiente { get; set; }
        public string vNome_Ambiente { get; set; } = null!;
        public string vApelido { get; set; } = null!;
        public string vURL_API { get; set; } = null!;
        public int iOrdem { get; set; }
        public bool? bE_Ativo { get; set; }
    }
}
