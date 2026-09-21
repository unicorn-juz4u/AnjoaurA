import React from 'react';
import { CONFIG } from '../config';
import { Check } from 'lucide-react';

export default function ProductBundleVisual({ copyNumber = '072', size = 'default' }) {
  const isCompact = size === 'compact';

  return (
    <div className={`relative w-full flex items-center justify-center select-none ${isCompact ? 'py-1 max-w-sm' : 'py-3 max-w-md'} mx-auto`}>
      {/* Dossier Document / Book Cover */}
      <div 
        className="relative w-full rounded bg-[#F6F0E2] border-2 border-[#15120F]/25 p-5 sm:p-7 text-left shadow-xl"
        style={{
          boxShadow: '0 4px 6px -1px rgba(21, 18, 15, 0.08), 0 20px 30px -10px rgba(21, 18, 15, 0.18)',
        }}
      >
        {/* Left Book Spine / Binding Texture */}
        <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-[#15120F]/20 via-[#15120F]/5 to-transparent rounded-l pointer-events-none" />

        {/* Top Header Strip */}
        <div className="flex items-center justify-between border-b border-[#15120F]/15 pb-3 mb-4 pl-1">
          <div className="flex items-center gap-2">
            <span className="font-mono-ledger text-[10px] sm:text-[11px] font-bold tracking-widest text-[#6B6250] uppercase">
              DOSSIER // ACTION PLAYBOOK
            </span>
          </div>
          <span className="font-mono-ledger text-[10px] text-[#A6362A] border border-[#A6362A]/40 bg-[#A6362A]/5 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            COPY NO. {copyNumber}
          </span>
        </div>

        {/* Stamped Batch Marking */}
        <div className="flex justify-between items-start mb-3 pl-1">
          <div>
            <div className="text-[10px] font-mono-ledger uppercase text-[#6B6250] tracking-wider mb-1">
              STANDARD CURRICULUM
            </div>
            <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#15120F] leading-tight tracking-tight">
              MAKE YOUR FIRST<br />
              <span className="text-[#375E42] font-extrabold">$100 ONLINE</span>
            </h3>
          </div>

          {/* Red Ink Stamp */}
          <div className="stamp-badge rotate-2 shrink-0 text-[10px] sm:text-xs">
            VERIFIED
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-[#6B6250] leading-relaxed pl-1 mb-4 font-sans">
          A five-part tactical roadmap turning one existing skill into your first paying client within days.
        </p>

        {/* Ledger Module Index on the Cover */}
        <div className="bg-[#EDE3CE]/80 border border-[#15120F]/15 rounded p-3 pl-3.5 mb-4 divide-y divide-[#15120F]/10 font-mono-ledger text-[11px]">
          <div className="flex items-center justify-between py-1 text-[#15120F]">
            <span className="text-[#A6362A] font-bold">01</span>
            <span className="font-medium truncate mx-2">Clarity & Fundamentals</span>
            <span className="text-[#6B6250] shrink-0 text-[10px]">Skill Audit</span>
          </div>
          <div className="flex items-center justify-between py-1 text-[#15120F]">
            <span className="text-[#A6362A] font-bold">02</span>
            <span className="font-medium truncate mx-2">The Service Bridge</span>
            <span className="text-[#6B6250] shrink-0 text-[10px]">Fast Income</span>
          </div>
          <div className="flex items-center justify-between py-1 text-[#15120F]">
            <span className="text-[#A6362A] font-bold">03</span>
            <span className="font-medium truncate mx-2">Simple Digital Products</span>
            <span className="text-[#6B6250] shrink-0 text-[10px]">Packaging</span>
          </div>
          <div className="flex items-center justify-between py-1 text-[#15120F]">
            <span className="text-[#A6362A] font-bold">04</span>
            <span className="font-medium truncate mx-2">Client Acquisition</span>
            <span className="text-[#6B6250] shrink-0 text-[10px]">Direct Outreach</span>
          </div>
          <div className="flex items-center justify-between py-1 text-[#15120F]">
            <span className="text-[#A6362A] font-bold">05</span>
            <span className="font-medium truncate mx-2">Payment & Delivery</span>
            <span className="text-[#6B6250] shrink-0 text-[10px]">Settlement</span>
          </div>
        </div>

        {/* Bottom Metadata Ledger */}
        <div className="pt-3 border-t border-[#15120F]/15 flex items-center justify-between font-mono-ledger text-[10px] text-[#6B6250] pl-1">
          <span className="flex items-center gap-1 text-[#375E42] font-semibold">
            <Check className="w-3 h-3" /> Complete PDF Guide
          </span>
          <span className="font-bold text-[#15120F]">
            PRICE: {CONFIG.PRICE}
          </span>
        </div>

      </div>
    </div>
  );
}
