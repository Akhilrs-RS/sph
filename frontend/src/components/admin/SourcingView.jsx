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
  ExternalLink,
  Link2,
  Loader2,
  TrendingUp,
  Percent
} from 'lucide-react';

export default function SourcingView() {
  const { sourcingCatalog, importToStorefront, settings, showToast } = useApp();
  const [selectedItemToImport, setSelectedItemToImport] = useState(null);
  const [markupMultiplier, setMarkupMultiplier] = useState(settings.defaultMarkup || 2.2);
  const [filterPlatform, setFilterPlatform] = useState('All');

  // URL / SKU Importer State
  const [importUrlInput, setImportUrlInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedItem, setExtractedItem] = useState(null);

  const platforms = ['All', 'CJ Dropshipping', 'AliExpress Direct', 'Spocket US'];

  const filteredCatalog = sourcingCatalog.filter(
    item => filterPlatform === 'All' || item.platform === filterPlatform
  );

  const calculateRetailPrice = (item, customMultiplier = markupMultiplier) => {
    return Math.round((item.supplierCost * customMultiplier) + item.shippingCost);
  };

  const handleConfirmImport = () => {
    if (!selectedItemToImport) return;
    const finalPrice = calculateRetailPrice(selectedItemToImport);
    importToStorefront(selectedItemToImport, finalPrice);
    setSelectedItemToImport(null);
  };

  const handleUrlExtract = (e) => {
    e.preventDefault();
    if (!importUrlInput.trim()) return;

    setIsExtracting(true);
    setExtractedItem(null);

    // Simulate real-time supplier API scraper/parser
    setTimeout(() => {
      const mockParsedItem = {
        id: `SRC-URL-${Date.now().toString().slice(-4)}`,
        title: 'Ultra-Slim MagSafe 10,000mAh Powerbank with Stand',
        category: 'Electronics',
        platform: importUrlInput.includes('aliexpress') ? 'AliExpress Direct' : 'CJ Dropshipping',
        supplierName: 'Shenzhen Baseus OEM Partner',
        supplierRating: 4.9,
        supplierCost: 890,
        shippingCost: 110,
        shippingTime: '3-5 days air line-haul',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
        description: 'Magnetic snap wireless charging battery pack with foldable zinc kickstand and digital LED battery meter.'
      };

      setExtractedItem(mockParsedItem);
      setIsExtracting(false);
      showToast('Supplier specifications and wholesale pricing extracted!');
    }, 1200);
  };

  const handleConfirmExtractedImport = () => {
    if (!extractedItem) return;
    const finalPrice = calculateRetailPrice(extractedItem);
    importToStorefront(extractedItem, finalPrice);
    setExtractedItem(null);
    setImportUrlInput('');
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
            <span className="text-xs bg-slate-900 text-white font-bold px-2.5 py-0.5 rounded-full">
              CJ & AliExpress Live API
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

      {/* 1-Click URL / SKU Dropship Importer Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Instant URL / SKU Importer</h3>
              <p className="text-[11px] text-slate-400">Paste AliExpress, CJ Dropshipping, or Taobao link to import with automated markup</p>
            </div>
          </div>
          <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200/60 hidden sm:inline">
            Automated 2.2x Retail Multiplier
          </span>
        </div>

        <form onSubmit={handleUrlExtract} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="e.g. https://cjdropshipping.com/product/magnetic-powerbank-18923.html or SKU-8821..."
              value={importUrlInput}
              onChange={(e) => setImportUrlInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-20 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none font-mono"
            />
            {importUrlInput && (
              <button
                type="button"
                onClick={() => { setImportUrlInput(''); setExtractedItem(null); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={isExtracting || !importUrlInput.trim()}
            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shrink-0 shadow-sm"
          >
            {isExtracting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Extracting Specs...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Analyze & Extract</span>
              </>
            )}
          </button>
        </form>

        {/* Extracted Item Preview Card */}
        {extractedItem && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <img
                src={extractedItem.image}
                alt={extractedItem.title}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.2 rounded">
                    {extractedItem.platform}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{extractedItem.title}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 font-mono">
                  <span>Cost: <strong>₹{extractedItem.supplierCost}</strong></span>
                  <span>Freight: <strong>₹{extractedItem.shippingCost}</strong></span>
                  <span className="text-emerald-600 font-bold">
                    Retail (2.2x): ₹{calculateRetailPrice(extractedItem)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmExtractedImport}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-end md:self-center shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish to Storefront (₹{calculateRetailPrice(extractedItem).toLocaleString('en-IN')})</span>
            </button>
          </div>
        )}
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
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
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
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Wholesale</span>
                      <span className="text-xs font-mono font-bold text-slate-900">₹{item.supplierCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Shipping</span>
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
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Retail ({markupMultiplier}x)</span>
                    <span className="text-sm font-black text-slate-950">₹{calculatedPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => setSelectedItemToImport(item)}
                    className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm"
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
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
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
                  className="w-full accent-slate-950 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1.5x (Low Margin)</span>
                  <span>2.2x (Standard)</span>
                  <span>4.0x (High Ticket)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-black text-slate-900">Calculated Store Retail Price:</span>
                <span className="text-lg font-black text-slate-950">
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
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-950 hover:bg-slate-800 text-white transition shadow-sm"
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
