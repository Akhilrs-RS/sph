import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export default function TrustBadges() {
  const items = [
    {
      icon: Truck,
      title: "Line-Haul Tracked Express",
      desc: "Fast delivery with live doorstep milestones."
    },
    {
      icon: ShieldCheck,
      title: "Buyer Protection SLA",
      desc: "Guaranteed refunds for damaged or delayed transit."
    },
    {
      icon: RefreshCw,
      title: "Hassle-Free 30-Day Returns",
      desc: "Domestic exchange hubs across Bengaluru & Mumbai."
    },
    {
      icon: Headphones,
      title: "24/7 Human Concierge",
      desc: "Dedicated support team via live chat & email."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 flex-shrink-0 shadow-2xs">
                <Icon className="w-4 h-4 text-slate-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
