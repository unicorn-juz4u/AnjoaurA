import React from 'react';
import { ShieldCheck, Download, RefreshCw, Mail } from 'lucide-react';
import { CONFIG } from '../config';

export default function TrustPolicyBlock({ onOpenModal }) {
  return (
    <section className="py-8 sm:py-10 bg-[#EDE3CE] border-b border-[#15120F]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Calm Header */}
        <div className="text-left mb-6 pb-2 border-b border-[#15120F]/10">
          <span className="font-mono-ledger text-[11px] uppercase tracking-wider text-[#6B6250] font-semibold">
            Transaction Guarantees & Support
          </span>
          <h3 className="font-headline text-lg sm:text-xl font-bold text-[#15120F] mt-0.5">
            Security, Delivery & Buyer Policies
          </h3>
        </div>

        {/* 4-Item Scannable Grid (Visually Calm, Neutral Ink/Paper) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          
          {/* Item 1: Razorpay Security */}
          <div className="p-4 rounded-xs bg-[#F6F0E2] border border-[#15120F]/15">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#15120F]" />
              <h4 className="font-headline text-xs sm:text-sm font-bold text-[#15120F]">
                Razorpay-Secured Payment
              </h4>
            </div>
            <p className="text-xs text-[#6B6250] leading-relaxed font-sans">
              256-bit SSL encrypted checkout. Supports UPI, NetBanking, and Cards. Card credentials are never handled or stored on our servers.
            </p>
          </div>

          {/* Item 2: Instant Delivery */}
          <div className="p-4 rounded-xs bg-[#F6F0E2] border border-[#15120F]/15">
            <div className="flex items-center gap-2 mb-1.5">
              <Download className="w-4 h-4 text-[#15120F]" />
              <h4 className="font-headline text-xs sm:text-sm font-bold text-[#15120F]">
                Instant Digital Delivery
              </h4>
            </div>
            <p className="text-xs text-[#6B6250] leading-relaxed font-sans">
              Tokenized PDF access is generated right in your browser the second your payment is confirmed. No waiting for physical dispatch.
            </p>
          </div>

          {/* Item 3: Refund Policy */}
          <div className="p-4 rounded-xs bg-[#F6F0E2] border border-[#15120F]/15">
            <div className="flex items-center gap-2 mb-1.5">
              <RefreshCw className="w-4 h-4 text-[#15120F]" />
              <h4 className="font-headline text-xs sm:text-sm font-bold text-[#15120F]">
                Refund & Delivery Guarantee
              </h4>
            </div>
            <p className="text-xs text-[#6B6250] leading-relaxed font-sans">
              Digital product with instant access. Technical issues or duplicate charges resolved promptly.{' '}
              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal('refund')}
                className="text-[#15120F] font-semibold underline hover:text-[#375E42] cursor-pointer"
              >
                Read Refund Policy
              </button>
            </p>
          </div>

          {/* Item 4: Support Email */}
          <div className="p-4 rounded-xs bg-[#F6F0E2] border border-[#15120F]/15">
            <div className="flex items-center gap-2 mb-1.5">
              <Mail className="w-4 h-4 text-[#15120F]" />
              <h4 className="font-headline text-xs sm:text-sm font-bold text-[#15120F]">
                Customer Support Desk
              </h4>
            </div>
            <p className="text-xs text-[#6B6250] leading-relaxed font-sans">
              Direct email support at{' '}
              <a
                href={`mailto:${CONFIG.SUPPORT_EMAIL}`}
                className="text-[#15120F] font-semibold underline hover:text-[#375E42]"
              >
                {CONFIG.SUPPORT_EMAIL}
              </a>
              . Replies within 24–48 business hours.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
