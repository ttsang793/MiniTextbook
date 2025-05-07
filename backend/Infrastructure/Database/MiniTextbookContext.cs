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

    public virtual DbSet<BookSeries> BookSeries { get; set; }

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

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Fullname)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("fullname");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("role");
            entity.Property(e => e.TimeBegin)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("time")
                .HasColumnName("time_begin");
            entity.Property(e => e.TimeEnd)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("time")
                .HasColumnName("time_end");

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
            entity.Property(e => e.Image)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("image");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
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
        });

        modelBuilder.Entity<BookSeries>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("book_series");

            entity.HasIndex(e => e.Book, "FK_BookSeries_Book");

            entity.HasIndex(e => e.Series, "FK_BookSeries_Series");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Book)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("book");
            entity.Property(e => e.Series)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("series");

            entity.HasOne(d => d.BookNavigation).WithMany(p => p.BookSeries)
                .HasForeignKey(d => d.Book)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_BookSeries_Book");

            entity.HasOne(d => d.SeriesNavigation).WithMany(p => p.BookSeries)
                .HasForeignKey(d => d.Series)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_BookSeries_Series");
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

            entity.HasIndex(e => e.VertifyAdmin, "FK_Order_Admin");

            entity.HasIndex(e => e.User, "FK_Order_User");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("address");
            entity.Property(e => e.DateCanceled)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_canceled");
            entity.Property(e => e.DatePurchased)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_purchased");
            entity.Property(e => e.DateReceived)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_received");
            entity.Property(e => e.DateVertified)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_vertified");
            entity.Property(e => e.IsPaid)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_paid");
            entity.Property(e => e.PaidMethod)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("enum('Tiền mặt','VNPay')")
                .HasColumnName("paid_method");
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("phone");
            entity.Property(e => e.Receiver)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("receiver");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'''Chưa xác nhận'''")
                .HasColumnType("enum('Đã hủy','Chưa xác nhận','Đã xác nhận','Đang giao hàng','Đã giao hàng','Đã nhận hàng')")
                .HasColumnName("status");
            entity.Property(e => e.Total)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("total");
            entity.Property(e => e.User)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("user");
            entity.Property(e => e.VertifyAdmin)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("vertify_admin");

            entity.HasOne(d => d.UserNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.User)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Order_User");

            entity.HasOne(d => d.VertifyAdminNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.VertifyAdmin)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Order_Admin");
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
            entity.Property(e => e.Image)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("image");
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

            entity.HasIndex(e => e.Username, "username").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("address");
            entity.Property(e => e.Avatar)
                .HasDefaultValueSql("'''/src/images/avatar/default.jpg'''")
                .HasColumnName("avatar");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("email");
            entity.Property(e => e.Fullname)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("fullname");
            entity.Property(e => e.Password)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("phone");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'''Đang sử dụng'''")
                .HasColumnType("enum('Đang sử dụng','Mới khôi phục','Đã khóa')")
                .HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
