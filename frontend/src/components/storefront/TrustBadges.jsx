import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: "Global Tracked Shipping",
      desc: "Fast line-haul air freight with live end-to-end milestone tracking."
    },
    {
      icon: ShieldCheck,
      title: "Buyer Protection Guarantee",
      desc: "Full refund if your item arrives damaged, late, or not as described."
    },
    {
      icon: RefreshCw,
      title: "Hassle-Free 30-Day Returns",
      desc: "Domestic return hubs in US & Europe for quick exchanges."
    },
    {
      icon: Headphones,
      title: "24/7 Dedicated Support",
      desc: "Real human customer assistance via email and live parcel concierge."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{badge.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

