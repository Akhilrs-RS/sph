import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PackageSearch,
  Star,
  Truck,
  Plus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';

export default function SourcingView() {
  const { sourcingCatalog, importToStorefront, settings } = useApp();
  const [selectedItemToImport, setSelectedItemToImport] = useState(null);
  const [markupMultiplier, setMarkupMultiplier] = useState(settings.defaultMarkup || 2.4);
  const [filterPlatform, setFilterPlatform] = useState('All');

  const platforms = ['All', 'CJ Dropshipping', 'AliExpress Direct', 'Spocket US'];

  const filteredCatalog = sourcingCatalog.filter(
    item => filterPlatform === 'All' || item.platform === filterPlatform
  );

  const calculateRetailPrice = (item) => {
    return Math.round((item.supplierCost * markupMultiplier) + item.shippingCost);
  };

  const handleConfirmImport = () => {
    if (!selectedItemToImport) return;
    const finalPrice = calculateRetailPrice(selectedItemToImport);
    importToStorefront(selectedItemToImport, finalPrice);
    setSelectedItemToImport(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Dropship Sourcing Marketplace
            </h1>
            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full">
              CJ & Spocket Synced
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified factory suppliers, review wholesale pricing & fulfillment speeds, and import trending items with 1 click.
          </p>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          {platforms.map((plat) => (
            <button
              key={plat}
              onClick={() => setFilterPlatform(plat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                filterPlatform === plat
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Sourcing Product Cards Grid */}
      {filteredCatalog.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCatalog.map((item) => {
            const calculatedPrice = calculateRetailPrice(item);
            const estProfit = calculatedPrice - item.supplierCost - item.shippingCost;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Image & Platform Badge */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="text-[10px] font-bold bg-slate-900/90 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
                        {item.platform}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1 text-[11px] font-bold bg-amber-400/90 text-slate-950 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm">
                      <Star className="w-3 h-3 fill-slate-950" />
                      <span>{item.supplierRating}</span>
                    </div>
                  </div>

                  {/* Title & Supplier */}
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pb-3 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">{item.supplierName}</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Truck className="w-3 h-3 text-blue-600" />
                      {item.shippingTime}
                    </span>
                  </div>

                  {/* Financial Sourcing Metrics */}
                  <div className="grid grid-cols-3 gap-2 mt-3 p-3 bg-slate-50 rounded-xl text-center">
                    <div>
                      <span className="text-[10px] text-slate-600 uppercase font-bold block">Wholesale</span>
                      <span className="text-xs font-mono font-bold text-slate-900">₹{item.supplierCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 uppercase font-bold block">Shipping</span>
                      <span className="text-xs font-mono font-bold text-slate-900">₹{item.shippingCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-700 uppercase font-bold block">Est. Profit</span>
                      <span className="text-xs font-mono font-black text-emerald-600">+₹{Math.round(estProfit).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Import Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-600 uppercase font-bold block">Retail (2.2x)</span>
                    <span className="text-sm font-black text-blue-600">₹{calculatedPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => setSelectedItemToImport(item)}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow shadow-blue-500/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Import to Storefront</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">All available sourcing items imported!</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You've published all catalog recommendations to your live customer storefront. Check back soon for fresh supplier sync feeds.
          </p>
        </div>
      )}

      {/* 1-Click Import Confirmation Modal */}
      {selectedItemToImport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Automated Markup Engine
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Import "{selectedItemToImport.title}"
                </h3>
              </div>
              <button
                onClick={() => setSelectedItemToImport(null)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Supplier Wholesale Cost:</span>
                <span className="font-mono font-bold text-slate-900">₹{selectedItemToImport.supplierCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Freight & Packaging:</span>
                <span className="font-mono font-bold text-slate-900">₹{selectedItemToImport.shippingCost.toLocaleString('en-IN')}</span>
              </div>

              {/* Multiplier Slider */}
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Markup Multiplier:</span>
                  <span className="text-blue-600">{markupMultiplier}x</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="4.0"
                  step="0.1"
                  value={markupMultiplier}
                  onChange={(e) => setMarkupMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600">
                  <span>1.5x (Low Margin)</span>
                  <span>2.2x (Standard)</span>
                  <span>4.0x (High Ticket)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-black text-slate-900">Calculated Store Retail Price:</span>
                <span className="text-lg font-black text-blue-600">
                  ₹{calculateRetailPrice(selectedItemToImport).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedItemToImport(null)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmImport}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow shadow-blue-500/20"
              >
                Publish to Storefront
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

