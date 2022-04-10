using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Lista_Paginas
    {
        public long iIdPagina { get; set; }
        public string vAppPagina { get; set; } = null!;
        public string vNomePagina { get; set; } = null!;
        public string vTitulo { get; set; } = null!;
        public string vResumo { get; set; } = null!;
        public string vConteudo { get; set; } = null!;
    }
}
