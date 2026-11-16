import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartQty,
    removeFromCart,
    cartSubtotal,
    setCheckoutOpen,
    setStoreTab,
    showToast
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.15 for 15% off

  if (!cartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1999;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DROPSHIP15') {
      setAppliedDiscount(0.15);
      showToast('Promo code DROPSHIP15 applied! 15% discount activated.', 'success');
    } else {
      showToast('Invalid promo code. Try "DROPSHIP15" for 15% off.', 'error');
    }
  };

  const discountAmount = cartSubtotal * appliedDiscount;
  const estimatedTotal = cartSubtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-black text-slate-900">Your Cart</h2>
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-blue-50/80 px-5 py-3 border-b border-blue-100/70 text-xs">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-blue-900 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    Add <strong className="font-bold text-blue-700">₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> for Free Express Air!
                  </span>
                  <span className="font-bold text-blue-600">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full bg-blue-200/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>🎉 You unlocked FREE Worldwide Tracked Express!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Browse our curated dropshipping catalog to find high-margin trending essentials.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setStoreTab('catalog');
                  }}
                  className="mt-5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
                >
                  Explore Trending Gear
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.variantKey}-${idx}`}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70"
                >
                  <img
                    src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-xl bg-white border border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.title}</h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.variantKey)}
                          className="text-slate-400 hover:text-red-500 p-0.5 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.variantKey && (
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {Object.values(item.variantOptions).join(' • ')}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60">
                      {/* Qty Buttons */}
                      <div className="flex items-center border border-slate-200 bg-white rounded-lg p-0.5 text-xs">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.variantKey, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded transition font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.variantKey, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded transition font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-black text-slate-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-3.5">
              {/* Promo code box */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter code (DROPSHIP15)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition"
                >
                  Apply
                </button>
              </form>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Promo Discount (15%)</span>
                    <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-600 font-bold">FREE Express Air</span>
                    ) : (
                      'Calculated at next step'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Estimated Total</span>
                  <span className="text-blue-600 text-base">₹{Math.round(estimatedTotal).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/25 group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted • Buyer Protection Included</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

