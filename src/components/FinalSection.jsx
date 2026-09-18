import React from 'react';
import { CONFIG } from '../config';
import { ArrowRight } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export default function FinalSection() {
  const handleCtaClick = (e) => {
    e.preventDefault();
    trackEvent(ANALYTICS_EVENTS.CHECKOUT_STARTED, { source: 'final_cta' });
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
    <section className="relative py-10 sm:py-14 bg-[#070A12] border-b border-white/5 text-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Closing Question */}
        <h2 className="text-xl min-[390px]:text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          READY TO LAUNCH YOUR DIGITAL PROJECT?
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Validate the idea, build the experience, and create the visuals.
        </p>


        {/* Final CTA Button */}
        <div className="max-w-md mx-auto">
          <a
            href={CONFIG.PAYMENT_LINK}
            onClick={handleCtaClick}
            id="final-cta-btn"
            className="group w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black text-base sm:text-lg py-3.5 px-6 rounded-xl transition-all duration-150 shadow-xl border border-yellow-300 cursor-pointer"
          >
            <span>GET ALL 3 — {CONFIG.PRICE}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <p className="text-xs text-slate-400 mt-2">
            One-time payment • All 3 PDFs included • Instant access
          </p>
        </div>

      </div>
    </section>
  );
}
