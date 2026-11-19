using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Aura.Dropship.Api.Data;
using Aura.Dropship.Api.Models.DTOs;
using Aura.Dropship.Api.Models.Entities;

namespace Aura.Dropship.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsletterController : ControllerBase
{
    private readonly AppDbContext _context;

    public NewsletterController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("subscribe")]
    public async Task<ActionResult<SubscribeNewsletterResponse>> Subscribe([FromBody] SubscribeNewsletterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains('@'))
        {
            return BadRequest(new SubscribeNewsletterResponse
            {
                Success = false,
                Message = "Please provide a valid email address.",
                DiscountCode = string.Empty
            });
        }

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var existing = await _context.NewsletterSubscribers
            .FirstOrDefaultAsync(s => s.Email == normalizedEmail);

        if (existing != null)
        {
            return Ok(new SubscribeNewsletterResponse
            {
                Success = true,
                Message = "Welcome back! Your VIP welcome coupon code is active.",
                DiscountCode = existing.DiscountCode
            });
        }

        var subscriber = new NewsletterSubscriber
        {
            Email = normalizedEmail,
            DiscountCode = "AURA500",
            SubscribedAt = DateTime.UtcNow,
            IsActive = true
        };

        _context.NewsletterSubscribers.Add(subscriber);
        await _context.SaveChangesAsync();

        return Ok(new SubscribeNewsletterResponse
        {
            Success = true,
            Message = "VIP Subscription confirmed! Use code AURA500 for ₹500 off your direct factory order.",
            DiscountCode = "AURA500"
        });
    }

    [HttpGet("subscribers")]
    public async Task<ActionResult<List<NewsletterSubscriber>>> GetSubscribers()
    {
        var list = await _context.NewsletterSubscribers
            .OrderByDescending(s => s.SubscribedAt)
            .ToListAsync();
        return Ok(list);
    }
}
