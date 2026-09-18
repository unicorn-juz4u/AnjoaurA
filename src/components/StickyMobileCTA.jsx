import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { ArrowRight } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA when scrolling past the Hero CTA (approx 260px)
      const heroCta = document.getElementById('hero-primary-cta');
      const footer = document.querySelector('footer');

      const isPastHero = heroCta ? heroCta.getBoundingClientRect().bottom < 0 : window.scrollY > 280;

      // Automatically hide sticky CTA when footer comes into view so footer is completely unobstructed
      let isFooterInView = false;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        isFooterInView = footerRect.top < window.innerHeight;
      }

      setIsVisible(isPastHero && !isFooterInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    trackEvent(ANALYTICS_EVENTS.CHECKOUT_STARTED, { source: 'sticky_mobile_cta' });
    const target = document.getElementById('checkout-section') || document.getElementById('offer-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('customer-email-input');
        if (input) input.focus();
      }, 450);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-[#070A12]/95 backdrop-blur-xl border-t border-yellow-400/20 px-4 py-2.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-3 max-w-sm mx-auto">
        {/* Left: ₹299 + All 3 */}
        <div className="flex flex-col text-left">
          <span className="text-base font-black text-yellow-400 leading-none">
            {CONFIG.PRICE}
          </span>
          <span className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
            All 3 PDFs
          </span>
        </div>

        {/* Right: GET ALL 3 — ₹299 button */}
        <a
          href="#checkout-section"
          onClick={handleCtaClick}
          id="sticky-mobile-cta"
          className="inline-flex items-center justify-center gap-1.5 bg-yellow-400 active:bg-yellow-300 text-slate-950 font-black text-xs min-[380px]:text-sm py-2.5 px-4 rounded-xl shadow-lg cursor-pointer shrink-0"
        >
          <span>GET ALL 3 — {CONFIG.PRICE}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
