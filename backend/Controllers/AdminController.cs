using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Aura.Dropship.Api.Data;
using Aura.Dropship.Api.Models.DTOs;
using Aura.Dropship.Api.Models.Entities;
using Aura.Dropship.Api.Services;

namespace Aura.Dropship.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IOrderFulfillmentService _orderService;
    private readonly ISourcingService _sourcingService;

    public AdminController(
        AppDbContext context,
        IOrderFulfillmentService orderService,
        ISourcingService sourcingService)
    {
        _context = context;
        _orderService = orderService;
        _sourcingService = sourcingService;
    }

    [HttpGet("metrics")]
    public async Task<ActionResult<AdminMetricsDto>> GetMetrics()
    {
        var metrics = await _orderService.GetAdminMetricsAsync();
        return Ok(metrics);
    }

    [HttpGet("orders")]
    public async Task<ActionResult<List<OrderDto>>> GetOrders([FromQuery] string? status, [FromQuery] string? search)
    {
        var orders = await _orderService.GetOrdersAsync(status, search);
        return Ok(orders);
    }

    [HttpPost("orders/{id}/fulfill")]
    public async Task<ActionResult<FulfillOrderResponse>> FulfillOrder(string id)
    {
        var result = await _orderService.FulfillOrderAsync(id);
        if (result == null)
        {
            return NotFound($"Order {id} not found.");
        }

        return Ok(result);
    }

    [HttpGet("sourcing")]
    public async Task<ActionResult<List<SourcingItemDto>>> GetSourcing([FromQuery] string? platform)
    {
        var items = await _sourcingService.GetSourcingCatalogAsync(platform);
        return Ok(items);
    }

    [HttpPost("sourcing/import")]
    public async Task<ActionResult<ProductDto>> ImportSourcingItem([FromBody] ImportSourcingItemRequest request)
    {
        var product = await _sourcingService.ImportToStorefrontAsync(request);
        if (product == null)
        {
            return NotFound($"Sourcing item '{request.SourcingItemId}' not found.");
        }

        return Ok(product);
    }

    [HttpPost("sourcing/extract-url")]
    public async Task<ActionResult<ExtractedItemDto>> ExtractUrl([FromBody] ExtractUrlRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.UrlOrSku))
        {
            return BadRequest("URL or SKU string is required.");
        }

        var result = await _sourcingService.ExtractFromUrlAsync(request.UrlOrSku);
        return Ok(result);
    }

    [HttpGet("suppliers")]
    public async Task<ActionResult<List<Supplier>>> GetSuppliers()
    {
        var suppliers = await _context.Suppliers.ToListAsync();
        return Ok(suppliers);
    }

    [HttpGet("settings")]
    public async Task<ActionResult<StoreSettingsDto>> GetSettings()
    {
        var s = await _context.StoreSettings.FirstOrDefaultAsync() ?? new StoreSettings();
        return Ok(new StoreSettingsDto
        {
            DefaultMarkup = s.DefaultMarkup,
            AutoFulfillEnabled = s.AutoFulfillEnabled,
            CurrencySymbol = s.CurrencySymbol,
            CurrencyCode = s.CurrencyCode,
            LowStockThreshold = s.LowStockThreshold,
            ExpressShippingRate = s.ExpressShippingRate,
            StandardShippingRate = s.StandardShippingRate,
            CodFee = s.CodFee,
            PrepaidDiscount = s.PrepaidDiscount
        });
    }

    [HttpPut("settings")]
    public async Task<ActionResult<StoreSettingsDto>> UpdateSettings([FromBody] StoreSettingsDto dto)
    {
        var s = await _context.StoreSettings.FirstOrDefaultAsync();
        if (s == null)
        {
            s = new StoreSettings();
            _context.StoreSettings.Add(s);
        }

        s.DefaultMarkup = dto.DefaultMarkup;
        s.AutoFulfillEnabled = dto.AutoFulfillEnabled;
        s.CurrencySymbol = dto.CurrencySymbol;
        s.CurrencyCode = dto.CurrencyCode;
        s.LowStockThreshold = dto.LowStockThreshold;
        s.ExpressShippingRate = dto.ExpressShippingRate;
        s.StandardShippingRate = dto.StandardShippingRate;
        s.CodFee = dto.CodFee;
        s.PrepaidDiscount = dto.PrepaidDiscount;
        s.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(dto);
    }
}
