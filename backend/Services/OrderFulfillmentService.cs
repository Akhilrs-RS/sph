using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Aura.Dropship.Api.Data;
using Aura.Dropship.Api.Models.DTOs;
using Aura.Dropship.Api.Models.Entities;

namespace Aura.Dropship.Api.Services;

public interface IOrderFulfillmentService
{
    Task<OrderDto> CreateOrderAsync(CreateOrderRequest request);
    Task<FulfillOrderResponse?> FulfillOrderAsync(string orderId);
    Task<OrderDto?> GetOrderForTrackingAsync(string lookupId);
    Task<List<OrderDto>> GetOrdersAsync(string? statusFilter, string? searchTerm);
    Task<AdminMetricsDto> GetAdminMetricsAsync();
}

public class OrderFulfillmentService : IOrderFulfillmentService
{
    private readonly AppDbContext _context;

    public OrderFulfillmentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<OrderDto> CreateOrderAsync(CreateOrderRequest request)
    {
        var settings = await _context.StoreSettings.FirstOrDefaultAsync() ?? new StoreSettings();

        // Calculate items total and supplier cost
        decimal itemsTotal = 0;
        decimal totalSupplierCost = 0;
        var orderItems = new List<OrderItem>();

        foreach (var itemReq in request.Items)
        {
            var product = await _context.Products.FindAsync(itemReq.ProductId);
            if (product != null)
            {
                var unitPrice = product.Price;
                // Estimate wholesale cost as ~45% of retail price if not specified
                var supplierCost = Math.Round(product.Price * 0.45m);

                itemsTotal += unitPrice * itemReq.Quantity;
                totalSupplierCost += supplierCost * itemReq.Quantity;

                var primaryImage = await _context.ProductImages
                    .Where(img => img.ProductId == product.Id)
                    .OrderBy(img => img.DisplayOrder)
                    .Select(img => img.ImageUrl)
                    .FirstOrDefaultAsync() ?? "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80";

                orderItems.Add(new OrderItem
                {
                    ProductId = product.Id,
                    ProductTitle = product.Title,
                    VariantSelectionJson = JsonSerializer.Serialize(itemReq.SelectedVariants),
                    UnitPrice = unitPrice,
                    SupplierCost = supplierCost,
                    Quantity = itemReq.Quantity,
                    ImageUrl = primaryImage
                });

                // Decrement stock
                product.Stock = Math.Max(0, product.Stock - itemReq.Quantity);
            }
        }

        decimal shippingFee = request.ShippingOption == "express" ? settings.ExpressShippingRate : settings.StandardShippingRate;
        decimal paymentAdjustment = request.PaymentMethod == "UPI"
            ? -settings.PrepaidDiscount
            : (request.PaymentMethod == "Cash on Delivery (COD)" ? settings.CodFee : 0m);

        decimal finalTotal = Math.Max(0, itemsTotal + shippingFee + paymentAdjustment);
        decimal grossProfit = finalTotal - totalSupplierCost - shippingFee;

        var orderId = $"ORD-{Random.Shared.Next(10000, 99999)}";
        var carrier = request.ShippingOption == "express" ? "BlueDart Priority Air" : "Delhivery Surface Express";

        var order = new Order
        {
            Id = orderId,
            CustomerName = request.Customer.Name,
            CustomerPhone = request.Customer.Phone,
            CustomerEmail = request.Customer.Email,
            ShippingAddress = request.Customer.Address,
            Pincode = request.Customer.Pincode,
            City = request.Customer.City,
            State = request.Customer.State,
            Country = "India",
            ItemsTotal = itemsTotal,
            ShippingFee = shippingFee,
            PaymentAdjustment = paymentAdjustment,
            FinalTotal = finalTotal,
            SupplierCost = totalSupplierCost,
            GrossProfit = grossProfit,
            Status = "Pending Sourcing",
            PaymentMethod = request.PaymentMethod,
            PaymentStatus = request.PaymentMethod == "Cash on Delivery (COD)" ? "Pending" : "Paid",
            TrackingNumber = null,
            ShippingCarrier = carrier,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Items = orderItems
        };

        order.TrackingEvents.Add(new OrderTrackingEvent
        {
            Status = "Order Placed & Verified",
            Location = "Online Storefront",
            Description = $"Payment mode: {request.PaymentMethod}. Routing purchase order to supplier warehouse.",
            Timestamp = DateTime.UtcNow,
            IsCompleted = true
        });

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return MapToDto(order);
    }

    public async Task<FulfillOrderResponse?> FulfillOrderAsync(string orderId)
    {
        var order = await _context.Orders
            .Include(o => o.TrackingEvents)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null) return null;

        var trackingNumber = $"BD-IN-{Random.Shared.Next(1000000, 9999999)}";
        order.Status = "In Transit";
        order.TrackingNumber = trackingNumber;
        order.ShippingCarrier = "BlueDart Priority Air";
        order.UpdatedAt = DateTime.UtcNow;

