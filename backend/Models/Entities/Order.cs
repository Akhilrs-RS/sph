namespace Aura.Dropship.Api.Models.Entities;

public class Order
{
    public string Id { get; set; } = string.Empty; // e.g. ORD-88210
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string Pincode { get; set; } = "560038";
    public string City { get; set; } = "Bengaluru";
    public string State { get; set; } = "Karnataka";
    public string Country { get; set; } = "India";

    public decimal ItemsTotal { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal PaymentAdjustment { get; set; } // -100 for UPI discount, +49 for COD fee
    public decimal FinalTotal { get; set; }
    public decimal SupplierCost { get; set; }
    public decimal GrossProfit { get; set; }

    public string Status { get; set; } = "Pending Sourcing"; // "Pending Sourcing" | "In Transit" | "Delivered"
    public string PaymentMethod { get; set; } = "UPI"; // "UPI" | "Card" | "Cash on Delivery (COD)"
    public string PaymentStatus { get; set; } = "Paid"; // "Paid" | "Pending"
    public string? TrackingNumber { get; set; }
    public string ShippingCarrier { get; set; } = "BlueDart Priority Air";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public List<OrderItem> Items { get; set; } = new();
    public List<OrderTrackingEvent> TrackingEvents { get; set; } = new();
}

