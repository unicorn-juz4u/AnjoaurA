import React from 'react';
import { CONFIG } from '../config';
import { ArrowRight, Layers } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export default function Navbar() {
  const handleCtaClick = (e) => {
    e.preventDefault();
    trackEvent(ANALYTICS_EVENTS.CHECKOUT_STARTED, { source: 'navbar' });
    const target = document.getElementById("checkout-section") || document.getElementById("offer-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("customer-email-input");
        if (input) input.focus();
      }, 450);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070A12]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 sm:h-16 flex items-center justify-between">
        
        {/* Brand Logo / Title */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/favicon.png"
            alt="AnjoAura Logo"
            className="w-9 h-9 rounded-xl object-cover border border-yellow-400/30 group-hover:border-yellow-400 group-hover:scale-105 transition-all duration-300 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-tight text-white leading-tight">
              Anjo<span className="text-yellow-400">Aura</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Digital Creator Launch System
            </span>
          </div>
        </a>

        {/* Right Action: Price tag & CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10">
            <Layers className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-slate-300 font-medium">All 3 PDFs</span>
            <span className="text-slate-600">•</span>
            <span className="font-bold text-yellow-400">{CONFIG.PRICE}</span>
          </div>

          <a
            href={CONFIG.PAYMENT_LINK}
            onClick={handleCtaClick}
            id="nav-cta-btn"
            className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black text-xs sm:text-sm px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl transition-all duration-200 yellow-glow-sm cursor-pointer shadow-md"
          >
            <span>GET ALL 3 — {CONFIG.PRICE}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  );
}
