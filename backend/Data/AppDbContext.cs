using Microsoft.EntityFrameworkCore;
using Aura.Dropship.Api.Models.Entities;

namespace Aura.Dropship.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<ProductVariant> ProductVariants => Set<ProductVariant>();
    public DbSet<ProductSpec> ProductSpecs => Set<ProductSpec>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<SourcingItem> SourcingItems => Set<SourcingItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<OrderTrackingEvent> OrderTrackingEvents => Set<OrderTrackingEvent>();
    public DbSet<Pincode> Pincodes => Set<Pincode>();
    public DbSet<StoreSettings> StoreSettings => Set<StoreSettings>();
    public DbSet<NewsletterSubscriber> NewsletterSubscribers => Set<NewsletterSubscriber>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Product entity
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Category);
            entity.HasIndex(e => e.Sku);

            entity.Property(e => e.Price).HasPrecision(18, 2);
            entity.Property(e => e.CompareAtPrice).HasPrecision(18, 2);
            entity.Property(e => e.Rating).HasPrecision(3, 2);

            entity.HasOne(e => e.Supplier)
                  .WithMany(s => s.Products)
                  .HasForeignKey(e => e.SupplierId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Product Images
        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Product)
                  .WithMany(p => p.Images)
                  .HasForeignKey(e => e.ProductId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Product Variants
        modelBuilder.Entity<ProductVariant>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Product)
                  .WithMany(p => p.Variants)
                  .HasForeignKey(e => e.ProductId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Product Specs
        modelBuilder.Entity<ProductSpec>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Product)
                  .WithMany(p => p.Specs)
                  .HasForeignKey(e => e.ProductId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Reviews
        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Product)
                  .WithMany(p => p.Reviews)
                  .HasForeignKey(e => e.ProductId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Supplier
        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Rating).HasPrecision(3, 2);
        });

        // Sourcing Items
        modelBuilder.Entity<SourcingItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.SupplierCost).HasPrecision(18, 2);
            entity.Property(e => e.ShippingCost).HasPrecision(18, 2);
            entity.Property(e => e.SupplierRating).HasPrecision(3, 2);
        });

        // Orders
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.TrackingNumber);

            entity.Property(e => e.ItemsTotal).HasPrecision(18, 2);
            entity.Property(e => e.ShippingFee).HasPrecision(18, 2);
            entity.Property(e => e.PaymentAdjustment).HasPrecision(18, 2);
            entity.Property(e => e.FinalTotal).HasPrecision(18, 2);
            entity.Property(e => e.SupplierCost).HasPrecision(18, 2);
            entity.Property(e => e.GrossProfit).HasPrecision(18, 2);
        });

        // Order Items
        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UnitPrice).HasPrecision(18, 2);
            entity.Property(e => e.SupplierCost).HasPrecision(18, 2);

            entity.HasOne(e => e.Order)
                  .WithMany(o => o.Items)
                  .HasForeignKey(e => e.OrderId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Order Tracking Events
        modelBuilder.Entity<OrderTrackingEvent>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Order)
                  .WithMany(o => o.TrackingEvents)
                  .HasForeignKey(e => e.OrderId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Pincode
        modelBuilder.Entity<Pincode>(entity =>
        {
            entity.HasKey(e => e.Code);
        });

        // Store Settings
        modelBuilder.Entity<StoreSettings>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.DefaultMarkup).HasPrecision(5, 2);
            entity.Property(e => e.ExpressShippingRate).HasPrecision(18, 2);
            entity.Property(e => e.StandardShippingRate).HasPrecision(18, 2);
            entity.Property(e => e.CodFee).HasPrecision(18, 2);
            entity.Property(e => e.PrepaidDiscount).HasPrecision(18, 2);
        });

        // Newsletter Subscriber
        modelBuilder.Entity<NewsletterSubscriber>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
        });
    }
}

