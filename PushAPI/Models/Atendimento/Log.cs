using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Log
    {
        public long iID_Log { get; set; }
        public string? vNome_Log { get; set; }
        public string? tDescricao_Log { get; set; }
        public string? vToken { get; set; }
        public string? cMatricula { get; set; }
    }
}
