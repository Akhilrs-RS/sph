import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, PackageCheck, Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroBanner() {
  const { setStoreTab, setSelectedCategory, setSelectedProduct, storefrontProducts } = useApp();

  const heroProduct = storefrontProducts[0] || {
    id: "prod-1",
    title: "Aura SoundPulse Pro ANC Headphones",
    price: 4999,
    compareAtPrice: 8499,
    rating: 4.8
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-slate-50/60 border border-slate-200/70 p-8 sm:p-14 lg:p-16 transition">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-0 right-1/4 -mt-16 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-80 h-80 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Direct Manufacturer Sourcing • Zero Retail Markup</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-950">
              Curated Essentials. <br />
              <span className="text-slate-400 font-extrabold">
                Direct to Doorstep.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Skip traditional retail distributors and warehouse storage markups. Experience certified smart audio, ambient home living, and everyday carry shipped with line-haul express tracking.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  setStoreTab('catalog');
                  setSelectedCategory('All');
                }}
                className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-semibold px-7 py-3.5 rounded-full text-xs transition shadow-sm group"
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
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                30-Day Easy Returns
              </span>
              <span>•</span>
              <span>Free Express Line-Haul over ₹1,999</span>
              <span>•</span>
              <span>24/7 Human Concierge</span>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={() => setSelectedProduct(heroProduct)}
              className="relative group cursor-pointer max-w-sm w-full"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100/90 p-4 border border-slate-200/60 shadow-lg shadow-slate-200/50 group-hover:shadow-xl transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                  alt="Aura SoundPulse Pro Headphones"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                />

                {/* Floating Glass Price Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                      Featured Flagship
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs mt-0.5 truncate max-w-[170px]">
                      Aura SoundPulse Pro ANC
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-950 block">₹4,999</span>
                    <span className="text-[10px] text-emerald-600 font-bold block">Save ₹3,500</span>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 bg-slate-950 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>4.8 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
