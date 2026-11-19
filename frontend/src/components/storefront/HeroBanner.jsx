import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, PackageCheck, Star, ShieldCheck, Sparkles, Zap, Flame, Award } from 'lucide-react';

export default function HeroBanner() {
  const { setStoreTab, setSelectedCategory, setSelectedProduct, storefrontProducts } = useApp();

  const heroProduct = storefrontProducts[0] || {
    id: 1,
    title: "Aura Pulse Pro ANC Headphones",
    price: 8999,
    compareAtPrice: 14999,
    rating: 4.9,
    viewersCount: 28
  };

  const discountAmount = heroProduct.compareAtPrice ? heroProduct.compareAtPrice - heroProduct.price : 0;
  const discountPercent = heroProduct.compareAtPrice ? Math.round((discountAmount / heroProduct.compareAtPrice) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70 border border-slate-200/80 p-8 sm:p-12 lg:p-16 transition shadow-xs">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-0 right-1/4 -mt-16 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-800 text-xs font-semibold border border-slate-200/60 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Direct Manufacturer Sourcing • Zero Retail Distributor Markup</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-950">
              Curated Essentials. <br />
              <span className="text-slate-400 font-extrabold">
                Direct to Doorstep.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Skip traditional retail distributor markups and expensive showroom overhead. Experience certified studio audio, minimalist desk setups, and everyday carry shipped with line-haul express air freight.
            </p>

            {/* Micro-Stats Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200/60">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                48-Hour Dispatch
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                4.9/5 from 1,400+ Buyers
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                1-Year Warranty SLA
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => {
                  setStoreTab('catalog');
                  setSelectedCategory('All');
                }}
                className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-semibold px-7 py-3.5 rounded-full text-xs transition shadow-sm hover:shadow-md group"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={() => setStoreTab('track')}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-semibold px-6 py-3.5 rounded-full text-xs transition shadow-2xs"
              >
                <PackageCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Track Order</span>
              </button>
            </div>

            {/* Micro proof line */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                30-Day Easy Returns
              </span>
              <span>•</span>
              <span>Free Express Line-Haul over ₹1,999</span>
              <span>•</span>
              <span>Prepaid UPI Saves Extra ₹100</span>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={() => setSelectedProduct(heroProduct)}
              className="relative group cursor-pointer max-w-sm w-full"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100/90 p-3 sm:p-4 border border-slate-200/70 shadow-lg shadow-slate-200/60 group-hover:shadow-xl transition-all duration-500">
                <img
                  src={heroProduct.images?.[0] || heroProduct.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
                  alt={heroProduct.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                />

                {/* Floating Glass Price Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                      Featured Flagship
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs mt-0.5 truncate max-w-[170px]">
                      {heroProduct.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-950 block">₹{heroProduct.price.toLocaleString('en-IN')}</span>
                    {discountAmount > 0 && (
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        Save ₹{discountAmount.toLocaleString('en-IN')} ({discountPercent}% OFF)
                      </span>
                    )}
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                  <div className="bg-slate-950/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{heroProduct.rating} Rating</span>
                  </div>
                </div>

                {heroProduct.viewersCount && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {heroProduct.viewersCount} viewing
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
