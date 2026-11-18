import React, { useState } from 'react';
import { ChevronDown, Box, Cpu, ShieldCheck, RefreshCw } from 'lucide-react';

export default function ProductFaqAccordion({ product }) {
  const [openSection, setOpenSection] = useState('specs'); // 'specs' | 'box' | 'warranty' | 'shipping'

  const toggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
      {/* 1. Technical Specifications */}
      {product.specs && (
        <div className="border border-slate-200/60 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            type="button"
            onClick={() => toggle('specs')}
            className="w-full flex items-center justify-between p-3.5 text-left font-bold text-slate-900 hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Technical Specifications</span>
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSection === 'specs' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'specs' && (
            <div className="p-3.5 pt-0 border-t border-slate-100 bg-white">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <dt className="text-slate-500 font-medium">{key}:</dt>
                    <dd className="font-bold text-slate-900 text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}

      {/* 2. In The Box */}
      {product.inTheBox && (
        <div className="border border-slate-200/60 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            type="button"
            onClick={() => toggle('box')}
            className="w-full flex items-center justify-between p-3.5 text-left font-bold text-slate-900 hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-emerald-600" />
              <span>Package Contents (In The Box)</span>
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSection === 'box' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'box' && (
            <div className="p-3.5 pt-0 border-t border-slate-100 bg-white">
              <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 list-disc list-inside">
                {product.inTheBox.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 3. Warranty & Guarantee */}
      <div className="border border-slate-200/60 rounded-xl overflow-hidden bg-slate-50/50">
        <button
          type="button"
          onClick={() => toggle('warranty')}
          className="w-full flex items-center justify-between p-3.5 text-left font-bold text-slate-900 hover:bg-slate-50 transition"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>1-Year Replacement Warranty</span>
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSection === 'warranty' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'warranty' && (
          <div className="p-3.5 pt-0 border-t border-slate-100 bg-white text-[11px] text-slate-600 space-y-1 pt-2">
            <p>Every genuine Aura purchase includes our 12-Month Domestic Express Replacement SLA covering manufacturing and internal component defects.</p>
            <p className="text-slate-400">Claims serviced through our domestic logistics hubs in Bengaluru and Mumbai.</p>
          </div>
        )}
      </div>
    </div>
  );
}

