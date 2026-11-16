import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, ShieldCheck, Zap, Sliders, Bell } from 'lucide-react';

export default function SettingsView() {
  const { settings, setSettings, showToast } = useApp();
  const [localSettings, setLocalSettings] = useState({ ...settings });

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(localSettings);
    showToast('Dropship automation rules updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Dropshipping Automation & Store Configuration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure markup calculation algorithms, auto-fulfillment conditions, and supplier inventory synchronization.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Pricing & Markup Rules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Global Markup & Pricing Rules</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Retail Markup Multiplier
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="1.0"
                  max="5.0"
                  value={localSettings.defaultMarkup}
                  onChange={(e) => setLocalSettings({ ...localSettings, defaultMarkup: parseFloat(e.target.value) || 2.4 })}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-500 font-mono w-28"
                />
                <span className="text-xs text-slate-500 font-medium">x Wholesale Cost</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Applied automatically when importing products from CJ Dropshipping / Spocket.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Customer Priority Express Shipping Surcharge ($)
              </label>
              <input
                type="number"
                step="0.5"
                value={localSettings.expressShippingRate}
                onChange={(e) => setLocalSettings({ ...localSettings, expressShippingRate: parseFloat(e.target.value) || 0 })}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-500 font-mono w-28"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Standard tracked ePacket is free; priority air freight adds this charge.
              </p>
            </div>
          </div>
        </div>

        {/* Fulfillment Automations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Zap className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Auto-Fulfillment & Vendor Sync</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-900">Automated PO Dispatch</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Automatically charge prepaid supplier wallet and dispatch orders without manual confirmation.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoFulfillEnabled}
                onChange={(e) => setLocalSettings({ ...localSettings, autoFulfillEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-900">Low Supplier Inventory Threshold</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Warn merchant when supplier stock drops below this number to prevent overselling.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={localSettings.lowStockThreshold}
                  onChange={(e) => setLocalSettings({ ...localSettings, lowStockThreshold: parseInt(e.target.value) || 10 })}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-slate-900 w-20 text-center"
                />
                <span className="text-xs text-slate-500">units</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition shadow shadow-blue-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Automation Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}

