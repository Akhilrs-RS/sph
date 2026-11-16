import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Star, Clock, ShieldCheck, CheckCircle2, DollarSign, Plus } from 'lucide-react';

export default function SuppliersView() {
  const { suppliers, showToast } = useApp();

  const handleTopUp = (supName) => {
    showToast(`₹50,000 added to ${supName} prepaid fulfillment wallet!`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Connected Dropshipping Suppliers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your integrated vendors, fulfillment SLAs, automated balance top-ups, and dispute track records.
          </p>
        </div>

        <button
          onClick={() => showToast('New API integration wizard available in Enterprise tier.', 'info')}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect New Supplier</span>
        </button>
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Title & Status */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{sup.name}</h3>
                  <span className="text-[10px] text-blue-600 font-mono font-bold block mt-0.5">
                    {sup.platform} API v3.2
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Connected</span>
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                {sup.specialty}
              </p>

              {/* Metrics */}
              <div className="mt-4 space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hub Locations:</span>
                  <span className="font-semibold text-slate-800 text-right">{sup.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Avg. Dispatch Delay:</span>
                  <span className="font-bold text-blue-600">{sup.avgFulfillmentHours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dispute Rate:</span>
                  <span className="font-bold text-emerald-600">{sup.disputeRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Orders Processed:</span>
                  <span className="font-mono font-bold text-slate-800">{sup.ordersProcessed}</span>
                </div>
              </div>

              {/* Prepaid Balance */}
              <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block">
                    Prepaid Auto-Fulfill Wallet
                  </span>
                  <span className="text-base font-black text-slate-900 font-mono">
                    {sup.balance}
                  </span>
                </div>
                <button
                  onClick={() => handleTopUp(sup.name)}
                  className="bg-white hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-200 text-xs font-bold px-2.5 py-1.5 rounded-lg transition shadow-sm"
                >
                  + Top Up
                </button>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {sup.rating} Supplier Rating
              </span>
              <span>Daily Auto-Sync: Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

