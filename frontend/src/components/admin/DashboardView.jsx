import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Package,
  ArrowRight,
  AlertCircle,
  Truck,
  Sparkles
} from 'lucide-react';

export default function DashboardView() {
  const { metrics, storefrontProducts, setAdminTab } = useApp();

  const netMarginPercent = metrics.grossRevenue > 0
    ? ((metrics.netProfit / metrics.grossRevenue) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome & Quick Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight">
            Operations Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time feed of supplier stock, order fulfillment SLAs, and net revenues
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminTab('sourcing')}
            className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Source Trending Products</span>
          </button>
        </div>
      </div>

      {/* Urgent Fulfillment Alert Banner */}
      {metrics.pendingFulfillmentCount > 0 && (
        <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold">
                {metrics.pendingFulfillmentCount} Order{metrics.pendingFulfillmentCount > 1 ? 's' : ''} Awaiting Purchase Order Dispatch
              </h4>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Customer purchases placed on Storefront ready for automated vendor PO dispatch.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAdminTab('orders')}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 transition shadow-2xs self-start sm:self-auto"
          >
            <span>Fulfill Queue</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* KPI Cards Grid (Linear/Stripe style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross GMV</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-950 font-mono">₹{metrics.grossRevenue.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              From {metrics.ordersCount} total orders
            </span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Realized Profit</span>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              {netMarginPercent}% Margin
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-emerald-600 font-mono">₹{metrics.netProfit.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              Net margin after supplier COGS
            </span>
          </div>
        </div>

        {/* COGS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Supplier COGS</span>
            <Package className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800 font-mono">₹{metrics.totalCost.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              Prepaid vendor wallet: <strong className="text-slate-800">₹3,97,500</strong>
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fulfillment Status</span>
            <Truck className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-950 font-mono">{metrics.ordersCount}</h3>
            <div className="flex items-center gap-2 mt-1 text-[11px]">
              <span className="text-amber-600 font-bold">{metrics.pendingFulfillmentCount} pending</span>
              <span>•</span>
              <span className="text-blue-600 font-bold">{metrics.inTransitCount} in transit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Margin Visualizer Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center justify-between">
          <span>Profit vs Supplier Cost Distribution</span>
          <span className="text-[11px] text-slate-500 font-normal">Based on processed order volume</span>
        </h3>

        <div className="space-y-2">
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${Math.max(15, parseFloat(netMarginPercent))}%` }}
              title={`Net Profit: ${netMarginPercent}%`}
            />
            <div
              className="bg-slate-300 h-full transition-all duration-500"
              style={{ width: `${100 - Math.max(15, parseFloat(netMarginPercent))}%` }}
              title="Supplier COGS & Freight"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600">Net Profit: <strong className="text-slate-900">₹{metrics.netProfit.toLocaleString('en-IN')} ({netMarginPercent}%)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="text-slate-600">Wholesale Cost: <strong className="text-slate-900">₹{metrics.totalCost.toLocaleString('en-IN')}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Sourced Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Catalog Margins</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Wholesale supplier costs vs live selling price</p>
          </div>
          <button
            onClick={() => setAdminTab('sourcing')}
            className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1"
          >
            <span>Import Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 text-[11px]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Vendor Partner</th>
                <th className="py-3 px-4">Wholesale Cost</th>
                <th className="py-3 px-4">Storefront Price</th>
                <th className="py-3 px-4">Unit Margin</th>
                <th className="py-3 px-4 text-right">In-Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {storefrontProducts.map((p) => {
                const margin = p.price - (p.supplierCost || p.price * 0.4);
                const marginPct = ((margin / p.price) * 100).toFixed(0);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                          alt=""
                          className="w-9 h-9 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 line-clamp-1">{p.title}</p>
                          <span className="text-[10px] text-slate-400">{p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{p.supplier?.name || 'CJ Dropshipping'}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{p.supplier?.platform || 'Direct Vendor'}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-600">
                      ₹{(p.supplierCost || p.price * 0.4).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-emerald-600">+₹{margin.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-slate-400 ml-1 font-semibold">({marginPct}%)</span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      <span className={p.stock < 20 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
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
