import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function ProfitCalculatorView() {
  const [productCost, setProductCost] = useState(19.50);
  const [shippingCost, setShippingCost] = useState(4.20);
  const [retailPrice, setRetailPrice] = useState(59.99);
  const [adSpendCAC, setAdSpendCAC] = useState(14.00);
  const [paymentFeePercent, setPaymentFeePercent] = useState(2.9);
  const [paymentFixedFee, setPaymentFixedFee] = useState(0.30);

  // Computations
  const gatewayFee = (retailPrice * (paymentFeePercent / 100)) + paymentFixedFee;
  const totalCostPerUnit = productCost + shippingCost + adSpendCAC + gatewayFee;
  const netProfit = retailPrice - totalCostPerUnit;
  const netMarginPercent = retailPrice > 0 ? (netProfit / retailPrice) * 100 : 0;
  const breakEvenRoAS = (retailPrice - productCost - shippingCost - gatewayFee) > 0
    ? (retailPrice / (retailPrice - productCost - shippingCost - gatewayFee)).toFixed(2)
    : 'N/A';

  const monthlyProjections = [50, 200, 500, 1000].map(units => ({
    units,
    revenue: retailPrice * units,
    profit: netProfit * units
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Dropshipping Unit Economics & Margin Simulator
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Calculate true net profitability factoring in wholesale product costs, shipping freight, ad spend (CAC), and payment merchant fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Unit Cost & Pricing Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Wholesale Product Cost ($)
              </label>
              <input
                type="number"
                step="0.1"
                value={productCost}
                onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-600">Base vendor price per unit</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Freight / Shipping Cost ($)
              </label>
              <input
                type="number"
                step="0.1"
                value={shippingCost}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-600">Air line-haul tracking fee</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Customer Selling Price ($)
              </label>
              <input
                type="number"
                step="0.5"
                value={retailPrice}
                onChange={(e) => setRetailPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-blue-50/60 border border-blue-200 rounded-xl px-3 py-2 text-xs font-mono font-black text-blue-700 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-600">Price listed on AuraStore</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Ad Spend / CAC ($)
              </label>
              <input
                type="number"
                step="0.5"
                value={adSpendCAC}
                onChange={(e) => setAdSpendCAC(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-600">Meta / TikTok ad cost per purchase</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Payment Processing Fee (Stripe/PayPal):</span>
            <span className="font-mono font-bold text-slate-800">${gatewayFee.toFixed(2)} (2.9% + $0.30)</span>
          </div>
        </div>

        {/* Right Output Dashboard (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Live Projected Output
            </span>
            <h3 className="text-xl font-black">Net Realized Profit / Unit</h3>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-4xl font-black font-mono ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${netProfit.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400">/ sale</span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-300 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <div className="flex justify-between">
                <span>Net Margin Percentage:</span>
                <span className={`font-mono font-bold ${netMarginPercent >= 20 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {netMarginPercent.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Break-Even RoAS Required:</span>
                <span className="font-mono font-bold text-blue-400">{breakEvenRoAS}x</span>
              </div>
              <div className="flex justify-between">
                <span>Total Unit Cost (COGS + Ad):</span>
                <span className="font-mono font-semibold text-slate-400">${totalCostPerUnit.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Quick Monthly Scale Table */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Monthly Scaled Projections
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              {monthlyProjections.map((proj) => (
                <div key={proj.units} className="bg-slate-800/40 p-2 rounded-lg border border-slate-700/40">
                  <span className="text-[10px] text-slate-400 block font-bold">{proj.units} orders</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 block mt-0.5">
                    ${(proj.profit > 0 ? proj.profit : 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

