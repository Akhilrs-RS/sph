import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  PackageSearch,
  Truck,
  Building2,
  Calculator,
  Settings,
  ShoppingBag,
  Zap,
  ArrowLeft
} from 'lucide-react';

export default function AdminSidebar() {
  const {
    adminTab,
    setAdminTab,
    metrics,
    setActiveView,
    sourcingCatalog
  } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Executive Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'sourcing',
      label: 'Product Sourcing Hub',
      icon: PackageSearch,
      badge: sourcingCatalog.length > 0 ? `${sourcingCatalog.length} new` : null,
      badgeColor: 'bg-blue-500 text-white'
    },
    {
      id: 'orders',
      label: 'Orders & Fulfillment',
      icon: Truck,
      badge: metrics.pendingFulfillmentCount > 0 ? `${metrics.pendingFulfillmentCount} pending` : null,
      badgeColor: 'bg-amber-500 text-slate-950 font-black'
    },
    {
      id: 'suppliers',
      label: 'Supplier Directory',
      icon: Building2,
      badge: '3 active'
    },
    {
      id: 'calculator',
      label: 'Profit Margin Simulator',
      icon: Calculator,
      badge: null
    },
    {
      id: 'settings',
      label: 'Automation Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 min-h-[calc(100vh-2rem)] flex-shrink-0">
      <div>
        {/* Brand & Workspace Info */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-wide">DropshipOS</h2>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                Merchant Operations
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Switch Back to Store */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 mb-3 text-xs">
          <p className="text-[11px] text-slate-400">Storefront Status:</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-white font-bold text-xs">AuraStore Live</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveView('store')}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Customer Store</span>
        </button>
      </div>
    </aside>
  );
}

