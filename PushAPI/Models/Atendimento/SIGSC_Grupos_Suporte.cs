using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class SIGSC_Grupos_Suporte
    {
        public SIGSC_Grupos_Suporte()
        {
            Templates_Respostas = new HashSet<Templates_Respostas>();
        }

        public string idGrupoSuporte { get; set; } = null!;
        public string? Empresa { get; set; }
        public string? Orgao_Suporte { get; set; }
        public string? Grupo_Suporte { get; set; }
        public int? CGC_Unidade { get; set; }
        public string? NTSC { get; set; }

        public virtual ICollection<Templates_Respostas> Templates_Respostas { get; set; }
    }
}
