import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, CheckCircle2, Truck, CreditCard, ShieldCheck, ArrowRight, LayoutDashboard, Search, 
  QrCode, Banknote, Sparkles, AlertCircle, Lock, Smartphone 
} from 'lucide-react';
import UpiPaymentModal from '../common/UpiPaymentModal';

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
    setAdminTab,
    userPincode,
    resolvePincode
  } = useApp();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Shipping Tier, 3: Payment, 4: Confirmation
  const [shippingOption, setShippingOption] = useState('standard'); // 'standard' | 'express'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Card form state
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8910',
    cardName: 'Aarav Sharma',
    expiry: '09/28',
    cvv: '821'
  });
  const [cardOtpModalOpen, setCardOtpModalOpen] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');

  // Shipping form state auto-populated with Indian metro defaults
  const initialCityInfo = resolvePincode ? resolvePincode(userPincode) : null;
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    phone: '+91 98450 12345',
    email: 'aarav.sharma@example.com',
    address: 'Flat 402, Prestige Palms, 100ft Road, Indiranagar',
    city: initialCityInfo?.city || 'Bengaluru',
    state: initialCityInfo?.state || 'Karnataka',
    zip: userPincode || '560038',
    country: 'India'
  });

  // Whenever userPincode changes, update form
  useEffect(() => {
    if (userPincode && resolvePincode) {
      const res = resolvePincode(userPincode);
      setFormData(prev => ({
        ...prev,
        zip: userPincode,
        city: res.city,
        state: res.state
      }));
    }
  }, [userPincode, resolvePincode]);

  if (!checkoutOpen) return null;

  const expressFee = shippingOption === 'express' ? 199 : 0;
  const paymentAdjustment = paymentMethod === 'upi' ? -100 : (paymentMethod === 'cod' ? 49 : 0);
  const finalTotal = Math.max(0, cartSubtotal + expressFee + paymentAdjustment);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // If typing 6-digit zip, auto-detect city/state
    if (name === 'zip' && value.trim().length === 6 && resolvePincode) {
      const res = resolvePincode(value.trim());
      setFormData(prev => ({
        ...prev,
        [name]: value,
        city: res.city,
        state: res.state
      }));
    }
  };

  const handleProceedToPayment = () => {
    if (paymentMethod === 'upi') {
      setIsUpiModalOpen(true);
    } else if (paymentMethod === 'card') {
      setCardOtpModalOpen(true);
    } else {
      // Cash on Delivery
      finalizeOrder({ paymentMethod: 'Cash on Delivery (COD)', codFee: 49 });
    }
  };

  const finalizeOrder = (paymentDetails = {}) => {
    const customer = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip}, ${formData.country}`
    };

    const order = placeOrder(customer, shippingOption, paymentMethod, paymentDetails);
    setConfirmedOrder(order);
    setIsUpiModalOpen(false);
    setCardOtpModalOpen(false);
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
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
        <div 
          className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-slate-950">
                  {step === 4 ? 'Order Confirmed!' : 'Aura Direct Checkout'}
                </span>
                <span className="text-[10px] bg-slate-200/80 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                  INR • ₹
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {step === 4 
                  ? 'Your order is routed directly to manufacturer fulfillment' 
                  : `Step ${step} of 3 • 256-Bit SSL Encrypted Indian Gateway`}
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
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Truck className="w-4 h-4 text-slate-950" />
                    <span>1. Delivery Address & Contact</span>
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-semibold">Doorstep Delivery in India</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (For Courier OTP)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address, Apartment / Suite</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      maxLength={6}
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-slate-950 hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-full text-xs flex items-center gap-2 transition shadow-sm"
                  >
                    <span>Proceed to Shipping Method</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-950" />
                  <span>2. Select Line-Haul Courier Speed</span>
                </h4>

                <div className="space-y-3">
                  <label className={`block p-4 rounded-2xl border cursor-pointer transition ${
                    shippingOption === 'standard' ? 'border-slate-950 bg-slate-50/80 ring-1 ring-slate-950' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption === 'standard'}
                          onChange={() => setShippingOption('standard')}
                          className="text-slate-950 focus:ring-slate-950"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Standard Surface Express (Tracked Air Freight)</p>
                          <p className="text-[11px] text-slate-500">3-5 business days delivery via Delhivery / Shadowfax</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">FREE</span>
                    </div>
                  </label>

                  <label className={`block p-4 rounded-2xl border cursor-pointer transition ${
                    shippingOption === 'express' ? 'border-slate-950 bg-slate-50/80 ring-1 ring-slate-950' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption === 'express'}
                          onChange={() => setShippingOption('express')}
                          className="text-slate-950 focus:ring-slate-950"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Priority BlueDart Direct Air (Next-Day Dispatched)</p>
                          <p className="text-[11px] text-slate-500">2-3 business days guaranteed with dedicated SMS alerts</p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-950">+₹199</span>
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
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Selection */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-950" />
                    <span>3. Choose Payment Method</span>
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <Lock className="w-3 h-3" />
                    <span>100% RBI & NPCI Compliant</span>
                  </div>
                </div>

                {/* Payment Option Radios */}
                <div className="space-y-2.5">
                  {/* Option 1: UPI */}
                  <div 
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      paymentMethod === 'upi'
                        ? 'border-slate-950 bg-slate-50/80 ring-1 ring-slate-950'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">UPI (Google Pay, PhonePe, Paytm, CRED)</span>
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            ₹100 DISCOUNT
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">Instant scan QR or enter UPI ID • Zero handling charge</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'upi' ? 'border-slate-950 bg-slate-950' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'upi' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>

                  {/* Option 2: Cards */}
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      paymentMethod === 'card'
                        ? 'border-slate-950 bg-slate-50/80 ring-1 ring-slate-950'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">Credit / Debit Card (Visa, RuPay, Mastercard)</span>
                        </div>
                        <p className="text-[11px] text-slate-400">Secure 3D OTP verification • All Indian banks supported</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-slate-950 bg-slate-950' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>

                  {/* Option 3: COD */}
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-slate-950 bg-slate-50/80 ring-1 ring-slate-950'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">Cash on Delivery (Doorstep Cash)</span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            +₹49 Fee
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">Pay cash directly to courier agent on delivery</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'cod' ? 'border-slate-950 bg-slate-950' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>

                {/* Order Summary & Pricing Breakdown */}
                <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 text-xs space-y-1.5 mt-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Total ({cart.length} items)</span>
                    <span className="font-semibold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping ({shippingOption === 'express' ? 'Priority BlueDart Air' : 'Standard Express'})</span>
                    <span className="font-semibold text-slate-900">{expressFee > 0 ? `+₹${expressFee}` : 'FREE'}</span>
                  </div>
                  {paymentMethod === 'upi' && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>UPI Instant Discount</span>
                      <span>-₹100</span>
                    </div>
                  )}
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-slate-600">
                      <span>COD Courier Handling Fee</span>
                      <span>+₹49</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-950 pt-2.5 border-t border-slate-200">
                    <span>Final Amount Payable</span>
                    <span className="text-base text-slate-950 font-black">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Back and Confirm Button */}
                <div className="pt-3 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full text-xs flex items-center gap-2 transition shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>
                      {paymentMethod === 'upi' ? `Pay ₹${finalTotal.toLocaleString('en-IN')} via UPI` : (
                        paymentMethod === 'cod' ? `Confirm COD Order (₹${finalTotal.toLocaleString('en-IN')})` : `Pay with Card (₹${finalTotal.toLocaleString('en-IN')})`
                      )}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Order Confirmation & Live Dropship Dispatch Sync */}
            {step === 4 && confirmedOrder && (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900">Thank You, {formData.name.split(' ')[0]}!</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Order <span className="font-mono font-bold text-blue-600">{confirmedOrder.id}</span> is confirmed and routed to our fulfillment hub.
                  </p>
                </div>

                {/* Order Details Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Payment Mode:</span>
                    <span className="font-semibold text-emerald-600">{confirmedOrder.paymentMethod || 'Prepaid UPI'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Ship To:</span>
                    <span className="font-normal text-slate-600 truncate max-w-xs">{confirmedOrder.customer.address}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Courier Assigned:</span>
                    <span className="font-normal text-slate-600">{confirmedOrder.shippingCarrier}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Fulfillment Status:</span>
                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 font-bold">
                      Pending Supplier Sourcing
                    </span>
                  </div>
                </div>

                {/* Dual Options */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleTrackCreatedOrder}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-sm"
                  >
                    <Search className="w-4 h-4" />
                    <span>Track Parcel Journey</span>
                  </button>
                  <button
                    onClick={handleJumpToAdmin}
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-2xs"
                  >
                    <LayoutDashboard className="w-4 h-4 text-blue-600" />
                    <span>Open Dropship OS to Fulfill</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* UPI Payment Modal (BHIM / PhonePe / GPay QR) */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        amount={finalTotal}
        onPaymentSuccess={(upiDetails) => {
          finalizeOrder(upiDetails);
        }}
      />

      {/* Simulated Card OTP Modal */}
      {cardOtpModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-100 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Bank 3D Secure OTP</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Enter simulated 6-digit OTP sent to {formData.phone}
              </p>
            </div>
            <input
              type="text"
              maxLength={6}
              placeholder="1 2 3 4 5 6"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <p className="text-[10px] text-slate-400">Demo sandbox mode: Type any 6 numbers to authenticate</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCardOtpModalOpen(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-full"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => finalizeOrder({ paymentMethod: 'Card (Visa/RuPay)', last4: '8910' })}
                className="flex-1 py-2 text-xs font-bold bg-slate-950 text-white rounded-full hover:bg-slate-800"
              >
                Submit OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
