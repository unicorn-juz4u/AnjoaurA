import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CONFIG } from '../config';
import { fetchPaymentStatus, getDownloadUrl } from '../services/api';
import { trackMetaPurchase, trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';
import { CheckCircle2, Download, FileText, AlertCircle, ArrowLeft, ShieldCheck, Mail } from 'lucide-react';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order') || searchParams.get('orderId');

  const isValidOrderParam = Boolean(orderId && orderId.trim());
  const [loading, setLoading] = useState(isValidOrderParam);
  const [orderState, setOrderState] = useState(isValidOrderParam ? null : 'not_found');
  const [orderDetails, setOrderDetails] = useState(null);
  const hasTrackedPurchaseRef = useRef(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    if (!isValidOrderParam) {
      return;
    }

    let isMounted = true;

    async function checkOrder() {
      try {
        // Retrieve cached delivery payload from localStorage or sessionStorage
        let cachedDelivery = null;
        try {
          const raw = localStorage.getItem(`anjoaura_delivery_${orderId}`);
          if (raw) {
            cachedDelivery = JSON.parse(raw);
          } else {
            const sessionRaw = sessionStorage.getItem('anjoaura_latest_delivery');
            if (sessionRaw) {
              const parsed = JSON.parse(sessionRaw);
              if (parsed && parsed.orderId === orderId) {
                cachedDelivery = parsed;
              }
            }
          }
        } catch (storageErr) {
          console.warn('[Storage Read Warning]:', storageErr);
        }

        // Call the EXISTING GET /api/payment/status/:orderId
        const statusRes = await fetchPaymentStatus(orderId);

        if (!isMounted) return;

        if (statusRes && statusRes.success && (statusRes.paymentStatus === 'paid' || statusRes.status === 'paid')) {
          setOrderState('paid');
          setOrderDetails({
            orderId: orderId,
            email: cachedDelivery?.email || statusRes.customerEmail || statusRes.email || 'Your Registered Email',
            downloadToken: cachedDelivery?.downloadToken || statusRes.downloadToken || '',
            downloadUrl: cachedDelivery?.downloadUrl || statusRes.downloadUrl || (cachedDelivery?.downloadToken ? `/api/payment/download/${cachedDelivery.downloadToken}` : ''),
            filename: cachedDelivery?.filename || statusRes.filename || 'Make-Your-First-100-Online.pdf',
            amount: statusRes.amount || 19900,
            currency: statusRes.currency || 'INR',
          });

          // Fire Meta Pixel Purchase event from THIS page only, with eventID matching server CAPI
          if (!hasTrackedPurchaseRef.current) {
            hasTrackedPurchaseRef.current = true;
            trackMetaPurchase({
              orderId: orderId,
              value: 199,
              currency: 'INR',
            });
            trackEvent(ANALYTICS_EVENTS.RESOURCE_ACCESSED, {
              orderId: orderId,
              page: 'success_page',
            });
          }
        } else {
          setOrderState('not_found');
        }
      } catch (err) {
        console.error('[Success Page Error]:', err);
        if (isMounted) setOrderState('not_found');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId, isValidOrderParam]);

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#EDE3CE] flex items-center justify-center p-4">
        <div className="receipt-paper p-8 rounded-xs max-w-md w-full text-center border border-[#15120F]/20 shadow-md">
          <div className="w-10 h-10 border-3 border-[#375E42] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="font-headline text-lg font-bold text-[#15120F]">
            Verifying Order Status...
          </h2>
          <p className="font-mono-ledger text-xs text-[#6B6250] mt-1">
            Communicating with payment ledger
          </p>
        </div>
      </div>
    );
  }

  // 2. Order Not Found or Unpaid State
  if (orderState !== 'paid' || !orderDetails) {
    return (
      <div className="min-h-screen bg-[#EDE3CE] flex items-center justify-center p-4">
        <div className="receipt-paper p-6 sm:p-10 rounded-xs max-w-lg w-full text-left border border-[#15120F]/20 shadow-md">
          <div className="flex items-center gap-2 mb-3 text-[#A6362A]">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <span className="font-mono-ledger text-xs uppercase font-bold tracking-wider">
              Order Verification Notice
            </span>
          </div>

          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#15120F] tracking-tight mb-2">
            We Couldn't Find That Order
          </h1>

          <p className="text-xs sm:text-sm text-[#6B6250] font-sans leading-relaxed mb-6">
            We were unable to locate a verified paid order for the reference ID provided in the link. This may happen if the payment was incomplete, expired, or opened without completing checkout.
          </p>

          <div className="p-3.5 rounded-xs bg-[#EDE3CE] border border-[#15120F]/15 text-xs font-mono-ledger text-[#6B6250] mb-6">
            If you were charged and need your download link, please email our support desk at{' '}
            <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-[#375E42] underline font-bold">
              {CONFIG.SUPPORT_EMAIL}
            </a>{' '}
            with your transaction details.
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#15120F] hover:bg-[#15120F]/90 text-[#F6F0E2] font-mono-ledger font-bold text-sm py-3 px-5 rounded-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Verified Success & Download State
  const directDownloadUrl = orderDetails.downloadToken
    ? getDownloadUrl(orderDetails.downloadUrl || `/api/payment/download/${orderDetails.downloadToken}`)
    : null;

  return (
    <div className="min-h-screen bg-[#EDE3CE] text-[#15120F] py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-left">
        
        {/* Breadcrumb Back Link */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono-ledger text-[#6B6250] hover:text-[#15120F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to AnjoAura Store</span>
          </Link>
        </div>

        {/* Receipt Container */}
        <div className="receipt-paper p-6 sm:p-10 rounded-xs border border-[#15120F]/20 shadow-md relative">
          
          {/* Top Stamped Verification Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-5 border-b border-[#15120F]/15">
            <div className="flex items-center gap-2">
              <span className="stamp-badge-solid text-[10px] sm:text-xs px-2 py-0.5">
                PAYMENT VERIFIED • COPY ISSUED
              </span>
            </div>
            <span className="font-mono-ledger text-[11px] text-[#6B6250]">
              OFFICIAL ACCESS RECEIPT
            </span>
          </div>

          {/* Headline & Confirmation */}
          <h1 className="font-headline text-2xl sm:text-4xl font-extrabold text-[#15120F] tracking-tight mb-2">
            Your Playbook Is Ready
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6250] font-sans leading-relaxed mb-5">
            Your order has been verified and your personal download license is active. Stream or download your complete guide immediately below.
          </p>

          {/* Receipt Pill: Order ID + Customer Email */}
          <div className="p-3.5 rounded-xs bg-[#EDE3CE] border border-[#15120F]/15 text-xs font-mono-ledger text-[#15120F] mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6B6250]">ORDER ID:</span>
              <code className="text-[#375E42] font-bold">{orderDetails.orderId}</code>
            </div>
            <span className="text-[#15120F]/25">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#6B6250]">LICENSED TO:</span>
              <span className="font-medium underline">{orderDetails.email}</span>
            </div>
          </div>

          {/* Download Action Box */}
          <div className="p-5 sm:p-6 rounded-xs bg-[#EDE3CE] border-2 border-[#375E42] mb-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xs bg-[#375E42]/15 text-[#375E42] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono-ledger text-[10px] uppercase font-bold text-[#A6362A] bg-[#A6362A]/10 px-1.5 py-0.5 rounded-xs">
                      OFFICIAL EDITION
                    </span>
                    <span className="font-mono-ledger text-[10px] text-[#6B6250]">
                      PDF DOCUMENT
                    </span>
                  </div>
                  <h2 className="font-headline text-base sm:text-lg font-bold text-[#15120F] leading-snug">
                    {CONFIG.PRODUCT_NAME}
                  </h2>
                  <p className="text-xs text-[#6B6250] mt-0.5 font-sans">
                    Complete 5 modules: outreach scripts, pricing template, and payment delivery system.
                  </p>
                </div>
              </div>

              {directDownloadUrl ? (
                <a
                  href={directDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#375E42] hover:bg-[#2b4933] text-[#F6F0E2] font-mono-ledger font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xs transition-colors shadow-md shrink-0 border border-[#233c2a] text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD PLAYBOOK (PDF)</span>
                </a>
              ) : (
                <div className="text-xs font-mono-ledger text-[#A6362A]">
                  Token link refreshing... Check your inbox or contact support.
                </div>
              )}
            </div>
          </div>

          {/* Genuine Bonus Note */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-[#F6F0E2] border border-[#B8933E]/40 mb-6 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#B8933E] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono-ledger text-[11px] font-bold uppercase text-[#B8933E] block mb-0.5">
                Included Bonus Inside Your PDF
              </span>
              <p className="text-xs text-[#15120F] leading-relaxed font-sans">
                Turn directly to <strong>Page 38</strong> for the <em>Direct Client Outreach Checklist & Action Matrix</em>. Follow the 3-step outreach filter before sending your first proposal.
              </p>
            </div>
          </div>

          {/* Support & Access Guidance */}
          <div className="pt-4 border-t border-[#15120F]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-ledger text-[#6B6250]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#375E42] shrink-0" />
              <span>Tokenized access valid for 24 hours. Save a local copy.</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#15120F] shrink-0" />
              <span>
                Support:{' '}
                <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-[#375E42] underline font-bold">
                  {CONFIG.SUPPORT_EMAIL}
                </a>
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
