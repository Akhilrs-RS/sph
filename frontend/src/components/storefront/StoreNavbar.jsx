import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Search, Truck, Zap, ShieldCheck } from 'lucide-react';

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
    <header className="bg-white border-b border-slate-200 sticky top-8 z-40 shadow-sm transition">
      {/* Top micro banner */}
      <div className="bg-blue-600 text-white text-[11px] font-medium py-1 px-4 text-center tracking-wide">
        🚀 Direct Factory Sourcing: Free Tracked Shipping on Orders Over ₹1,999 | 30-Day Easy Returns
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => {
              setStoreTab('home');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                Aura<span className="text-blue-600">Store</span>
              </span>
              <span className="text-[10px] text-slate-600 block -mt-1 font-semibold tracking-wider uppercase">Direct Dropship</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tech gadgets, smart home, ambient lights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (storeTab !== 'catalog') setStoreTab('catalog');
                }}
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Nav Links & Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => {
                setStoreTab('catalog');
                setSelectedCategory('All');
              }}
              className={`text-sm font-medium transition ${
                storeTab === 'catalog' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Shop All
            </button>

            <button
              onClick={() => setStoreTab('track')}
              className={`flex items-center gap-1.5 text-sm font-medium transition px-2.5 py-1 rounded-md ${
                storeTab === 'track' ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span className="hidden md:inline">Track Order</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-full text-sm font-medium transition shadow-sm hover:shadow"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-semibold">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (storeTab !== 'catalog') setStoreTab('catalog');
              }}
              className="w-full bg-slate-100 text-slate-800 text-sm pl-9 pr-3 py-1.5 rounded-full border border-slate-200 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </header>
  );
}

