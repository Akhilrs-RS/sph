import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Plus, Heart, Eye } from 'lucide-react';

export default function ProductCard({ product }) {
  const { setSelectedProduct, addToCart, toggleWishlist, isWishlisted } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultOptions = {};
    if (product.variants) {
      product.variants.forEach(v => {
        defaultOptions[v.name] = v.options[0];
      });
    }
    addToCart(product, defaultOptions, 1);
  };

  const primaryImage = product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80';
  const secondaryImage = product.images?.[1] || primaryImage;
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 p-3 shadow-2xs hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image Container with Smooth Secondary Hover Flip */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3">
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={product.title}
            className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-500 ${
              isHovered && product.images?.[1] ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
          />

          {/* Secondary Image (Hover Flip) */}
          {product.images?.[1] && (
            <img
              src={secondaryImage}
              alt={`${product.title} alternate`}
              className={`w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}

          {/* Top Left Badge */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-2xs backdrop-blur-sm border border-slate-100">
                {product.badge}
              </span>
            </div>
          )}

          {/* Top Right Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs hover:bg-white text-slate-400 hover:text-rose-500 transition hover:scale-110"
            title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Subtle Live Viewers Indicator on Hover */}
          {product.viewersCount && (
            <div className={`absolute bottom-2.5 left-2.5 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-900/75 text-white backdrop-blur-md inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {product.viewersCount} browsing
              </span>
            </div>
          )}

          {/* Floating Hover Quick-Add Pill */}
          <div className="absolute inset-x-3 bottom-3 z-10 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="flex items-center gap-1.5 bg-slate-950/90 hover:bg-slate-950 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md transition hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
          </div>
        </div>

        {/* Category & Star Rating */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-500">
            {product.category}
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-blue-600 transition">
          {product.title}
        </h3>
      </div>

      {/* Pricing & Speed Row */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm sm:text-base font-extrabold text-slate-950">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-slate-400 line-through">
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          {product.shippingDays ? product.shippingDays.split(' ')[0] : '2-4'}d freight
        </span>
      </div>
    </div>
  );
}
