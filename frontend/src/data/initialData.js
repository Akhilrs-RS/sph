// Realistic, high-resolution product images, secondary hover angles, specifications and verified reviews in INR

export const initialStoreProducts = [
  {
    id: "prod-1",
    title: "Aura SoundPulse Pro ANC Headphones",
    tagline: "Hybrid Active Noise Cancellation with 48h Battery Life",
    category: "Electronics",
    price: 4999,
    compareAtPrice: 8499,
    supplierCost: 1999,
    shippingCost: 199,
    rating: 4.8,
    reviewsCount: 342,
    stock: 12,
    hubLocation: "Bengaluru Logistics Hub",
    shippingDays: "2-3 business days",
    badge: "Bestseller",
    viewersCount: 23,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
    ],
    variants: [
      { name: "Color", options: ["Matte Black", "Silver Frost", "Midnight Navy"] },
      { name: "Edition", options: ["Standard", "Pro Travel Bundle (+₹899)"] }
    ],
    description: "Experience studio-grade acoustics paired with industry-leading 35dB active noise cancellation. Features ultra-soft memory foam earcups, multi-device Bluetooth 5.3 pairing, and rapid USB-C fast charging.",
    features: [
      "Custom 40mm Neodymium acoustic drivers",
      "Quad-mic environmental noise cancellation for crystal calls",
      "Up to 48 hours playback on a single charge",
      "Lightweight ergonomic titanium alloy headband"
    ],
    specs: {
      "Driver Size": "40mm Dynamic Neodymium",
      "ANC Depth": "Up to -35dB Hybrid",
      "Bluetooth": "v5.3 with AAC, SBC, LDAC",
      "Battery Life": "48 Hours (ANC Off) / 36 Hours (ANC On)",
      "Charging": "Type-C Fast Charge (10 mins = 5 hours)",
      "Weight": "242 grams"
    },
    inTheBox: [
      "Aura SoundPulse Pro Headphones",
      "Hard-shell Magnetic Travel Case",
      "Braided USB-C to USB-C Fast Cable",
      "3.5mm Gold-Plated AUX Audio Cable",
      "Airline Audio Adapter & Quick-Start Guide"
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Vikramaditya Nair",
        location: "Koramangala, Bengaluru",
        verified: true,
        rating: 5,
        date: "12 Nov 2026",
        title: "Beats my ₹25k Sony headphones in comfort!",
        comment: "The noise cancellation during Bengaluru metro commute is outstanding. Bass is punchy without distorting vocals. Delivered in just 2 days via BlueDart.",
        helpful: 42
      },
      {
        id: "rev-2",
        author: "Ananya Deshmukh",
        location: "Bandra West, Mumbai",
        verified: true,
        rating: 5,
        date: "08 Nov 2026",
        title: "Incredible battery life and call quality",
        comment: "Used it continuously for 4 days of Zoom meetings and music without charging once. The mic filters out background fan noise easily.",
        helpful: 29
      },
      {
        id: "rev-3",
        author: "Rohit Singhania",
        location: "Sector 54, Gurugram",
        verified: true,
        rating: 4,
        date: "03 Nov 2026",
        title: "Solid soundstage, premium case",
        comment: "Premium matte finish and soft cushions. Great value for ₹4,999. Travel case is compact and fits my backpack pocket.",
        helpful: 15
      }
    ],
    supplier: {
      name: "Shenzhen SoundTech Ltd.",
      platform: "CJ Dropshipping",
      sku: "CJ-AUDIO-9921",
      warehouse: "Bengaluru Hub / Shenzhen Direct"
    }
  },
  {
    id: "prod-2",
    title: "Lumino Horizon Ambient RGB Lightbar",
    tagline: "Dynamic Screen Sync with Smart App & Voice Control",
    category: "Smart Home",
    price: 2799,
    compareAtPrice: 4499,
    supplierCost: 1099,
    shippingCost: 149,
    rating: 4.7,
    reviewsCount: 218,
    stock: 18,
    hubLocation: "Mumbai Gateway Logistics",
    shippingDays: "3-4 business days",
    badge: "Trending",
    viewersCount: 16,
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80"
    ],
    variants: [
      { name: "Base Style", options: ["Desk Stand", "Monitor Mount Dual"] },
      { name: "Control", options: ["Tuya WiFi + RF Remote", "Matter Compatible (+₹499)"] }
    ],
    description: "Transform your battlestation or entertainment center with vibrant 16-million-color immersion. Real-time acoustic audio visualization and ambient backlighting enhance viewing comfort.",
    features: [
      "16 Million RGBIC color gradient flows",
      "Built-in ultra-sensitive acoustic music sensor",
      "Alexa & Google Assistant hands-free voice control",
      "Heavy weighted aluminum alloy base"
    ],
    specs: {
      "LED Channels": "RGBIC Individually Addressable",
      "Connectivity": "2.4GHz Wi-Fi + BLE 5.0",
      "Power Source": "USB 5V/2A Direct Cable",
      "Material": "Anodized Aerospace Aluminum + Optical Diffusion Acrylic",
      "Voice Compatibility": "Google Home, Alexa, Apple Siri Shortcuts"
    },
    inTheBox: [
      "2x Lumino Horizon Smart Lightbars",
      "2x Weighted Desktop Bases",
      "2x 3M Monitor Screen Mounts",
      "1x USB-C Power Splitter Cable & RF Wireless Remote"
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Devendra Kulkarni",
        location: "Kothrud, Pune",
        verified: true,
        rating: 5,
        date: "14 Nov 2026",
        title: "Elevated my desk setup completely",
        comment: "The screen-sync and music rhythm modes are so responsive with zero lag. Connects smoothly to Google Home.",
        helpful: 34
      },
      {
        id: "rev-5",
        author: "Sneha Patel",
        location: "Satellite, Ahmedabad",
        verified: true,
        rating: 4,
        date: "05 Nov 2026",
        title: "Very bright and vibrant colors",
        comment: "Great quality aluminum build. The remote is very handy when I don't want to use the smartphone app.",
        helpful: 18
      }
    ],
    supplier: {
      name: "Zhejiang OptoTech Co.",
      platform: "AliExpress Direct",
      sku: "ALI-RGB-4029",
      warehouse: "Mumbai Gateway Logistics"
    }
  },
  {
    id: "prod-3",
    title: "VortexFlow Ceramic Smart Heating Mug",
    tagline: "App-Controlled Exact Temperature Retention (49°C - 63°C)",
    category: "Lifestyle",
    price: 3499,
    compareAtPrice: 5999,
    supplierCost: 1499,
    shippingCost: 199,
    rating: 4.9,
    reviewsCount: 512,
    stock: 7,
    hubLocation: "Delhi NCR Logistics Hub",
    shippingDays: "2-4 business days",
    badge: "Hot Deal",
    viewersCount: 31,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&q=80"
    ],
    variants: [
      { name: "Color", options: ["Ceramic White", "Obsidian Black", "Sage Green"] },
      { name: "Capacity", options: ["300ml Standard", "420ml Grande"] }
    ],
    description: "Keep your coffee or tea at your precise drinking temperature for up to 3 hours on battery, or all day on the included wireless charging coaster.",
    features: [
      "Precision temperature control (49°C - 63°C)",
      "Scratch-resistant ceramic coating over stainless steel",
      "Smart LED temperature indicator ring",
      "Auto-sleep sensing technology"
    ],
    specs: {
      "Battery Duration": "Up to 3 Hours standalone / All Day on Coaster",
      "Temperature Range": "49°C to 63°C (Preset via Touch or App)",
      "Capacity": "300ml (Standard) / 420ml (Grande)",
      "Waterproofing": "IPX7 Submersible Washable",
      "Lid": "Spill-Resistant 360° Sliding Lock Lid"
    },
    inTheBox: [
      "VortexFlow Smart Ceramic Mug",
      "Qi Fast Wireless Charging Coaster Base",
      "BPA-Free Spill-Proof Lid",
      "Power Adapter & 1.5m Braided Cable"
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Prateek Bansal",
        location: "Vasant Kunj, New Delhi",
        verified: true,
        rating: 5,
        date: "15 Nov 2026",
        title: "Never drinking cold coffee again!",
        comment: "I used to forget my coffee while coding and drink it cold. Now it stays at exact 55°C for hours on the coaster. Pure perfection.",
        helpful: 67
      }
    ],
    supplier: {
      name: "Ningbo ThermalWare Inc.",
      platform: "Spocket US",
      sku: "SPK-MUG-108",
      warehouse: "Delhi NCR Direct Hub"
    }
  },
  {
    id: "prod-4",
    title: "Aerolight Titanium Minimalist Key Organizer",
    tagline: "Grade-5 Titanium with Multi-Tool & Airtag Integration",
    category: "Everyday Carry",
    price: 1899,
    compareAtPrice: 2999,
    supplierCost: 699,
    shippingCost: 99,
    rating: 4.6,
    reviewsCount: 147,
    stock: 24,
    hubLocation: "Hyderabad Express Hub",
    shippingDays: "2-3 business days",
    badge: "Compact",
    viewersCount: 9,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
    ],
    variants: [
      { name: "Finish", options: ["Raw Stonewashed Titanium", "DLC Stealth Black"] },
      { name: "Keys Capacity", options: ["Up to 8 Keys", "Up to 14 Keys"] }
    ],
    description: "Eliminate pocket bulk and jingle. Aircraft-grade titanium housing holds your keys silently in place while integrating a bottle opener, pry bar, and optional AirTag locator slot.",
    features: [
      "Ultralight 26g Grade-5 Titanium construction",
      "Smooth silent friction washers",
      "Integrated bottle opener and pry-edge",
      "Pocket clip and detachable lanyard loop included"
    ],
    specs: {
      "Material": "Grade-5 Aerospace Titanium (Ti-6Al-4V)",
      "Weight": "26 grams",
      "Key Capacity": "Accommodates 2 to 14 standard flat keys",
      "Integrated Tools": "Bottle opener, pry bar, ruler edge, pocket clip",
      "Locator Compatibility": "Apple AirTag / Tile Mate slot insert"
    },
    inTheBox: [
      "Aerolight Titanium Key Holder chassis",
      "Extension Screws & 16 Silicone Washers",
      "Detachable Deep-Carry Pocket Clip",
      "AirTag Silicone Secure Capsule"
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Karthik Sundaram",
        location: "Adyar, Chennai",
        verified: true,
        rating: 5,
        date: "11 Nov 2026",
        title: "No more jingling keys in gym shorts!",
        comment: "Ultralight titanium and looks very stealthy in black. Bottle opener works effortlessly.",
        helpful: 21
      }
    ],
    supplier: {
      name: "Dongguan Precision CNC",
      platform: "CJ Dropshipping",
      sku: "CJ-EDC-0912",
      warehouse: "Hyderabad Express Line"
    }
  },
  {
    id: "prod-5",
    title: "Chronos Ultra-Slim Fitness & Sleep Tracker",
    tagline: "AMOLED Curved Display with 14-Day Battery & SpO2 Monitor",
    category: "Electronics",
    price: 3999,
    compareAtPrice: 6499,
    supplierCost: 1599,
    shippingCost: 149,
    rating: 4.7,
    reviewsCount: 289,
    stock: 14,
    hubLocation: "Chennai Port Logistics",
    shippingDays: "2-4 business days",
    badge: "Top Rated",
    viewersCount: 28,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80"
    ],
    variants: [
      { name: "Band Color", options: ["Graphite Black", "Alpine Orange", "Deep Blue"] },
      { name: "Strap Material", options: ["Fluoroelastomer Sports", "Magnetic Milanese Loop"] }
    ],
    description: "Track steps, heart rate variability, SpO2, and detailed sleep stages with continuous monitoring. 5ATM water resistance ensures swim tracking up to 50 meters.",
    features: [
      "1.47-inch curved HD AMOLED touch display",
      "24/7 Continuous heart rate & blood oxygen tracking",
      "5ATM water resistant (up to 50 meters)",
      "14 days battery life on a 45-minute charge"
    ],
    specs: {
      "Display": "1.47\" Curved AMOLED 368x194 pixels (Always-on support)",
      "Water Resistance": "5ATM (Up to 50 meters swim proof)",
      "Sensors": "Optical Heart Rate, SpO2 Blood Oxygen, 3-Axis Accelerometer",
      "Battery": "180mAh (14 Days standard / 9 Days intensive)",
      "App Compatibility": "iOS 12+ & Android 8.0+"
    },
    inTheBox: [
      "Chronos Fitness Tracker Module",
      "Anti-Bacterial Fluoroelastomer Strap",
      "Magnetic Fast Pogo-Pin USB Charger",
      "User Manual & Warranty Certificate"
    ],
    reviews: [
      {
        id: "rev-8",
        author: "Meera Radhakrishnan",
        location: "Kochi, Kerala",
        verified: true,
        rating: 5,
        date: "09 Nov 2026",
        title: "Accurate sleep tracking and gorgeous AMOLED screen",
        comment: "The screen is bright even in direct sunlight. Sleep stages match my medical Oura ring closely. Outstanding value at ₹3,999.",
        helpful: 39
      }
    ],
    supplier: {
      name: "Shenzhen SoundTech Ltd.",
      platform: "AliExpress Direct",
      sku: "ALI-FIT-7718",
      warehouse: "Chennai Port Line"
    }
  },
  {
    id: "prod-6",
    title: "HydroFlow Smart UV-C Self-Cleaning Bottle",
    tagline: "Sterilizes Water & Bottle Interior Every 2 Hours with UV-C Light",
    category: "Lifestyle",
    price: 2499,
    compareAtPrice: 3999,
    supplierCost: 999,
    shippingCost: 149,
    rating: 4.8,
    reviewsCount: 175,
    stock: 19,
    hubLocation: "Bengaluru Logistics Hub",
    shippingDays: "3-5 business days",
    badge: "Eco-Friendly",
    viewersCount: 12,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&q=80"
    ],
    variants: [
      { name: "Color", options: ["Arctic White", "Matte Black", "Ocean Teal"] },
      { name: "Size", options: ["500ml", "750ml"] }
    ],
    description: "Built-in 280nm UV-C LED in the cap destroys 99.99% of bacteria and bio-contaminants at the press of a button. Double-wall vacuum insulation keeps drinks cold for 24h or hot for 12h.",
    features: [
      "Medical-grade UV-C LED sterilization in 60 seconds",
      "18/8 food-grade stainless steel interior",
      "Rechargeable waterproof magnetic USB charging port",
      "Keep cold 24h / Keep hot 12h"
    ],
    specs: {
      "Sterilization Tech": "280nm UV-C LED deep purification (99.99% kill rate)",
      "Insulation": "Double-Wall Vacuum 304 Food-Grade Stainless Steel",
      "Battery Life": "Up to 30 Days of normal use on a single charge",
      "Thermal Retention": "Cold 24 Hours / Hot 12 Hours",
      "Charging": "Waterproof Magnetic Contact Pogo-Pin"
    },
    inTheBox: [
      "HydroFlow UV-C Smart Bottle (500ml)",
      "Magnetic Waterproof USB Charging Cable",
      "Quick Instruction Manual",
      "Food-Grade Safety Certificate"
    ],
    reviews: [
      {
        id: "rev-9",
        author: "Aditya Sen",
        location: "Salt Lake, Kolkata",
        verified: true,
        rating: 5,
        date: "13 Nov 2026",
        title: "No musty bottle smell ever again",
        comment: "Auto-cleans every 2 hours silently. Kept ice water chilled throughout my 6-hour flight journey. Beautiful matte build.",
        helpful: 27
      }
    ],
    supplier: {
      name: "Ningbo ThermalWare Inc.",
      platform: "CJ Dropshipping",
      sku: "CJ-BTL-332",
      warehouse: "Bengaluru Hub"
    }
  }
];

