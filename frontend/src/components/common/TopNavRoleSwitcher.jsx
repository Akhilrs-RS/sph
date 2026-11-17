import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, LayoutDashboard, ArrowRight } from 'lucide-react';

export default function TopNavRoleSwitcher() {
  const { activeView, setActiveView, cartItemsCount, metrics, setAdminTab, setStoreTab } = useApp();

  return (
    <aside aria-label="Role Switcher" className="bg-slate-950/95 text-white text-xs border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        {/* Left: Live Sync Status */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-300 tracking-wide text-[11px] uppercase">
            Aura Ecosystem
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            {activeView === 'store' ? 'Customer Storefront Mode' : 'Merchant Dropship OS'}
          </span>
          {metrics.pendingFulfillmentCount > 0 && activeView === 'store' && (
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/70 border border-amber-800/80 px-2 py-0.5 rounded-full font-medium">
              {metrics.pendingFulfillmentCount} pending order{metrics.pendingFulfillmentCount > 1 ? 's' : ''} in fulfillment queue
            </span>
          )}
        </div>

        {/* Center / Right: Elegant Segmented Pill Control */}
        <div className="flex items-center gap-2">
          {activeView === 'admin' && (
            <div className="hidden md:flex items-center gap-2.5 text-slate-300 mr-2 text-[11px]">
              <span className="text-slate-400">GMV:</span>
              <span className="text-emerald-400 font-bold font-mono">₹{metrics.grossRevenue.toLocaleString('en-IN')}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Net:</span>
              <span className="text-blue-400 font-bold font-mono">₹{metrics.netProfit.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="bg-slate-900 p-0.5 rounded-full border border-slate-800 flex items-center">
            <button
              onClick={() => {
                setActiveView('store');
                setStoreTab('home');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                activeView === 'store'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Storefront</span>
              {cartItemsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveView('admin');
                setAdminTab('dashboard');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                activeView === 'admin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Dropship OS</span>
              {metrics.pendingFulfillmentCount > 0 && activeView !== 'admin' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
