import React from 'react';
import { CONFIG } from '../config';
import { ShieldCheck, Mail, BookOpen } from 'lucide-react';

export default function Footer({ onOpenModal }) {
  return (
    <footer className="bg-[#EDE3CE] text-[#6B6250] pt-10 pb-28 sm:pb-12 border-t border-[#15120F]/15 relative z-10 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Brand & System Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-[#15120F]/10 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#F6F0E2] border border-[#15120F]/20 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-[#B8933E]" />
            </div>
            <div>
              <span className="font-serif-headline font-bold text-[#15120F] tracking-tight">{CONFIG.BRAND_NAME}</span>
              <span className="font-mono-ledger text-[10px] text-[#6B6250] block sm:inline sm:ml-2">
                Make Your First $100 Online
              </span>
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono-ledger text-[11px] text-[#6B6250]">
            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-[#15120F] transition-colors cursor-pointer underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenModal('terms')}
              className="hover:text-[#15120F] transition-colors cursor-pointer underline"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenModal('refund')}
              className="hover:text-[#15120F] transition-colors cursor-pointer underline"
            >
              Refund Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenModal('contact')}
              className="hover:text-[#15120F] transition-colors cursor-pointer underline"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Support contact info */}
        <div className="py-6 border-b border-[#15120F]/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-ledger text-[11px] text-[#6B6250] text-center sm:text-left">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#375E42]" />
            <span>Support:</span>
            <a
              href={`mailto:${CONFIG.SUPPORT_EMAIL}`}
              className="text-[#15120F] hover:text-[#375E42] transition-colors font-medium underline"
            >
              {CONFIG.SUPPORT_EMAIL}
            </a>
          </div>
          <div>
            <span>Format: Direct PDF Download (Single SKU)</span>
          </div>
        </div>

        {/* Mandatory Educational & Realistic Disclaimer (EXACT COMPLIANT COPY) */}
        <div className="py-6 text-center text-[11px] leading-relaxed text-[#6B6250] max-w-3xl mx-auto font-sans">
          <p className="font-mono-ledger font-bold text-[#15120F] uppercase tracking-wider mb-1">
            Important Compliance Disclaimer:
          </p>
          <p>
            Educational material only. Results depend on individual effort and are not guaranteed. This guide teaches a method — it does not promise a specific income.
          </p>
        </div>

        {/* Copyright notice & Razorpay Security */}
        <div className="pt-6 border-t border-[#15120F]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-ledger text-[#6B6250] text-center sm:text-left">
          <div className="order-2 sm:order-1 text-[11px]">
            © {CONFIG.COPYRIGHT_YEAR} {CONFIG.BRAND_NAME}. All rights reserved.
          </div>
          <div className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 text-[#15120F] font-medium bg-[#F6F0E2] border border-[#15120F]/15 rounded px-3 py-1 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#375E42] shrink-0" />
            <span className="text-[11px]">Secure 256-bit encrypted checkout via Razorpay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
