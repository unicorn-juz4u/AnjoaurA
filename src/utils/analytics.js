/**
 * Lightweight, zero-dependency analytics & Meta Ads conversion telemetry dispatcher.
 * Integrates official Meta Pixel events (PageView, ViewContent, InitiateCheckout, Purchase)
 * with deduplication ID and strict verified-payment guards.
 */

import { captureUrlAttribution, getMetaAttribution } from './attribution';

export const ANALYTICS_EVENTS = {
  LANDING_PAGE_VIEW: 'landing_page_view',
  OFFER_VIEW: 'offer_view',
  CHECKOUT_STARTED: 'checkout_started',
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  RESOURCE_ACCESSED: 'resource_accessed',
};

// Auto-capture attribution on script execution
if (typeof window !== 'undefined') {
  captureUrlAttribution();
}

let isPixelInitialized = false;

/**
 * Initializes official Meta Pixel if configured via environment
 */
export function initMetaPixel() {
  if (typeof window === 'undefined') return;

  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId || pixelId.includes('placeholder')) {
    if (import.meta.env.DEV) {
      console.log('[Meta Pixel] Not initialized: VITE_META_PIXEL_ID is not configured in .env');
    }
    return;
  }

  if (!isPixelInitialized && typeof window.fbq === 'function') {
    try {
      window.fbq('init', pixelId);
      isPixelInitialized = true;
      trackMetaPageView();
      if (import.meta.env.DEV) {
        console.log(`[Meta Pixel] Initialized with Pixel ID: ${pixelId}`);
      }
    } catch (err) {
      console.warn('[Meta Pixel Init Error]:', err);
    }
  }
}

/**
 * Safely dispatches standard Meta Pixel events
 * @param {string} eventName
 * @param {Object} [params]
 * @param {Object} [options] - e.g. { eventID: orderId } for Meta CAPI deduplication
 */
export function trackMetaEvent(eventName, params = {}, options = {}) {
  if (typeof window === 'undefined') return;

  // Log in development
  if (import.meta.env.DEV) {
    console.log(`[Meta Pixel] fbq('track', '${eventName}')`, params, options);
  }

  if (typeof window.fbq === 'function') {
    try {
      if (options && options.eventID) {
        window.fbq('track', eventName, params, options);
      } else if (Object.keys(params).length > 0) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    } catch (err) {
      console.warn(`[Meta Pixel] Error tracking ${eventName}:`, err);
    }
  }
}

/**
 * Tracks PageView
 */
export function trackMetaPageView() {
  trackMetaEvent('PageView');
}

/**
 * Tracks ViewContent for Digital Creator Launch System offer
 */
export function trackMetaViewContent() {
  trackMetaEvent('ViewContent', {
    content_name: 'Digital Creator Launch System',
    content_category: 'Digital Product Bundle',
    value: 299,
    currency: 'INR',
  });
}

/**
 * Tracks InitiateCheckout strictly when user intentionally begins checkout flow
 * Does NOT track Purchase.
 */
export function trackMetaInitiateCheckout(params = {}) {
  trackMetaEvent('InitiateCheckout', {
    content_name: 'Digital Creator Launch System',
    content_category: 'Digital Product Bundle',
    value: params.value || 299,
    currency: params.currency || 'INR',
    num_items: 1,
  });
}

/**
 * Tracks Meta Purchase conversion strictly after verified successful payment.
 * Guarded by idempotency check so multiple reloads / download clicks do not trigger duplicates.
 * Sends { eventID: orderId } to deduplicate against server-side Conversions API.
 *
 * @param {Object} params
 * @param {string} params.orderId - Razorpay Order ID used as deduplication reference
 * @param {number} [params.value=299]
 * @param {string} [params.currency='INR']
 */
export function trackMetaPurchase({ orderId, value = 299, currency = 'INR' }) {
  if (!orderId) {
    console.warn('[Meta Pixel Purchase Guard] orderId is required for purchase tracking');
    return false;
  }

  if (typeof window === 'undefined') return false;

  // Idempotency Protection: Prevent duplicate purchase triggers on reload, refresh, or multi-download
  const storageKey = `meta_purchase_tracked_${orderId}`;
  try {
    if (localStorage.getItem(storageKey)) {
      if (import.meta.env.DEV) {
        console.log(`[Meta Pixel Deduplication Guard] Purchase event for order ${orderId} already fired. Skipping duplicate.`);
      }
      return false;
    }
  } catch {
    // localStorage unavailable or blocked
  }

  // Mark order as tracked locally
  try {
    localStorage.setItem(storageKey, 'true');
  } catch {
    // localStorage write blocked
  }

  // Dispatch Meta Purchase event with eventID matching server-side CAPI event_id
  trackMetaEvent(
    'Purchase',
    {
      content_name: 'Digital Creator Launch System',
      content_category: 'Digital Product Bundle',
      value: value,
      currency: currency,
      num_items: 1,
    },
    { eventID: orderId }
  );

  if (import.meta.env.DEV) {
    console.log(`[Meta Pixel Purchase Tracked]: Order=${orderId}, Value=₹${value} ${currency}, eventID=${orderId}`);
  }

  return true;
}

/**
 * Central event dispatcher preserving internal telemetry and custom events
 */
export function trackEvent(eventName, eventProperties = {}) {
  const payload = {
    event: eventName,
    properties: {
      ...eventProperties,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
    },
  };

  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${eventName}:`, payload.properties);
  }

  // Dispatch custom browser event so any third-party script (GTM, Meta Pixel, PostHog) can listen
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('anjoaura_track', { detail: payload }));
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }
  }
}

export { getMetaAttribution };
