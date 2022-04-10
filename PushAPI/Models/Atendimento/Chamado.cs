using System;
using System.Collections.Generic;

namespace PushAPI.Models.Atendimento
{
    public partial class Chamado
    {
        public Chamado()
        {
            Distribuicao_Chamados = new HashSet<Distribuicao_Chamados>();
        }

        public long idChamado { get; set; }
        public string vOrigem { get; set; } = null!;
        public long iIdentificacaoChamado { get; set; }
        public string? vTipoOcorrencia { get; set; }
        public string? vTipoOrigem { get; set; }
        public string? vNatureza { get; set; }
        public string? vAssunto { get; set; }
        public string? vItem { get; set; }
        public string? vMotivo { get; set; }
        public string? vTelefones { get; set; }
        public string? vCPF_CNPJ_Solicitante { get; set; }
        public long? iCPF_CNPJ_Solicitante { get; set; }
        public string? vNomeSolicitante { get; set; }
        public string? vEmail { get; set; }
        public string? vManifesto { get; set; }
        public string? vComentario { get; set; }
        public string? vOrgaoOrigem { get; set; }
        public string? vCodigoOrigem { get; set; }
        public string? vHTML_OrigemChamado { get; set; }
        public string? vSituacao { get; set; }
        public bool bDetalheCapturado { get; set; }
        public DateTime? dDataVencimento { get; set; }
        public bool bFechado { get; set; }
        public short? iLotacao { get; set; }
        public string? vLotacao { get; set; }
        public DateTime? dDataHoraAbertura { get; set; }
        public string? vResposta { get; set; }
        public short iReabertura { get; set; }
        public string? vMovimentacoes { get; set; }
        public short? iUnidadeResposta { get; set; }
        public string? vUnidadeResposta { get; set; }
        public DateTime? dAtualizacao { get; set; }
        public short idGrupo { get; set; }
        public int idTipoRespostaPadrao { get; set; }
        public bool bReaberto { get; set; }
        public string? vWorkOrderID { get; set; }
        public string? vREQ { get; set; }
        public DateTime? dDataMaximaTransferencia { get; set; }
        public string? vAcao { get; set; }
        public string? vTemplateResposta { get; set; }
        public DateTime? dDataPrimeiraAcaoAutomatico { get; set; }
        public DateTime? dDataUltimoAcaoAutomatico { get; set; }
        public string? vUltimaAcaoAplicada { get; set; }
        public string? vUltimoTemplateRespostaAplicada { get; set; }
        public bool bFoiFechadoAutomatico { get; set; }
        public DateTime? dDiaUltimoAcaoAutomatico { get; set; }
        public string? vUltimaRespostaEnviada { get; set; }
        public string? vApelidoAtendente { get; set; }
        public string? vSituacaoGECDI { get; set; }
        public bool bFoiTratado { get; set; }
        public string? vApelidoAtendenteTratou { get; set; }
        public DateTime? dDataHoraTratamento { get; set; }

        public virtual Grupos idGrupoNavigation { get; set; } = null!;
        public virtual Tipo_Resposta_Padrao idTipoRespostaPadraoNavigation { get; set; } = null!;
        public virtual Acoes? vAcaoNavigation { get; set; }
        public virtual Atendentes? vApelidoAtendenteNavigation { get; set; }
        public virtual Templates_Respostas? vTemplateRespostaNavigation { get; set; }
        public virtual ICollection<Distribuicao_Chamados> Distribuicao_Chamados { get; set; }
    }
}
