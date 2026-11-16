import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, LayoutDashboard, Sparkles, ArrowRight, Truck, AlertCircle } from 'lucide-react';

export default function TopNavRoleSwitcher() {
  const { activeView, setActiveView, cartItemsCount, metrics, setAdminTab, setStoreTab } = useApp();

  return (
    <aside aria-label="Demo role switcher" className="bg-slate-900 text-white text-xs border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode Explanation & Status */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-300">
            Current Portal:
          </span>
          <span className="font-semibold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
            {activeView === 'store' ? '🛍️ Customer Storefront (B2C)' : '⚡ Dropship Merchant OS (Admin)'}
          </span>
          {activeView === 'store' && metrics.pendingFulfillmentCount > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">
              <AlertCircle className="w-3 h-3" />
              {metrics.pendingFulfillmentCount} pending order{metrics.pendingFulfillmentCount > 1 ? 's' : ''} in dropship queue
            </span>
          )}
        </div>

        {/* Right: Quick Switcher Button & Stats */}
        <div className="flex items-center gap-3">
          {activeView === 'store' ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-slate-400">
                Want to manage suppliers, markup & auto-fulfillment?
              </span>
              <button
                onClick={() => {
                  setActiveView('admin');
                  setAdminTab('dashboard');
                }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3 py-1 rounded-md font-medium transition shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Switch to Dropship Admin</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-3 text-slate-300 mr-2 border-r border-slate-700 pr-3">
                <span>Revenue: <strong className="text-emerald-400 font-semibold">${metrics.grossRevenue.toFixed(2)}</strong></span>
                <span>Margin: <strong className="text-blue-400 font-semibold">{metrics.grossRevenue ? ((metrics.netProfit / metrics.grossRevenue) * 100).toFixed(1) : 0}%</strong></span>
              </div>
              <button
                onClick={() => {
                  setActiveView('store');
                  setStoreTab('home');
                }}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3 py-1 rounded-md font-medium transition"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                <span>Switch to Customer Storefront</span>
                {cartItemsCount > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

