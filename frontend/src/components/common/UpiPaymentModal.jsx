import React, { useState, useEffect } from 'react';
import { X, QrCode, Smartphone, CheckCircle, ShieldCheck, Clock, ArrowRight, Loader2, Copy, Check } from 'lucide-react';

export default function UpiPaymentModal({ isOpen, onClose, amount, onPaymentSuccess }) {
  const [activeTab, setActiveTab] = useState('qr'); // 'qr' | 'apps'
  const [selectedApp, setSelectedApp] = useState('gpay');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success'
  const [copiedVpa, setCopiedVpa] = useState(false);

  const merchantVpa = 'auradropship.pay@icici';

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(300);
    setStatus('idle');

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCopyVpa = () => {
    navigator.clipboard?.writeText(merchantVpa);
    setCopiedVpa(true);
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  const handleSimulatePayment = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onPaymentSuccess({
          paymentMethod: 'UPI',
          upiTxnId: `UPI${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          vpa: activeTab === 'apps' && upiIdInput ? upiIdInput : 'user@okicici'
        });
      }, 1200);
    }, 1800);
  };

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=100&auto=format&fit=crop&q=60', color: 'bg-white border-slate-200' },
    { id: 'phonepe', name: 'PhonePe', icon: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=60', color: 'bg-purple-50 text-purple-700' },
    { id: 'paytm', name: 'Paytm UPI', icon: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=60', color: 'bg-sky-50 text-sky-700' },
    { id: 'cred', name: 'CRED UPI', icon: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&auto=format&fit=crop&q=60', color: 'bg-slate-900 text-white' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 font-bold text-xs">
              UPI
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Instant UPI Payment</h3>
              <p className="text-[11px] text-slate-400">Zero extra fee • ₹100 Instant Discount Applied</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={status === 'processing'}
            className="text-slate-400 hover:text-white p-1 rounded-full transition disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Payable Amount:</span>
          <span className="text-lg font-black text-slate-950">₹{amount.toLocaleString('en-IN')}</span>
        </div>

        {/* Body content based on status */}
        {status === 'processing' ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 animate-spin">
              <Loader2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Awaiting UPI Confirmation</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Please approve the payment request on your UPI app. Do not refresh or press back.
              </p>
            </div>
          </div>
        ) : status === 'success' ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Payment Verified!</h4>
              <p className="text-xs text-slate-500 mt-1">Transaction confirmed. Finalizing your order...</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Tabs: QR vs UPI ID */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setActiveTab('qr')}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'qr'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                Scan QR Code
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('apps')}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'apps'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                UPI ID / Apps
              </button>
            </div>

            {activeTab === 'qr' ? (
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Mock High-Res QR code */}
                <div className="relative p-3 bg-white rounded-2xl border-2 border-slate-200/80 shadow-inner group">
                  <div className="w-44 h-44 bg-slate-900 rounded-xl p-2.5 flex items-center justify-center relative overflow-hidden">
                    {/* Simulated realistic QR pattern */}
                    <div className="w-full h-full bg-white rounded-lg p-2 grid grid-cols-6 gap-1">
                      <div className="col-span-2 row-span-2 border-4 border-slate-900 rounded-md p-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-slate-900 rounded-xs"></div>
                      </div>
                      <div className="col-span-2 bg-slate-900 rounded-xs"></div>
                      <div className="col-span-2 row-span-2 border-4 border-slate-900 rounded-md p-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-slate-900 rounded-xs"></div>
                      </div>
                      <div className="col-span-1 bg-slate-900 rounded-xs"></div>
                      <div className="col-span-1 bg-slate-900 rounded-xs"></div>
                      <div className="col-span-2 row-span-2 border-4 border-slate-900 rounded-md p-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-slate-900 rounded-xs"></div>
                      </div>
                      <div className="col-span-2 bg-slate-900 rounded-xs"></div>
                      <div className="col-span-2 bg-slate-900 rounded-xs"></div>
                      <div className="col-span-2 bg-slate-900 rounded-xs"></div>
                      <div className="col-span-1 bg-slate-900 rounded-xs"></div>
                      <div className="col-span-1 bg-slate-900 rounded-xs"></div>
                    </div>

                    {/* Center UPI Logo badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-black rounded-md shadow-md tracking-wider">
                        BHIM UPI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timer & VPA */}
                <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>QR expires in {formatTimer(timeLeft)}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Merchant VPA:</span>
                  <code className="font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    {merchantVpa}
                  </code>
                  <button
                    onClick={handleCopyVpa}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded transition"
                    title="Copy UPI ID"
                  >
                    {copiedVpa ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 max-w-xs">
                  Scan using Google Pay, PhonePe, Paytm, or any BHIM UPI mobile application to approve.
                </p>

                {/* Quick Simulation CTA */}
                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-3 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>Simulate Payment Received</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Apps Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">Select Your UPI App</label>
                  <div className="grid grid-cols-2 gap-2">
                    {upiApps.map(app => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setSelectedApp(app.id)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition ${
                          selectedApp === app.id
                            ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg ${app.color} flex items-center justify-center text-[10px] font-black border border-slate-200`}>
                          UPI
                        </div>
                        <span className="text-xs font-bold text-slate-800">{app.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enter VPA */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Or Enter Your UPI ID</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. mobile@okaxis"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <button
                      type="button"
                      onClick={handleSimulatePayment}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition shrink-0"
                    >
                      Verify & Pay
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full py-3 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2"
                  >
                    <span>Send UPI Collect Request (₹{amount.toLocaleString('en-IN')})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>NPCI Unified Payments Interface • 100% RBI Compliant</span>
        </div>
      </div>
    </div>
  );
}
