import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Zap } from 'lucide-react';

export default function StickyMobileBuyBar({ product, onAddToCart, onBuyNow }) {
  if (!product) return null;

  return (
    <div className="md:hidden sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-slate-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 fill-emerald-600 inline" />
            Free Express Line-Haul
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="p-2.5 rounded-full border border-slate-300 text-slate-800 hover:bg-slate-50 transition"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onBuyNow}
            className="px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition shadow-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
