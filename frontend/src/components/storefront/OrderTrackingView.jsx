import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Truck, Package, CheckCircle2, Clock, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

export default function OrderTrackingView() {
  const { orders, trackingLookupId, setTrackingLookupId } = useApp();
  const [searchInput, setSearchInput] = useState(trackingLookupId || (orders[0]?.id || 'ORD-94821'));

  const matchedOrder = orders.find(
    o => o.id.toLowerCase() === searchInput.trim().toLowerCase() ||
         (o.trackingNumber && o.trackingNumber.toLowerCase() === searchInput.trim().toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
          <Truck className="w-3.5 h-3.5" />
          <span>Real-Time Line-Haul Tracking</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Track Your Dropship Parcel
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Enter your Order ID (e.g. ORD-94821) or Carrier Tracking Number to track customs clearance, transit milestones, and doorstep delivery.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-md max-w-xl mx-auto mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID (e.g. ORD-94821)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-sm"
          >
            Track
          </button>
        </form>

        {/* Quick sample chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          <span>Sample Orders:</span>
          {orders.slice(0, 3).map((ord) => (
            <button
              key={ord.id}
              onClick={() => setSearchInput(ord.id)}
              className={`px-2 py-0.5 rounded font-mono font-medium border transition ${
                searchInput === ord.id
                  ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {ord.id} ({ord.status})
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {matchedOrder ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-8">
          {/* Top Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 font-mono">{matchedOrder.id}</h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  matchedOrder.status === 'Delivered'
                    ? 'bg-emerald-100 text-emerald-800'
                    : matchedOrder.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                }`}>
                  {matchedOrder.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Placed on {new Date(matchedOrder.placedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })} • Carrier: <strong className="text-slate-700">{matchedOrder.shippingCarrier}</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">Carrier Waybill</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-800">
                {matchedOrder.trackingNumber || 'Pending Sourcing Assignment'}
              </span>
            </div>
          </div>

          {/* Stepper Progress Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
              Milestone Progression
            </h4>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {matchedOrder.trackingSteps.map((step, idx) => {
                const isCompleted = step.completed;
                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Step Icon / Dot */}
                    <div className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 bg-white transition ${
                      isCompleted ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-slate-300 text-slate-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h5 className={`text-xs sm:text-sm font-bold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.stage}
                        </h5>
                        <span className={`text-[11px] font-mono ${isCompleted ? 'text-emerald-700 font-semibold' : 'text-slate-400'}`}>
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination and Package Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Delivery Address</span>
              </div>
              <p className="font-semibold text-slate-900">{matchedOrder.customer.name}</p>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{matchedOrder.customer.address}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Enclosed Items ({matchedOrder.items.length})</span>
              </div>
              <div className="space-y-2">
                {matchedOrder.items.map((it, iIdx) => (
                  <div key={iIdx} className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 truncate max-w-[200px] font-medium">
                      {it.quantity}x {it.title} ({it.variant})
                    </span>
                    <span className="font-bold text-slate-900">${(it.retailPrice * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-900">No Order Found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            We couldn't locate an order matching "{searchInput}". Please double check your order confirmation email or select one of the sample orders above.
          </p>
        </div>
      )}
    </div>
  );
}

