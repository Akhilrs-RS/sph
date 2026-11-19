import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { api } from './services/api';

// Common Components
import TopNavRoleSwitcher from './components/common/TopNavRoleSwitcher';
import Toast from './components/common/Toast';
import WishlistDrawer from './components/common/WishlistDrawer';

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

import { ShieldCheck, Zap, Heart, Sparkles, CheckCircle2, ArrowRight, Lock, CreditCard, Send, Check } from 'lucide-react';

export default function App() {
  const { activeView, adminTab, storeTab, setStoreTab, setSelectedCategory, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    const emailToSave = newsletterEmail;
    setSubscribed(true);
    showToast('VIP Subscription Confirmed! Use code AURA500 for ₹500 off your first direct order.', 'success');
    setNewsletterEmail('');

    // Persist subscriber lead to ASP.NET Core & MySQL Backend in background
    api.subscribeNewsletter(emailToSave).catch(() => {});

    setTimeout(() => setSubscribed(false), 4000);
  };

  const paymentBadges = [
    'BHIM UPI', 'Google Pay', 'PhonePe', 'Paytm', 'CRED', 'RuPay', 'Visa', 'Mastercard', 'Cash on Delivery'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] font-sans text-slate-900 selection:bg-slate-950 selection:text-white">
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

          {/* Premium Obsidian Jet-Black Storefront Footer */}
          <footer className="bg-black text-neutral-400 text-xs pt-16 pb-12 border-t border-neutral-900 mt-16 transition">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* VIP Early-Access Newsletter Subscription Bar */}
              <div className="pb-12 mb-12 border-b border-neutral-900">
                <div className="bg-neutral-950 rounded-3xl p-6 sm:p-8 border border-neutral-800/90 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
                  <div className="space-y-1.5 text-center lg:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      <span>VIP Hardware Dispatch</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Unlock Factory Secret Drops & Early Coupon Codes
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-lg">
                      Join 15,000+ creators and engineers. Receive ₹500 off your first direct-from-source order.
                    </p>
                  </div>

                  <form onSubmit={handleNewsletterSubmit} className="flex w-full sm:w-auto gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-500 text-xs px-4 py-2.5 rounded-full focus:outline-none focus:border-blue-500 w-full sm:w-72 shadow-inner"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold transition shrink-0 flex items-center gap-1.5 shadow-sm"
                    >
                      {subscribed ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Subscribed!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Join VIP List</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* 4-Column Structured Directory */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-900">
                {/* Column 1: Brand & Direct Mission */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
                      <Zap className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <span className="font-black text-lg text-white tracking-tight">
                      AURA<span className="text-blue-500">.</span>
                    </span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed text-xs">
                    Next-generation direct-from-source e-commerce. Connecting tech enthusiasts with factory manufacturing hubs via line-haul express air freight.
                  </p>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>All Line-Haul Hubs Operational</span>
                  </div>
                </div>

                {/* Column 2: Curated Collections */}
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">
                    Curated Collections
                  </h4>
                  <ul className="space-y-2.5 text-neutral-400">
                    <li>
                      <button 
                        onClick={() => { setSelectedCategory('Electronics'); setStoreTab('catalog'); }} 
                        className="hover:text-white transition flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3 h-3 text-neutral-600" />
                        <span>Studio Audio & Acoustics</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { setSelectedCategory('Workspace'); setStoreTab('catalog'); }} 
                        className="hover:text-white transition flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3 h-3 text-neutral-600" />
                        <span>Minimalist Desk Setups</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { setSelectedCategory('Smart Home'); setStoreTab('catalog'); }} 
                        className="hover:text-white transition flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3 h-3 text-neutral-600" />
                        <span>Ambient Lighting & Living</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { setSelectedCategory('All'); setStoreTab('catalog'); }} 
                        className="hover:text-white transition flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3 h-3 text-neutral-600" />
                        <span>Everyday Carry Essentials</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Customer Protection & SLAs */}
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">
                    Customer Care & Guarantees
                  </h4>
                  <ul className="space-y-2.5 text-neutral-400">
                    <li>
                      <button 
                        onClick={() => setStoreTab('track')} 
                        className="hover:text-white transition flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3 h-3 text-neutral-600" />
                        <span>Real-Time Parcel Tracking</span>
                      </button>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>30-Day Money-Back Guarantee</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>BlueDart Priority Air Transit</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>1-Year Replacement Warranty</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Factory Quality Audit SLA</span>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Security & Accepted Payment Badges */}
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-3.5 text-xs">
                    Security & Payments
                  </h4>
                  <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800/90 space-y-3 shadow-inner">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>256-Bit SSL Encrypted</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      100% RBI & NPCI compliant. All payments are securely routed with zero third-party surcharge.
                    </p>

                    {/* Indian Payment Badges Grid */}
                    <div className="pt-2 border-t border-neutral-800/80">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block mb-2">
                        Accepted Payment Modes:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {paymentBadges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-semibold px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Sub-Footer Bar */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
                <p>© 2026 AuraStore & DropshipOS. All rights reserved.</p>

                <div className="flex flex-wrap items-center gap-4 text-neutral-400">
                  <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer transition">Shipping SLA</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer transition">Warranty & Returns</span>
                </div>

                <div className="flex items-center gap-1.5 font-medium text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>.NET 8 & MySQL Backend Active</span>
                </div>
              </div>
            </div>
          </footer>

          {/* Modals & Slide-Overs */}
          <ProductDetailModal />
          <CartDrawer />
          <WishlistDrawer />
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
