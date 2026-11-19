import React from 'react';
import { useApp } from '../../context/AppContext';
import HeroBanner from './HeroBanner';
import CategoryDiscoveryStrip from './CategoryDiscoveryStrip';
import TrustBadges from './TrustBadges';
import ProductCard from './ProductCard';
import SocialProofSection from './SocialProofSection';
import { ArrowRight, Flame, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function StoreHomeView() {
  const { storefrontProducts, setStoreTab, setSelectedCategory } = useApp();

  const featuredProducts = storefrontProducts.slice(0, 4);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* 1. Hero Showcase */}
      <HeroBanner />

      {/* 2. Visual Category Discovery Strip */}
      <CategoryDiscoveryStrip />

      {/* 3. Trust Strip */}
      <TrustBadges />

      {/* 4. Featured Best Sellers Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Featured Best Sellers
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Top trending items with verified domestic delivery speeds & factory-direct warranty
            </p>
          </div>

          <button
            onClick={() => {
              setStoreTab('catalog');
              setSelectedCategory('All');
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 group transition px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 shadow-2xs"
          >
            <span>View All ({storefrontProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Verified Customer Proof & Real Testimonials */}
      <SocialProofSection />

      {/* 6. Direct-From-Source Minimalist Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-900">
          <div className="max-w-xl relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
              Direct Sourcing Model
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-4 leading-tight">
              Zero Middlemen. <br />
              <span className="text-slate-400">Pure Quality & Honest Value.</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Traditional multi-tiered retail stacks distributors, importer margins, and expensive showroom real estate onto your price tag. Aura connects directly with manufacturing hubs, routing every item via line-haul express air freight.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero retail distributor markup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Line-haul tracking on every parcel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Factory quality inspection checks</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
