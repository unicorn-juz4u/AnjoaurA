import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../config';
import { ArrowRight, BookOpen } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleCtaClick = (e) => {
    if (!isHomePage) return; // Allow normal link if not on home page
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
    <header className="sticky top-0 z-40 w-full bg-[#EDE3CE]/95 backdrop-blur-md border-b border-[#15120F]/15 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Logo / Title */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/favicon.png"
            alt="AnjoAura Logo"
            className="w-8 h-8 rounded object-cover border border-[#15120F]/20 group-hover:scale-105 transition-all duration-200"
          />
          <div className="flex flex-col text-left">
            <span className="text-sm sm:text-base font-bold tracking-tight text-[#15120F] leading-tight font-serif-headline">
              AnjoAura
            </span>
            <span className="text-[10px] text-[#6B6250] font-mono-ledger uppercase tracking-wider">
              Playbook No. 01 • First $100
            </span>
          </div>
        </Link>

        {/* Right Action: Price tag & CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#15120F] bg-[#F6F0E2] px-3 py-1.5 rounded border border-[#15120F]/15 font-mono-ledger">
            <BookOpen className="w-3.5 h-3.5 text-[#B8933E]" />
            <span>5 Modules</span>
            <span className="text-[#6B6250]">•</span>
            <span className="font-bold text-[#375E42]">{CONFIG.PRICE}</span>
          </div>

          {isHomePage ? (
            <a
              href={CONFIG.PAYMENT_LINK}
              onClick={handleCtaClick}
              id="nav-cta-btn"
              className="inline-flex items-center gap-1.5 bg-[#375E42] hover:bg-[#2b4933] active:scale-[0.98] text-[#F6F0E2] font-mono-ledger font-semibold text-xs sm:text-sm px-3.5 py-2 sm:px-4 sm:py-2 rounded-xs transition-all duration-150 shadow-sm border border-[#233c2a] cursor-pointer"
            >
              <span>GET THE PLAYBOOK — {CONFIG.PRICE}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 bg-[#375E42] hover:bg-[#2b4933] active:scale-[0.98] text-[#F6F0E2] font-mono-ledger font-semibold text-xs sm:text-sm px-3.5 py-2 sm:px-4 sm:py-2 rounded-xs transition-all duration-150 shadow-sm border border-[#233c2a] cursor-pointer"
            >
              <span>STOREFRONT — {CONFIG.PRICE}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
