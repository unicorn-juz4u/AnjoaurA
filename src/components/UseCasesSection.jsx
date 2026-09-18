import React from 'react';
import { Rocket, Layout, Sparkles, Megaphone, Target, Presentation } from 'lucide-react';

export default function UseCasesSection() {
  const useCases = [
    {
      title: 'LAUNCH A DIGITAL PRODUCT',
      action: 'From idea to downloadable product.',
      icon: Rocket,
    },
    {
      title: 'CLIENT WEBSITES',
      action: 'Build project structures faster.',
      icon: Layout,
    },
    {
      title: 'SOCIAL CONTENT',
      action: 'Create visual content faster.',
      icon: Sparkles,
    },
    {
      title: 'CAMPAIGN ADS',
      action: 'Generate stronger ad concepts.',
      icon: Megaphone,
    },
    {
      title: 'AFFILIATE HUBS',
      action: 'Structure content around an offer.',
      icon: Target,
    },
    {
      title: 'NEW CONCEPTS',
      action: 'Create visuals ready to present.',
      icon: Presentation,
    },
  ];

  return (
    <section className="relative py-8 sm:py-12 bg-[#080d1a] border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-yellow-400 block mb-1">
          PRACTICAL APPLICATIONS
        </span>
        <h2 className="text-xl min-[390px]:text-2xl sm:text-3xl font-black text-white tracking-tight mb-6 sm:mb-8">
          WHAT CAN YOU ACTUALLY USE IT FOR?
        </h2>

        {/* Compact 6 Use Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-left">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={i}
                className="p-3.5 sm:p-4 rounded-xl bg-[#0d1424] border border-white/10 hover:border-yellow-400/30 transition-colors flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white tracking-wide">
                    {uc.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    → {uc.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
