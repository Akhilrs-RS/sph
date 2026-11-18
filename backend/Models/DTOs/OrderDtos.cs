namespace Aura.Dropship.Api.Models.DTOs;

public class OrderDto
{
    public string Id { get; set; } = string.Empty;
    public CustomerDto Customer { get; set; } = new();
    public decimal TotalAmount { get; set; }
    public decimal ItemsTotal { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal PaymentAdjustment { get; set; }
    public decimal SupplierCost { get; set; }
    public decimal GrossProfit { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;
    public string PaymentStatus { get; set; } = string.Empty;
    public string? TrackingNumber { get; set; }
    public string ShippingCarrier { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
    public List<OrderTrackingEventDto> TrackingEvents { get; set; } = new();
}

public class CustomerDto
{
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Pincode { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
}

public class OrderItemDto
{
    public int? ProductId { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal SupplierCost { get; set; }
    public int Quantity { get; set; }
    public string Image { get; set; } = string.Empty;
    public Dictionary<string, string> SelectedVariants { get; set; } = new();
}

public class OrderTrackingEventDto
{
    public string Status { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Timestamp { get; set; } = string.Empty;
    public bool Completed { get; set; }
}

public class CreateOrderRequest
{
    public CustomerDto Customer { get; set; } = new();
    public List<OrderItemRequest> Items { get; set; } = new();
    public string ShippingOption { get; set; } = "standard"; // "standard" | "express"
    public string PaymentMethod { get; set; } = "UPI"; // "UPI" | "Card" | "Cash on Delivery (COD)"
    public PaymentDetailsDto? PaymentDetails { get; set; }
}

public class OrderItemRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; } = 1;
    public Dictionary<string, string> SelectedVariants { get; set; } = new();
}

public class PaymentDetailsDto
{
    public string? UpiTxnId { get; set; }
    public string? Vpa { get; set; }
    public string? Last4 { get; set; }
}

public class FulfillOrderResponse
{
    public string OrderId { get; set; } = string.Empty;
    public string Status { get; set; } = "In Transit";
    public string TrackingNumber { get; set; } = string.Empty;
    public string Carrier { get; set; } = string.Empty;
    public decimal SupplierCostCharged { get; set; }
}
