using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Aura.Dropship.Api.Data;
using Aura.Dropship.Api.Models.DTOs;
using Aura.Dropship.Api.Models.Entities;

namespace Aura.Dropship.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProducts(
        [FromQuery] string? category,
        [FromQuery] string? search,
        [FromQuery] string? sortBy)
    {
        var query = _context.Products
            .Include(p => p.Images)
            .Include(p => p.Variants)
            .Include(p => p.Specs)
            .Include(p => p.Supplier)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category != "All")
        {
            query = query.Where(p => p.Category == category);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(p =>
                p.Title.ToLower().Contains(term) ||
                p.Category.ToLower().Contains(term) ||
                p.Tagline.ToLower().Contains(term));
        }

        query = sortBy switch
        {
            "price-low" => query.OrderBy(p => p.Price),
            "price-high" => query.OrderByDescending(p => p.Price),
            "rating" => query.OrderByDescending(p => p.Rating),
            _ => query.OrderByDescending(p => p.IsFeatured).ThenBy(p => p.Id)
        };

        var products = await query.ToListAsync();
        return Ok(products.Select(MapToDto).ToList());
    }

    [HttpGet("featured")]
    public async Task<ActionResult<List<ProductDto>>> GetFeatured()
    {
        var products = await _context.Products
            .Include(p => p.Images)
            .Include(p => p.Variants)
            .Include(p => p.Specs)
            .Include(p => p.Supplier)
            .Where(p => p.IsFeatured)
            .Take(4)
            .ToListAsync();

        return Ok(products.Select(MapToDto).ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProductById(int id)
    {
        var p = await _context.Products
            .Include(p => p.Images)
            .Include(p => p.Variants)
            .Include(p => p.Specs)
            .Include(p => p.Reviews)
            .Include(p => p.Supplier)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (p == null) return NotFound();

        return Ok(MapToDto(p));
    }

    [HttpGet("autocomplete")]
    public async Task<ActionResult<object>> Autocomplete([FromQuery] string? q)
    {
        if (string.IsNullOrWhiteSpace(q))
        {
            return Ok(new
            {
                trending = new[]
                {
                    "Noise Cancelling Headphones",
                    "MagSafe Wireless Charger",
                    "Minimalist Desk Lamp",
                    "Ergonomic Leather Mat",
                    "Mechanical Keyboard",
                    "Carbon Fiber Wallet"
                },
                matches = new List<ProductDto>()
            });
        }

        var term = q.ToLower();
        var matches = await _context.Products
            .Include(p => p.Images)
            .Where(p => p.Title.ToLower().Contains(term) || p.Category.ToLower().Contains(term))
            .Take(5)
            .ToListAsync();

        return Ok(new
        {
            matches = matches.Select(MapToDto).ToList()
        });
    }

    [HttpPost("{id}/reviews")]
    public async Task<ActionResult<ReviewDto>> AddReview(int id, [FromBody] CreateReviewRequest request)
    {
        var product = await _context.Products
            .Include(p => p.Reviews)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null) return NotFound();

        var review = new Review
        {
            ProductId = id,
            AuthorName = request.Author.Trim(),
            City = string.IsNullOrWhiteSpace(request.City) ? "Verified Customer" : request.City.Trim(),
            Rating = Math.Clamp(request.Rating, 1, 5),
            Title = request.Title.Trim(),
            Comment = request.Comment.Trim(),
            HelpfulVotes = 0,
            IsVerifiedBuyer = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Reviews.Add(review);

        // Update aggregate rating
        product.ReviewsCount += 1;
        product.Reviews.Add(review);
        product.Rating = Math.Round(product.Reviews.Average(r => (decimal)r.Rating), 1);

        await _context.SaveChangesAsync();

        return Ok(new ReviewDto
        {
            Id = review.Id,
            Author = review.AuthorName,
            City = review.City,
            Rating = review.Rating,
            Date = "Just now",
            Title = review.Title,
            Comment = review.Comment,
            Helpful = review.HelpfulVotes,
            Verified = review.IsVerifiedBuyer
        });
    }

    [HttpPost("reviews/{reviewId}/helpful")]
    public async Task<ActionResult<object>> MarkHelpful(int reviewId)
    {
        var review = await _context.Reviews.FindAsync(reviewId);
        if (review == null) return NotFound();

        review.HelpfulVotes += 1;
        await _context.SaveChangesAsync();

        return Ok(new { helpful = review.HelpfulVotes });
    }

    private static ProductDto MapToDto(Product p)
    {
        var sortedImages = p.Images.OrderBy(img => img.DisplayOrder).Select(img => img.ImageUrl).ToList();
        var primaryImage = sortedImages.FirstOrDefault() ?? "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80";

        var variants = p.Variants.Select(v => new ProductVariantDto
        {
            Name = v.Name,
            Options = TryDeserializeOptions(v.OptionsJson)
        }).ToList();

        var specsDict = p.Specs.ToDictionary(s => s.SpecKey, s => s.SpecValue);

        var reviewsDto = p.Reviews.OrderByDescending(r => r.CreatedAt).Select(r => new ReviewDto
        {
            Id = r.Id,
            Author = r.AuthorName,
            City = r.City,
            Rating = r.Rating,
            Date = (DateTime.UtcNow - r.CreatedAt).TotalDays < 1 ? "Today" : $"{(int)(DateTime.UtcNow - r.CreatedAt).TotalDays} days ago",
            Title = r.Title,
            Comment = r.Comment,
            Helpful = r.HelpfulVotes,
            Verified = r.IsVerifiedBuyer
        }).ToList();

        return new ProductDto
        {
            Id = p.Id,
            Sku = p.Sku,
            Title = p.Title,
            Tagline = p.Tagline,
            Description = p.Description,
            Category = p.Category,
            Price = p.Price,
            CompareAtPrice = p.CompareAtPrice,
            Badge = p.Badge,
            Rating = p.Rating,
            ReviewsCount = p.ReviewsCount,
            Stock = p.Stock,
            ShippingDays = p.ShippingDays,
            HubLocation = p.HubLocation,
            ViewersCount = p.ViewersCount,
            Image = primaryImage,
            Images = sortedImages.Count > 0 ? sortedImages : new List<string> { primaryImage },
            Variants = variants,
            Specs = specsDict,
            Reviews = reviewsDto,
            Supplier = p.Supplier != null ? new SupplierSummaryDto
            {
                Id = p.Supplier.Id,
                Name = p.Supplier.Name,
                Sku = p.Sku,
                Warehouse = p.Supplier.WarehouseLocation
            } : null
        };
    }

    private static List<string> TryDeserializeOptions(string json)
    {
        try
        {
            return JsonSerializer.Deserialize<List<string>>(json) ?? new();
        }
        catch
        {
            return new();
        }
    }
}

