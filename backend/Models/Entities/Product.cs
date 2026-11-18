namespace Aura.Dropship.Api.Models.Entities;

public class Product
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = "Electronics";
    public decimal Price { get; set; }
    public decimal? CompareAtPrice { get; set; }
    public string? Badge { get; set; }
    public decimal Rating { get; set; } = 4.8m;
    public int ReviewsCount { get; set; } = 150;
    public int Stock { get; set; } = 45;
    public string ShippingDays { get; set; } = "2-4 business days";
    public string HubLocation { get; set; } = "Bengaluru Line-Haul Hub";
    public int ViewersCount { get; set; } = 24;
    public bool IsFeatured { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Foreign Key
    public int? SupplierId { get; set; }
    public Supplier? Supplier { get; set; }

    // Navigation Properties
    public List<ProductImage> Images { get; set; } = new();
    public List<ProductVariant> Variants { get; set; } = new();
    public List<ProductSpec> Specs { get; set; } = new();
    public List<Review> Reviews { get; set; } = new();
}
