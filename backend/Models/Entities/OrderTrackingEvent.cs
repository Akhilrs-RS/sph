namespace Aura.Dropship.Api.Models.Entities;

public class OrderTrackingEvent
{
    public int Id { get; set; }
    public string OrderId { get; set; } = string.Empty;
    public Order? Order { get; set; }

    public string Status { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public bool IsCompleted { get; set; } = false;
}

