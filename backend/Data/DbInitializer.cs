using System.Text.Json;
using Aura.Dropship.Api.Models.Entities;

namespace Aura.Dropship.Api.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context)
    {
        // 1. Seed Store Settings
        if (!context.StoreSettings.Any())
        {
            context.StoreSettings.Add(new StoreSettings
            {
                Id = 1,
                DefaultMarkup = 2.2m,
                AutoFulfillEnabled = true,
                CurrencySymbol = "₹",
                CurrencyCode = "INR",
                LowStockThreshold = 15,
                ExpressShippingRate = 199m,
                StandardShippingRate = 0m,
                CodFee = 49m,
                PrepaidDiscount = 100m,
                UpdatedAt = DateTime.UtcNow
            });
            await context.SaveChangesAsync();
        }

        // 2. Seed Pincodes
        if (!context.Pincodes.Any())
        {
            var pincodes = new List<Pincode>
            {
                new() { Code = "560038", City = "Bengaluru", State = "Karnataka", Zone = "South Metro", EstDays = 2, CodAvailable = true, IsServiceable = true },
                new() { Code = "560001", City = "Bengaluru", State = "Karnataka", Zone = "South Metro", EstDays = 2, CodAvailable = true, IsServiceable = true },
                new() { Code = "400050", City = "Mumbai", State = "Maharashtra", Zone = "West Metro", EstDays = 3, CodAvailable = true, IsServiceable = true },
                new() { Code = "400001", City = "Mumbai", State = "Maharashtra", Zone = "West Metro", EstDays = 3, CodAvailable = true, IsServiceable = true },
                new() { Code = "110001", City = "New Delhi", State = "Delhi NCR", Zone = "North Metro", EstDays = 3, CodAvailable = true, IsServiceable = true },
                new() { Code = "122002", City = "Gurugram", State = "Haryana", Zone = "North Metro", EstDays = 3, CodAvailable = true, IsServiceable = true },
                new() { Code = "500081", City = "Hyderabad", State = "Telangana", Zone = "South Metro", EstDays = 3, CodAvailable = true, IsServiceable = true },
                new() { Code = "600028", City = "Chennai", State = "Tamil Nadu", Zone = "South Metro", EstDays = 3, CodAvailable = true, IsServiceable = true },
                new() { Code = "700001", City = "Kolkata", State = "West Bengal", Zone = "East Metro", EstDays = 4, CodAvailable = true, IsServiceable = true },
                new() { Code = "411001", City = "Pune", State = "Maharashtra", Zone = "West Metro", EstDays = 3, CodAvailable = true, IsServiceable = true },
                new() { Code = "380015", City = "Ahmedabad", State = "Gujarat", Zone = "West Metro", EstDays = 3, CodAvailable = true, IsServiceable = true }
            };
            context.Pincodes.AddRange(pincodes);
            await context.SaveChangesAsync();
        }

        // 3. Seed Suppliers
        if (!context.Suppliers.Any())
        {
            var suppliers = new List<Supplier>
            {
                new() { Id = 1, Name = "Shenzhen Audio Tech", Platform = "Direct Factory", WarehouseLocation = "Shenzhen / Bengaluru Line-Haul", Rating = 4.9m, OrderFulfillmentRate = 99, ActiveProductsCount = 14, ContactEmail = "fulfillment@szaudio.com" },
                new() { Id = 2, Name = "Yiwu Minimalist Lifestyle", Platform = "Direct Factory", WarehouseLocation = "Yiwu Export Free Zone", Rating = 4.8m, OrderFulfillmentRate = 98, ActiveProductsCount = 22, ContactEmail = "orders@yiwulife.cn" },
                new() { Id = 3, Name = "Dongguan Precision Optics", Platform = "Direct Factory", WarehouseLocation = "Dongguan High-Tech Hub", Rating = 4.9m, OrderFulfillmentRate = 100, ActiveProductsCount = 8, ContactEmail = "b2b@dgoptics.com" },
                new() { Id = 4, Name = "Hong Kong Ambient Labs", Platform = "Direct Factory", WarehouseLocation = "Hong Kong Cargo Terminal", Rating = 4.7m, OrderFulfillmentRate = 97, ActiveProductsCount = 10, ContactEmail = "freight@hkambient.io" }
            };
            context.Suppliers.AddRange(suppliers);
            await context.SaveChangesAsync();
        }

        // 4. Seed Products
        if (!context.Products.Any())
        {
            var p1 = new Product
            {
                Id = 1,
                Sku = "AURA-AUD-01",
                Title = "Aura Pulse Pro ANC Headphones",
                Tagline = "Studio acoustics engineered for seamless focus",
                Description = "Crafted with 40mm bespoke neodymium acoustic drivers and adaptive hybrid Active Noise Cancellation (up to -42dB). Features aerospace-grade aluminum gimbals and ultra-soft memory foam protein leather earcups.",
                Category = "Electronics",
                Price = 8999m,
                CompareAtPrice = 14999m,
                Badge = "Best Seller",
                Rating = 4.9m,
                ReviewsCount = 184,
                Stock = 45,
                ShippingDays = "2-4 business days",
                HubLocation = "Bengaluru Line-Haul Hub",
                ViewersCount = 28,
                SupplierId = 1,
                IsFeatured = true
            };
            p1.Images.Add(new ProductImage { ImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", DisplayOrder = 0, IsPrimary = true });
            p1.Images.Add(new ProductImage { ImageUrl = "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80", DisplayOrder = 1 });
            p1.Variants.Add(new ProductVariant { Name = "Color", OptionsJson = JsonSerializer.Serialize(new[] { "Space Black", "Titanium Silver" }) });
            p1.Specs.Add(new ProductSpec { SpecKey = "Bluetooth", SpecValue = "v5.4 with aptX HD & AAC Lossless" });
            p1.Specs.Add(new ProductSpec { SpecKey = "Battery Life", SpecValue = "60 hours ANC off / 45 hours ANC on" });
            p1.Specs.Add(new ProductSpec { SpecKey = "Fast Charging", SpecValue = "10 mins charge = 5 hours playback (USB-C)" });
            p1.Reviews.Add(new Review
            {
                AuthorName = "Arjun N.",
                City = "Whitefield, Bengaluru",
                Rating = 5,
                Title = "Remarkable build quality and soundstage",
                Comment = "Arrived in 48 hours via BlueDart. Tested against Bose QC45 and the ANC attenuation on flights is astonishingly comparable at 1/3rd the cost.",
                HelpfulVotes = 24,
                IsVerifiedBuyer = true
            });
            p1.Reviews.Add(new Review
            {
                AuthorName = "Pooja Sharma",
                City = "Bandra West, Mumbai",
                Rating = 5,
                Title = "Minimalist luxury aesthetic",
                Comment = "Packaging was pristine Apple-standard. The tactile dials have smooth dampened resistance. Highly recommend.",
                HelpfulVotes = 19,
                IsVerifiedBuyer = true
            });

            var p2 = new Product
            {
                Id = 2,
                Sku = "AURA-DSK-02",
                Title = "Aura Arc Minimalist MagSafe Stand",
                Tagline = "Precision CNC machined sandblasted aluminum dock",
                Description = "Sculpted from a single solid billet of 6000-series aerospace alloy. Delivers optimal 60-degree viewing angle for StandBy mode with embedded cable routing channel.",
                Category = "Workspace",
                Price = 2499m,
                CompareAtPrice = 3999m,
                Badge = "Trending",
                Rating = 4.8m,
                ReviewsCount = 96,
                Stock = 80,
                ShippingDays = "2-3 business days",
                HubLocation = "Bengaluru Line-Haul Hub",
                ViewersCount = 14,
                SupplierId = 2,
                IsFeatured = true
            };
            p2.Images.Add(new ProductImage { ImageUrl = "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80", DisplayOrder = 0, IsPrimary = true });
            p2.Images.Add(new ProductImage { ImageUrl = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80", DisplayOrder = 1 });
            p2.Variants.Add(new ProductVariant { Name = "Finish", OptionsJson = JsonSerializer.Serialize(new[] { "Matte Charcoal", "Anodized Silver" }) });
            p2.Specs.Add(new ProductSpec { SpecKey = "Material", SpecValue = "Solid 6063-T6 CNC Anodized Aluminum" });
            p2.Specs.Add(new ProductSpec { SpecKey = "Weight", SpecValue = "320g weighted micro-suction anti-slip base" });

            var p3 = new Product
            {
                Id = 3,
                Sku = "AURA-LGT-03",
                Title = "Aura Horizon Ambient Lightbar",
                Tagline = "Asymmetric optical path eliminating monitor screen glare",
                Description = "Engineered with 84 high-CRI (Ra>95) full-spectrum LEDs and stepless 2700K-6500K rotary wireless puck control. Powered via USB Type-C directly from monitor hub.",
                Category = "Workspace",
                Price = 3799m,
                CompareAtPrice = 5999m,
                Badge = "Editor's Choice",
                Rating = 4.9m,
                ReviewsCount = 210,
                Stock = 28,
                ShippingDays = "3-5 business days",
                HubLocation = "Bengaluru Line-Haul Hub",
                ViewersCount = 36,
                SupplierId = 4,
                IsFeatured = true
            };
            p3.Images.Add(new ProductImage { ImageUrl = "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80", DisplayOrder = 0, IsPrimary = true });
            p3.Images.Add(new ProductImage { ImageUrl = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80", DisplayOrder = 1 });
            p3.Variants.Add(new ProductVariant { Name = "Control Puck", OptionsJson = JsonSerializer.Serialize(new[] { "2.4GHz Wireless Dial", "Touch Bar Direct" }) });
            p3.Specs.Add(new ProductSpec { SpecKey = "Color Temperature", SpecValue = "2700K Warm - 6500K Cool White (Stepless)" });
            p3.Specs.Add(new ProductSpec { SpecKey = "Color Rendering Index", SpecValue = "Ra > 95 True Natural Sunlight Color" });

            var p4 = new Product
            {
                Id = 4,
                Sku = "AURA-KBD-04",
                Title = "Aura KeyOne Wireless Mechanical Keyboard",
                Tagline = "75% compact hot-swappable gasket-mounted mechanical typing",
                Description = "Custom factory-lubed pre-lubricated linear switches encased in a multi-layered sound-dampening poron gasket architecture with PBT dye-sub keycaps.",
                Category = "Electronics",
                Price = 6499m,
                CompareAtPrice = 9999m,
                Badge = "Popular",
                Rating = 4.8m,
                ReviewsCount = 142,
                Stock = 35,
                ShippingDays = "3-5 business days",
                HubLocation = "Bengaluru Line-Haul Hub",
                ViewersCount = 19,
                SupplierId = 3,
                IsFeatured = true
            };
            p4.Images.Add(new ProductImage { ImageUrl = "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80", DisplayOrder = 0, IsPrimary = true });
            p4.Images.Add(new ProductImage { ImageUrl = "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80", DisplayOrder = 1 });
            p4.Variants.Add(new ProductVariant { Name = "Switch Type", OptionsJson = JsonSerializer.Serialize(new[] { "Linear Cream Yellow (Silent)", "Tactile Glacier Blue" }) });
            p4.Specs.Add(new ProductSpec { SpecKey = "Connectivity", SpecValue = "Tri-Mode (Bluetooth 5.1 / 2.4GHz / USB-C)" });
            p4.Specs.Add(new ProductSpec { SpecKey = "Battery", SpecValue = "4000mAh (Up to 200 hours backlight off)" });

            context.Products.AddRange(p1, p2, p3, p4);
            await context.SaveChangesAsync();
        }

        // 5. Seed Sourcing Catalog Items
        if (!context.SourcingItems.Any())
        {
            var sourcing = new List<SourcingItem>
            {
                new()
                {
                    Id = "SRC-CJ-01",
                    Title = "Aura MagSnap 10,000mAh Powerbank with Stand",
                    Category = "Electronics",
                    Platform = "CJ Dropshipping",
                    SupplierName = "Shenzhen Baseus OEM Partner",
                    SupplierRating = 4.9m,
                    SupplierCost = 850m,
                    ShippingCost = 120m,
                    ShippingTime = "3-5 days air line-haul",
                    ImageUrl = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
                    Description = "Magnetic snap wireless charging battery pack with foldable zinc kickstand and digital LED battery meter."
                },
                new()
                {
                    Id = "SRC-ALI-02",
                    Title = "Titanium Carabiner Quick-Release Key Organizer",
                    Category = "Lifestyle",
                    Platform = "AliExpress Direct",
                    SupplierName = "Yiwu EDC Precision Hardware",
                    SupplierRating = 4.8m,
                    SupplierCost = 380m,
                    ShippingCost = 90m,
                    ShippingTime = "4-6 days express tracked",
                    ImageUrl = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80",
                    Description = "Grade 5 titanium alloy pocket multi-tool with bottle opener, pry bar, and silent key silencer."
                },
                new()
                {
                    Id = "SRC-SPO-03",
                    Title = "Ultra-Fast 65W GaN Dual USB-C Fast Charger",
                    Category = "Electronics",
                    Platform = "Spocket US",
                    SupplierName = "Dongguan Power Delivery Lab",
                    SupplierRating = 4.9m,
                    SupplierCost = 690m,
                    ShippingCost = 110m,
                    ShippingTime = "2-4 days priority domestic",
                    ImageUrl = "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
                    Description = "Next-gen Gallium Nitride compact wall charger compatible with MacBook Pro, iPhone, and Android fast charging."
                }
            };
            context.SourcingItems.AddRange(sourcing);
            await context.SaveChangesAsync();
        }

        // 6. Seed Initial Orders
        if (!context.Orders.Any())
        {
            var o1 = new Order
            {
                Id = "ORD-98214",
                CustomerName = "Karthik Raghavan",
                CustomerPhone = "+91 98450 12345",
                CustomerEmail = "karthik.r@techcorp.in",
                ShippingAddress = "Flat 402, Prestige Palms, Indiranagar, Bengaluru - 560038, India",
                Pincode = "560038",
                City = "Bengaluru",
                State = "Karnataka",
                Country = "India",
                ItemsTotal = 8999m,
                ShippingFee = 0m,
                PaymentAdjustment = -100m,
                FinalTotal = 8899m,
                SupplierCost = 3800m,
                GrossProfit = 5099m,
                Status = "In Transit",
                PaymentMethod = "UPI",
                PaymentStatus = "Paid",
                TrackingNumber = "BD-IN-9821430",
                ShippingCarrier = "BlueDart Priority Air",
                CreatedAt = DateTime.UtcNow.AddHours(-18),
                UpdatedAt = DateTime.UtcNow
            };
            o1.Items.Add(new OrderItem
            {
                ProductId = 1,
                ProductTitle = "Aura Pulse Pro ANC Headphones",
                VariantSelectionJson = JsonSerializer.Serialize(new Dictionary<string, string> { { "Color", "Space Black" } }),
                UnitPrice = 8999m,
                SupplierCost = 3800m,
                Quantity = 1,
                ImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
            });
            o1.TrackingEvents.Add(new OrderTrackingEvent
            {
                Status = "Order Placed & Verified",
                Location = "Online Storefront",
                Description = "Prepaid UPI payment confirmed. Purchase order generated for manufacturer.",
                Timestamp = DateTime.UtcNow.AddHours(-18),
                IsCompleted = true
            });
            o1.TrackingEvents.Add(new OrderTrackingEvent
            {
                Status = "Sourced & Quality Audited",
                Location = "Shenzhen Manufacturing Hub",
                Description = "Factory QA check passed. Sealed in tamper-evident freight packaging.",
                Timestamp = DateTime.UtcNow.AddHours(-12),
                IsCompleted = true
            });
            o1.TrackingEvents.Add(new OrderTrackingEvent
            {
                Status = "Air Freight Dispatched",
                Location = "Kempegowda Line-Haul Cargo Terminal",
                Description = "Customs cleared. Handed over to BlueDart courier for destination delivery.",
                Timestamp = DateTime.UtcNow.AddHours(-4),
                IsCompleted = true
            });

            var o2 = new Order
            {
                Id = "ORD-98215",
                CustomerName = "Ananya Desai",
                CustomerPhone = "+91 99201 54321",
                CustomerEmail = "ananya.d@designstudio.com",
                ShippingAddress = "B-12 Sea View Apartments, Bandra West, Mumbai - 400050, India",
                Pincode = "400050",
                City = "Mumbai",
                State = "Maharashtra",
                Country = "India",
                ItemsTotal = 2499m,
                ShippingFee = 199m,
                PaymentAdjustment = -100m,
                FinalTotal = 2598m,
                SupplierCost = 950m,
                GrossProfit = 1648m,
                Status = "Pending Sourcing",
                PaymentMethod = "UPI",
                PaymentStatus = "Paid",
                TrackingNumber = null,
                ShippingCarrier = "BlueDart Priority Air",
                CreatedAt = DateTime.UtcNow.AddHours(-2),
                UpdatedAt = DateTime.UtcNow
            };
            o2.Items.Add(new OrderItem
            {
                ProductId = 2,
                ProductTitle = "Aura Arc Minimalist MagSafe Stand",
                VariantSelectionJson = JsonSerializer.Serialize(new Dictionary<string, string> { { "Finish", "Anodized Silver" } }),
                UnitPrice = 2499m,
                SupplierCost = 950m,
                Quantity = 1,
                ImageUrl = "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80"
            });
            o2.TrackingEvents.Add(new OrderTrackingEvent
            {
                Status = "Order Placed & Verified",
                Location = "Online Storefront",
                Description = "Prepaid UPI payment confirmed. Ready for merchant 1-click fulfillment.",
                Timestamp = DateTime.UtcNow.AddHours(-2),
                IsCompleted = true
            });

            context.Orders.AddRange(o1, o2);
            await context.SaveChangesAsync();
        }
    }
}
