namespace Aura.Dropship.Api.Models.Entities;

public class ProductImage
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
    public bool IsPrimary { get; set; } = false;
}

