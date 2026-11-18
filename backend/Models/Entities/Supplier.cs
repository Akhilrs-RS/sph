namespace Aura.Dropship.Api.Models.Entities;

public class Supplier
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Platform { get; set; } = "Direct Factory";
    public string WarehouseLocation { get; set; } = string.Empty;
    public decimal Rating { get; set; } = 4.9m;
    public int OrderFulfillmentRate { get; set; } = 99;
    public int ActiveProductsCount { get; set; } = 12;
    public string ContactEmail { get; set; } = string.Empty;

    public List<Product> Products { get; set; } = new();
}

