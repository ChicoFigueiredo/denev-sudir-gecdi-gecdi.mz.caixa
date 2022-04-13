using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PushAPI.Models.Push
{
    public partial class dbPUSH : DbContext
    {
        public virtual DbSet<spVerifica_Status_Fila> spVerifica_Status_Fila { get; set; } = null!;
        public virtual DbSet<spVerifica_Historico_Fila> spVerifica_Historico_Fila { get; set; } = null!;
    }
}
