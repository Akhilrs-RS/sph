import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, Truck, ShieldCheck, CheckCircle2, ShoppingCart, Zap, Clock } from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart, setCheckoutOpen } = useApp();

  if (!selectedProduct) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState(() => {
    const initial = {};
    if (selectedProduct.variants) {
      selectedProduct.variants.forEach(v => {
        initial[v.name] = v.options[0];
      });
    }
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const images = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'];

  const handleVariantSelect = (variantName, optionValue) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: optionValue }));
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedVariants, quantity);
    setSelectedProduct(null);
  };

  const handleInstantBuy = () => {
    addToCart(selectedProduct, selectedVariants, quantity);
    setSelectedProduct(null);
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
            <img
              src={images[activeImageIdx]}
              alt={selectedProduct.title}
              className="w-full h-full object-cover object-center"
            />
            {selectedProduct.badge && (
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                    activeImageIdx === idx ? 'border-blue-600 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Sourcing / Warehouse Transparency Note */}
          <div className="mt-4 p-3 bg-blue-50/70 rounded-xl border border-blue-100/80 text-xs text-blue-900">
            <div className="flex items-center gap-1.5 font-semibold text-blue-700 mb-0.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Direct Manufacturer Fulfillment</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Dispatched directly from <strong>{selectedProduct.supplier?.name || 'Verified Partner'}</strong> ({selectedProduct.supplier?.warehouse || 'Regional Logistics Hub'}). Quality checked prior to parcel dispatch.
            </p>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              <span>{selectedProduct.category}</span>
              <span>•</span>
              <span className="text-slate-600 font-normal">SKU: {selectedProduct.supplier?.sku || 'AURA-DEFAULT'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-snug">
              {selectedProduct.title}
            </h2>

            {/* Rating and Social Proof */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{selectedProduct.rating}</span>
              <span className="text-xs text-slate-600">({selectedProduct.reviewsCount} verified reviews)</span>
            </div>

            {/* Pricing Section */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
              {selectedProduct.compareAtPrice && (
                <span className="text-base text-slate-600 line-through">
                  ₹{selectedProduct.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              {selectedProduct.compareAtPrice && (
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Save ₹{(selectedProduct.compareAtPrice - selectedProduct.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Estimated Delivery Calculator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-semibold text-slate-900">Estimated Delivery: </span>
                <span>{selectedProduct.shippingDays || '4-7 business days'} (Tracked Express)</span>
              </div>
            </div>

            {/* Product Variants (e.g. Color, Edition) */}
            {selectedProduct.variants && selectedProduct.variants.map((v, vIdx) => (
              <div key={vIdx} className="mt-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {v.name}: <span className="font-normal text-slate-900">{selectedVariants[v.name]}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {v.options.map((opt, oIdx) => {
                    const isSelected = selectedVariants[v.name] === opt;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleVariantSelect(v.name, opt)}
                        className={`text-xs px-3.5 py-1.5 rounded-lg font-medium border transition ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Description & Features */}
            <div className="mt-5 text-xs text-slate-600 leading-relaxed space-y-2">
              <p>{selectedProduct.description}</p>
              {selectedProduct.features && (
                <ul className="space-y-1.5 mt-2">
                  {selectedProduct.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {/* Quantity Adjuster */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-slate-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-sm transition shadow"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Instant Buy Button */}
              <button
                type="button"
                onClick={handleInstantBuy}
                className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-md shadow-blue-500/20"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Instant Buy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

