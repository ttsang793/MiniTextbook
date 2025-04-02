using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Core.Entity;

namespace Infrastructure.Database;

public partial class MiniTextbookContext : DbContext
{
    public MiniTextbookContext()
    {
    }

    public MiniTextbookContext(DbContextOptions<MiniTextbookContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<PermissionGroup> PermissionGroups { get; set; }

    public virtual DbSet<Publisher> Publishers { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RolePermission> RolePermissions { get; set; }

    public virtual DbSet<Series> Series { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("admin");

            entity.HasIndex(e => e.Role, "FK_Admin_Role");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.FirebaseUid, "firebase_uid").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("email");
            entity.Property(e => e.FirebaseUid)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("firebase_uid");
            entity.Property(e => e.FullName)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("full_name");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("phone");
            entity.Property(e => e.Role)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("role");

            entity.HasOne(d => d.RoleNavigation).WithMany(p => p.Admins)
                .HasForeignKey(d => d.Role)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Admin_Role");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("book");

            entity.HasIndex(e => e.Publisher, "FK_Book_Publisher");

            entity.HasIndex(e => e.Subject, "FK_Book_Subject");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Grade)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("grade");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Image)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("longtext")
                .HasColumnName("image");
            entity.Property(e => e.Name)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("price");
            entity.Property(e => e.Publisher)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("publisher");
            entity.Property(e => e.Subject)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("subject");

            entity.HasOne(d => d.PublisherNavigation).WithMany(p => p.Books)
                .HasForeignKey(d => d.Publisher)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Book_Publisher");

            entity.HasOne(d => d.SubjectNavigation).WithMany(p => p.Books)
                .HasForeignKey(d => d.Subject)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Book_Subject");

            entity.HasMany(d => d.Series).WithMany(p => p.Books)
                .UsingEntity<Dictionary<string, object>>(
                    "BookSeries",
                    r => r.HasOne<Series>().WithMany()
                        .HasForeignKey("Series")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("FK_BookSeries_Series"),
                    l => l.HasOne<Book>().WithMany()
                        .HasForeignKey("Book")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("FK_BookSeries_Book"),
                    j =>
                    {
                        j.HasKey("Book", "Series").HasName("PRIMARY");
                        j.ToTable("book_series");
                        j.HasIndex(new[] { "Series" }, "FK_BookSeries_Series");
                        j.IndexerProperty<int>("Book")
                            .HasColumnType("int(11)")
                            .HasColumnName("book");
                        j.IndexerProperty<int>("Series")
                            .HasColumnType("int(11)")
                            .HasColumnName("series");
                    });
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("cart");

            entity.HasIndex(e => e.Book, "FK_Cart_Book");

            entity.HasIndex(e => e.User, "FK_Cart_User");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Book)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("book");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");
            entity.Property(e => e.User)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("user");

            entity.HasOne(d => d.BookNavigation).WithMany(p => p.Carts)
                .HasForeignKey(d => d.Book)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Cart_Book");

            entity.HasOne(d => d.UserNavigation).WithMany(p => p.Carts)
                .HasForeignKey(d => d.User)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Cart_User");
        });

        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("favorite");

            entity.HasIndex(e => e.Book, "FK_Favorite_Book");

            entity.HasIndex(e => e.User, "FK_Favorite_User");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Book)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("book");
            entity.Property(e => e.User)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("user");

            entity.HasOne(d => d.BookNavigation).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.Book)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Favorite_Book");

            entity.HasOne(d => d.UserNavigation).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.User)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Favorite_User");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("order");

            entity.HasIndex(e => e.User, "FK_Order_User");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("address");
            entity.Property(e => e.IsPaid)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_paid");
            entity.Property(e => e.PaidMethod)
                .HasMaxLength(20)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("paid_method");
            entity.Property(e => e.ShipCost)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("ship_cost");
            entity.Property(e => e.Total)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("total");
            entity.Property(e => e.User)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("user");

            entity.HasOne(d => d.UserNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.User)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Order_User");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("order_detail");

            entity.HasIndex(e => e.Book, "FK_OrderDetail_Book");

            entity.HasIndex(e => e.Order, "FK_OrderDetail_Order");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Book)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("book");
            entity.Property(e => e.Order)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("order");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("price");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");

            entity.HasOne(d => d.BookNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.Book)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_OrderDetail_Book");

            entity.HasOne(d => d.OrderNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.Order)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_OrderDetail_Order");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("permission");

            entity.HasIndex(e => e.Group, "FK_Permission_PermissionGroup");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Group)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("group");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");

            entity.HasOne(d => d.GroupNavigation).WithMany(p => p.Permissions)
                .HasForeignKey(d => d.Group)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Permission_PermissionGroup");
        });

        modelBuilder.Entity<PermissionGroup>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("permission_group");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Publisher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("publisher");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("role_permission");

            entity.HasIndex(e => e.Permission, "FK_RolePermission_Permission");

            entity.HasIndex(e => e.Role, "FK_RolePermission_Role");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Permission)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("permission");
            entity.Property(e => e.Role)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("role");

            entity.HasOne(d => d.PermissionNavigation).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.Permission)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RolePermission_Permission");

            entity.HasOne(d => d.RoleNavigation).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.Role)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RolePermission_Role");
        });

        modelBuilder.Entity<Series>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("series");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("subject");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.UserName, "user_name").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Avatar)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("avatar");
            entity.Property(e => e.Birthday)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("birthday");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("full_name");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("phone");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("user_name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
