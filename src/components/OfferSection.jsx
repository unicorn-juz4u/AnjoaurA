import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';
import { ArrowRight, Mail, Loader2, AlertCircle, ShieldCheck, Check, X } from 'lucide-react';
import { createPaymentOrder, verifyPayment, fetchClaimedCount } from '../services/api';
import { loadRazorpayScript } from '../utils/razorpay';
import {
  trackEvent,
  ANALYTICS_EVENTS,
  trackMetaViewContent,
  trackMetaInitiateCheckout,
} from '../utils/analytics';

export default function OfferSection({ onOpenModal }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ctaState, setCtaState] = useState('idle'); // idle | creating | razorpay | verifying | failed
  const [errorMessage, setErrorMessage] = useState('');
  const [claimedCount, setClaimedCount] = useState(CONFIG.CLAIMED_COUNT_BASELINE || 71);
  const [totalLimit, setTotalLimit] = useState(CONFIG.TOTAL_COPIES || 100);

  const emailInputRef = useRef(null);
  const hasTrackedViewRef = useRef(false);

  useEffect(() => {
    if (!hasTrackedViewRef.current) {
      hasTrackedViewRef.current = true;
      trackEvent(ANALYTICS_EVENTS.OFFER_VIEW);
      trackMetaViewContent();
    }

    let isMounted = true;
    fetchClaimedCount().then((res) => {
      if (isMounted && res.success) {
        setClaimedCount(res.count);
        if (res.limit) setTotalLimit(res.limit);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const validateEmailFormat = (val) => {
    if (!val || !val.trim()) {
      return 'Enter your email to receive and access your download.';
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
    trackMetaInitiateCheckout({ value: 199, currency: 'INR' });

    try {
      // 1. Create order on backend (server-authoritative price & currency: 19900 paise INR)
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
        description: order.productName || CONFIG.PRODUCT_NAME,
        order_id: order.orderId,
        prefill: {
          email: email.trim(),
        },
        theme: {
          color: '#375E42',
          backdrop_color: '#15120F',
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
              // Persist delivery payload locally so /success can immediately consume it
              const deliveryData = {
                orderId: response.razorpay_order_id,
                email: email.trim(),
                downloadUrl: verifyResult.downloadUrl || verifyResult.pdfUrl,
                fullDownloadUrl: verifyResult.fullDownloadUrl || verifyResult.fullPdfUrl,
                downloadToken: verifyResult.downloadToken,
                filename: verifyResult.filename || 'Make-Your-First-100-Online.pdf',
                paidAt: new Date().toISOString(),
              };

              try {
                localStorage.setItem(`anjoaura_delivery_${response.razorpay_order_id}`, JSON.stringify(deliveryData));
                sessionStorage.setItem('anjoaura_latest_delivery', JSON.stringify(deliveryData));
              } catch (storageErr) {
                console.warn('[Storage Warning]:', storageErr);
              }

              trackEvent(ANALYTICS_EVENTS.PAYMENT_SUCCESS, {
                orderId: response.razorpay_order_id,
                amount: order.amount,
                currency: order.currency,
              });

              // Navigate directly to dedicated success page — Meta Purchase fires from /success
              navigate(`/success?order=${encodeURIComponent(response.razorpay_order_id)}`);
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

  const percentClaimed = Math.min(100, Math.round((claimedCount / totalLimit) * 100));

  return (
    <section id="offer-section" className="relative py-10 sm:py-16 bg-[#EDE3CE] border-b border-[#15120F]/15 scroll-mt-6">
      <div id="checkout-section" className="scroll-mt-16" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Receipt-Themed Offer Card */}
        <div className="receipt-paper rounded-xs p-5 sm:p-8 text-left relative shadow-md">
          
          {/* Receipt Top Ledger Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#15120F]/15 font-mono-ledger text-[11px] text-[#6B6250]">
            <span>OFFICIAL ORDER LEDGER</span>
            <span className="text-[#A6362A] font-bold uppercase">INTRODUCTORY TIER // {CONFIG.PRICE}</span>
          </div>

          {/* Header Title */}
          <div className="mb-4">
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#15120F] tracking-tight">
              Get The Complete 5-Part Playbook
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6250] mt-1 font-sans">
              Instant tokenized access upon payment. Everything you receive is explicitly itemized below.
            </p>
          </div>

          {/* Compact 4-Line Without / With Comparison Block (~120px height) */}
          <div className="my-4 p-3 sm:p-4 rounded-xs bg-[#EDE3CE]/80 border border-[#15120F]/15 text-xs font-sans">
            <div className="font-mono-ledger text-[10px] uppercase font-bold text-[#6B6250] tracking-wider mb-2">
              Why Beginners Choose This Playbook
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1.5 text-[#15120F]/80">
                <div className="flex items-start gap-1.5 text-[#A6362A]">
                  <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="text-[#15120F]">Guessing pricing & underselling skills</span>
                </div>
                <div className="flex items-start gap-1.5 text-[#A6362A]">
                  <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="text-[#15120F]">Staring at blank DMs wondering what to say</span>
                </div>
              </div>
              <div className="space-y-1.5 text-[#15120F]">
                <div className="flex items-start gap-1.5 text-[#375E42]">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 font-bold" />
                  <span>Tested first-offer pricing worksheet</span>
                </div>
                <div className="flex items-start gap-1.5 text-[#375E42]">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 font-bold" />
                  <span>Word-for-word client outreach scripts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action-Item Pull-Quote from Module 1 */}
          <div className="my-4 p-3.5 rounded-xs bg-[#EDE3CE] border-l-3 border-[#B8933E] text-left">
            <blockquote className="italic text-xs sm:text-sm text-[#15120F] leading-relaxed">
              “Take that first step, jump that first hurdle and you’ll never look back. Once you’ve made your first $100 online, replicating the system is simple.”
            </blockquote>
            <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#6B6250] font-mono-ledger uppercase font-semibold">
              <span>— Module 1 Action Item</span>
              <span>•</span>
              <span>Clarity & Fundamentals</span>
            </div>
          </div>

          {/* Real-time Claimed Copies Progress Bar */}
          <div className="my-4 p-3 rounded-xs bg-[#EDE3CE] border border-[#15120F]/15">
            <div className="flex justify-between items-center text-xs font-mono-ledger mb-1.5">
              <span className="text-[#15120F] font-semibold">
                Copies Claimed At Introductory Rate:
              </span>
              <span className="font-bold text-[#A6362A]">
                {claimedCount} of {totalLimit} claimed
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#F6F0E2] rounded-full overflow-hidden border border-[#15120F]/15">
              <div
                className="h-full bg-[#375E42] transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(4, percentClaimed)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#6B6250] font-mono-ledger mt-1">
              <span>Current Price: {CONFIG.PRICE}</span>
              <span className="text-[#A6362A]">Next Tier: {CONFIG.ORIGINAL_PRICE} (at 100 copies)</span>
            </div>
          </div>

          {/* Itemized Receipt Breakdown (Explicit Specific Deliverables) */}
          <div className="space-y-2 my-4 font-mono-ledger text-xs sm:text-[13px]">
            <div className="flex items-center justify-between text-[#15120F] py-1 border-b border-[#15120F]/10">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#375E42]" />
                <span>5-Module PDF Guide (Complete Edition)</span>
              </div>
              <span className="text-[#375E42] font-bold">INCLUDED</span>
            </div>
            <div className="flex items-center justify-between text-[#15120F] py-1 border-b border-[#15120F]/10">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#375E42]" />
                <span>Direct Client Outreach Message Templates</span>
              </div>
              <span className="text-[#375E42] font-bold">INCLUDED</span>
            </div>
            <div className="flex items-center justify-between text-[#15120F] py-1 border-b border-[#15120F]/10">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#375E42]" />
                <span>First-Offer Pricing & Scope Agreement Template</span>
              </div>
              <span className="text-[#375E42] font-bold">INCLUDED</span>
            </div>
            <div className="flex items-center justify-between text-[#15120F] py-1 border-b border-[#15120F]/10">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#375E42]" />
                <span>Step-by-Step Payment Setup & Delivery Checklist</span>
              </div>
              <span className="text-[#375E42] font-bold">INCLUDED</span>
            </div>
            <div className="flex items-center justify-between text-[#15120F] py-1 border-b border-[#15120F]/10">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#375E42]" />
                <span>Bonus: Direct Client Action Matrix (Page 38)</span>
              </div>
              <span className="text-[#375E42] font-bold">INCLUDED</span>
            </div>

            {/* Dashed Rule on Price Breakdown */}
            <div className="dashed-rule my-3" />

            {/* Subtotal & Final Total Line */}
            <div className="flex items-center justify-between text-[#6B6250] py-0.5">
              <span>Standard Batch Price:</span>
              <span className="line-through">{CONFIG.ORIGINAL_PRICE}</span>
            </div>
            <div className="flex items-center justify-between text-base sm:text-lg font-bold text-[#15120F] pt-1">
              <span className="font-headline text-[#15120F]">FINAL ORDER TOTAL:</span>
              <span className="text-[#375E42] text-xl sm:text-2xl font-mono-ledger font-extrabold">{CONFIG.PRICE}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handlePayment} className="space-y-3 mt-5">
            
            {/* Customer Email Input */}
            <div>
              <label
                htmlFor="customer-email-input"
                className="block text-xs font-mono-ledger uppercase text-[#15120F] font-bold mb-1.5"
              >
                Enter your email to receive instant access:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6250]">
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
                  className={`w-full bg-[#EDE3CE] border ${
                    emailError ? 'border-[#A6362A] ring-1 ring-[#A6362A]' : 'border-[#15120F]/25 focus:border-[#375E42]'
                  } text-[#15120F] placeholder-[#6B6250]/60 font-sans text-sm rounded-xs pl-10 pr-4 py-3 focus:outline-none transition-all`}
                />
              </div>
              {emailError && (
                <p className="text-xs text-[#A6362A] font-mono-ledger mt-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xs bg-[#A6362A]/10 border border-[#A6362A]/40 text-[#A6362A] text-xs font-mono-ledger flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Primary CTA Button */}
            <button
              type="submit"
              id="offer-primary-cta"
              disabled={ctaState === 'creating' || ctaState === 'verifying'}
              className="group w-full inline-flex items-center justify-center gap-2 bg-[#375E42] hover:bg-[#2b4933] active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed text-[#F6F0E2] font-mono-ledger font-bold text-base sm:text-lg py-3.5 px-6 rounded-xs transition-all duration-150 text-center cursor-pointer shadow-md border border-[#233c2a]"
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
                  <span>Opening Checkout Window...</span>
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
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}

              {ctaState === 'idle' && (
                <>
                  <span>CLAIM YOUR COPY — {CONFIG.PRICE}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Trust & Security Footnote */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B6250] font-mono-ledger pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#375E42] shrink-0" />
              <span>Secure 256-bit encrypted checkout via Razorpay</span>
            </div>

            {/* Legal Modal Triggers */}
            <div className="pt-1 text-center font-mono-ledger text-[11px] text-[#6B6250]">
              By ordering, you agree to our{' '}
              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal('terms')}
                className="text-[#15120F] underline hover:text-[#375E42] cursor-pointer"
              >
                Terms
              </button>
              ,{' '}
              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal('privacy')}
                className="text-[#15120F] underline hover:text-[#375E42] cursor-pointer"
              >
                Privacy
              </button>
              , and{' '}
              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal('refund')}
                className="text-[#15120F] underline hover:text-[#375E42] cursor-pointer"
              >
                Refund Policy
              </button>
              .
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
