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
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Your privacy is important to us. This policy outlines how your information is handled when browsing or purchasing the <strong>{CONFIG.BUNDLE_TITLE}</strong> on <strong>{CONFIG.BRAND_NAME}</strong>.
          </p>
          <h4 className="text-white font-bold text-sm">1. Information We Collect</h4>
          <p>
            When you initiate and complete an order via our payment processor (Razorpay), your email address and transaction identifiers are collected to authenticate and deliver your digital bundle and provide customer support. We never store or handle your sensitive card, CVV, or banking credentials on our servers.
          </p>
          <h4 className="text-white font-bold text-sm">2. Use of Information</h4>
          <p>
            Collected details are used exclusively to process your order, deliver secure digital access tokens, send order receipts, and provide customer support. We do not sell, rent, or trade your personal details with any third parties.
          </p>
          <h4 className="text-white font-bold text-sm">3. Security & Storage</h4>
          <p>
            All payment transactions are encrypted and processed through Razorpay's PCI-DSS compliant infrastructure. Server communications are encrypted via HTTPS/TLS.
          </p>
          <h4 className="text-white font-bold text-sm">4. Contact</h4>
          <p>
            For any privacy-related requests or questions, please contact us at{' '}
            <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-yellow-400 underline font-semibold">
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
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            By purchasing and accessing the <strong>{CONFIG.BUNDLE_TITLE}</strong> from <strong>{CONFIG.BRAND_NAME}</strong>, you agree to the following terms:
          </p>
          <h4 className="text-white font-bold text-sm">1. Educational & Practical Purpose</h4>
          <p>
            All content within the three bundle resources is provided for educational, practical, and informational purposes. It does not constitute financial, investment, legal, or guaranteed business earnings advice.
          </p>
          <h4 className="text-white font-bold text-sm">2. License & Intellectual Property</h4>
          <p>
            Your purchase grants you a single, non-exclusive, non-transferable personal license to view and use the included guides and resources. Redistribution, reselling, public uploading, or sublicensing the materials is strictly prohibited.
          </p>
          <h4 className="text-white font-bold text-sm">3. Digital Delivery & Access</h4>
          <p>
            All three resources are delivered electronically via secure download links immediately following successful payment verification.
          </p>
          <h4 className="text-white font-bold text-sm">4. No Guaranteed Outcomes</h4>
          <p>
            We make no warranties or guarantees regarding specific revenue, earnings, or business results. Your individual outcomes depend on your own execution, skills, and effort.
          </p>
        </div>
      ),
    },
    refund: {
      title: 'Refund & Digital Delivery Policy',
      icon: RefreshCw,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h4 className="text-white font-bold text-sm">Digital Delivery Notice</h4>
          <p>
            The <strong>{CONFIG.BUNDLE_TITLE}</strong> is a digital product delivered immediately upon successful payment verification through secure download links and online resource access.
          </p>
          <h4 className="text-white font-bold text-sm">Final Sale & Consumer Protection</h4>
          <p>
            This is a digital product. Due to the nature of digital delivery, purchases are final and refunds are not generally offered after access or delivery.
          </p>
          <p>
            However, this policy does not limit or eliminate any mandatory statutory consumer rights that may apply in your jurisdiction under applicable consumer protection laws.
          </p>
          <h4 className="text-white font-bold text-sm">Technical Issues & Duplicate Transactions</h4>
          <p>
            If you experience technical difficulties receiving or downloading your files, or if you encounter duplicate charges due to a connection interruption, please contact us promptly at{' '}
            <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-yellow-400 underline font-semibold">
              {CONFIG.SUPPORT_EMAIL}
            </a>{' '}
            with your Razorpay payment ID, and we will ensure you receive full access or resolve the duplicate charge.
          </p>
        </div>
      ),
    },
    contact: {
      title: 'Contact Support',
      icon: Mail,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Have questions about the bundle, your order receipt, or your download links? Our support team is here to assist you:
          </p>
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col gap-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Official Support Email</span>
            <a
              href={`mailto:${CONFIG.SUPPORT_EMAIL}`}
              className="text-base font-bold text-yellow-400 hover:underline"
            >
              {CONFIG.SUPPORT_EMAIL}
            </a>
            <span className="text-xs text-slate-400">Response time: Typically within 24-48 business hours</span>
          </div>
          <p className="text-xs text-slate-400">
            When contacting us regarding an existing purchase, please include the Razorpay payment or order ID shown on your confirmation screen or payment receipt.
          </p>
        </div>
      ),
    },
  };

  const activeContent = contentMap[modalType] || contentMap.privacy;
  const IconComponent = activeContent.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0E1526] border border-yellow-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Logo"
              className="w-8 h-8 rounded-xl object-cover border border-yellow-400/30"
            />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center">
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {activeContent.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto pr-1">
          {activeContent.body}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
