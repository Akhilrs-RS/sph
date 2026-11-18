namespace Aura.Dropship.Api.Models.Entities;

public class OrderItem
{
    public int Id { get; set; }
    public string OrderId { get; set; } = string.Empty;
    public Order? Order { get; set; }

    public int? ProductId { get; set; }
    public Product? Product { get; set; }

    public string ProductTitle { get; set; } = string.Empty;
    public string VariantSelectionJson { get; set; } = "{}";
    public decimal UnitPrice { get; set; }
    public decimal SupplierCost { get; set; }
    public int Quantity { get; set; } = 1;
    public string ImageUrl { get; set; } = string.Empty;
}

