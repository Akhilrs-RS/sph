import React from 'react';
import { useApp } from '../../context/AppContext';
import HeroBanner from './HeroBanner';
import TrustBadges from './TrustBadges';
import ProductCard from './ProductCard';
import { ArrowRight, Flame, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StoreHomeView() {
  const { storefrontProducts, setStoreTab, setSelectedCategory } = useApp();

  const featuredProducts = storefrontProducts.slice(0, 4);

  return (
    <div className="space-y-4 pb-16 animate-fade-in">
      {/* Hero Showcase */}
      <HeroBanner />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>Trending Dropship Arrivals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Best Sellers
            </h2>
          </div>

          <button
            onClick={() => {
              setStoreTab('catalog');
              setSelectedCategory('All');
            }}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 group transition"
          >
            <span>View All ({storefrontProducts.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Direct-From-Source Dropship Value Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              The Modern Direct-Sourcing Advantage
            </span>
            <h3 className="text-2xl sm:text-4xl font-black mt-3 leading-tight">
              How Dropshipping Cuts Out 60% of Retail Overhead
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Traditional retail adds distributors, physical storefront rent, and long warehouse storage fees onto your price tag. AuraStore connects directly with certified overseas and domestic manufacturers, routing each parcel via direct air-freight straight to your hands.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero middleman warehouse markups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Airway bill line-haul tracking on every parcel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>30-day money-back guarantee with local return hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Strict factory quality-assurance checks</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

