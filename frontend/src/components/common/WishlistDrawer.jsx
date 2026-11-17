import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const { 
    wishlist, 
    wishlistOpen, 
    setWishlistOpen, 
    toggleWishlist, 
    addToCart, 
    setSelectedProduct, 
    setStoreTab 
  } = useApp();

  if (!wishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Your Wishlist</h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={() => setWishlistOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4 border border-dashed border-slate-200">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Save items you love to your wishlist and revisit them anytime.
                </p>
                <button
                  onClick={() => {
                    setWishlistOpen(false);
                    setStoreTab('catalog');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition flex gap-3 group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-xl object-cover bg-slate-50 border border-slate-100 cursor-pointer shrink-0"
                      onClick={() => {
                        setSelectedProduct(item);
                        setWishlistOpen(false);
                      }}
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <p 
                            onClick={() => {
                              setSelectedProduct(item);
                              setWishlistOpen(false);
                            }}
                            className="text-xs font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer"
                          >
                            {item.title}
                          </p>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="text-slate-300 hover:text-rose-500 transition p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-extrabold text-slate-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 transition shadow-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Move to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer if items exist */}
          {wishlist.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/60">
              <button
                onClick={() => {
                  wishlist.forEach(item => addToCart(item));
                  setWishlistOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Move All to Bag ({wishlist.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