export const initialSourcingCatalog = [
  {
    id: "source-1",
    title: "MagCharge 3-in-1 Foldable Travel Station",
    category: "Electronics",
    supplierCost: 899,
    suggestedRetail: 2499,
    shippingCost: 149,
    supplierName: "Shenzhen QiPower Tech",
    platform: "CJ Dropshipping",
    shippingTime: "4-7 days",
    supplierRating: 4.9,
    fulfillmentRate: "99.4%",
    stockAvailable: 2400,
    minOrderQty: 1,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
    description: "Compact magnetic wireless charger station powering iPhone, Apple Watch, and AirPods simultaneously. Folds into a pocket-sized puck for travel.",
    features: ["15W MagSafe fast charging", "Qi-certified safety chip", "Foldable silicone hinge design"]
  },
  {
    id: "source-2",
    title: "ErgoRest Memory Foam Seat Cushion",
    category: "Smart Home",
    supplierCost: 599,
    suggestedRetail: 1799,
    shippingCost: 199,
    supplierName: "Hangzhou Comfort Home",
    platform: "AliExpress Direct",
    shippingTime: "5-8 days",
    supplierRating: 4.8,
    fulfillmentRate: "98.7%",
    stockAvailable: 1850,
    minOrderQty: 1,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    description: "Orthopedic contoured coccyx cushion relieving back, tailbone, and sciatica pressure for desk workers and drivers.",
    features: ["High-density thermosensitive memory foam", "Breathable mesh washable cover", "Non-slip rubberized bottom"]
  },
  {
    id: "source-3",
    title: "AuraGlow Sunset Projection Lamp",
    category: "Smart Home",
    supplierCost: 399,
    suggestedRetail: 1299,
    shippingCost: 149,
    supplierName: "Guangzhou Lumen Illumination",
    platform: "Spocket US",
    shippingTime: "3-5 days",
    supplierRating: 4.7,
    fulfillmentRate: "97.9%",
    stockAvailable: 3100,
    minOrderQty: 1,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    description: "Golden hour atmospheric lighting projector featuring 180° rotation and optical crystal lens for aesthetic room photography.",
    features: ["Solid brass rotary pivot", "Optical HD glass lens", "USB plug & play with inline switch"]
  },
  {
    id: "source-4",
    title: "PulseWave Deep Tissue Mini Massage Gun",
    category: "Lifestyle",
    supplierCost: 1299,
    suggestedRetail: 3999,
    shippingCost: 199,
    supplierName: "Shenzhen SoundTech Ltd.",
    platform: "CJ Dropshipping",
    shippingTime: "4-7 days",
    supplierRating: 4.9,
    fulfillmentRate: "99.1%",
    stockAvailable: 950,
    minOrderQty: 1,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    description: "Pocket-sized percussive therapy device delivering 3200 RPM silent muscle relief with 4 interchangeable massage heads.",
    features: ["Brushless quiet motor (<45dB)", "4 Speed levels", "Type-C 2500mAh battery"]
  },
  {
    id: "source-5",
    title: "AquaMist Ultrasonic Flame Essential Oil Diffuser",
    category: "Smart Home",
    supplierCost: 799,
    suggestedRetail: 2199,
    shippingCost: 149,
    supplierName: "Yiwu Aroma Living",
    platform: "AliExpress Direct",
    shippingTime: "4-8 days",
    supplierRating: 4.8,
    fulfillmentRate: "98.2%",
    stockAvailable: 1420,
    minOrderQty: 1,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    description: "Simulated warm fireplace flame visual effect combined with fine ultrasonic misting for aromatherapy and air moisturization.",
    features: ["Realistic LED flame light effect", "Auto shut-off when water depletes", "Ultra-quiet 20dB operation"]
  }
];

