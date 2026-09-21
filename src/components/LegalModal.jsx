import React from 'react';
import { X, ShieldAlert, FileText, Mail, RefreshCw } from 'lucide-react';
import { CONFIG } from '../config';

export default function LegalModal({ isOpen, modalType, onClose }) {
  if (!isOpen) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldAlert,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#15120F]/85 leading-relaxed font-sans">
          <p>
            Your privacy is respected. This policy outlines how your information is handled when purchasing <strong>{CONFIG.PRODUCT_NAME}</strong> on <strong>{CONFIG.BRAND_NAME}</strong>.
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">1. Information We Collect</h4>
          <p>
            When you complete an order via our payment processor (Razorpay), your email address and transaction identifiers are collected solely to authenticate and deliver your digital playbook and provide customer support. We never store or handle your credit/debit card numbers, CVVs, or banking passwords on our servers.
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">2. Use of Information</h4>
          <p>
            Collected details are used exclusively to process your order, deliver secure digital access tokens, send transaction receipts, and respond to support inquiries. We never sell, rent, or trade your personal details with third-party advertisers.
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">3. Security & Storage</h4>
          <p>
            All payment transactions are encrypted and processed through Razorpay's PCI-DSS compliant infrastructure. Server communications are strictly encrypted via HTTPS/TLS.
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">4. Support Contact</h4>
          <p>
            For any privacy-related requests or data deletion, contact us at{' '}
            <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-[#375E42] underline font-semibold">
              {CONFIG.SUPPORT_EMAIL}
            </a>.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#15120F]/85 leading-relaxed font-sans">
          <p>
            By purchasing and downloading <strong>{CONFIG.PRODUCT_NAME}</strong> from <strong>{CONFIG.BRAND_NAME}</strong>, you agree to the following terms:
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">1. Educational Purpose & Disclaimer</h4>
          <p>
            All content within this 5-module guide is provided for educational, practical, and informational purposes. It does not constitute financial, legal, or guaranteed business earnings advice. Results depend entirely on your own execution, skills, and effort.
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">2. License & Intellectual Property</h4>
          <p>
            Your purchase grants you a single, non-exclusive, non-transferable personal license to view, download, and implement the material. Redistribution, resale, public sharing, or unauthorized uploading of the PDF is strictly prohibited.
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">3. Digital Delivery</h4>
          <p>
            The playbook is delivered electronically via secure tokenized download immediately upon successful payment verification.
          </p>
        </div>
      ),
    },
    refund: {
      title: 'Refund & Digital Delivery Policy',
      icon: RefreshCw,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#15120F]/85 leading-relaxed font-sans">
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">Digital Delivery Notice</h4>
          <p>
            <strong>{CONFIG.PRODUCT_NAME}</strong> is an instant-access digital product. Access is granted immediately upon successful payment verification through secure download tokens.
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">Final Sale & Consumer Protection</h4>
          <p>
            Due to the immediate digital availability of this downloadable material, purchases are generally final once delivered. However, this policy does not limit any mandatory statutory consumer protection rights that apply under your local jurisdiction.
          </p>
          <h4 className="text-[#15120F] font-bold text-sm font-serif-headline">Technical Issues & Duplicate Charges</h4>
          <p>
            If you encounter connection drops, duplicate charges, or download link errors, contact us immediately at{' '}
            <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-[#375E42] underline font-semibold">
              {CONFIG.SUPPORT_EMAIL}
            </a>{' '}
            with your Razorpay payment ID. We will promptly ensure you receive access or resolve duplicate transactions.
          </p>
        </div>
      ),
    },
    contact: {
      title: 'Contact Support',
      icon: Mail,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#15120F]/85 leading-relaxed font-sans">
          <p>
            Have questions about your order or download access? Our customer desk is available to assist:
          </p>
          <div className="p-4 rounded bg-[#EDE3CE] border border-[#15120F]/15 flex flex-col gap-1.5 font-mono-ledger">
            <span className="text-[10px] text-[#6B6250] uppercase font-bold tracking-wider">Support Email Desk</span>
            <a
              href={`mailto:${CONFIG.SUPPORT_EMAIL}`}
              className="text-base font-bold text-[#375E42] hover:underline"
            >
              {CONFIG.SUPPORT_EMAIL}
            </a>
            <span className="text-xs text-[#6B6250]">Response time: Within 24 business hours</span>
          </div>
          <p className="text-xs text-[#6B6250] font-mono-ledger">
            Please include the Razorpay Payment ID shown on your payment confirmation when inquiring about an order.
          </p>
        </div>
      ),
    },
  };

  const activeContent = contentMap[modalType] || contentMap.privacy;
  const IconComponent = activeContent.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15120F]/75 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#F6F0E2] border-2 border-[#15120F]/30 rounded-lg p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#15120F]/15 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#375E42]/15 text-[#375E42] flex items-center justify-center">
              <IconComponent className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#15120F] font-serif-headline">
              {activeContent.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded border border-[#15120F]/15 bg-[#EDE3CE] text-[#15120F] hover:bg-[#15120F]/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto pr-1">
          {activeContent.body}
        </div>

        {/* Footer */}
        <div className="pt-3.5 mt-4 border-t border-[#15120F]/15 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#375E42] hover:bg-[#2b4933] text-[#F6F0E2] font-mono-ledger font-semibold text-xs rounded cursor-pointer border border-[#233c2a]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
