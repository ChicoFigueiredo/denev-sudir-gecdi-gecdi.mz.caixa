using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PushAPI.Models.Push
{
    public partial class dbPUSH : DbContext
    {
        public dbPUSH()
        {
        }

        public dbPUSH(DbContextOptions<dbPUSH> options)
            : base(options)
        {
        }

        public virtual DbSet<CPF_Controles> CPF_Controles { get; set; } = null!;
        public virtual DbSet<Canais> Canais { get; set; } = null!;
        public virtual DbSet<Clientes> Clientes { get; set; } = null!;
        public virtual DbSet<Curva_Envio> Curva_Envio { get; set; } = null!;
        public virtual DbSet<Curva_Envio_Tranches> Curva_Envio_Tranches { get; set; } = null!;
        public virtual DbSet<Datas> Datas { get; set; } = null!;
        public virtual DbSet<Envio_CPF> Envio_CPF { get; set; } = null!;
        public virtual DbSet<Envio_Tranche> Envio_Tranche { get; set; } = null!;
        public virtual DbSet<Envios_Por_CPF_Processo_Antigo> Envios_Por_CPF_Processo_Antigo { get; set; } = null!;
        public virtual DbSet<Envios_Por_CPF_Processo_Novo> Envios_Por_CPF_Processo_Novo { get; set; } = null!;
        public virtual DbSet<Feriados> Feriados { get; set; } = null!;
        public virtual DbSet<Fila> Fila { get; set; } = null!;
        public virtual DbSet<Mensagem> Mensagem { get; set; } = null!;
        public virtual DbSet<Requisicoes_Envio> Requisicoes_Envio { get; set; } = null!;
        public virtual DbSet<Solicitacao> Solicitacao { get; set; } = null!;
        public virtual DbSet<Solicitacao_Clientes> Solicitacao_Clientes { get; set; } = null!;
        public virtual DbSet<Solicitacao_Simulacao_Envio> Solicitacao_Simulacao_Envio { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=df7436sr671.corp.caixa.gov.br;Database=DB5138_PUSH;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CPF_Controles>(entity =>
            {
                entity.HasKey(e => e.CPF);

                entity.ToTable("CPF_Controles", "PUSH");

                entity.Property(e => e.CPF).ValueGeneratedNever();

                entity.Property(e => e.Nome)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Canais>(entity =>
            {
                entity.HasKey(e => e.Canal);

                entity.ToTable("Canais", "GERAL");

                entity.Property(e => e.Canal)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('ibc')");

                entity.Property(e => e.Disponivel)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Nome_Canal)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Clientes>(entity =>
            {
                entity.HasKey(e => e.CPF)
                    .HasName("PK_Base_App_PUSH");

                entity.ToTable("Clientes", "PUSH");

                entity.HasIndex(e => e.Tem_App_CAIXA, "IX_Base_App_PUSH_Tem_App_CAIXA");

                entity.HasIndex(e => e.Tem_CAIXA_Tem, "IX_Base_App_PUSH_Tem_CAIXA_Tem");

                entity.Property(e => e.CPF).ValueGeneratedNever();

                entity.Property(e => e.Base_Origem).HasDefaultValueSql("((1))");

                entity.Property(e => e.Qtd).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Curva_Envio>(entity =>
            {
                entity.HasKey(e => e.idCurva_Envio);

                entity.ToTable("Curva_Envio", "FILA");

                entity.Property(e => e.Apelido_Curva_Envio)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Nome_Curva_Envio)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Curva_Envio_Tranches>(entity =>
            {
                entity.HasKey(e => e.idCurva_Envio_Tranches);

                entity.ToTable("Curva_Envio_Tranches", "FILA");

                entity.Property(e => e.Hora_Envio).HasColumnType("time(0)");

                entity.HasOne(d => d.idCurva_EnvioNavigation)
                    .WithMany(p => p.Curva_Envio_Tranches)
                    .HasForeignKey(d => d.idCurva_Envio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Curva_Envio_Tranches_Curva_Envio");
            });

            modelBuilder.Entity<Datas>(entity =>
            {
                entity.HasKey(e => e.dData);

                entity.ToTable("Datas", "GERAL");

                entity.Property(e => e.dData).HasColumnType("date");

                entity.Property(e => e.Curva_Envio)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Full')");

                entity.Property(e => e.DiaSemana)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Dia_Anterior).HasColumnType("date");

                entity.Property(e => e.Dia_Posterior).HasColumnType("date");

                entity.Property(e => e.Dia_Util_Anterior).HasColumnType("date");

                entity.Property(e => e.Dia_Util_Posterior).HasColumnType("date");

                entity.Property(e => e.Efemeride)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.É_Dia_Util)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Envio_CPF>(entity =>
            {
                entity.HasKey(e => e.idEnvio_CPF);

                entity.ToTable("Envio_CPF", "PUSH");

                entity.HasIndex(e => e.idEnvio_Mensagem, "<Name of Missing Index, sysname,>");

                entity.HasIndex(e => new { e.idEnvio_Mensagem, e.idEnvio_Tranche }, "Envio_CPF_DELETE");

                entity.HasIndex(e => new { e.idEnvio_Tranche, e.idEnvio_Mensagem }, "Envio_CPF_idEnvio_Tranche_idEnvio_Mensagem");

                entity.HasIndex(e => e.idEnvio_Mensagem, "IX_Envio_CPF_idEnvio_Mensagem");

                entity.HasIndex(e => e.idEnvio_Tranche, "IX_Envio_CPF_idEnvio_Tranche");

                entity.Property(e => e.V1)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.canal)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.CPFNavigation)
                    .WithMany(p => p.Envio_CPF)
                    .HasForeignKey(d => d.CPF)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Envio_CPF_Clientes");

                entity.HasOne(d => d.idEnvio_MensagemNavigation)
                    .WithMany(p => p.Envio_CPF)
                    .HasForeignKey(d => d.idEnvio_Mensagem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Envio_CPF_Envio_Mensagem");

                entity.HasOne(d => d.idEnvio_TrancheNavigation)
                    .WithMany(p => p.Envio_CPF)
                    .HasForeignKey(d => d.idEnvio_Tranche)
                    .HasConstraintName("FK_Envio_CPF_Envio_Tranche");
            });

            modelBuilder.Entity<Envio_Tranche>(entity =>
            {
                entity.HasKey(e => e.idEnvio_Tranche);

                entity.ToTable("Envio_Tranche", "PUSH");

                entity.Property(e => e.Data_Envio).HasColumnType("date");

                entity.Property(e => e.Hora_Envio).HasColumnType("time(0)");

                entity.Property(e => e.Nome_Do_Arquivo)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ParametroLote).HasDefaultValueSql("((2500))");

                entity.HasOne(d => d.idEnvio_MensagemNavigation)
                    .WithMany(p => p.Envio_Tranche)
                    .HasForeignKey(d => d.idEnvio_Mensagem)
                    .HasConstraintName("FK_Envio_Tranche_Envio_Mensagem");
            });

            modelBuilder.Entity<Envios_Por_CPF_Processo_Antigo>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Envios_Por_CPF_Processo_Antigo", "PUSH");

                entity.Property(e => e.Data_Envio).HasColumnType("date");

                entity.Property(e => e.Hora_Envio).HasColumnType("time(0)");

                entity.Property(e => e.Mensagem).HasMaxLength(1000);

                entity.Property(e => e.Nome_Do_Arquivo)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.canal)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Envios_Por_CPF_Processo_Novo>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Envios_Por_CPF_Processo_Novo", "PUSH");

                entity.Property(e => e.Canal)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Data_Envio).HasColumnType("date");

                entity.Property(e => e.Hora_Envio).HasColumnType("time(0)");

                entity.Property(e => e.Mensagem).HasMaxLength(1000);

                entity.Property(e => e.Nome_Do_Arquivo)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Feriados>(entity =>
            {
                entity.HasKey(e => new { e.Nr_Ano, e.Nr_Mes, e.Nr_Dia, e.Sg_UF })
                    .HasName("Pk_Feriado");

                entity.ToTable("Feriados", "GERAL");

                entity.Property(e => e.Sg_UF)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ds_Feriado)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Tp_Feriado)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.dData).HasColumnType("date");
            });

            modelBuilder.Entity<Fila>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Fila", "gerenciamento");

                entity.Property(e => e.idFila).ValueGeneratedOnAdd();

                entity.HasOne(d => d.idEnvio_MensagemNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.idEnvio_Mensagem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Fila_Mensagem");
            });

            modelBuilder.Entity<Mensagem>(entity =>
            {
                entity.HasKey(e => e.idEnvio_Mensagem)
                    .HasName("PK_Envio_Mensagem");

                entity.ToTable("Mensagem", "PUSH");

                entity.Property(e => e.Apelido)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AppCaixa)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Ativo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.CaixaTem)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Data_Fim).HasColumnType("date");

                entity.Property(e => e.Data_Inicio).HasColumnType("date");

                entity.Property(e => e.Mensagem1)
                    .HasMaxLength(1000)
                    .HasColumnName("Mensagem")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.MensagemRegex).IsUnicode(false);

                entity.Property(e => e.Monitoração_Producao).IsUnicode(false);
            });

            modelBuilder.Entity<Requisicoes_Envio>(entity =>
            {
                entity.HasKey(e => e.REQ_Envio);

                entity.ToTable("Requisicoes_Envio", "FILA");

                entity.Property(e => e.REQ_Envio)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Abertura).HasColumnType("datetime");

                entity.Property(e => e.Fechamento).HasColumnType("datetime");

                entity.Property(e => e.Historico).IsUnicode(false);

                entity.Property(e => e.WO_Envio)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Solicitacao>(entity =>
            {
                entity.HasKey(e => e.idSolicitacao_PUSH);

                entity.ToTable("Solicitacao", "FILA");

                entity.Property(e => e.Canal)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('ibc')");

                entity.Property(e => e.Data_Cadastramento).HasColumnType("datetime");

                entity.Property(e => e.Data_Hora_Autorizacao).HasColumnType("datetime");

                entity.Property(e => e.Data_Hora_Bloqueio).HasColumnType("datetime");

                entity.Property(e => e.Data_Hora_Cancelamento).HasColumnType("datetime");

                entity.Property(e => e.Enviar_DOM).HasDefaultValueSql("((0))");

                entity.Property(e => e.Enviar_Horario_Final).HasDefaultValueSql("('20:59')");

                entity.Property(e => e.Enviar_Horario_Inicial).HasDefaultValueSql("('07:00')");

                entity.Property(e => e.Enviar_QUA).HasDefaultValueSql("((1))");

                entity.Property(e => e.Enviar_QUI).HasDefaultValueSql("((1))");

                entity.Property(e => e.Enviar_SAB).HasDefaultValueSql("((1))");

                entity.Property(e => e.Enviar_SEG).HasDefaultValueSql("((1))");

                entity.Property(e => e.Enviar_SEX).HasDefaultValueSql("((1))");

                entity.Property(e => e.Enviar_TER).HasDefaultValueSql("((1))");

                entity.Property(e => e.Enviar_a_partir_de).HasColumnType("date");

                entity.Property(e => e.Enviar_no_maximo_ate).HasColumnType("date");

                entity.Property(e => e.Impactos_Previstos)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Limitacao_Tranche).HasDefaultValueSql("((200000))");

                entity.Property(e => e.Matricula_Autorizacao_Gestor_PUSH)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Matricula_Bloqueio_TI)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Matricula_Cadastramento)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Matricula_Cancelamento)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Mensagem).HasMaxLength(1000);

                entity.Property(e => e.Nome_Campo1)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Nome_Campo2)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Nome_Campo3)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Nome_Campo4)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Nome_Campo5)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Nome_Solicitacao)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Prioridade).HasDefaultValueSql("((100))");

                entity.Property(e => e.Quantidade_Total_Restante).HasComputedColumnSql("(([Quantidade_Total]-[Quantidade_Enviada])-[Quantidade_Agendada])", false);

                entity.Property(e => e.REQ_WO_Aprovacao_Mensagem)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.REQ_WO_Aprovacao_Mensagem_Texto).IsUnicode(false);

                entity.Property(e => e.idCurva).HasDefaultValueSql("((29))");

                entity.Property(e => e.idCurva_Envio_Dia_Cheio).HasDefaultValueSql("((27))");

                entity.HasOne(d => d.CanalNavigation)
                    .WithMany(p => p.Solicitacao)
                    .HasForeignKey(d => d.Canal)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Solicitacao_Canais");

                entity.HasOne(d => d.idCurvaNavigation)
                    .WithMany(p => p.SolicitacaoidCurvaNavigation)
                    .HasForeignKey(d => d.idCurva)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Solicitacao_Curva_Envio");

                entity.HasOne(d => d.idCurva_Envio_Dia_CheioNavigation)
                    .WithMany(p => p.SolicitacaoidCurva_Envio_Dia_CheioNavigation)
                    .HasForeignKey(d => d.idCurva_Envio_Dia_Cheio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Solicitacao_Curva_Envio1");

                entity.HasOne(d => d.idEnvio_MensagemNavigation)
                    .WithMany(p => p.Solicitacao)
                    .HasForeignKey(d => d.idEnvio_Mensagem)
                    .HasConstraintName("FK_Solicitacao_Mensagem");
            });

            modelBuilder.Entity<Solicitacao_Clientes>(entity =>
            {
                entity.HasKey(e => e.idSolicitacao_Cliente);

                entity.ToTable("Solicitacao_Clientes", "FILA");

                entity.HasIndex(e => e.Agendado, "IX_Solicitacao_Clientes_Agendado");

                entity.HasIndex(e => e.CPF, "IX_Solicitacao_Clientes_CPF");

                entity.HasIndex(e => e.Enviado, "IX_Solicitacao_Clientes_Enviado");

                entity.HasIndex(e => e.idSolicitacao_PUSH, "IX_Solicitacao_Clientes_idSolicitacao_PUSH");

                entity.HasIndex(e => new { e.idSolicitacao_PUSH, e.CPF }, "IX_Solicitacao_Clientes_idSolicitacao_PUSH_CPF")
                    .IsUnique();

                entity.HasIndex(e => e.idSolicitacao_Simulacao_Envio, "IX_Solicitacao_Clientes_idSolicitacao_Simulacao_Envio");

                entity.Property(e => e.Campo1).IsUnicode(false);

                entity.Property(e => e.Campo2).IsUnicode(false);

                entity.Property(e => e.Campo3).IsUnicode(false);

                entity.Property(e => e.Campo4).IsUnicode(false);

                entity.Property(e => e.Campo5).IsUnicode(false);

                entity.HasOne(d => d.idSolicitacao_PUSHNavigation)
                    .WithMany(p => p.Solicitacao_Clientes)
                    .HasForeignKey(d => d.idSolicitacao_PUSH)
                    .HasConstraintName("FK_Solicitacao_Clientes_Solicitacao");

                entity.HasOne(d => d.idSolicitacao_Simulacao_EnvioNavigation)
                    .WithMany(p => p.Solicitacao_Clientes)
                    .HasForeignKey(d => d.idSolicitacao_Simulacao_Envio)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Solicitacao_Clientes_Solicitacao_Simulacao_Envio1");
            });

            modelBuilder.Entity<Solicitacao_Simulacao_Envio>(entity =>
            {
                entity.HasKey(e => e.idSolicitacao_Simulacao_Envio);

                entity.ToTable("Solicitacao_Simulacao_Envio", "FILA");

                entity.HasComment("0");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.Data_Hora_Atualizacao).HasColumnType("datetime");

                entity.Property(e => e.Data_Hora_Bloqueio).HasColumnType("datetime");

                entity.Property(e => e.Data_Hora_Envio).HasColumnType("datetime");

                entity.Property(e => e.Hora).HasColumnType("time(0)");

                entity.Property(e => e.Matricula_Bloqueio_TI)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Matricula_Enviante)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Nome_Arquivo)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.REQ_Envio)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.REQ_EnvioNavigation)
                    .WithMany(p => p.Solicitacao_Simulacao_Envio)
                    .HasForeignKey(d => d.REQ_Envio)
                    .HasConstraintName("FK_Solicitacao_Simulacao_Envio_Requisicoes_Envio");

                entity.HasOne(d => d.idSolicitacao_PUSHNavigation)
                    .WithMany(p => p.Solicitacao_Simulacao_Envio)
                    .HasForeignKey(d => d.idSolicitacao_PUSH)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Solicitacao_Simulacao_Envio_Solicitacao");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
