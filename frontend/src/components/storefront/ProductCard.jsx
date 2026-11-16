import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Eye, ShoppingCart, Truck } from 'lucide-react';

export default function ProductCard({ product }) {
  const { setSelectedProduct, addToCart } = useApp();

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    // Default to first option for each variant if any
    const defaultOptions = {};
    if (product.variants) {
      product.variants.forEach(v => {
        defaultOptions[v.name] = v.options[0];
      });
    }
    addToCart(product, defaultOptions, 1);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 shadow-sm hover:shadow-xl transition duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Image Thumbnail Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm ${
              product.badge === 'Bestseller' 
                ? 'bg-amber-500 text-slate-950 font-black' 
                : product.badge === 'New Import'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-blue-600 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-md shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 pointer-events-none sm:pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex items-center gap-1.5 bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-slate-100 transition transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Delivery Lead Time */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
            <span className="font-semibold text-blue-600 uppercase tracking-wider">{product.category}</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Truck className="w-3 h-3 text-slate-500" />
              {product.shippingDays || '4-7 days'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-800">{product.rating}</span>
            <span className="text-[11px] text-slate-600">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing and Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.compareAtPrice && (
                <span className="text-xs text-slate-600 line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block">
              In Stock ({product.stock} units)
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-700 group-hover:text-white flex items-center justify-center transition shadow-sm hover:scale-110 active:scale-95"
            title="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

