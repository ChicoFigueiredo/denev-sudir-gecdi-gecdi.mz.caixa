using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PushAPI.Models.Atendimento
{
    public partial class dbAtendimento : DbContext
    {
        public dbAtendimento()
        {
        }

        public dbAtendimento(DbContextOptions<dbAtendimento> options)
            : base(options)
        {
        }

        public virtual DbSet<Acoes> Acoes { get; set; } = null!;
        public virtual DbSet<Ambiente_API> Ambiente_API { get; set; } = null!;
        public virtual DbSet<Atendentes> Atendentes { get; set; } = null!;
        public virtual DbSet<CacheParametros> CacheParametros { get; set; } = null!;
        public virtual DbSet<Chamado> Chamado { get; set; } = null!;
        public virtual DbSet<Distribuicao> Distribuicao { get; set; } = null!;
        public virtual DbSet<Distribuicao_Atendentes> Distribuicao_Atendentes { get; set; } = null!;
        public virtual DbSet<Distribuicao_Chamados> Distribuicao_Chamados { get; set; } = null!;
        public virtual DbSet<Grupos> Grupos { get; set; } = null!;
        public virtual DbSet<Lista_Paginas> Lista_Paginas { get; set; } = null!;
        public virtual DbSet<Log> Log { get; set; } = null!;
        public virtual DbSet<Parametros_Distribuicao> Parametros_Distribuicao { get; set; } = null!;
        public virtual DbSet<Perfil> Perfil { get; set; } = null!;
        public virtual DbSet<Permissoes> Permissoes { get; set; } = null!;
        public virtual DbSet<SIGSC_Grupos_Suporte> SIGSC_Grupos_Suporte { get; set; } = null!;
        public virtual DbSet<SISRH> SISRH { get; set; } = null!;
        public virtual DbSet<Templates_Respostas> Templates_Respostas { get; set; } = null!;
        public virtual DbSet<Tipo_Resposta_Padrao> Tipo_Resposta_Padrao { get; set; } = null!;
        public virtual DbSet<Tipos_Chamados> Tipos_Chamados { get; set; } = null!;
        public virtual DbSet<Unidades> Unidades { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=df7436sr671.corp.caixa.gov.br;Database=DB5138_AtenderDigital;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Acoes>(entity =>
            {
                entity.HasKey(e => e.vAcao);

                entity.Property(e => e.vAcao)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.vNome_Acao)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Ambiente_API>(entity =>
            {
                entity.HasKey(e => e.iIdAmbiente);

                entity.ToTable("Ambiente_API", "admin");

                entity.Property(e => e.bE_Ativo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.vApelido)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.vNome_Ambiente)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.vURL_API).IsUnicode(false);
            });

            modelBuilder.Entity<Atendentes>(entity =>
            {
                entity.HasKey(e => e.vApelidoAtendente);

                entity.Property(e => e.vApelidoAtendente)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.cUsuario)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.cUsuarioNavigation)
                    .WithMany(p => p.Atendentes)
                    .HasForeignKey(d => d.cUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Atendentes_SISRH");
            });

            modelBuilder.Entity<CacheParametros>(entity =>
            {
                entity.HasKey(e => e.idCacheParametros);

                entity.ToTable("CacheParametros", "admin");

                entity.Property(e => e.idCacheParametros).HasDefaultValueSql("((1))");

                entity.Property(e => e.dDataHoraAtualizacao).HasColumnType("datetime");
            });

            modelBuilder.Entity<Chamado>(entity =>
            {
                entity.HasKey(e => e.idChamado);

                entity.HasIndex(e => new { e.vOrigem, e.iIdentificacaoChamado }, "IX_Chamado_Origem_iIdentificacaoChamado")
                    .IsUnique();

                entity.HasIndex(e => e.bDetalheCapturado, "IX_Chamado_bDetalhesCapturados");

                entity.HasIndex(e => e.bFechado, "IX_Chamado_bFechado");

                entity.HasIndex(e => e.dAtualizacao, "IX_Chamado_dData_Atualizacao");

                entity.HasIndex(e => e.iIdentificacaoChamado, "IX_Chamado_iIdentificacaoChamado");

                entity.HasIndex(e => e.vOrigem, "IX_Chamado_vOrigem");

                entity.HasIndex(e => e.vTipoOcorrencia, "IX_Chamado_vTipoOcorrencia");

                entity.HasIndex(e => e.vTipoOrigem, "IX_Chamado_vTipoOrigem");

                entity.Property(e => e.dAtualizacao).HasColumnType("datetime");

                entity.Property(e => e.dDataHoraAbertura).HasColumnType("datetime");

                entity.Property(e => e.dDataHoraTratamento).HasColumnType("datetime");

                entity.Property(e => e.dDataMaximaTransferencia).HasColumnType("datetime");

                entity.Property(e => e.dDataPrimeiraAcaoAutomatico).HasColumnType("datetime");

                entity.Property(e => e.dDataUltimoAcaoAutomatico).HasColumnType("datetime");

                entity.Property(e => e.dDataVencimento).HasColumnType("date");

                entity.Property(e => e.dDiaUltimoAcaoAutomatico)
                    .HasColumnType("date")
                    .HasComputedColumnSql("(CONVERT([date],[dDataUltimoAcaoAutomatico]))", false);

                entity.Property(e => e.idGrupo).HasDefaultValueSql("((-1))");

                entity.Property(e => e.idTipoRespostaPadrao).HasDefaultValueSql("((1))");

                entity.Property(e => e.vAcao)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.vApelidoAtendente)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.vApelidoAtendenteTratou)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.vAssunto)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.vCPF_CNPJ_Solicitante)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.vCodigoOrigem)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.vComentario).IsUnicode(false);

                entity.Property(e => e.vEmail).IsUnicode(false);

                entity.Property(e => e.vHTML_OrigemChamado).IsUnicode(false);

                entity.Property(e => e.vItem)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.vLotacao)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.vManifesto).IsUnicode(false);

                entity.Property(e => e.vMotivo)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.vMovimentacoes).IsUnicode(false);

                entity.Property(e => e.vNatureza)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.vNomeSolicitante)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.vOrgaoOrigem)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.vOrigem)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('ATENDER')");

                entity.Property(e => e.vREQ)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.vResposta).IsUnicode(false);

                entity.Property(e => e.vSituacao)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.vSituacaoGECDI)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComputedColumnSql("([dbo].[vSituacaoChamado]([vOrigem],[dDataVencimento],[dDataMaximaTransferencia]))", false);

                entity.Property(e => e.vTelefones).IsUnicode(false);

                entity.Property(e => e.vTemplateResposta)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.vTipoOcorrencia)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.vTipoOrigem)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.vUltimaAcaoAplicada)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.vUltimoTemplateRespostaAplicada)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.vUnidadeResposta)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.vWorkOrderID)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.idGrupoNavigation)
                    .WithMany(p => p.Chamado)
                    .HasForeignKey(d => d.idGrupo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Chamado_Grupos");

                entity.HasOne(d => d.idTipoRespostaPadraoNavigation)
                    .WithMany(p => p.Chamado)
                    .HasForeignKey(d => d.idTipoRespostaPadrao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Chamado_Tipo_Resposta_Padrao");

                entity.HasOne(d => d.vAcaoNavigation)
                    .WithMany(p => p.Chamado)
                    .HasForeignKey(d => d.vAcao)
                    .HasConstraintName("FK_Chamado_Acoes");

                entity.HasOne(d => d.vApelidoAtendenteNavigation)
                    .WithMany(p => p.Chamado)
                    .HasForeignKey(d => d.vApelidoAtendente)
                    .HasConstraintName("FK_Chamado_Atendentes");

                entity.HasOne(d => d.vTemplateRespostaNavigation)
                    .WithMany(p => p.Chamado)
                    .HasForeignKey(d => d.vTemplateResposta)
                    .HasConstraintName("FK_Chamado_Templates_Respostas");
            });

            modelBuilder.Entity<Distribuicao>(entity =>
            {
                entity.HasKey(e => e.idDistribuicao);

                entity.Property(e => e.dDataDistribuicao)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.dDataHoraDistribuicao)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.vAtendenteIniciarNormal)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.vAtendenteIniciarOuvidoria)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Distribuicao_Atendentes>(entity =>
            {
                entity.HasKey(e => new { e.idDistribuicao, e.vApelidoAtendente });

                entity.Property(e => e.vApelidoAtendente)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.idDistribuicaoNavigation)
                    .WithMany(p => p.Distribuicao_Atendentes)
                    .HasForeignKey(d => d.idDistribuicao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Distribuicao_Atendentes_Distribuicao");

                entity.HasOne(d => d.vApelidoAtendenteNavigation)
                    .WithMany(p => p.Distribuicao_Atendentes)
                    .HasForeignKey(d => d.vApelidoAtendente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Distribuicao_Atendentes_Atendentes");
            });

            modelBuilder.Entity<Distribuicao_Chamados>(entity =>
            {
                entity.HasKey(e => new { e.idDistribuicao, e.idChamado });

                entity.Property(e => e.vApelidoAtendente)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.idChamadoNavigation)
                    .WithMany(p => p.Distribuicao_Chamados)
                    .HasForeignKey(d => d.idChamado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Distribuicao_Chamados_Chamado");

                entity.HasOne(d => d.idDistribuicaoNavigation)
                    .WithMany(p => p.Distribuicao_Chamados)
                    .HasForeignKey(d => d.idDistribuicao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Distribuicao_Chamados_Distribuicao");

                entity.HasOne(d => d.vApelidoAtendenteNavigation)
                    .WithMany(p => p.Distribuicao_Chamados)
                    .HasForeignKey(d => d.vApelidoAtendente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Distribuicao_Chamados_Atendentes");
            });

            modelBuilder.Entity<Grupos>(entity =>
            {
                entity.HasKey(e => e.idGrupo);

                entity.Property(e => e.idGrupo).HasDefaultValueSql("((-1))");

                entity.Property(e => e.vNomeGrupo)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.vSQLMarcacao).IsUnicode(false);
            });

            modelBuilder.Entity<Lista_Paginas>(entity =>
            {
                entity.HasKey(e => e.iIdPagina);

                entity.ToTable("Lista_Paginas", "Paginas");

                entity.Property(e => e.vAppPagina)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.vConteudo).IsUnicode(false);

                entity.Property(e => e.vNomePagina)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.vResumo).IsUnicode(false);

                entity.Property(e => e.vTitulo).IsUnicode(false);
            });

            modelBuilder.Entity<Log>(entity =>
            {
                entity.HasKey(e => e.iID_Log);

                entity.ToTable("Log", "log");

                entity.Property(e => e.cMatricula)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.vNome_Log)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.vToken).IsUnicode(false);
            });

            modelBuilder.Entity<Parametros_Distribuicao>(entity =>
            {
                entity.HasKey(e => e.iIDParametros_Distribuicao);

                entity.Property(e => e.iIDParametros_Distribuicao).HasDefaultValueSql("((1))");

                entity.Property(e => e.vAssuntoEmailDistribuicao).IsUnicode(false);
            });

            modelBuilder.Entity<Perfil>(entity =>
            {
                entity.HasKey(e => e.iID_Perfil);

                entity.ToTable("Perfil", "admin");

                entity.Property(e => e.bE_Atendente)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.iOrdem).HasDefaultValueSql("((1000))");

                entity.Property(e => e.vNome_Perfil)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Permissoes>(entity =>
            {
                entity.HasKey(e => e.iID_Matriz_Permissao);

                entity.ToTable("Permissoes", "admin");

                entity.Property(e => e.cUsuario)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.iID_PerfilNavigation)
                    .WithMany(p => p.Permissoes)
                    .HasForeignKey(d => d.iID_Perfil)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Permissoes_Perfil");
            });

            modelBuilder.Entity<SIGSC_Grupos_Suporte>(entity =>
            {
                entity.HasKey(e => e.idGrupoSuporte);

                entity.HasIndex(e => e.CGC_Unidade, "IX_SIGSC_Grupos_Suporte_CGC_Unidade");

                entity.HasIndex(e => e.Empresa, "IX_SIGSC_Grupos_Suporte_Empresa");

                entity.HasIndex(e => e.Grupo_Suporte, "IX_SIGSC_Grupos_Suporte_Grupo_Suporte");

                entity.HasIndex(e => e.Orgao_Suporte, "IX_SIGSC_Grupos_Suporte_Orgao_Suporte");

                entity.Property(e => e.idGrupoSuporte)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Empresa)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Grupo_Suporte)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.NTSC)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Orgao_Suporte)
                    .HasMaxLength(120)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SISRH>(entity =>
            {
                entity.HasKey(e => e.cUsuario);

                entity.Property(e => e.cUsuario)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Admissão).HasColumnType("datetime");

                entity.Property(e => e.Afastamento)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Bairro)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CEP)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.CPF)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Cargo)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Cargo_Sigla)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Cidade)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Column11)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Column16)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Column24)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Column27)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Column28).HasColumnType("datetime");

                entity.Property(e => e.Column8).HasColumnType("datetime");

                entity.Property(e => e.Column9).HasColumnType("datetime");

                entity.Property(e => e.DV)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Endereço)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.Fone_Celular)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.Fone_Fixo)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.Função)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Matricula)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Nascimento).HasColumnType("datetime");

                entity.Property(e => e.Nome)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Sexo)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.UF)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Templates_Respostas>(entity =>
            {
                entity.HasKey(e => e.vTemplateResposta);

                entity.Property(e => e.vTemplateResposta)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TipoChamado)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Atender')");

                entity.Property(e => e.bE_Ativo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.dLastUse).HasColumnType("datetime");

                entity.Property(e => e.idGrupoSuporte)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.vAcao)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Fechar!')");

                entity.Property(e => e.vAssunto).HasMaxLength(1000);

                entity.HasOne(d => d.CGC_TranferenciaNavigation)
                    .WithMany(p => p.Templates_Respostas)
                    .HasForeignKey(d => d.CGC_Tranferencia)
                    .HasConstraintName("FK_Templates_Respostas_Unidades");

                entity.HasOne(d => d.TipoChamadoNavigation)
                    .WithMany(p => p.Templates_Respostas)
                    .HasForeignKey(d => d.TipoChamado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Templates_Respostas_Tipos_Chamados");

                entity.HasOne(d => d.idGrupoSuporteNavigation)
                    .WithMany(p => p.Templates_Respostas)
                    .HasForeignKey(d => d.idGrupoSuporte)
                    .HasConstraintName("FK_Templates_Respostas_SIGSC_Grupos_Suporte");

                entity.HasOne(d => d.vAcaoNavigation)
                    .WithMany(p => p.Templates_Respostas)
                    .HasForeignKey(d => d.vAcao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Templates_Respostas_Acoes");
            });

            modelBuilder.Entity<Tipo_Resposta_Padrao>(entity =>
            {
                entity.HasKey(e => e.idTipoRespostaPadrao);

                entity.Property(e => e.vRespostaPadrao).IsUnicode(false);

                entity.Property(e => e.vSQLMarcacao).IsUnicode(false);
            });

            modelBuilder.Entity<Tipos_Chamados>(entity =>
            {
                entity.HasKey(e => e.TipoChamado);

                entity.Property(e => e.TipoChamado)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Atender')");

                entity.Property(e => e.Nome)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Unidades>(entity =>
            {
                entity.HasKey(e => e.CGC);

                entity.Property(e => e.CGC).ValueGeneratedNever();

                entity.Property(e => e.Cidade)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Gestor)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Nome)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome_Exibicao)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Sigla)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Tipo)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
