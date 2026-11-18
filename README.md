# AuraStore & DropshipOS (Full-Stack E-Commerce & Dropshipping Platform)

A full-stack, enterprise-grade e-commerce storefront and dropshipping merchant operating system built with:
- **Frontend**: React (.jsx), Vite, Tailwind CSS (Apple / Linear minimalist design, Indian UPI checkout, pincode validator, verified reviews).
- **Backend**: .NET 8 (ASP.NET Core Web API), Entity Framework Core (`Pomelo.EntityFrameworkCore.MySql`), and Swagger OpenAPI.
- **Database**: MySQL 8.0+ relational schema (`sph_ecommerce`).

---

## Project Structure

```
shp/
├── backend/                       # .NET 8 ASP.NET Core Web API
│   ├── Controllers/               # Products, Orders, Sourcing, Pincode, Admin
│   ├── Data/                      # AppDbContext, DbInitializer (Seeds products & pincodes)
│   ├── Migrations/                # EF Core MySQL Migrations
│   ├── Models/
│   │   ├── Entities/              # Product, Order, Supplier, Review, Pincode, Settings
│   │   └── DTOs/                  # Request / Response Transfer Objects
│   ├── Services/                  # Fulfillment, Sourcing, Pincode Services
│   ├── Program.cs                 # App entry point, CORS, DI, EF Core configuration
│   └── appsettings.json           # MySQL connection string
├── frontend/                      # React + Vite + Tailwind CSS Storefront & Dropship OS
│   ├── src/
│   │   ├── components/            # Storefront & Dropship Admin views & modals
│   │   ├── context/               # Global state with background API sync & offline fallback
│   │   ├── services/api.js        # Client API for connecting to .NET backend
│   │   └── data/initialData.js    # Initial catalog & seed data
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Getting Started

### 1. Database Setup (MySQL)

You can run MySQL either via Docker or your local Homebrew service:

**Option A: Docker (Recommended)**
```bash
docker run --name mysql-sph -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=sph_ecommerce -p 3306:3306 -d mysql:8.0
```

**Option B: Local Homebrew Service**
```bash
brew services start mysql
# or
mysql.server start
```

*Note: Ensure your database credentials match `backend/appsettings.json` (defaults to `Server=localhost;Port=3306;Database=sph_ecommerce;User=root;Password=root;`).*

---

### 2. Run the .NET Backend API

```bash
cd backend
dotnet run
```

- **API Base URL**: `http://localhost:5000` (or `https://localhost:5001`)
- **Interactive Swagger UI**: `http://localhost:5000/swagger`
- The backend automatically checks and creates tables and seeds initial products, reviews, Indian pincodes, and suppliers on startup!

---

### 3. Run the React Frontend

```bash
cd frontend
npm install
npm run dev
```

- Open `http://localhost:5173` in your browser.
- The frontend connects automatically to the .NET backend API (`http://localhost:5000/api`). If the backend is starting up or offline, the frontend seamlessly uses its local offline state.

---

## API Highlights

- **Storefront**:
  - `GET /api/products` — Catalog with category filters, sorting, and search
  - `GET /api/products/{id}` — Full PDP with image gallery, specs, variants, and reviews
  - `GET /api/products/autocomplete?q=...` — Live search autocomplete
  - `GET /api/pincode/{code}` — 6-digit Indian PIN delivery check (Bengaluru, Mumbai, Delhi NCR, etc.)
  - `POST /api/products/{id}/reviews` — Submit verified customer review
  - `POST /api/orders` — Place order with UPI QR discount, Card, or COD handling
  - `GET /api/orders/track/{lookupId}` — Live parcel tracking timeline
- **Dropship Admin OS**:
  - `GET /api/admin/metrics` — Live revenue, net profit, orders, and fulfillment counters
  - `GET /api/admin/orders` — Filter orders by status (`Pending Sourcing`, `In Transit`, `Delivered`)
  - `POST /api/admin/orders/{id}/fulfill` — 1-Click Auto-Fulfill with BlueDart/Delhivery AWB generation
  - `GET /api/admin/sourcing` — Browse CJ / AliExpress / Spocket sourcing catalog
  - `POST /api/admin/sourcing/import` — 1-Click import from supplier into live store catalog
  - `POST /api/admin/sourcing/extract-url` — Instant URL/SKU dropship markup calculator
