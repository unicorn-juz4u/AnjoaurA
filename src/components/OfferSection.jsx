import React, { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../config';
import { ArrowRight, Mail, Download, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { createPaymentOrder, verifyPayment, getDownloadUrl } from '../services/api';
import { loadRazorpayScript } from '../utils/razorpay';
import {
  trackEvent,
  ANALYTICS_EVENTS,
  trackMetaViewContent,
  trackMetaInitiateCheckout,
  trackMetaPurchase,
} from '../utils/analytics';

export default function OfferSection({ onOpenModal }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ctaState, setCtaState] = useState('idle'); // idle | creating | razorpay | verifying | success | failed
  const [errorMessage, setErrorMessage] = useState('');
  const [orderReceipt, setOrderReceipt] = useState(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.OFFER_VIEW);
    trackMetaViewContent();
  }, []);

  const validateEmailFormat = (val) => {
    if (!val || !val.trim()) {
      return 'Enter your email to receive/access your purchase.';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
    if (errorMessage) setErrorMessage('');
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (ctaState === 'creating' || ctaState === 'verifying') {
      return;
    }

    const err = validateEmailFormat(email);
    if (err) {
      setEmailError(err);
      if (emailInputRef.current) emailInputRef.current.focus();
      return;
    }

    setEmailError('');
    setErrorMessage('');
    setCtaState('creating');
    trackEvent(ANALYTICS_EVENTS.CHECKOUT_STARTED, { email: email.trim() });
    trackMetaInitiateCheckout({ value: 299, currency: 'INR' });

    try {
      // 1. Create order on backend (server authoritative price & currency: 29900 paise INR)
      const order = await createPaymentOrder(email.trim());

      // 2. Ensure Razorpay Checkout script is loaded
      await loadRazorpayScript();

      if (!window.Razorpay) {
        throw new Error('Unable to load Razorpay payment gateway. Please check your internet connection.');
      }

      setCtaState('razorpay');
      trackEvent(ANALYTICS_EVENTS.PAYMENT_INITIATED, { orderId: order.orderId });

      // 3. Configure Razorpay Checkout options
      const options = {
        key: order.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: CONFIG.BRAND_NAME,
        description: order.productName || CONFIG.BUNDLE_TITLE,
        order_id: order.orderId,
        prefill: {
          email: email.trim(),
        },
        theme: {
          color: '#facc15',
          backdrop_color: '#070A12',
        },
        handler: async function (response) {
          // Customer completed Razorpay payment -> verify server-side
          setCtaState('verifying');

          try {
            const verifyResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email: email.trim(),
            });

            if (verifyResult.success && verifyResult.paid) {
              setCtaState('success');
              setOrderReceipt({
                orderId: response.razorpay_order_id,
                email: email.trim(),
                resources: verifyResult.resources,
                downloadToken: verifyResult.downloadToken,
              });
              trackEvent(ANALYTICS_EVENTS.PAYMENT_SUCCESS, {
                orderId: response.razorpay_order_id,
                amount: order.amount,
                currency: order.currency,
              });

              // Track Meta Purchase conversion strictly after verified successful payment
              trackMetaPurchase({
                orderId: response.razorpay_order_id,
                value: 299,
                currency: 'INR',
              });
            } else {
              setCtaState('failed');
              setErrorMessage(verifyResult.message || 'Payment verification failed. Please contact support.');
              trackEvent(ANALYTICS_EVENTS.PAYMENT_FAILED, { reason: verifyResult.message });
            }
          } catch (verErr) {
            console.error('Verification error:', verErr);
            setCtaState('failed');
            setErrorMessage('Error verifying payment with server. Please reach out to support.');
            trackEvent(ANALYTICS_EVENTS.PAYMENT_FAILED, { reason: verErr.message });
          }
        },
        modal: {
          ondismiss: function () {
            setCtaState('idle');
            trackEvent(ANALYTICS_EVENTS.PAYMENT_FAILED, { reason: 'user_dismissed' });
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (resp) {
        console.warn('Payment failed callback:', resp.error);
        setCtaState('failed');
        setErrorMessage(resp.error?.description || 'Payment failed. Please try another payment method.');
        trackEvent(ANALYTICS_EVENTS.PAYMENT_FAILED, { reason: resp.error?.description });
      });

      rzp.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      setCtaState('failed');
      setErrorMessage(error.message || 'Unable to start secure checkout. Please try again.');
      trackEvent(ANALYTICS_EVENTS.PAYMENT_FAILED, { reason: error.message });
    }
  };

  const handleResourceAccess = (resourceId) => {
    trackEvent(ANALYTICS_EVENTS.RESOURCE_ACCESSED, { resourceId });
  };

  return (
    <section id="offer-section" className="relative py-10 sm:py-16 bg-[#070b16] border-y border-white/5 scroll-mt-4">
      <div id="checkout-section" className="scroll-mt-16" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Central Premium Offer Card */}
        <div className="bg-[#0b1222] border-2 border-yellow-400/50 rounded-3xl p-6 sm:p-9 shadow-2xl relative">
          
          {ctaState === 'success' && orderReceipt ? (
            /* ==================================================
               SUCCESS STATE: "YOUR COMPLETE TOOLKIT IS READY."
               ================================================== */
            <div className="text-center py-2 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase tracking-widest font-black text-yellow-400 block mb-1">
                PURCHASE CONFIRMED
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
                YOUR COMPLETE TOOLKIT IS READY.
              </h3>
              <p className="text-xs sm:text-base text-emerald-200 mb-6 max-w-lg mx-auto">
                Your three resources are ready to access.
              </p>

              {/* Order Info Badge */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300 mb-6">
                <span><strong>Order ID:</strong> <code className="text-yellow-400 font-mono">{orderReceipt.orderId}</code></span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span><strong>Access for:</strong> <span className="text-white">{orderReceipt.email}</span></span>
              </div>

              {/* 3 Download Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-6">
                
                {/* Resource 1 Download Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] border border-yellow-400/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-yellow-400">
                        RESOURCE 01
                      </span>
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                      Problem Solving & Digital Monetization Guide
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Identify problems, shape digital opportunities, and think through monetization.
                    </p>
                  </div>
                  <a
                    href={getDownloadUrl(orderReceipt.resources?.guide?.downloadUrl || `/api/payment/download/${orderReceipt.downloadToken}?resource=guide`)}
                    onClick={() => handleResourceAccess('guide')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD PDF</span>
                  </a>
                </div>

                {/* Resource 2 Download Card (Website Development Strategy PDF) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] border border-cyan-400/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-cyan-400">
                        RESOURCE 02
                      </span>
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                      Antigravity + Claude Interactive Website Build Guide
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      A practical guide for turning an idea into an interactive website using AI-assisted development.
                    </p>
                  </div>
                  <a
                    href={getDownloadUrl(orderReceipt.resources?.website?.downloadUrl || `/api/payment/download/${orderReceipt.downloadToken}?resource=website`)}
                    onClick={() => handleResourceAccess('website')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD PDF</span>
                  </a>
                </div>

                {/* Resource 3 Download Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] border border-yellow-400/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-yellow-400">
                        RESOURCE 03
                      </span>
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                      100+ Visual Prompt Shortcuts
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Ready-to-use visual prompt shortcuts for product shots, ads, website visuals, mockups, carousels, thumbnails and more.
                    </p>
                  </div>
                  <a
                    href={getDownloadUrl(orderReceipt.resources?.shortcuts?.downloadUrl || `/api/payment/download/${orderReceipt.downloadToken}?resource=shortcuts`)}
                    onClick={() => handleResourceAccess('shortcuts')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD PDF</span>
                  </a>
                </div>

              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 max-w-lg mx-auto">
                Need help or have questions regarding your access? Reach us anytime at{' '}
                <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-yellow-400 underline font-semibold">
                  {CONFIG.SUPPORT_EMAIL}
                </a>
              </div>
            </div>
          ) : (
            /* ==================================================
               CHECKOUT FORM & OFFER DETAILS
               ================================================== */
            <div className="max-w-xl mx-auto text-center">
              
              {/* Header */}
              <div className="mb-4">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-yellow-400 block mb-1">
                  INSTANT ACCESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  GET THE COMPLETE 3-RESOURCE SYSTEM
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  One purchase. Three resources. One complete workflow.
                </p>
              </div>

              {/* 3 Deliverables list */}
              <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-3.5 sm:p-4 mb-5 text-left divide-y divide-white/5">
                <div className="flex items-center gap-3 py-2 text-xs sm:text-sm font-semibold text-slate-200">
                  <span className="text-yellow-400 font-mono font-bold text-xs">01</span>
                  <span>Problem Solving & Digital Monetization Guide</span>
                </div>
                <div className="flex items-center gap-3 py-2 text-xs sm:text-sm font-semibold text-slate-200">
                  <span className="text-cyan-400 font-mono font-bold text-xs">02</span>
                  <span>Antigravity + Claude Interactive Website Build Guide</span>
                </div>
                <div className="flex items-center gap-3 py-2 text-xs sm:text-sm font-semibold text-slate-200">
                  <span className="text-yellow-400 font-mono font-bold text-xs">03</span>
                  <span>100+ Visual Prompt Shortcuts</span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handlePayment} className="space-y-3.5 text-left">
                

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="customer-email-input"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Enter your email to receive access:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="customer-email-input"
                      ref={emailInputRef}
                      type="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="you@example.com"
                      disabled={ctaState === 'creating' || ctaState === 'verifying'}
                      className={`w-full bg-slate-900/95 border ${
                        emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-white/20 focus:border-yellow-400'
                      } text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all`}
                    />
                  </div>
                  {emailError && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{emailError}</span>
                    </p>
                  )}
                </div>

                {/* Failure / Error message */}
                {errorMessage && (
                  <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  id="offer-primary-cta"
                  disabled={ctaState === 'creating' || ctaState === 'verifying'}
                  className="group w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed text-slate-950 font-black text-base sm:text-lg py-3.5 px-6 rounded-xl transition-all duration-150 text-center cursor-pointer shadow-xl border border-yellow-300"
                >
                  {ctaState === 'creating' && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Initializing checkout...</span>
                    </>
                  )}

                  {ctaState === 'razorpay' && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Opening Checkout...</span>
                    </>
                  )}

                  {ctaState === 'verifying' && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying payment...</span>
                    </>
                  )}

                  {ctaState === 'failed' && (
                    <>
                      <span>Payment failed — Try again</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}

                  {ctaState === 'idle' && (
                    <>
                      <span>GET ALL 3 — {CONFIG.PRICE}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

                {/* Single short trust line with Razorpay security */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Secure 256-bit encrypted checkout via Razorpay</span>
                </div>
                <p className="text-center text-[11px] text-slate-400">
                  All 3 PDFs included • Instant access
                </p>

                {/* Legal links right under checkout */}
                <div className="pt-0.5 text-center text-[11px] text-slate-400 leading-relaxed">
                  By ordering, you agree to our{' '}
                  <button
                    type="button"
                    onClick={() => onOpenModal && onOpenModal('terms')}
                    className="text-slate-300 underline hover:text-yellow-400 cursor-pointer"
                  >
                    Terms
                  </button>
                  ,{' '}
                  <button
                    type="button"
                    onClick={() => onOpenModal && onOpenModal('privacy')}
                    className="text-slate-300 underline hover:text-yellow-400 cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  , and{' '}
                  <button
                    type="button"
                    onClick={() => onOpenModal && onOpenModal('refund')}
                    className="text-slate-300 underline hover:text-yellow-400 cursor-pointer"
                  >
                    Refund Policy
                  </button>
                  .
                </div>

              </form>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
