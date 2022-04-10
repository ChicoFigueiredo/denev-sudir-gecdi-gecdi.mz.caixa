using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PushAPI.Models.Sites
{
    public partial class dbSites : DbContext
    {
        public dbSites()
        {
        }

        public dbSites(DbContextOptions<dbSites> options)
            : base(options)
        {
        }

        public virtual DbSet<Roles> Roles { get; set; } = null!;
        public virtual DbSet<Usuario> Usuario { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=df7436sr671.corp.caixa.gov.br;Database=DB5138_Sites;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.idRole)
                    .HasName("PK_Perfil");

                entity.ToTable("Roles", "SITES");

                entity.Property(e => e.Nome_Role)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Ordem).HasDefaultValueSql("((1000))");

                entity.Property(e => e.Role)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.idUsuario)
                    .HasName("PK_Permissoes");

                entity.ToTable("Usuario", "SITES");

                entity.Property(e => e.Nome)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.cUsuario)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.idRoleNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.idRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Permissoes_Perfil");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
