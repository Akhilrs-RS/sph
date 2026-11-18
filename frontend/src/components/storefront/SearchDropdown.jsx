import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, TrendingUp, Sparkles, ArrowRight, Star } from 'lucide-react';

export default function SearchDropdown({ isOpen, onClose, inputQuery }) {
  const { storefrontProducts, setSelectedProduct, setSearchQuery, setStoreTab } = useApp();

  if (!isOpen) return null;

  const filtered = inputQuery.trim()
    ? storefrontProducts.filter(p =>
        p.title.toLowerCase().includes(inputQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(inputQuery.toLowerCase()) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(inputQuery.toLowerCase())))
      ).slice(0, 5)
    : [];

  const trendingKeywords = [
    'Noise Cancelling Headphones',
    'MagSafe Wireless Charger',
    'Minimalist Desk Lamp',
    'Ergonomic Leather Mat',
    'Mechanical Keyboard',
    'Carbon Fiber Wallet'
  ];

  const handleSelectKeyword = (kw) => {
    setSearchQuery(kw);
    setStoreTab('catalog');
    onClose();
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fade-in max-h-96 overflow-y-auto">
      {inputQuery.trim() ? (
        <div>
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Search Results for "{inputQuery}"</span>
            <span>{filtered.length} found</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No matching products found</p>
              <p className="text-[11px] text-slate-400 mt-1">Try keywords like "audio", "desk", or "charger"</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="p-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer transition group"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">
                      {product.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-400">{product.category}</span>
                      <span className="text-slate-200">•</span>
                      <span className="text-[11px] flex items-center gap-0.5 text-amber-500 font-semibold">
                        <Star className="w-2.5 h-2.5 fill-amber-500 inline" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-slate-950">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-semibold">Free Express</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setStoreTab('catalog');
                onClose();
              }}
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1.5"
            >
              <span>View all matching results in catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>Trending Searches in India</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {trendingKeywords.map(kw => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleSelectKeyword(kw)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Popular Fast-Ship Categories</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('Audio');
                  setStoreTab('catalog');
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-700"
              >
                🎧 Tech & Audio Gear
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('Workspace');
                  setStoreTab('catalog');
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-700"
              >
                ⚡ Workspace Essentials
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

