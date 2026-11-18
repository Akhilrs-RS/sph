namespace Aura.Dropship.Api.Models.Entities;

public class ProductSpec
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    public string SpecKey { get; set; } = string.Empty; // e.g. "Bluetooth", "Battery Life"
    public string SpecValue { get; set; } = string.Empty; // e.g. "v5.4 with aptX HD Lossless"
}
