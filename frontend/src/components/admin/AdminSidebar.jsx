import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  PackageSearch,
  Truck,
  Building2,
  Calculator,
  Settings,
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
      label: 'Executive Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'sourcing',
      label: 'Sourcing Hub',
      icon: PackageSearch,
      badge: sourcingCatalog.length > 0 ? `${sourcingCatalog.length} new` : null,
      badgeColor: 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
    },
    {
      id: 'orders',
      label: 'Fulfillment Queue',
      icon: Truck,
      badge: metrics.pendingFulfillmentCount > 0 ? `${metrics.pendingFulfillmentCount} pending` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
    },
    {
      id: 'suppliers',
      label: 'Suppliers SLA',
      icon: Building2,
      badge: '3 connected'
    },
    {
      id: 'calculator',
      label: 'Margin Simulator',
      icon: Calculator,
      badge: null
    },
    {
      id: 'settings',
      label: 'Automation Rules',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-800/80 min-h-[calc(100vh-2rem)] flex-shrink-0">
      <div>
        {/* Brand & Workspace Info */}
        <div className="p-5 border-b border-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <div>
              <h2 className="text-xs font-black text-white tracking-wider uppercase">DropshipOS</h2>
              <span className="text-[10px] text-slate-500 font-medium block">
                Merchant Center
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
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? 'bg-slate-850 text-white font-semibold shadow-2xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.badgeColor || 'bg-slate-900 text-slate-400'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Switch Back to Store */}
      <div className="p-4 border-t border-slate-850">
        <button
          onClick={() => setActiveView('store')}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-white text-xs font-semibold py-2.5 px-3 rounded-full border border-slate-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
          <span>Exit to Storefront</span>
        </button>
      </div>
    </aside>
  );
}
