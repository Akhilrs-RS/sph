namespace Aura.Dropship.Api.Models.DTOs;

public class SourcingItemDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public string SupplierName { get; set; } = string.Empty;
    public decimal SupplierRating { get; set; }
    public decimal SupplierCost { get; set; }
    public decimal ShippingCost { get; set; }
    public string ShippingTime { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsImported { get; set; }
}

public class ImportSourcingItemRequest
{
    public string SourcingItemId { get; set; } = string.Empty;
    public decimal CustomRetailPrice { get; set; }
}

public class ExtractUrlRequest
{
    public string UrlOrSku { get; set; } = string.Empty;
}

public class ExtractedItemDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = "Electronics";
    public string Platform { get; set; } = "CJ Dropshipping";
    public string SupplierName { get; set; } = string.Empty;
    public decimal SupplierRating { get; set; } = 4.9m;
    public decimal SupplierCost { get; set; }
    public decimal ShippingCost { get; set; }
    public string ShippingTime { get; set; } = "3-5 days air line-haul";
    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal SuggestedRetailPrice { get; set; }
    public decimal EstimatedNetProfit { get; set; }
}

public class PincodeResultDto
{
    public string Pincode { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string DeliveryTime { get; set; } = string.Empty;
    public bool CodAvailable { get; set; } = true;
    public bool FreeDelivery { get; set; } = true;
    public bool IsServiceable { get; set; } = true;
}

public class StoreSettingsDto
{
    public decimal DefaultMarkup { get; set; }
    public bool AutoFulfillEnabled { get; set; }
    public string CurrencySymbol { get; set; } = "₹";
    public string CurrencyCode { get; set; } = "INR";
    public int LowStockThreshold { get; set; }
    public decimal ExpressShippingRate { get; set; }
    public decimal StandardShippingRate { get; set; }
    public decimal CodFee { get; set; }
    public decimal PrepaidDiscount { get; set; }
}

public class AdminMetricsDto
{
    public decimal TotalRevenue { get; set; }
    public decimal NetProfit { get; set; }
    public int OrdersCount { get; set; }
    public int PendingFulfillmentCount { get; set; }
    public int InTransitCount { get; set; }
    public int DeliveredCount { get; set; }
    public int ActiveCatalogCount { get; set; }
    public decimal AverageOrderValue { get; set; }
}

