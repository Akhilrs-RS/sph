using Microsoft.EntityFrameworkCore;
using Aura.Dropship.Api.Data;
using Aura.Dropship.Api.Models.DTOs;

namespace Aura.Dropship.Api.Services;

public interface IPincodeService
{
    Task<PincodeResultDto> ResolveAsync(string code);
}

public class PincodeService : IPincodeService
{
    private readonly AppDbContext _context;

    public PincodeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PincodeResultDto> ResolveAsync(string code)
    {
        var cleaned = code.Trim();
        var entry = await _context.Pincodes.FirstOrDefaultAsync(p => p.Code == cleaned);

        if (entry != null)
        {
            return new PincodeResultDto
            {
                Pincode = entry.Code,
                City = entry.City,
                State = entry.State,
                DeliveryTime = $"{entry.EstDays}-{entry.EstDays + 2} business days",
                CodAvailable = entry.CodAvailable,
                FreeDelivery = true,
                IsServiceable = entry.IsServiceable
            };
        }

        // Generic fallback for any other valid 6-digit Indian pincode
        return new PincodeResultDto
        {
            Pincode = cleaned,
            City = "All-India Delivery Hub",
            State = "India",
            DeliveryTime = "3-5 business days",
            CodAvailable = true,
            FreeDelivery = true,
            IsServiceable = true
        };
    }
}

