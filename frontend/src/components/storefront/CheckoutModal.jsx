import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Truck, CreditCard, ShieldCheck, ArrowRight, LayoutDashboard, Search } from 'lucide-react';

export default function CheckoutModal() {
  const {
    checkoutOpen,
    setCheckoutOpen,
    cart,
    cartSubtotal,
    placeOrder,
    setStoreTab,
    setTrackingLookupId,
    setActiveView,
    setAdminTab
  } = useApp();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Shipping Tier, 3: Payment, 4: Confirmation
  const [shippingOption, setShippingOption] = useState('standard'); // 'standard' | 'express'
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.s@example.com',
    address: 'B-402 Prestige Palms, Indiranagar',
    city: 'Bengaluru',
    state: 'KA',
    zip: '560038',
    country: 'India'
  });

  if (!checkoutOpen) return null;

  const expressFee = shippingOption === 'express' ? 199 : 0;
  const finalTotal = cartSubtotal + expressFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const customer = {
      name: formData.name,
      email: formData.email,
      address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`
    };

    const order = placeOrder(customer, shippingOption);
    setConfirmedOrder(order);
    setStep(4);
  };

  const handleTrackCreatedOrder = () => {
    if (confirmedOrder) {
      setTrackingLookupId(confirmedOrder.id);
    }
    setCheckoutOpen(false);
    setStoreTab('track');
  };

  const handleJumpToAdmin = () => {
    setCheckoutOpen(false);
    setActiveView('admin');
    setAdminTab('orders');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-black text-lg text-slate-900">
              {step === 4 ? 'Order Confirmed!' : 'Express Checkout'}
            </h3>
            <p className="text-xs text-slate-500">
              {step === 4 
                ? 'Your order is securely sent to dropship fulfillment' 
                : `Step ${step} of 3 • Buyer Protection Guaranteed`}
            </p>
          </div>
          <button
            onClick={() => setCheckoutOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>1. Shipping Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="col-span-2 sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State / Prov</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ZIP / Postal</label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-slate-950 hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-full text-xs flex items-center gap-2 transition shadow-sm"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>2. Select Dropship Shipping Method</span>
              </h4>

              <div className="space-y-3">
                <label className={`block p-4 rounded-2xl border cursor-pointer transition ${
                  shippingOption === 'standard' ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingOption === 'standard'}
                        onChange={() => setShippingOption('standard')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">Standard Tracked Delivery (ePacket / Postal)</p>
                        <p className="text-[11px] text-slate-500">5-8 business days with online tracking updates</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">FREE</span>
                  </div>
                </label>

                <label className={`block p-4 rounded-2xl border cursor-pointer transition ${
                  shippingOption === 'express' ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingOption === 'express'}
                        onChange={() => setShippingOption('express')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">Priority Air Line-Haul Express (BlueDart / Delhivery)</p>
                        <p className="text-[11px] text-slate-500">2-3 business days expedited direct domestic transit</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">+₹199</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Back to Address
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-full text-xs flex items-center gap-2 transition shadow-sm"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>3. Simulated Payment & Order Summary</span>
              </h4>

              {/* Order total recap */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Items ({cart.length})</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping ({shippingOption === 'express' ? 'Priority Air' : 'Standard'})</span>
                  <span>{expressFee > 0 ? `+₹${expressFee.toLocaleString('en-IN')}` : 'FREE'}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Final Authorization</span>
                  <span className="text-blue-600 font-black">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Mock Credit Card box */}
              <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Simulated UPI & Card Gateway</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    Sandbox Demo Mode
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-mono bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between items-center">
                  <span>•••• •••• •••• 4242 / UPI ID: buyer@okhdfc</span>
                  <span className="text-slate-400">12/28</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  No real card required. Clicking below creates an actual dropship order in the system that will sync immediately with the Dropship Merchant OS!
                </p>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full text-xs flex items-center gap-2 transition shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authorize & Place Order (₹{finalTotal.toLocaleString('en-IN')})</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && confirmedOrder && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">Thank You, {formData.name.split(' ')[0]}!</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Order <span className="font-mono font-bold text-blue-600">{confirmedOrder.id}</span> has been confirmed and routed to our supplier warehouse.
                </p>
              </div>

              {/* Order Card Overview */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Ship To:</span>
                  <span className="font-normal text-slate-600 truncate max-w-xs">{confirmedOrder.customer.address}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Carrier:</span>
                  <span className="font-normal text-slate-600">{confirmedOrder.shippingCarrier}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Fulfillment Status:</span>
                  <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                    Pending Supplier Sourcing
                  </span>
                </div>
              </div>

              {/* Two Cross-Portal Options */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleTrackCreatedOrder}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Parcel Journey</span>
                </button>
                <button
                  onClick={handleJumpToAdmin}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Open Merchant OS to Fulfill Order</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

