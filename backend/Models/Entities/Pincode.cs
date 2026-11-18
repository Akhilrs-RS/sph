namespace Aura.Dropship.Api.Models.Entities;

public class Pincode
{
    public string Code { get; set; } = string.Empty; // e.g. "560038"
    public string City { get; set; } = string.Empty; // e.g. "Bengaluru"
    public string State { get; set; } = string.Empty; // e.g. "Karnataka"
    public string Zone { get; set; } = "South Metro";
    public int EstDays { get; set; } = 2;
    public bool CodAvailable { get; set; } = true;
    public bool IsServiceable { get; set; } = true;
}

