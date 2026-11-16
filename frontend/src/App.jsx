import React from 'react';
import { useApp } from './context/AppContext';

// Common Components
import TopNavRoleSwitcher from './components/common/TopNavRoleSwitcher';
import Toast from './components/common/Toast';

// Storefront Components
import StoreNavbar from './components/storefront/StoreNavbar';
import StoreHomeView from './components/storefront/StoreHomeView';
import StoreCatalogView from './components/storefront/StoreCatalogView';
import OrderTrackingView from './components/storefront/OrderTrackingView';
import ProductDetailModal from './components/storefront/ProductDetailModal';
import CartDrawer from './components/storefront/CartDrawer';
import CheckoutModal from './components/storefront/CheckoutModal';

// Admin Components
import AdminSidebar from './components/admin/AdminSidebar';
import DashboardView from './components/admin/DashboardView';
import SourcingView from './components/admin/SourcingView';
import OrdersFulfillmentView from './components/admin/OrdersFulfillmentView';
import SuppliersView from './components/admin/SuppliersView';
import ProfitCalculatorView from './components/admin/ProfitCalculatorView';
import SettingsView from './components/admin/SettingsView';

import { ShieldCheck, Zap, Heart } from 'lucide-react';

export default function App() {
  const { activeView, adminTab, storeTab, setStoreTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Top Demo & Role Switcher Banner */}
      <TopNavRoleSwitcher />

      {/* Toast Notification Container */}
      <Toast />

      {/* Render Active View */}
      {activeView === 'store' ? (
        /* CUSTOMER STOREFRONT LAYOUT */
        <div className="flex-1 flex flex-col">
          <StoreNavbar />

          <main className="flex-1">
            {storeTab === 'home' && <StoreHomeView />}
            {storeTab === 'catalog' && <StoreCatalogView />}
            {storeTab === 'track' && <OrderTrackingView />}
          </main>

          {/* Storefront Footer */}
          <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Zap className="w-4 h-4 fill-white" />
                    </div>
                    <span className="font-black text-lg text-white">AuraStore</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-xs">
                    Next-generation direct dropshipping marketplace. We source cutting-edge lifestyle and tech gear directly from verified manufacturing partners.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Direct Shopping</h4>
                  <ul className="space-y-2">
                    <li>
                      <button onClick={() => setStoreTab('catalog')} className="hover:text-white transition">
                        Trending Tech & Audio
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setStoreTab('catalog')} className="hover:text-white transition">
                        Smart Home Ambience
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setStoreTab('catalog')} className="hover:text-white transition">
                        Minimalist EDC Gear
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Customer Protection</h4>
                  <ul className="space-y-2">
                    <li>
                      <button onClick={() => setStoreTab('track')} className="hover:text-white transition">
                        Real-Time Parcel Tracking
                      </button>
                    </li>
                    <li className="text-slate-400">30-Day Money-Back Guarantee</li>
                    <li className="text-slate-400">Air Freight Delivery Policy</li>
                    <li className="text-slate-400">Verified Factory Audit SLA</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Trust Badges</h4>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>256-Bit SSL Encrypted</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      All orders are backed by on-time delivery guarantees and round-the-clock freight concierge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
                <p>© 2026 AuraStore & DropshipOS. All rights reserved.</p>
                <p className="flex items-center gap-1">
                  Built with React JSX & Tailwind CSS
                </p>
              </div>
            </div>
          </footer>

          {/* Modals & Slide-Overs */}
          <ProductDetailModal />
          <CartDrawer />
          <CheckoutModal />
        </div>
      ) : (
        /* DROPSHIPPING MERCHANT MANAGEMENT ADMIN LAYOUT */
        <div className="flex-1 flex min-h-[calc(100vh-2.5rem)]">
          <AdminSidebar />

          <main className="flex-1 bg-slate-50/70 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {adminTab === 'dashboard' && <DashboardView />}
              {adminTab === 'sourcing' && <SourcingView />}
              {adminTab === 'orders' && <OrdersFulfillmentView />}
              {adminTab === 'suppliers' && <SuppliersView />}
              {adminTab === 'calculator' && <ProfitCalculatorView />}
              {adminTab === 'settings' && <SettingsView />}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

