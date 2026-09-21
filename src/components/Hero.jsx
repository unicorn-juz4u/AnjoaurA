import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import ProductBundleVisual from './ProductBundleVisual';
import { ArrowRight, ShieldCheck, Download, Zap, CheckCircle2 } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';
import { fetchClaimedCount } from '../services/api';

export default function Hero() {
  const baseline = CONFIG.CLAIMED_COUNT_BASELINE || 71;
  const [claimedCount, setClaimedCount] = useState(baseline + 1);
  const [rawPaidOrders, setRawPaidOrders] = useState(baseline);
  const [totalLimit, setTotalLimit] = useState(CONFIG.TOTAL_COPIES || 100);

  useEffect(() => {
    let isMounted = true;
    fetchClaimedCount().then((res) => {
      if (isMounted && res.success) {
        setRawPaidOrders(res.count);
        // Display next copy number to claim (e.g. 83 claimed => Copy 084)
        const activeCopy = Math.max(1, Math.min(res.count + 1, res.limit || 100));
        setClaimedCount(activeCopy);
        if (res.limit) setTotalLimit(res.limit);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    trackEvent(ANALYTICS_EVENTS.CHECKOUT_STARTED, { source: 'hero_cta' });
    const target = document.getElementById("offer-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("customer-email-input");
        if (input) input.focus();
      }, 400);
    }
  };

  const formattedCopyNumber = String(claimedCount).padStart(3, '0');
  const copiesRemaining = Math.max(0, totalLimit - rawPaidOrders);

  return (
    <section className="relative pt-4 pb-8 sm:pt-8 sm:pb-12 border-b border-[#15120F]/15 bg-[#EDE3CE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Main Hero Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Editorial Column */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* 1 & 2. WHAT & WHO: Explicit Category & Audience Identifier */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="font-mono-ledger text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#375E42] bg-[#375E42]/10 px-2.5 py-1 rounded-xs border border-[#375E42]/20">
                5-Module Client Acquisition Playbook
              </span>
              <span className="font-mono-ledger text-[11px] sm:text-xs text-[#6B6250] font-medium">
                For Beginners With A Skill But No Clients Yet
              </span>
            </div>

            {/* Headline: Upright Sora, Weight 800, Tight Leading */}
            <h1 className="font-headline text-[28px] leading-[1.10] min-[400px]:text-[32px] min-[400px]:leading-[1.12] sm:text-[42px] lg:text-[44px] sm:leading-[1.12] font-extrabold text-[#15120F] tracking-tight mb-3">
              Turn One Skill Into Your First $100 Online — This Week
            </h1>

            {/* Subhead: Upright, No Italic, High Legibility Mobile Size (+1-2px) */}
            <p className="text-[16px] min-[400px]:text-[17px] sm:text-[18px] text-[#15120F]/90 font-normal leading-relaxed mb-4 max-w-xl">
              A 5-module playbook for beginners with no clients yet: outreach scripts, a pricing template, and a payment setup — nothing to figure out alone.
            </p>

            {/* 3. WHAT DO I GET: Explicit Named Deliverables (Visible in First Screen) */}
            <div className="bg-[#F6F0E2] border border-[#15120F]/15 rounded-xs p-3 sm:p-3.5 mb-5 shadow-xs">
              <div className="text-[11px] font-mono-ledger font-semibold text-[#6B6250] uppercase tracking-wider mb-2">
                What You Get Immediately Inside:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13px] text-[#15120F]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#375E42] shrink-0" />
                  <span><strong>5-Module PDF Guide</strong> (Full Playbook)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#375E42] shrink-0" />
                  <span><strong>Direct Outreach Scripts</strong> (Word-for-Word)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#375E42] shrink-0" />
                  <span><strong>First-Offer Pricing Template</strong> & Scope</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#375E42] shrink-0" />
                  <span><strong>Instant Payment Setup</strong> & Delivery Checklist</span>
                </div>
              </div>
            </div>

            {/* 4. WHAT DOES IT COST & ACTION: Visible Above Fold */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              {/* Prominent Price Display */}
              <div className="flex items-baseline gap-2 bg-[#F6F0E2] border border-[#15120F]/20 px-3 py-2 rounded-xs">
                <span className="font-mono-ledger text-2xl sm:text-3xl font-bold text-[#15120F]">
                  {CONFIG.PRICE}
                </span>
                <span className="font-mono-ledger text-sm text-[#6B6250] line-through">
                  {CONFIG.ORIGINAL_PRICE}
                </span>
                <span className="font-mono-ledger text-[11px] font-bold text-[#375E42] uppercase tracking-wider bg-[#375E42]/10 px-1.5 py-0.5 rounded-xs">
                  Save 43%
                </span>
              </div>

              {/* Primary Action Button */}
              <a
                href={CONFIG.PAYMENT_LINK}
                onClick={handleCtaClick}
                id="hero-primary-cta"
                className="group flex-1 inline-flex items-center justify-center gap-2 bg-[#375E42] hover:bg-[#2b4933] active:scale-[0.98] text-[#F6F0E2] font-mono-ledger font-bold text-base sm:text-lg py-3 px-6 rounded-xs shadow-md transition-all border border-[#233c2a] cursor-pointer text-center"
              >
                <span>GET THE PLAYBOOK — {CONFIG.PRICE}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* HONEST SCARCITY MECHANIC: Directly Under CTA (Prominent & Real) */}
            <div className="bg-[#F6F0E2]/80 border border-[#A6362A]/30 rounded-xs p-2.5 sm:p-3 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="stamp-badge text-[11px] sm:text-xs">
                    COPY NO. {formattedCopyNumber} OF {totalLimit}
                  </div>
                  <span className="font-mono-ledger text-xs font-semibold text-[#A6362A]">
                    {rawPaidOrders} copies claimed at {CONFIG.PRICE}
                  </span>
                </div>
                <div className="font-mono-ledger text-[11px] text-[#6B6250]">
                  {copiesRemaining} remaining before price rises to {CONFIG.ORIGINAL_PRICE}
                </div>
              </div>
            </div>

            {/* Trust Strip */}
            <div className="pt-3 border-t border-[#15120F]/15 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs text-[#6B6250] font-mono-ledger">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#375E42] shrink-0" />
                <span>Razorpay-secured checkout</span>
              </div>
              <span className="hidden sm:inline text-[#15120F]/20">•</span>
              <div className="flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-[#375E42] shrink-0" />
                <span>Instant PDF download</span>
              </div>
              <span className="hidden sm:inline text-[#15120F]/20">•</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#B8933E] shrink-0" />
                <span>One payment — no recurring charge</span>
              </div>
            </div>

          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <ProductBundleVisual copyNumber={formattedCopyNumber} size="default" />
          </div>

        </div>

      </div>
    </section>
  );
}
