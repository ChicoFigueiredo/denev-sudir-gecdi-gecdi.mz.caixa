using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class SISRH
    {
        public SISRH()
        {
            Atendentes = new HashSet<Atendentes>();
        }

        public string cUsuario { get; set; } = null!;
        public string? Matricula { get; set; }
        public string? DV { get; set; }
        public string? Nome { get; set; }
        public string? Sexo { get; set; }
        public string? CPF { get; set; }
        public DateTime? Nascimento { get; set; }
        public DateTime? Admissão { get; set; }
        public DateTime? Column8 { get; set; }
        public DateTime? Column9 { get; set; }
        public short? Column10 { get; set; }
        public string? Column11 { get; set; }
        public string? Cargo_Sigla { get; set; }
        public string? Cargo { get; set; }
        public short? Função_Codigo { get; set; }
        public string? Função { get; set; }
        public string? Column16 { get; set; }
        public string? Endereço { get; set; }
        public string? Bairro { get; set; }
        public string? Cidade { get; set; }
        public string? UF { get; set; }
        public string? CEP { get; set; }
        public string? Fone_Fixo { get; set; }
        public string? Fone_Celular { get; set; }
        public string? Column24 { get; set; }
        public short? Afastamento_Codigo { get; set; }
        public string? Afastamento { get; set; }
        public string? Column27 { get; set; }
        public DateTime? Column28 { get; set; }

        public virtual ICollection<Atendentes> Atendentes { get; set; }
    }
}
