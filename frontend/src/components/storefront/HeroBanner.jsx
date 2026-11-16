import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, Flame, Zap, PackageCheck } from 'lucide-react';

export default function HeroBanner() {
  const { setStoreTab, setSelectedCategory } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Column: Headlines */}
        <div className="max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Direct Dropship Pricing • Up to 45% Off MSRP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            Curated Innovations, <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Direct to Doorstep.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Eliminate traditional retail markups. Explore certified smart tech, ergonomic lifestyle essentials, and trending ambient gear sourced straight from tier-1 manufacturers with guaranteed tracked freight.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => {
                setStoreTab('catalog');
                setSelectedCategory('All');
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/30 group"
            >
              <span>Explore Trending Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => setStoreTab('track')}
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold px-5 py-3 rounded-xl transition"
            >
              <PackageCheck className="w-4 h-4 text-blue-400" />
              <span>Track Existing Order</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Verified Direct Suppliers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcase Card */}
        <div className="w-full md:w-auto flex justify-center">
          <div className="relative bg-slate-800/60 border border-slate-700/80 backdrop-blur-md p-4 rounded-2xl max-w-xs shadow-xl rotate-1 hover:rotate-0 transition duration-300">
            <span className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow">
              🔥 40% OFF
            </span>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
              alt="Aura SoundPulse Pro Headphones"
              className="w-64 h-48 object-cover rounded-xl shadow-md"
            />
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">Top Dropship Choice</span>
                <span className="text-xs text-amber-400 font-bold">★ 4.8 (342)</span>
              </div>
              <h4 className="text-white font-bold text-sm mt-1">Aura SoundPulse Pro ANC</h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-black text-white">$89.99</span>
                <span className="text-xs text-slate-500 line-through">$149.99</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                  Save $60
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

