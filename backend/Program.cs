using Microsoft.EntityFrameworkCore;
using Aura.Dropship.Api.Data;
using Aura.Dropship.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers with camelCase JSON formatting
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// 2. Add Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Aura E-Commerce & Dropshipping OS API",
        Version = "v1",
        Description = "ASP.NET Core Web API + MySQL Backend for Storefront & Dropship Merchant Management"
    });
});

// 3. Configure MySQL via Pomelo Entity Framework Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Server=localhost;Port=3306;Database=sph_ecommerce;User=root;Password=root;CharSet=utf8mb4;";

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 36)), mySqlOptions =>
    {
        mySqlOptions.EnableRetryOnFailure(
            maxRetryCount: 3,
            maxRetryDelay: TimeSpan.FromSeconds(5),
            errorNumbersToAdd: null);
    });
});

// 4. Register Scoped Business Services
builder.Services.AddScoped<IOrderFulfillmentService, OrderFulfillmentService>();
builder.Services.AddScoped<ISourcingService, SourcingService>();
builder.Services.AddScoped<IPincodeService, PincodeService>();

// 5. Configure CORS for React Vite Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendCorsPolicy", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Enable Swagger in all environments for ease of testing
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Aura Dropship API v1");
    c.RoutePrefix = "swagger";
});

// Seed & Ensure Database on Startup
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        logger.LogInformation("Ensuring MySQL database and tables exist...");
        db.Database.EnsureCreated();
        await DbInitializer.SeedAsync(db);
        logger.LogInformation("Database seeded successfully with initial products, suppliers, and Indian pincodes.");
    }
    catch (Exception ex)
    {
        logger.LogWarning("Database auto-initialization deferred: {Message}. (Will connect when MySQL service is reachable)", ex.Message);
    }
}

app.UseCors("FrontendCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
