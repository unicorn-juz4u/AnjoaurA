import React from 'react';
import { CONFIG } from '../config';
import { ShieldCheck, Mail, BookOpen } from 'lucide-react';

export default function Footer({ onOpenModal }) {
  return (
    <footer className="bg-[#04060b] text-slate-400 pt-10 pb-28 sm:pb-12 border-t border-white/5 relative z-10 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Brand & System Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-white/5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <div>
              <span className="font-bold text-white tracking-tight">{CONFIG.BRAND_NAME}</span>
              <span className="text-[10px] text-slate-400 block sm:inline sm:ml-2">
                Digital Creator Launch System
              </span>
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenModal('terms')}
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenModal('refund')}
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenModal('contact')}
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Contact info */}
        <div className="py-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-yellow-400" />
            <span>Support:</span>
            <a
              href={`mailto:${CONFIG.SUPPORT_EMAIL}`}
              className="text-slate-300 hover:text-yellow-400 transition-colors"
            >
              {CONFIG.SUPPORT_EMAIL}
            </a>
          </div>
          <div>
            <span>Format: Digital Downloads (PDF)</span>
          </div>
        </div>

        {/* Mandatory Educational & Realistic Disclaimer */}
        <div className="py-6 text-center text-[11px] leading-relaxed text-slate-400 max-w-3xl mx-auto">
          <p className="font-bold text-slate-300 uppercase tracking-wider mb-1">
            Important Disclaimer:
          </p>
          <p>
            These digital resources are provided for educational, conceptual, and practical guidance purposes only. They do not guarantee financial outcomes, business earnings, or specific project success. Individual achievements vary based on your personal effort, skills, market variables, and execution.
          </p>
        </div>

        {/* Copyright notice & Razorpay Security */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div className="order-2 sm:order-1 text-[11px]">
            © {CONFIG.COPYRIGHT_YEAR} {CONFIG.BRAND_NAME}. All rights reserved.
          </div>
          <div className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 text-slate-200 font-medium bg-slate-900/90 border border-white/10 rounded-full px-3.5 py-1.5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs">Secure 256-bit encrypted checkout via Razorpay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
