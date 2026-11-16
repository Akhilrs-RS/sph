# AuraStore & DropshipOS: E-Commerce & Dropshipping Management Platform

A modern, dual-portal web platform combining a high-conversion **Customer Storefront (B2C)** and an operational **Dropshipping Merchant Operating System (Admin)**, built with **React (.jsx)** and **Tailwind CSS**.

---

## 🌟 Key Features

### 🛍️ 1. Customer-Facing Storefront (B2C)
- **Hero & Promotional Showcase**: Direct factory sourcing headlines, flash sale countdown, trust badges.
- **Curated Dropship Catalog**: Filter by category (*Electronics*, *Smart Home*, *Lifestyle*, *Everyday Carry*), sort by price, rating, or popularity.
- **Product Detail Modal (PDP)**:
  - Multi-image gallery with thumbnail switcher.
  - Variant selectors (Color, Edition, Specs) with real-time price updates.
  - Estimated delivery date calculator (Tracked Air Freight).
  - Supplier transparency and verified customer reviews.
- **Shopping Cart Drawer**:
  - Free Express Shipping progress meter ($75 threshold).
  - Promo voucher support (`DROPSHIP15` for 15% off).
  - Line-item quantity adjuster and real-time subtotal.
- **Multi-Step Simulated Checkout**:
  - Step 1: Customer contact and shipping address.
  - Step 2: Shipping method (Standard ePacket vs Priority Air Freight).
  - Step 3: Simulated secure payment gateway.
  - Step 4: Instant Order Confirmation with generated Tracking ID & direct link to track.
- **Live Parcel Tracking Concierge**:
  - Search by Order ID (`ORD-XXXXX`) or carrier waybill.
  - Visual 5-stage line-haul milestone tracker (*Order Confirmed &rarr; Supplier Sourced &rarr; Carrier Dispatched &rarr; In Transit &rarr; Delivered*).

---

### ⚡ 2. Dropshipping Merchant Management Portal (Admin)
- **Executive Analytics Dashboard**:
  - GMV (Gross Merchandise Value), COGS, Net Realized Profit, Net Margin %, and Total Orders.
  - Urgent pending PO dispatch alerts.
  - Profit margin vs wholesale cost breakdown.
- **1-Click Product Sourcing Marketplace**:
  - Sourcing feed from CJ Dropshipping, AliExpress Direct, and Spocket US.
  - Wholesale unit costs, shipping freight fees, supplier ratings, and fulfillment SLAs.
  - **Automated Markup Pricing Engine**: Adjust the multiplier slider (e.g., 2.4x) and click **"Publish to Storefront"** to dynamically add the item to the live store.
- **Orders & Auto-Fulfillment Hub**:
  - Real-time sync with customer storefront checkouts.
  - **"Auto-Fulfill with Supplier"** action: Automatically charges the prepaid vendor wallet, assigns an airway bill tracking number, advances the order status to *In Transit*, and notifies the customer tracking view!
- **Supplier Directory & Wallet**:
  - Supplier scorecards (ratings, avg dispatch hours, dispute rate).
  - Prepaid fulfillment balance with top-up simulation.
- **Interactive Unit Economics & Profit Simulator**:
  - Input wholesale cost, freight, retail price, ad CAC, and gateway fees.
  - Live calculation of Net Profit per unit, Margin %, Break-Even RoAS, and monthly projections.
- **Automation & Store Settings**:
  - Global default markup rules, express shipping rates, low-stock alerts.

---

### 🔄 3. Interactive Cross-Portal Integration
- **Top Navigation Switcher Bar**: Switch instantly between *Customer View* and *Merchant View* at any time.
- **Storefront &rarr; Admin Sync**: When a customer places an order, it immediately appears in the Admin Orders pipeline with status `Pending Sourcing`.
- **Admin &rarr; Storefront Sync**: When the merchant clicks "Auto-Fulfill" in Admin, the status updates to `In Transit` with a real tracking number that appears instantly on the Customer Parcel Tracking page!
- **Sourcing &rarr; Storefront Sync**: Importing wholesale items from the Sourcing Hub immediately publishes them to the live shopping catalog!

---

## 🚀 Quick Start

### 1. Start Development Server
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
cd frontend
npm run build
```

### 3. Preview Production Build
```bash
cd frontend
npm run preview
```

---

## 📁 Directory Structure

```text
frontend/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── context/
    │   └── AppContext.jsx               # Unified Cart, Orders, Sourcing & Role State
    ├── data/
    │   └── initialData.js               # Mock catalog, suppliers, and orders
    └── components/
        ├── common/
        │   ├── Toast.jsx                # Toast notification popup
        │   └── TopNavRoleSwitcher.jsx   # Header switcher between Customer & Admin
        ├── storefront/
        │   ├── CartDrawer.jsx           # Slide-over cart with free shipping meter
        │   ├── CheckoutModal.jsx        # Multi-step checkout & order generator
        │   ├── HeroBanner.jsx           # High-impact hero section
        │   ├── OrderTrackingView.jsx    # Real-time parcel transit timeline
        │   ├── ProductCard.jsx          # Catalog product card with quick-view
        │   ├── ProductDetailModal.jsx   # Rich PDP with variants & delivery calculator
        │   ├── StoreCatalogView.jsx     # Filterable product grid
        │   ├── StoreHomeView.jsx        # Storefront homepage layout
        │   ├── StoreNavbar.jsx          # Header with search & cart counter
        │   └── TrustBadges.jsx          # Dropship buyer protection guarantees
        └── admin/
            ├── AdminSidebar.jsx         # Operations navigation menu
            ├── DashboardView.jsx        # Executive KPIs & revenue charts
            ├── OrdersFulfillmentView.jsx# Order queue with 1-click Auto-Fulfill
            ├── ProfitCalculatorView.jsx # Unit economics & break-even RoAS simulator
            ├── SettingsView.jsx         # Markup formulas & automation rules
            ├── SourcingView.jsx         # 1-Click Wholesale import marketplace
            └── SuppliersView.jsx        # Vendor scorecards & fulfillment SLAs
```