        order.TrackingEvents.Add(new OrderTrackingEvent
        {
            Status = "Sourced & Dispatched",
            Location = "Bengaluru Line-Haul Cargo Terminal",
            Description = $"Waybill AWB {trackingNumber} generated. Handed over to BlueDart express flight freight.",
            Timestamp = DateTime.UtcNow,
            IsCompleted = true
        });

        await _context.SaveChangesAsync();

        return new FulfillOrderResponse
        {
            OrderId = order.Id,
            Status = order.Status,
            TrackingNumber = trackingNumber,
            Carrier = order.ShippingCarrier,
            SupplierCostCharged = order.SupplierCost
        };
    }

    public async Task<OrderDto?> GetOrderForTrackingAsync(string lookupId)
    {
        var trimmed = lookupId.Trim();
        var order = await _context.Orders
            .Include(o => o.Items)
            .Include(o => o.TrackingEvents.OrderBy(t => t.Timestamp))
            .FirstOrDefaultAsync(o => o.Id == trimmed || o.TrackingNumber == trimmed);

        return order == null ? null : MapToDto(order);
    }

    public async Task<List<OrderDto>> GetOrdersAsync(string? statusFilter, string? searchTerm)
    {
        var query = _context.Orders
            .Include(o => o.Items)
            .Include(o => o.TrackingEvents)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(statusFilter) && statusFilter != "All")
        {
            query = query.Where(o => o.Status == statusFilter);
        }

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            var term = searchTerm.ToLower();
            query = query.Where(o =>
                o.Id.ToLower().Contains(term) ||
                o.CustomerName.ToLower().Contains(term) ||
                (o.TrackingNumber != null && o.TrackingNumber.ToLower().Contains(term)));
        }

        var orders = await query
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return orders.Select(MapToDto).ToList();
    }

    public async Task<AdminMetricsDto> GetAdminMetricsAsync()
    {
        var orders = await _context.Orders.ToListAsync();

        var totalRev = orders.Sum(o => o.FinalTotal);
        var netProf = orders.Sum(o => o.GrossProfit);
        var totalOrders = orders.Count;
        var pendingCount = orders.Count(o => o.Status == "Pending Sourcing");
        var inTransitCount = orders.Count(o => o.Status == "In Transit");
        var deliveredCount = orders.Count(o => o.Status == "Delivered");
        var activeCatalogCount = await _context.Products.CountAsync();
        var aov = totalOrders > 0 ? (totalRev / totalOrders) : 0m;

        return new AdminMetricsDto
        {
            TotalRevenue = totalRev,
            NetProfit = netProf,
            OrdersCount = totalOrders,
            PendingFulfillmentCount = pendingCount,
            InTransitCount = inTransitCount,
            DeliveredCount = deliveredCount,
            ActiveCatalogCount = activeCatalogCount,
            AverageOrderValue = Math.Round(aov, 2)
        };
    }

    private static OrderDto MapToDto(Order o)
    {
        return new OrderDto
        {
            Id = o.Id,
            Customer = new CustomerDto
            {
                Name = o.CustomerName,
                Phone = o.CustomerPhone,
                Email = o.CustomerEmail,
                Address = o.ShippingAddress,
                Pincode = o.Pincode,
                City = o.City,
                State = o.State
            },
            TotalAmount = o.FinalTotal,
            ItemsTotal = o.ItemsTotal,
            ShippingFee = o.ShippingFee,
            PaymentAdjustment = o.PaymentAdjustment,
            SupplierCost = o.SupplierCost,
            GrossProfit = o.GrossProfit,
            Status = o.Status,
            PaymentMethod = o.PaymentMethod,
            PaymentStatus = o.PaymentStatus,
            TrackingNumber = o.TrackingNumber,
            ShippingCarrier = o.ShippingCarrier,
            CreatedAt = o.CreatedAt,
            Items = o.Items.Select(i => new OrderItemDto
            {
                ProductId = i.ProductId,
                Title = i.ProductTitle,
                Price = i.UnitPrice,
                SupplierCost = i.SupplierCost,
                Quantity = i.Quantity,
                Image = i.ImageUrl,
                SelectedVariants = TryDeserializeVariants(i.VariantSelectionJson)
            }).ToList(),
            TrackingEvents = o.TrackingEvents.Select(t => new OrderTrackingEventDto
            {
                Status = t.Status,
                Location = t.Location,
                Description = t.Description,
                Timestamp = t.Timestamp.ToString("yyyy-MM-dd HH:mm:ss"),
                Completed = t.IsCompleted
            }).ToList()
        };
    }

    private static Dictionary<string, string> TryDeserializeVariants(string json)
    {
        try
        {
            return JsonSerializer.Deserialize<Dictionary<string, string>>(json) ?? new();
        }
        catch
        {
            return new();
        }
    }
}

