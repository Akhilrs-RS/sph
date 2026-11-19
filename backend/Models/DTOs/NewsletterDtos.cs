namespace Aura.Dropship.Api.Models.DTOs;

public class SubscribeNewsletterRequest
{
    public string Email { get; set; } = string.Empty;
}

public class SubscribeNewsletterResponse
{
    public bool Success { get; set; } = true;
    public string Message { get; set; } = string.Empty;
    public string DiscountCode { get; set; } = "AURA500";
}
