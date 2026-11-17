import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Search, Truck, Zap, Heart, X } from 'lucide-react';
import SearchDropdown from './SearchDropdown';

export default function StoreNavbar() {
  const {
    cartItemsCount,
    setCartOpen,
    cartSubtotal,
    storeTab,
    setStoreTab,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    wishlist,
    setWishlistOpen
  } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 sticky top-9 z-40 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 sm:gap-6">
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

          {/* Search Bar with Autocomplete Dropdown */}
          <div ref={searchContainerRef} className="flex-1 max-w-xs relative hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tech, audio, desk..."
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 text-xs pl-8 pr-7 py-2 rounded-full border border-transparent focus:border-slate-300 focus:outline-none transition shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            <SearchDropdown 
              isOpen={searchOpen} 
              onClose={() => setSearchOpen(false)} 
              inputQuery={searchQuery} 
            />
          </div>

          {/* Right Actions: Track Order, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Track Order */}
            <button
              onClick={() => setStoreTab('track')}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full transition ${
                storeTab === 'track'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Track Order</span>
            </button>

            {/* Wishlist Pill */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-scale-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Pill */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-slate-950 hover:bg-slate-800 text-white px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition shadow-sm hover:shadow"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{cartItemsCount > 0 ? `(${cartItemsCount})` : 'Bag'}</span>
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
