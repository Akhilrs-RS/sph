namespace Aura.Dropship.Api.Models.Entities;

public class StoreSettings
{
    public int Id { get; set; } = 1;
    public decimal DefaultMarkup { get; set; } = 2.2m;
    public bool AutoFulfillEnabled { get; set; } = true;
    public string CurrencySymbol { get; set; } = "₹";
    public string CurrencyCode { get; set; } = "INR";
    public int LowStockThreshold { get; set; } = 15;
    public decimal ExpressShippingRate { get; set; } = 199m;
    public decimal StandardShippingRate { get; set; } = 0m;
    public decimal CodFee { get; set; } = 49m;
    public decimal PrepaidDiscount { get; set; } = 100m;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
