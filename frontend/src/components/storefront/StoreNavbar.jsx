import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Search, Truck, Zap } from 'lucide-react';

export default function StoreNavbar() {
  const {
    cartItemsCount,
    setCartOpen,
    cartSubtotal,
    storeTab,
    setStoreTab,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useApp();

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 sticky top-9 z-40 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Brand Logo */}
          <div 
            onClick={() => {
              setStoreTab('home');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-slate-900 flex items-center">
                AURA<span className="text-blue-600">.</span>
              </span>
            </div>
          </div>

          {/* Nav Categories */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                setStoreTab('home');
                setSelectedCategory('All');
              }}
              className={`transition hover:text-slate-900 ${storeTab === 'home' ? 'text-slate-950 font-bold' : ''}`}
            >
              Featured
            </button>
            <button
              onClick={() => {
                setStoreTab('catalog');
                setSelectedCategory('All');
              }}
              className={`transition hover:text-slate-900 ${storeTab === 'catalog' ? 'text-slate-950 font-bold' : ''}`}
            >
              Shop All
            </button>
            <button
              onClick={() => {
                setStoreTab('catalog');
                setSelectedCategory('Electronics');
              }}
              className="transition hover:text-slate-900"
            >
              Electronics
            </button>
            <button
              onClick={() => {
                setStoreTab('catalog');
                setSelectedCategory('Smart Home');
              }}
              className="transition hover:text-slate-900"
            >
              Smart Living
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (storeTab !== 'catalog') setStoreTab('catalog');
                }}
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 text-xs pl-8 pr-3 py-2 rounded-full border border-transparent focus:border-slate-300 focus:outline-none transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Actions: Track & Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStoreTab('track')}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                storeTab === 'track'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Track Order</span>
            </button>

            {/* Shopping Cart Pill */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition shadow-sm hover:shadow"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{cartItemsCount > 0 ? `(${cartItemsCount})` : 'Cart'}</span>
              {cartSubtotal > 0 && (
                <span className="hidden sm:inline border-l border-slate-700 pl-2 text-slate-300 font-mono text-[11px]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
