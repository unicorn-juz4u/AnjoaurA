import React from 'react';
import { X, Check } from 'lucide-react';
import { CONFIG } from '../config';

export default function ContrastSection() {
  const withoutPoints = [
    'Scattered advice',
    'Blank-page hesitation',
    'Broken workflows',
    'Unclear monetization path',
  ];

  const withPoints = [
    'One connected workflow',
    'Website build framework',
    '100+ visual shortcuts',
    'Monetization guidance',
  ];

  return (
    <section className="relative py-8 sm:py-12 bg-[#070A12] border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-yellow-400 block mb-1">
            THE PRACTICAL CONTRAST
          </span>
          <h2 className="text-xl min-[390px]:text-2xl sm:text-3xl font-black text-white tracking-tight">
            WHY ATTEMPT THIS WITHOUT A BLUEPRINT?
          </h2>
        </div>

        {/* 2 Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-5">
          
          {/* Column 1: WITHOUT THE BUNDLE */}
          <div className="rounded-2xl bg-[#0c1220] border border-red-500/20 p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center">
                <X className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-red-400">
                WITHOUT THE BUNDLE
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {withoutPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold text-sm leading-none mt-0.5">✕</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: WITH THE BUNDLE */}
          <div className="rounded-2xl bg-[#0d1629] border-2 border-yellow-400/50 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-yellow-400">
                WITH THE BUNDLE
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              {withPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Takeaway Subtext */}
        <div className="text-center max-w-lg mx-auto">
          <p className="text-xs sm:text-sm text-slate-300">
            Why waste weeks in trial-and-error when the complete 3-resource system is{' '}
            <strong className="text-yellow-400 font-bold">{CONFIG.PRICE}</strong>?
          </p>
        </div>

      </div>
    </section>
  );
}