export const initialOrders = [
  {
    id: "ORD-94821",
    customer: {
      name: "Marcus Vance",
      email: "marcus.v@example.com",
      address: "B-402 Prestige Palms, Indiranagar, Bengaluru, KA, 560038, India"
    },
    items: [
      {
        id: "prod-1",
        title: "Aura SoundPulse Pro ANC Headphones",
        variant: "Matte Black",
        quantity: 1,
        retailPrice: 4999,
        supplierCost: 1999,
        supplierSku: "CJ-AUDIO-9921",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
      }
    ],
    totalAmount: 4999,
    totalCost: 1999,
    grossProfit: 3000,
    status: "Pending Sourcing",
    shippingCarrier: "BlueDart Express",
    trackingNumber: null,
    placedAt: "2026-11-16T09:24:00Z",
    supplierPlatform: "CJ Dropshipping",
    autoFulfillEligible: true,
    trackingSteps: [
      { stage: "Order Placed", completed: true, timestamp: "Nov 16, 09:24 AM", desc: "Customer order confirmed and UPI/Card payment authorized." },
      { stage: "Supplier Sourced", completed: false, timestamp: "Pending", desc: "Awaiting automatic PO dispatch to CJ Dropshipping warehouse." },
      { stage: "Carrier Dispatched", completed: false, timestamp: "Pending", desc: "Line-haul transit manifest assigned." },
      { stage: "In Transit", completed: false, timestamp: "Pending", desc: "Regional hub sorting & clearance." },
      { stage: "Delivered", completed: false, timestamp: "Pending", desc: "Package out for delivery to recipient address." }
    ]
  },
  {
    id: "ORD-94819",
    customer: {
      name: "Sophia Martinez",
      email: "sophia.m@example.com",
      address: "12-A Silver Beach Estate, Juhu, Mumbai, MH, 400049, India"
    },
    items: [
      {
        id: "prod-3",
        title: "VortexFlow Ceramic Smart Heating Mug",
        variant: "Ceramic White",
        quantity: 1,
        retailPrice: 3499,
        supplierCost: 1499,
        supplierSku: "SPK-MUG-108",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"
      }
    ],
    totalAmount: 3499,
    totalCost: 1499,
    grossProfit: 2000,
    status: "In Transit",
    shippingCarrier: "Delhivery Air Express",
    trackingNumber: "DLV994821039IN",
    placedAt: "2026-11-15T14:10:00Z",
    supplierPlatform: "Spocket US",
    autoFulfillEligible: false,
    trackingSteps: [
      { stage: "Order Placed", completed: true, timestamp: "Nov 15, 02:10 PM", desc: "Order confirmed." },
      { stage: "Supplier Sourced", completed: true, timestamp: "Nov 15, 03:45 PM", desc: "Domestic Warehouse prepared package." },
      { stage: "Carrier Dispatched", completed: true, timestamp: "Nov 15, 06:12 PM", desc: "Scanned at Mumbai Central Hub." },
      { stage: "In Transit", completed: true, timestamp: "Nov 16, 08:30 AM", desc: "Departed regional sorting facility. On schedule." },
      { stage: "Delivered", completed: false, timestamp: "Expected Nov 18", desc: "Estimated delivery by 5:00 PM." }
    ]
  },
  {
    id: "ORD-94815",
    customer: {
      name: "David Chen",
      email: "david.c@example.com",
      address: "Flat 502, DLF Phase 5, Gurugram, HR, 122002, India"
    },
    items: [
      {
        id: "prod-2",
        title: "Lumino Horizon Ambient RGB Lightbar",
        variant: "Desk Stand",
        quantity: 2,
        retailPrice: 5598,
        supplierCost: 2198,
        supplierSku: "ALI-RGB-4029",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
      }
    ],
    totalAmount: 5598,
    totalCost: 2198,
    grossProfit: 3400,
    status: "Delivered",
    shippingCarrier: "BlueDart Express",
    trackingNumber: "BLU882910482IN",
    placedAt: "2026-11-11T11:05:00Z",
    supplierPlatform: "AliExpress Direct",
    autoFulfillEligible: false,
    trackingSteps: [
      { stage: "Order Placed", completed: true, timestamp: "Nov 11, 11:05 AM", desc: "Order confirmed." },
      { stage: "Supplier Sourced", completed: true, timestamp: "Nov 11, 01:20 PM", desc: "Supplier fulfilled PO." },
      { stage: "Carrier Dispatched", completed: true, timestamp: "Nov 12, 09:15 AM", desc: "Air cargo flight landed at IGI Airport." },
      { stage: "In Transit", completed: true, timestamp: "Nov 13, 04:30 PM", desc: "Customs cleared, handoff to local courier." },
      { stage: "Delivered", completed: true, timestamp: "Nov 15, 01:45 PM", desc: "Delivered to security desk / doorstep." }
    ]
  }
];

