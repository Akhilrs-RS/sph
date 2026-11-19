import React from 'react';
import { useApp } from '../../context/AppContext';
import { Headphones, Monitor, Sparkles, Lamp, ArrowRight, Zap } from 'lucide-react';

export default function CategoryDiscoveryStrip() {
  const { storefrontProducts, setStoreTab, setSelectedCategory } = useApp();

  const categories = [
    {
      id: 'Electronics',
      name: 'Tech & Studio Audio',
      icon: Headphones,
      desc: 'ANC Headphones, DACs & Wireless Buds',
      gradient: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-600'
    },
    {
      id: 'Workspace',
      name: 'Minimalist Desk Gear',
      icon: Monitor,
      desc: 'MagSafe Docks, Keyboards & Lightbars',
      gradient: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600'
    },
    {
      id: 'Smart Home',
      name: 'Ambient Living',
      icon: Lamp,
      desc: 'Asymmetric Lightbars & Smart Hubs',
      gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600'
    },
    {
      id: 'Lifestyle',
      name: 'Everyday Carry',
      icon: Sparkles,
      desc: 'GaN Chargers & Titanium Organizers',
      gradient: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-600'
    }
  ];

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setStoreTab('catalog');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Explore Curated Collections
          </h3>
        </div>
        <button
          onClick={() => {
            setSelectedCategory('All');
            setStoreTab('catalog');
          }}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 transition"
        >
          <span>View All Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const count = storefrontProducts.filter(p => p.category === cat.id || cat.id === 'All').length || 3;

          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} border flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition">
                  {count} items
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-xs sm:text-sm font-bold text-slate-950 group-hover:text-blue-600 transition flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition text-blue-600" />
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {cat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

