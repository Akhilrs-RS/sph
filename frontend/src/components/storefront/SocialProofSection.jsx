import React from 'react';
import { Star, CheckCircle, ShieldCheck, Truck, Quote } from 'lucide-react';

export default function SocialProofSection() {
  const reviews = [
    {
      id: 1,
      author: "Vikramaditya Sengupta",
      role: "Lead Systems Architect",
      city: "Koramangala, Bengaluru",
      rating: 5,
      product: "Aura Pulse Pro ANC Headphones",
      date: "Delivered in 42 hours via BlueDart",
      comment: "The build quality exceeds headphones twice this price point. Soundstage is remarkably crisp with flat audiophile tuning, and the active noise cancellation completely silences coffee shop chatter.",
      avatar: "V"
    },
    {
      id: 2,
      author: "Meera Krishnan",
      role: "Product Designer",
      city: "Bandra West, Mumbai",
      rating: 5,
      product: "Aura Arc Minimalist MagSafe Stand",
      date: "Delivered in 48 hours via Delhivery",
      comment: "Solid billet aluminum with zero wobble. The sandblasted anodized finish matches my Space Gray MacBook perfectly. Seamless StandBy mode experience on my nightstand.",
      avatar: "M"
    },
    {
      id: 3,
      author: "Rohan Varma",
      role: "Full-Stack Developer",
      city: "Cyber City, Gurugram (Delhi NCR)",
      rating: 5,
      product: "Aura Horizon Ambient Lightbar",
      date: "Delivered in 3 days with tamper seal",
      comment: "The asymmetric optical lens means zero glare on my curved ultra-wide monitor. The wireless rotary desktop dial feels weighted and premium. Outstanding purchase.",
      avatar: "R"
    }
  ];

  const proofMetrics = [
    { label: "Verified Domestic Deliveries", value: "12,400+", icon: Truck },
    { label: "Average Customer Rating", value: "4.9 / 5.0", icon: Star },
    { label: "Line-Haul Express SLA", value: "48 Hours", icon: ShieldCheck },
    { label: "Factory Audited & Inspected", value: "100%", icon: CheckCircle }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Proof Banner Header */}
      <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/80 mb-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Customer Experiences Across India</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Trusted by Creators, Engineers & Audiophiles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Direct-from-factory sourcing eliminates retail markup without sacrificing studio-grade craftsmanship.
          </p>
        </div>

        {/* 4 Proof Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/60">
          {proofMetrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-2xs text-slate-800 border border-slate-200/60 mb-1">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight">
                  {m.value}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {m.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Reviews Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Stars & Verified Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200/60">
                  <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                  Verified Buyer
                </span>
              </div>

              {/* Review Quote */}
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                "{r.comment}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {r.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-950 leading-tight">{r.author}</h4>
                  <p className="text-[10px] text-slate-400">{r.role} • {r.city}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

