using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Solicitacao
    {
        public Solicitacao()
        {
            Solicitacao_Clientes = new HashSet<Solicitacao_Clientes>();
            Solicitacao_Simulacao_Envio = new HashSet<Solicitacao_Simulacao_Envio>();
            Solicitacao_Upload = new HashSet<Solicitacao_Upload>();
        }

        public int idSolicitacao_PUSH { get; set; }
        public long? WF_GECRM { get; set; }
        public string Nome_Solicitacao { get; set; } = null!;
        public string REQ_WO_Aprovacao_Mensagem { get; set; } = null!;
        public string? REQ_WO_Aprovacao_Mensagem_Texto { get; set; }
        public int? idEnvio_Mensagem { get; set; }
        public string Mensagem { get; set; } = null!;
        public string Canal { get; set; } = null!;
        public string Nome_Campo1 { get; set; } = null!;
        public string Nome_Campo2 { get; set; } = null!;
        public string Nome_Campo3 { get; set; } = null!;
        public string Nome_Campo4 { get; set; } = null!;
        public string Nome_Campo5 { get; set; } = null!;
        public int idCurva { get; set; }
        public int Quantidade_Maxima_Autorizada { get; set; }
        public DateTime? Enviar_a_partir_de { get; set; }
        public DateTime? Enviar_no_maximo_ate { get; set; }
        public bool? Enviar_SEG { get; set; }
        public bool? Enviar_TER { get; set; }
        public bool? Enviar_QUA { get; set; }
        public bool? Enviar_QUI { get; set; }
        public bool? Enviar_SEX { get; set; }
        public bool? Enviar_SAB { get; set; }
        public bool? Enviar_DOM { get; set; }
        public TimeSpan? Enviar_Horario_Inicial { get; set; }
        public TimeSpan? Enviar_Horario_Final { get; set; }
        public int? Limitacao_Tranche { get; set; }
        public int Quantidade_Total { get; set; }
        public int Quantidade_Enviada { get; set; }
        public string? Matricula_Cadastramento { get; set; }
        public DateTime? Data_Cadastramento { get; set; }
        public bool Autorizacao_Gestor_PUSH { get; set; }
        public string? Matricula_Autorizacao_Gestor_PUSH { get; set; }
        public bool Bloqueado_TI { get; set; }
        public string? Matricula_Bloqueio_TI { get; set; }
        public DateTime? Data_Hora_Bloqueio { get; set; }
        public DateTime? Data_Hora_Autorizacao { get; set; }
        public bool Cancelado { get; set; }
        public string? Matricula_Cancelamento { get; set; }
        public DateTime? Data_Hora_Cancelamento { get; set; }
        public short CGCDemandante { get; set; }
        public short CGCExecutora { get; set; }
        public bool Finalizado { get; set; }
        public string? Impactos_Previstos { get; set; }
        public byte Prioridade { get; set; }
        public int Quantidade_Agendada { get; set; }
        public int? Quantidade_Total_Restante { get; set; }
        public int? Limite_Mensagens_Por_Dia { get; set; }
        public short idTipoMensagem { get; set; }
        public string? Titulo { get; set; }
        public string? URL_Acao { get; set; }
        public string? URL_Imagem { get; set; }
        public bool? E_Cadastramento_Manual { get; set; }
        public string Observacoes { get; set; } = null!;
        public short Tipo_Categoria_Solicitacao { get; set; }

        public virtual Canais CanalNavigation { get; set; } = null!;
        public virtual Curva_Envio Quantidade_Maxima_AutorizadaNavigation { get; set; } = null!;
        public virtual Tipo_Categoria_Solicitacao Tipo_Categoria_SolicitacaoNavigation { get; set; } = null!;
        public virtual Curva_Envio idCurvaNavigation { get; set; } = null!;
        public virtual Mensagem? idEnvio_MensagemNavigation { get; set; }
        public virtual ICollection<Solicitacao_Clientes> Solicitacao_Clientes { get; set; }
        public virtual ICollection<Solicitacao_Simulacao_Envio> Solicitacao_Simulacao_Envio { get; set; }
        public virtual ICollection<Solicitacao_Upload> Solicitacao_Upload { get; set; }
    }
}
