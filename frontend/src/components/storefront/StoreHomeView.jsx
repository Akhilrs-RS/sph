import React from 'react';
import { useApp } from '../../context/AppContext';
import HeroBanner from './HeroBanner';
import TrustBadges from './TrustBadges';
import ProductCard from './ProductCard';
import { ArrowRight, Flame, CheckCircle2 } from 'lucide-react';

export default function StoreHomeView() {
  const { storefrontProducts, setStoreTab, setSelectedCategory } = useApp();

  const featuredProducts = storefrontProducts.slice(0, 4);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Hero Showcase */}
      <HeroBanner />

      {/* Trust Strip */}
      <TrustBadges />

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Featured Best Sellers
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Top trending items with verified domestic delivery speeds
            </p>
          </div>

          <button
            onClick={() => {
              setStoreTab('catalog');
              setSelectedCategory('All');
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 group transition px-3 py-1.5 rounded-full bg-slate-100/80 hover:bg-slate-100"
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

      {/* Direct-From-Source Minimalist Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700/60">
              Direct Sourcing Model
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-4 leading-tight">
              Zero Middlemen. <br />
              <span className="text-slate-400">Pure Quality & Value.</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Traditional multi-tiered retail stacks distributors, importer margins, and expensive showroom real estate onto your price tag. Aura connects directly with manufacturing hubs, routing every item via line-haul express air freight.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs text-slate-300">
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
