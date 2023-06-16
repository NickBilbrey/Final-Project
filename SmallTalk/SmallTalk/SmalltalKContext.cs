using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SmallTalk;

public partial class SmalltalKContext : DbContext
{
    public SmalltalKContext()
    {
    }

    public SmalltalKContext(DbContextOptions<SmalltalKContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Dictionary> Dictionaries { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserDictionary> UserDictionaries { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=SmalltalK;Integrated Security=SSPI;trust Server Certificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Dictionary>(entity =>
        {
            entity.HasKey(e => e.DictionaryId).HasName("PK__Dictiona__15ACD2E791817BC5");

            entity.Property(e => e.DictionaryName).HasMaxLength(50);
            entity.Property(e => e.Language).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.Dictionaries)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Dictionar__UserI__4BAC3F29");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CD02B3E2C");

            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.UserName).HasMaxLength(50);
        });

        modelBuilder.Entity<UserDictionary>(entity =>
        {
            entity.HasKey(e => e.EntryId).HasName("PK__UserDict__F57BD2F7B3FB5C14");

            entity.ToTable("UserDictionary");

            entity.Property(e => e.Translation).HasMaxLength(500);
            entity.Property(e => e.UserEntry).HasMaxLength(500);

            entity.HasOne(d => d.Dictionary).WithMany(p => p.UserDictionaries)
                .HasForeignKey(d => d.DictionaryId)
                .HasConstraintName("FK__UserDicti__Dicti__4E88ABD4");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
