import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CONFIG } from '../config';
import { ArrowRight } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export default function StickyMobileCTA() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const handleScroll = () => {
      const heroCta = document.getElementById('hero-primary-cta');
      const footer = document.querySelector('footer');

      const isPastHero = heroCta ? heroCta.getBoundingClientRect().bottom < 0 : window.scrollY > 280;

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
  }, [location.pathname]);

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

  if (!isVisible || location.pathname !== '/') return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-[#EDE3CE]/98 backdrop-blur-xl border-t border-[#15120F]/20 px-4 py-2.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_15px_rgba(21,18,15,0.12)]">
      <div className="flex items-center justify-between gap-3 max-w-sm mx-auto">
        {/* Left: Price & Label */}
        <div className="flex flex-col text-left">
          <span className="font-mono-ledger text-lg font-extrabold text-[#375E42] leading-none">
            {CONFIG.PRICE}
          </span>
          <span className="text-[10px] text-[#6B6250] font-mono-ledger leading-tight mt-0.5">
            5-Module Playbook
          </span>
        </div>

        {/* Right: GET THE PLAYBOOK button */}
        <a
          href="#checkout-section"
          onClick={handleCtaClick}
          id="sticky-mobile-cta"
          className="inline-flex items-center justify-center gap-1.5 bg-[#375E42] active:bg-[#2b4933] text-[#F6F0E2] font-mono-ledger font-bold text-xs min-[380px]:text-sm py-2.5 px-4 rounded shadow cursor-pointer shrink-0 border border-[#233c2a]"
        >
          <span>GET THE PLAYBOOK — {CONFIG.PRICE}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
