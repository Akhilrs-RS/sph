import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  TrendingUp,
  Package,
  Clock,
  ArrowRight,
  AlertCircle,
  Truck,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function DashboardView() {
  const { metrics, orders, storefrontProducts, setAdminTab } = useApp();

  const netMarginPercent = metrics.grossRevenue > 0
    ? ((metrics.netProfit / metrics.grossRevenue) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome & Quick Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Dropshipping Operations Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time synchronization across supplier inventory, customer checkouts, and parcel tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminTab('sourcing')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Source Trending Products</span>
          </button>
        </div>
      </div>

      {/* Urgent Fulfillment Alert Banner */}
      {metrics.pendingFulfillmentCount > 0 && (
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-950">
                {metrics.pendingFulfillmentCount} Order{metrics.pendingFulfillmentCount > 1 ? 's' : ''} Awaiting Supplier Purchase Order (PO)
              </h4>
              <p className="text-[11px] text-amber-700 mt-0.5">
                New customer orders placed on AuraStore. Click below to automatically dispatch PO to CJ Dropshipping / Spocket.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAdminTab('orders')}
            className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
          >
            <span>Fulfill Orders Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Merchandise Value (GMV)</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-900">₹{metrics.grossRevenue.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.4% vs last week
            </span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Realized Profit</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-emerald-600">₹{metrics.netProfit.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] text-slate-500 font-semibold block mt-1">
              Net Margin: <strong className="text-emerald-700">{netMarginPercent}%</strong>
            </span>
          </div>
        </div>

        {/* COGS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supplier COGS</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800">₹{metrics.totalCost.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] text-slate-500 font-semibold block mt-1">
              Prepaid vendor balance: <strong className="text-blue-600">₹3,97,500</strong>
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Orders Processed</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-900">{metrics.ordersCount}</h3>
            <div className="flex items-center gap-2 mt-1 text-[11px]">
              <span className="text-amber-600 font-bold">{metrics.pendingFulfillmentCount} pending</span>
              <span>•</span>
              <span className="text-blue-600 font-bold">{metrics.inTransitCount} in transit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Split Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
          <span>Profit & Cost Margin Breakdown</span>
          <span className="text-xs text-slate-500 font-normal">Based on processed order volume</span>
        </h3>

        <div className="space-y-2">
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${Math.max(15, parseFloat(netMarginPercent))}%` }}
              title={`Net Profit: ${netMarginPercent}%`}
            />
            <div
              className="bg-slate-400 h-full transition-all duration-500"
              style={{ width: `${100 - Math.max(15, parseFloat(netMarginPercent))}%` }}
              title="Supplier COGS & Freight"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600">Net Profit: <strong className="text-slate-900">₹{metrics.netProfit.toLocaleString('en-IN')} ({netMarginPercent}%)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400"></span>
              <span className="text-slate-600">Wholesale Supplier Cost: <strong className="text-slate-900">₹{metrics.totalCost.toLocaleString('en-IN')}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Sourced Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active Storefront Catalog & Margins</h3>
            <p className="text-xs text-slate-500">Wholesale vendor costs vs retail selling price</p>
          </div>
          <button
            onClick={() => setAdminTab('sourcing')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Import More Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Supplier & Platform</th>
                <th className="py-3 px-4">Wholesale Cost</th>
                <th className="py-3 px-4">Retail Price</th>
                <th className="py-3 px-4">Gross Margin</th>
                <th className="py-3 px-4 text-right">In-Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {storefrontProducts.map((p) => {
                const margin = p.price - (p.supplierCost || p.price * 0.35);
                const marginPct = ((margin / p.price) * 100).toFixed(0);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                          alt=""
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                          <span className="text-[10px] text-slate-500">{p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{p.supplier?.name || 'CJ Dropshipping'}</p>
                      <span className="text-[10px] text-blue-600 font-mono">{p.supplier?.platform || 'Direct Vendor'}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-600">
                      ₹{(p.supplierCost || p.price * 0.4).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-emerald-600">+₹{margin.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-slate-500 ml-1 font-semibold">({marginPct}%)</span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold">
                      <span className={p.stock < 20 ? 'text-rose-600' : 'text-slate-800'}>
                        {p.stock} units
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

