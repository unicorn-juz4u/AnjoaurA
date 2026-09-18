import React from 'react';
import { CONFIG } from '../config';
import ProductBundleVisual from './ProductBundleVisual';
import { ArrowRight, Check } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export default function Hero() {
  const handleCtaClick = (e) => {
    e.preventDefault();
    trackEvent(ANALYTICS_EVENTS.CHECKOUT_STARTED, { source: 'hero_cta' });
    const target = document.getElementById("checkout-section") || document.getElementById("offer-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("customer-email-input");
        if (input) input.focus();
      }, 400);
    }
  };

  return (
    <section className="relative pt-2 pb-6 sm:pt-6 sm:pb-10 overflow-hidden">
      {/* Subtle ambient lighting garnish */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-400/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Responsive Grid: Stacks cleanly on mobile, 2-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* TEXT & ACTION COLUMN */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-1.5 w-fit bg-yellow-400/10 border border-yellow-400/25 rounded-full px-3 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-yellow-400">
                DIGITAL CREATOR LAUNCH SYSTEM
              </span>
            </div>

            {/* Main Headline: 3 balanced lines mapping to the 3-engine stages */}
            <h1 className="text-2xl min-[390px]:text-3xl sm:text-4xl lg:text-[32px] xl:text-[36px] font-black text-white tracking-tight leading-[1.14] mb-3">
              <span className="block">VALIDATE THE IDEA.</span>
              <span className="block">BUILD THE EXPERIENCE.</span>
              <span className="text-yellow-400 block">CREATE THE VISUALS.</span>
            </h1>

            {/* Supporting sentence */}
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4 max-w-lg">
              A practical 3-resource system to help you move from digital idea to execution.
            </p>

            {/* Mobile Product Visual with compact spacing */}
            <div className="block lg:hidden my-3">
              <ProductBundleVisual size="mobile-hero" showBadge={false} />
            </div>

            {/* 3 Deliverables: Mobile-optimized, lightweight micro-cards without bulky box clutter */}
            <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-5 max-w-lg w-full">
              {/* Deliverable 01 */}
              <div className="flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900/60 border border-yellow-400/20 text-left backdrop-blur-sm shadow-md">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 shrink-0">
                  01 VALIDATE
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-slate-100 leading-snug">
                  Problem Solving & Digital Monetization Guide
                </span>
              </div>

              {/* Deliverable 02 */}
              <div className="flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900/60 border border-cyan-400/20 text-left backdrop-blur-sm shadow-md">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 shrink-0">
                  02 BUILD
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-slate-100 leading-snug">
                  Antigravity + Claude Website Build Guide
                </span>
              </div>

              {/* Deliverable 03 */}
              <div className="flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900/60 border border-yellow-400/20 text-left backdrop-blur-sm shadow-md">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 shrink-0">
                  03 CREATE
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-slate-100 leading-snug">
                  100+ Visual Prompt Shortcuts
                </span>
              </div>
            </div>

            {/* PRIMARY CTA BLOCK */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">

              {/* Primary CTA Button */}
              <a
                href={CONFIG.PAYMENT_LINK}
                onClick={handleCtaClick}
                id="hero-primary-cta"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black text-base sm:text-lg py-3 px-8 rounded-xl transition-all duration-150 shadow-xl shadow-yellow-400/15 border border-yellow-300 cursor-pointer text-center"
              >
                <span>GET ALL 3 — {CONFIG.PRICE}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Under CTA microcopy */}
              <p className="text-xs text-slate-400 mt-2 flex items-center justify-center sm:justify-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>One-time payment • All 3 PDFs included • Instant access</span>
              </p>

            </div>

          </div>

          {/* DESKTOP PRODUCT VISUAL COLUMN */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
            <ProductBundleVisual size="default" showBadge={true} />
          </div>

        </div>

      </div>
    </section>
  );
}
