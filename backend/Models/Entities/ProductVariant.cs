namespace Aura.Dropship.Api.Models.Entities;

public class ProductVariant
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    public string Name { get; set; } = string.Empty; // e.g. "Color", "Edition"
    public string OptionsJson { get; set; } = "[]"; // e.g. ["Midnight Matte Black", "Lunar Silver"]
}

