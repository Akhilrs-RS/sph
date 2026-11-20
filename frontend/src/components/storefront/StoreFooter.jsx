import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  Headphones, 
  MapPin, 
  ChevronUp, 
  Cpu, 
  Lock, 
  Package, 
  Clock,
  Sparkles,
  PhoneCall,
  ExternalLink
} from 'lucide-react';

export default function StoreFooter() {
  const { 
    setSelectedCategory, 
    setStoreTab, 
    userPincode, 
    showToast 
  } = useApp();

  const trustPillars = [
    {
      icon: Cpu,
      title: 'Direct Factory Sourcing',
      subtitle: '0% Middleman markup. Direct-from-source precision hardware tested in Shenzhen, Taiwan & Pune.',
      badge: 'FACTORY DIRECT'
    },
    {
      icon: Truck,
      title: 'BlueDart Air Line-Haul',
      subtitle: 'Dispatched within 24h via priority air freight. Real-time GPS tracking across 19,000+ PIN codes.',
      badge: 'AIR TRANSIT'
    },
    {
      icon: ShieldCheck,
      title: '1-Year Replacement SLA',
      subtitle: 'Doorstep exchange with zero questions asked. 7-day hassle-free full money-back guarantee.',
      badge: 'WARRANTY'
    },
    {
      icon: CreditCard,
      title: 'Zero-Surcharge Payments',
      subtitle: '100% RBI & NPCI compliant. Instant refunds via BHIM UPI, RuPay, cards, and Cash on Delivery.',
      badge: 'RBI COMPLIANT'
    }
  ];

  const paymentBadges = [
    'BHIM UPI',
    'Google Pay',
    'PhonePe',
    'Paytm',
    'CRED',
    'RuPay',
    'Visa',
    'Mastercard',
    'Net Banking',
    'Cash on Delivery'
  ];

  const socialLinks = [
    { name: 'X / Twitter', handle: '@AuraDirect', url: 'https://x.com' },
    { name: 'GitHub', handle: 'AuraStore', url: 'https://github.com' },
    { name: 'Discord', handle: 'Aura Hardware Lab', url: 'https://discord.com' },
    { name: 'LinkedIn', handle: 'Aura Technologies', url: 'https://linkedin.com' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSupportClick = () => {
    showToast('Aura Care Desk: Call 1800-AURA-HELP or WhatsApp +91-98765-43210 (24/7 Live Assistance)', 'info');
  };

  const handlePincodeClick = () => {
    showToast(`Current Delivery PIN: ${userPincode}. Line-haul express transit SLA: 2-3 business days.`, 'info');
  };

  const handleWarrantyClick = () => {
    showToast('Aura 1-Year Pan-India Warranty: Instant doorstep pickup & replacement. Digital invoice included.', 'success');
  };

  return (
    <footer className="bg-black text-neutral-400 text-xs pt-16 pb-12 border-t border-neutral-900 mt-20 transition select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* ======================================================== */}
        {/* TOP VALUE PROPOSITION TRUST PILLARS (4 CARDS)            */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 border-b border-neutral-900">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-950/80 hover:bg-neutral-900/60 border border-neutral-900 hover:border-neutral-800 p-5 rounded-2xl transition duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:bg-blue-600/20 group-hover:border-blue-500/40 group-hover:text-blue-400 transition">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[9px] font-bold text-neutral-500 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-800 tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-900/80 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>100% Verified SLA</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 4-COLUMN STRUCTURED DIRECTORY                            */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-900">
          {/* Column 1: Brand, Line-Haul Mission & Social Presence */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shadow-sm">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                AURA<span className="text-blue-500">.</span>
              </span>
            </div>

            <p className="text-neutral-400 leading-relaxed text-xs">
              Next-generation direct-from-source consumer electronics. Connecting creators and engineers directly to precision manufacturing hubs via line-haul express air freight.
            </p>

            {/* Live Operational Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>12 Line-Haul Air Hubs Active</span>
            </div>

            {/* Social Media Community Badges */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-2 tracking-wider">
                Community & Engineering
              </span>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => showToast(`Connecting to Aura on ${s.name} (${s.handle})`, 'info')}
                    className="px-2.5 py-1 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-[10px] font-medium transition"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Curated Collections & Fast Category Navigation */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs">
              Curated Collections
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button
                  onClick={() => { setSelectedCategory('Electronics'); setStoreTab('catalog'); }}
                  className="hover:text-white transition flex items-center gap-2 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
                  <span>Studio Audio & High-Fidelity Acoustics</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Workspace'); setStoreTab('catalog'); }}
                  className="hover:text-white transition flex items-center gap-2 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
                  <span>Minimalist Desk Setups & Accessories</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Smart Home'); setStoreTab('catalog'); }}
                  className="hover:text-white transition flex items-center gap-2 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
                  <span>Ambient Lighting & Smart Automation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('All'); setStoreTab('catalog'); }}
                  className="hover:text-white transition flex items-center gap-2 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
                  <span>Everyday Carry (EDC) Titanium Gear</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('All'); setStoreTab('catalog'); }}
                  className="hover:text-white transition flex items-center gap-2 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
                  <span>Direct Factory Overstock Drops</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Protection, Tracking & Self-Service */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs">
              Customer Care & SLAs
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button
                  onClick={() => setStoreTab('track')}
                  className="hover:text-white transition flex items-center gap-2 group font-medium text-slate-200"
                >
                  <Package className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition" />
                  <span>Real-Time Parcel Tracking</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handlePincodeClick}
                  className="hover:text-white transition flex items-center gap-2 group"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PIN Delivery Resolver (<strong className="text-white font-mono">{userPincode}</strong>)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleWarrantyClick}
                  className="hover:text-white transition flex items-center gap-2 group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1-Year Replacement Warranty</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('BlueDart Priority Air Transit: 2-4 business days across 19,000+ Indian PIN codes.', 'info')}
                  className="hover:text-white transition flex items-center gap-2 group"
                >
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span>BlueDart Priority Air Transit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleSupportClick}
                  className="hover:text-white transition flex items-center gap-2 group"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>24/7 Toll-Free & WhatsApp Support</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Bank-Grade Security & Indian Payment Modes */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs">
              Security & Payments
            </h4>
            <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800/90 space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                100% RBI & NPCI compliant. Zero transaction fee on all prepaid UPI, RuPay, card and COD orders.
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

        {/* ======================================================== */}
        {/* ELEVATED SUB-FOOTER BAR                                  */}
        {/* ======================================================== */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            <p>© 2026 AuraStore & DropshipOS Technologies Pvt Ltd. All rights reserved.</p>
            <p className="text-[10px] text-neutral-500 mt-0.5">
              Direct-from-source precision supply chain • Bengaluru, Shenzhen & Taiwan
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-400">
            <span 
              onClick={() => showToast('Terms of Service: All orders fulfilled with strict D2C SLA adherence.', 'info')} 
              className="hover:text-white cursor-pointer transition"
            >
              Terms of Service
            </span>
            <span>•</span>
            <span 
              onClick={() => showToast('Privacy Policy: Customer data is 256-bit encrypted and never shared.', 'info')} 
              className="hover:text-white cursor-pointer transition"
            >
              Privacy Policy
            </span>
            <span>•</span>
            <span 
              onClick={() => showToast('Shipping SLA: Same-day factory dispatch before 4:00 PM IST.', 'info')} 
              className="hover:text-white cursor-pointer transition"
            >
              Shipping SLA
            </span>
            <span>•</span>
            <span 
              onClick={handleWarrantyClick} 
              className="hover:text-white cursor-pointer transition"
            >
              Warranty & Returns
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Backend Heartbeat */}
            <div className="flex items-center gap-1.5 font-medium text-neutral-400 bg-neutral-950 px-2.5 py-1 rounded-full border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>.NET 8 & MySQL Live</span>
            </div>

            {/* Smooth Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition text-[11px] font-semibold group shadow-sm"
              title="Smooth scroll back to top of page"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
