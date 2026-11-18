using Microsoft.EntityFrameworkCore;
using Aura.Dropship.Api.Data;
using Aura.Dropship.Api.Models.DTOs;
using Aura.Dropship.Api.Models.Entities;

namespace Aura.Dropship.Api.Services;

public interface ISourcingService
{
    Task<List<SourcingItemDto>> GetSourcingCatalogAsync(string? platformFilter);
    Task<ProductDto?> ImportToStorefrontAsync(ImportSourcingItemRequest request);
    Task<ExtractedItemDto> ExtractFromUrlAsync(string urlOrSku);
}

public class SourcingService : ISourcingService
{
    private readonly AppDbContext _context;

    public SourcingService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SourcingItemDto>> GetSourcingCatalogAsync(string? platformFilter)
    {
        var query = _context.SourcingItems.AsQueryable();

        if (!string.IsNullOrWhiteSpace(platformFilter) && platformFilter != "All")
        {
            query = query.Where(s => s.Platform == platformFilter);
        }

        var items = await query.ToListAsync();

        return items.Select(s => new SourcingItemDto
        {
            Id = s.Id,
            Title = s.Title,
            Category = s.Category,
            Platform = s.Platform,
            SupplierName = s.SupplierName,
            SupplierRating = s.SupplierRating,
            SupplierCost = s.SupplierCost,
            ShippingCost = s.ShippingCost,
            ShippingTime = s.ShippingTime,
            Image = s.ImageUrl,
            Description = s.Description,
            IsImported = s.IsImported
        }).ToList();
    }

    public async Task<ProductDto?> ImportToStorefrontAsync(ImportSourcingItemRequest request)
    {
        var sourcing = await _context.SourcingItems.FindAsync(request.SourcingItemId);
        if (sourcing == null) return null;

        var product = new Product
        {
            Sku = $"AURA-IMP-{Random.Shared.Next(100, 999)}",
            Title = sourcing.Title,
            Tagline = $"Direct factory import via {sourcing.Platform}",
            Description = sourcing.Description,
            Category = sourcing.Category,
            Price = request.CustomRetailPrice,
            CompareAtPrice = Math.Round(request.CustomRetailPrice * 1.4m),
            Badge = "New Sourced",
            Rating = sourcing.SupplierRating,
            ReviewsCount = 12,
            Stock = 50,
            ShippingDays = sourcing.ShippingTime,
            HubLocation = "Direct Air Freight Hub",
            ViewersCount = 18,
            IsFeatured = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        product.Images.Add(new ProductImage
        {
            ImageUrl = sourcing.ImageUrl,
            DisplayOrder = 0,
            IsPrimary = true
        });

        sourcing.IsImported = true;

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return new ProductDto
        {
            Id = product.Id,
            Sku = product.Sku,
            Title = product.Title,
            Tagline = product.Tagline,
            Description = product.Description,
            Category = product.Category,
            Price = product.Price,
            CompareAtPrice = product.CompareAtPrice,
            Badge = product.Badge,
            Rating = product.Rating,
            ReviewsCount = product.ReviewsCount,
            Stock = product.Stock,
            ShippingDays = product.ShippingDays,
            HubLocation = product.HubLocation,
            ViewersCount = product.ViewersCount,
            Image = sourcing.ImageUrl,
            Images = new List<string> { sourcing.ImageUrl }
        };
    }

    public Task<ExtractedItemDto> ExtractFromUrlAsync(string urlOrSku)
    {
        var isAli = urlOrSku.Contains("aliexpress", StringComparison.OrdinalIgnoreCase);
        var platform = isAli ? "AliExpress Direct" : "CJ Dropshipping";

        var extracted = new ExtractedItemDto
        {
            Id = $"SRC-URL-{Random.Shared.Next(1000, 9999)}",
            Title = "Aura MagSnap 10,000mAh Powerbank with Kickstand",
            Category = "Electronics",
            Platform = platform,
            SupplierName = "Shenzhen Baseus OEM Partner",
            SupplierRating = 4.9m,
            SupplierCost = 890m,
            ShippingCost = 110m,
            ShippingTime = "3-5 days air line-haul",
            Image = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
            Description = "Magnetic wireless charging external battery with foldable zinc stand and LED status gauge.",
            SuggestedRetailPrice = Math.Round((890m * 2.2m) + 110m),
            EstimatedNetProfit = Math.Round(((890m * 2.2m) + 110m) - 890m - 110m)
        };

        return Task.FromResult(extracted);
    }
}
