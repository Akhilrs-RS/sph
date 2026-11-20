import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Headphones, 
  MapPin, 
  ArrowRight,
  PackageCheck,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function TopNavRoleSwitcher() {
  const { 
    activeView, 
    setActiveView, 
    cartItemsCount, 
    metrics, 
    setAdminTab, 
    setStoreTab,
    userPincode,
    showToast
  } = useApp();

  // Promotional Announcements Carousel
  const announcements = [
    {
      badge: 'PROMO CODE',
      text: 'Use code AURA500 for ₹500 OFF your direct factory order',
      code: 'AURA500',
      icon: Sparkles
    },
    {
      badge: 'AIR TRANSIT',
      text: 'Free BlueDart Priority Air Delivery across 19,000+ PIN codes on orders > ₹999',
      icon: Truck
    },
    {
      badge: 'GUARANTEE',
      text: '1-Year Pan-India Replacement Warranty & Instant UPI Refunds',
      icon: ShieldCheck
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-cycle announcements every 5 seconds
  useEffect(() => {
    if (activeView !== 'store') return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeView, announcements.length]);

  const currentPromo = announcements[currentIdx];
  const PromoIcon = currentPromo.icon;

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard?.writeText?.(code);
    showToast(`Promo code "${code}" copied to clipboard! ₹500 discount applied at checkout.`, 'success');
  };

  const handleSupportClick = () => {
    showToast('Aura Priority Support: 1800-AURA-HELP (Toll-Free) or WhatsApp +91-98765-43210 (24/7 Live)', 'info');
  };

  return (
    <aside 
      aria-label="Aura Platform Utility Ribbon" 
      className="bg-slate-950 text-white text-[11px] border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md h-9 min-h-[2.25rem] transition-all flex items-center select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-3">
        {/* ======================================================== */}
        {/* STOREFRONT MODE RIBBON                                   */}
        {/* ======================================================== */}
        {activeView === 'store' ? (
          <>
            {/* Left: Dynamic Promotional Ticker */}
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold text-[9px] uppercase tracking-wider border border-blue-500/30 shrink-0">
                <PromoIcon className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
                <span>{currentPromo.badge}</span>
              </span>

              <div 
                className="flex items-center gap-2 truncate text-slate-300 font-medium cursor-pointer hover:text-white transition"
                onClick={() => currentPromo.code && handleCopyCode(currentPromo.code)}
                title={currentPromo.code ? 'Click to copy promo code' : currentPromo.text}
              >
                <span className="truncate">{currentPromo.text}</span>
                {currentPromo.code && (
                  <span className="hidden sm:inline-block text-[10px] font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-700/60 uppercase">
                    Copy Code
                  </span>
                )}
              </div>
            </div>

            {/* Right: Customer Quick Utilities + Sleek Mode Switcher */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Quick Utility 1: Track Order */}
              <button
                onClick={() => setStoreTab('track')}
                className="hidden md:flex items-center gap-1.5 text-slate-400 hover:text-white transition py-0.5 px-2 rounded hover:bg-slate-900"
                title="Track your order parcel in real-time"
              >
                <PackageCheck className="w-3 h-3 text-slate-400" />
                <span>Track Order</span>
              </button>

              {/* Quick Utility 2: User Pincode Badge */}
              <div 
                className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-slate-200 transition py-0.5 px-2 rounded cursor-pointer"
                title="Delivery PIN code for SLA estimation"
                onClick={() => showToast(`Active Delivery PIN: ${userPincode} (Express Air serviceable)`, 'info')}
              >
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>PIN: <strong className="text-slate-200 font-mono">{userPincode}</strong></span>
              </div>

              {/* Quick Utility 3: 24/7 Priority Support */}
              <button
                onClick={handleSupportClick}
                className="hidden xl:flex items-center gap-1.5 text-slate-400 hover:text-white transition py-0.5 px-2 rounded hover:bg-slate-900"
                title="Customer Support Hotline & WhatsApp"
              >
                <Headphones className="w-3 h-3 text-slate-400" />
                <span>24/7 Support</span>
              </button>

              {/* Currency & Region Indicator */}
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                <span>🇮🇳</span>
                <span>INR (₹)</span>
              </div>

              {/* Executive Mode Switcher Pill */}
              <button
                onClick={() => {
                  setActiveView('admin');
                  setAdminTab('dashboard');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white text-[10px] font-bold tracking-wide transition shadow-sm group"
                title="Switch to Merchant Dropshipping Management OS"
              >
                <LayoutDashboard className="w-3 h-3 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>Merchant OS</span>
                {metrics.pendingFulfillmentCount > 0 ? (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-black flex items-center justify-center animate-pulse">
                    {metrics.pendingFulfillmentCount}
                  </span>
                ) : (
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>
            </div>
          </>
        ) : (
          /* ======================================================== */
          /* ADMIN DROPSHIP OS MODE RIBBON                             */
          /* ======================================================== */
          <>
            {/* Left: Backend & Fulfillment Node Health */}
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-white tracking-wider text-[11px] uppercase">
                Aura Dropship OS
              </span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span className="hidden sm:inline text-emerald-400 font-medium">
                .NET 8 & MySQL Sync Active
              </span>
              {metrics.pendingFulfillmentCount > 0 && (
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded-full font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  {metrics.pendingFulfillmentCount} pending order{metrics.pendingFulfillmentCount > 1 ? 's' : ''} to fulfill
                </span>
              )}
            </div>

            {/* Right: GMV / Net Profit KPIs + Return to Storefront Pill */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 text-slate-300 text-[11px] pr-2 border-r border-slate-800">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">GMV:</span>
                  <span className="text-emerald-400 font-bold font-mono">₹{metrics.grossRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Net:</span>
                  <span className="text-blue-400 font-bold font-mono">₹{metrics.netProfit.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveView('store');
                  setStoreTab('home');
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-950 text-[10px] font-bold tracking-wide transition shadow-sm"
                title="Return to Customer Storefront View"
              >
                <ShoppingBag className="w-3 h-3 text-slate-900" />
                <span>Storefront</span>
                {cartItemsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
