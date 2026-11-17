import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, Truck, ShieldCheck, CheckCircle2, ShoppingCart, Zap, Heart, ArrowRight, Share2, Award, Clock } from 'lucide-react';
import PincodeChecker from './PincodeChecker';
import ProductFaqAccordion from './ProductFaqAccordion';
import ReviewSection from './ReviewSection';
import StickyMobileBuyBar from './StickyMobileBuyBar';

export default function ProductDetailModal() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    setCheckoutOpen, 
    toggleWishlist, 
    isWishlisted,
    showToast 
  } = useApp();

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
    : [selectedProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'];

  const wishlisted = isWishlisted(selectedProduct.id);

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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-600 shadow-xs flex items-center justify-center transition border border-slate-200/60"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(selectedProduct)}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-600 shadow-xs flex items-center justify-center transition border border-slate-200/60"
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={() => setSelectedProduct(null)}
            className="w-9 h-9 rounded-full bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center transition shadow-xs"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col md:flex-row">
            {/* Left Side: Images Gallery */}
            <div className="w-full md:w-1/2 bg-slate-50/60 p-6 flex flex-col justify-start border-b md:border-b-0 md:border-r border-slate-100">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center border border-slate-100">
                <img
                  src={images[activeImageIdx]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {selectedProduct.badge && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-xs">
                    {selectedProduct.badge}
                  </span>
                )}
                {selectedProduct.viewersCount && (
                  <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {selectedProduct.viewersCount} viewing now
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
                        activeImageIdx === idx 
                          ? 'border-slate-900 shadow-md ring-2 ring-slate-900/10' 
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Sourcing / Warehouse Transparency Note */}
              <div className="mt-5 p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100/70 text-xs text-blue-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Direct Factory Express Logistics</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Dispatched directly from <strong>{selectedProduct.supplier?.name || 'Verified Supplier Hub'}</strong> via {selectedProduct.hubLocation || 'Line-Haul Express Air Freight'}. Sealed with tamper-evident inspection tags.
                </p>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] text-slate-600">
                <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>100% Authentic Product</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>7-Day Replacement</span>
                </div>
              </div>
            </div>

            {/* Right Side: Details & Actions */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span>{selectedProduct.category}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-400">SKU: {selectedProduct.supplier?.sku || 'AURA-IN-900'}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 leading-snug">
                  {selectedProduct.title}
                </h2>

                {/* Rating and Social Proof */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-900">{selectedProduct.rating}</span>
                  <span className="text-xs text-slate-500">
                    ({selectedProduct.reviewsCount || 184} verified ratings)
                  </span>
                </div>

                {/* Pricing Section */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-slate-950">
                      ₹{selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                    {selectedProduct.compareAtPrice && (
                      <span className="text-base text-slate-400 line-through">
                        ₹{selectedProduct.compareAtPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {selectedProduct.compareAtPrice && (
                      <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        Save ₹{(selectedProduct.compareAtPrice - selectedProduct.price).toLocaleString('en-IN')} (
                        {Math.round(((selectedProduct.compareAtPrice - selectedProduct.price) / selectedProduct.compareAtPrice) * 100)}% OFF)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span>Inclusive of all taxes & GST invoice</span>
                    <span>•</span>
                    <span className="text-slate-600 font-medium">Prepaid UPI saves extra ₹100</span>
                  </div>
                </div>

                {/* Pincode Delivery Checker */}
                <div className="mt-4">
                  <PincodeChecker />
                </div>

                {/* Product Variants (e.g. Color, Edition) */}
                {selectedProduct.variants && selectedProduct.variants.map((v, vIdx) => (
                  <div key={vIdx} className="mt-4">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {v.name}: <span className="font-semibold text-slate-950">{selectedVariants[v.name]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {v.options.map((opt, oIdx) => {
                        const isSelected = selectedVariants[v.name] === opt;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleVariantSelect(v.name, opt)}
                            className={`text-xs px-3.5 py-1.5 rounded-full font-medium border transition ${
                              isSelected
                                ? 'bg-slate-950 text-white border-slate-950 shadow-2xs font-semibold'
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

                {/* Specifications & Warranty Accordions */}
                <div className="mt-6">
                  <ProductFaqAccordion product={selectedProduct} />
                </div>
              </div>

              {/* Desktop Desktop Actions Row */}
              <div className="mt-6 pt-4 border-t border-slate-100 hidden md:block">
                <div className="flex items-center gap-3">
                  {/* Quantity Adjuster */}
                  <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded-full transition font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded-full transition font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-3 px-5 rounded-full text-xs transition"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Instant Buy Button */}
                  <button
                    type="button"
                    onClick={handleInstantBuy}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 px-5 rounded-full text-xs transition shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>Instant Buy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Full Customer Reviews Section (Bottom of Modal) */}
          <div className="p-6 sm:p-8 bg-slate-50/30 border-t border-slate-100">
            <ReviewSection product={selectedProduct} />
          </div>
        </div>

        {/* Sticky Mobile Buy Bar for Responsive Mobile View */}
        <StickyMobileBuyBar 
          product={selectedProduct} 
          onAddToCart={handleAddToCart} 
          onBuyNow={handleInstantBuy} 
        />
      </div>
    </div>
  );
}