export const initialSuppliers = [
  {
    id: "sup-1",
    name: "CJ Dropshipping Global",
    platform: "CJ Dropshipping",
    location: "Shenzhen, Yiwu & Bengaluru Hub",
    rating: 4.9,
    ordersProcessed: 4892,
    avgFulfillmentHours: 18,
    disputeRate: "0.8%",
    status: "Connected & Verified",
    balance: "₹1,85,000",
    specialty: "Consumer Electronics, Gadgets & Fast Tracked Freight"
  },
  {
    id: "sup-2",
    name: "Spocket Direct",
    platform: "Spocket",
    location: "Mumbai & Delhi Warehouses",
    rating: 4.95,
    ordersProcessed: 1230,
    avgFulfillmentHours: 8,
    disputeRate: "0.3%",
    status: "Connected & Verified",
    balance: "₹1,40,500",
    specialty: "High-Margin Fast Shipping (2-4 days delivery)"
  },
  {
    id: "sup-3",
    name: "AliExpress Premier Direct",
    platform: "AliExpress",
    location: "Hangzhou Direct Import Line",
    rating: 4.7,
    ordersProcessed: 7810,
    avgFulfillmentHours: 36,
    disputeRate: "1.4%",
    status: "Connected",
    balance: "₹72,000",
    specialty: "Deep Wholesale Pricing & Vast Global Catalog"
  }
];
