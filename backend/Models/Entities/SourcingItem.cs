namespace Aura.Dropship.Api.Models.Entities;

public class SourcingItem
{
    public string Id { get; set; } = string.Empty; // e.g. SRC-CJ-01
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = "Electronics";
    public string Platform { get; set; } = "CJ Dropshipping"; // "CJ Dropshipping" | "AliExpress Direct" | "Spocket US"
    public string SupplierName { get; set; } = string.Empty;
    public decimal SupplierRating { get; set; } = 4.9m;
    public decimal SupplierCost { get; set; }
    public decimal ShippingCost { get; set; }
    public string ShippingTime { get; set; } = "3-5 days air line-haul";
    public string ImageUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsImported { get; set; } = false;
}

