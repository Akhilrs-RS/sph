namespace Aura.Dropship.Api.Models.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? CompareAtPrice { get; set; }
    public string? Badge { get; set; }
    public decimal Rating { get; set; }
    public int ReviewsCount { get; set; }
    public int Stock { get; set; }
    public string ShippingDays { get; set; } = string.Empty;
    public string HubLocation { get; set; } = string.Empty;
    public int ViewersCount { get; set; }
    public string Image { get; set; } = string.Empty;
    public List<string> Images { get; set; } = new();
    public List<ProductVariantDto> Variants { get; set; } = new();
    public Dictionary<string, string> Specs { get; set; } = new();
    public List<string> InTheBox { get; set; } = new();
    public List<ReviewDto> Reviews { get; set; } = new();
    public SupplierSummaryDto? Supplier { get; set; }
}

public class ProductVariantDto
{
    public string Name { get; set; } = string.Empty;
    public List<string> Options { get; set; } = new();
}

public class SupplierSummaryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public string Warehouse { get; set; } = string.Empty;
}

public class ReviewDto
{
    public int Id { get; set; }
    public string Author { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Date { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public int Helpful { get; set; }
    public bool Verified { get; set; }
}

public class CreateReviewRequest
{
    public string Author { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public string Title { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
}

