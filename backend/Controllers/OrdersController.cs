using Microsoft.AspNetCore.Mvc;
using Aura.Dropship.Api.Models.DTOs;
using Aura.Dropship.Api.Services;

namespace Aura.Dropship.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderFulfillmentService _orderService;

    public OrdersController(IOrderFulfillmentService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> PlaceOrder([FromBody] CreateOrderRequest request)
    {
        if (request.Items == null || request.Items.Count == 0)
        {
            return BadRequest("Order must contain at least one item.");
        }

        var order = await _orderService.CreateOrderAsync(request);
        return CreatedAtAction(nameof(TrackOrder), new { lookupId = order.Id }, order);
    }

    [HttpGet("track/{lookupId}")]
    public async Task<ActionResult<OrderDto>> TrackOrder(string lookupId)
    {
        var order = await _orderService.GetOrderForTrackingAsync(lookupId);
        if (order == null)
        {
            return NotFound($"No active shipment found matching Order ID or AWB: '{lookupId}'");
        }

        return Ok(order);
    }
}
