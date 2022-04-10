using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Mensagem
    {
        public Mensagem()
        {
            Envio_CPF = new HashSet<Envio_CPF>();
            Envio_Tranche = new HashSet<Envio_Tranche>();
            Solicitacao = new HashSet<Solicitacao>();
        }

        public int idEnvio_Mensagem { get; set; }
        public string Mensagem1 { get; set; } = null!;
        public DateTime? Data_Inicio { get; set; }
        public DateTime? Data_Fim { get; set; }
        public int? Tranches { get; set; }
        public int? Push_Enviados { get; set; }
        public string? Apelido { get; set; }
        public bool? Ativo { get; set; }
        public int Enviados { get; set; }
        public int Faltam { get; set; }
        public bool? AppCaixa { get; set; }
        public bool? CaixaTem { get; set; }
        public string? MensagemRegex { get; set; }
        public string? Monitoração_Producao { get; set; }
        public bool CAIXA_Tem { get; set; }
        public bool Cartão { get; set; }
        public bool Crédito { get; set; }
        public bool Pre_Autorizado { get; set; }

        public virtual ICollection<Envio_CPF> Envio_CPF { get; set; }
        public virtual ICollection<Envio_Tranche> Envio_Tranche { get; set; }
        public virtual ICollection<Solicitacao> Solicitacao { get; set; }
    }
}
