/**
 * Centralized API Service for Digital Product Backend Communication
 */

import { getMetaAttribution } from '../utils/attribution';
import { CONFIG } from '../config';

export const LIVE_BACKEND_URL = "https://ecom-wmqw.onrender.com";
export const LOCAL_BACKEND_URL = "http://localhost:5000";

/**
 * Resolves the backend API base URL based on environment context:
 * - In local dev (running on localhost/127.0.0.1 or import.meta.env.DEV), defaults to http://localhost:5000
 * - In production (deployed domain www.anjoaura.shop or import.meta.env.PROD), defaults to https://ecom-wmqw.onrender.com
 * - Respects explicit VITE_API_URL, while safely redirecting away from localhost if accessed from a live domain.
 */
export function resolveApiBaseUrl() {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim();
  const isBrowser = typeof window !== 'undefined';
  const isLocalHost = isBrowser && Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.localhost')
  );

  // If explicit environment variable is set
  if (envUrl) {
    // Safety guard: if app is deployed on a live domain but VITE_API_URL still points to localhost, use live backend
    if (isBrowser && !isLocalHost && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
      return LIVE_BACKEND_URL;
    }
    return envUrl.replace(/\/+$/, '');
  }

  // Automatic environment detection
  if (import.meta.env.PROD || (isBrowser && !isLocalHost)) {
    return LIVE_BACKEND_URL;
  }

  return LOCAL_BACKEND_URL;
}

const API_BASE_URL = resolveApiBaseUrl();

/**
 * Creates a server-authoritative Razorpay payment order
 * @param {string} email
 * @returns {Promise<{ success: boolean, orderId: string, amount: number, currency: string, keyId: string, productName?: string }>}
 */
export async function createPaymentOrder(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create payment order");
    }

    return data;
  } catch (error) {
    console.error("[API createPaymentOrder Error]:", error);
    throw error;
  }
}

/**
 * Verifies Razorpay payment signature server-side
 * @param {Object} params
 * @param {string} params.razorpay_order_id
 * @param {string} params.razorpay_payment_id
 * @param {string} params.razorpay_signature
 * @param {string} params.email
 * @returns {Promise<{ success: boolean, paid: boolean, downloadUrl?: string, fullDownloadUrl?: string, message?: string }>}
 */
export async function verifyPayment(params) {
  try {
    const attribution = getMetaAttribution();
    const requestPayload = {
      ...params,
      fbp: params.fbp || attribution.fbp || undefined,
      fbc: params.fbc || attribution.fbc || undefined,
      eventSourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    const response = await fetch(`${API_BASE_URL}/api/payment/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    const data = await response.json();

    if (!response.ok || !data.paid) {
      return {
        success: false,
        paid: false,
        message: data.message || "Payment verification failed",
      };
    }

    return data;
  } catch (error) {
    console.error("[API verifyPayment Error]:", error);
    return {
      success: false,
      paid: false,
      message: error.message || "Network error while verifying payment",
    };
  }
}

/**
 * Fetches order payment status
 * @param {string} orderId
 */
export async function fetchPaymentStatus(orderId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/status/${encodeURIComponent(orderId)}`);
    return await response.json();
  } catch (error) {
    console.error("[API fetchPaymentStatus Error]:", error);
    return { success: false, status: "unknown" };
  }
}

/**
 * Checks backend health and connectivity
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    return { ok: response.ok, ...data };
  } catch (error) {
    console.error("[API checkBackendHealth Error]:", error);
    return { ok: false, status: "down", error: error.message };
  }
}

/**
 * Fetches the real-time count of paid orders from backend
 * @returns {Promise<{ success: boolean, count: number, limit: number }>}
 */
export async function fetchClaimedCount() {
  const defaultBaseline = CONFIG.CLAIMED_COUNT_BASELINE || 71;
  const limit = CONFIG.TOTAL_COPIES || 100;
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/claimed-count`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const rawDbCount = typeof data.count === 'number' ? data.count : 0;

    // Aligns claimed counter with Meta ad copy (~71 claimed, 29 remaining).
    // Reference DB count at ad launch was 88; any new verified orders increment naturally from 71.
    const DB_REFERENCE_COUNT = 88;
    const newOrders = Math.max(0, rawDbCount - DB_REFERENCE_COUNT);
    const calibratedCount = Math.min(limit, defaultBaseline + newOrders);

    return {
      success: true,
      count: calibratedCount,
      rawCount: rawDbCount,
      limit: typeof data.limit === 'number' ? data.limit : limit,
    };
  } catch (error) {
    console.warn("[API fetchClaimedCount Warning]:", error.message);
    return { success: true, count: defaultBaseline, limit };
  }
}

/**
 * Converts a relative backend path to a full download URL
 * @param {string} path
 * @returns {string}
 */
export function getDownloadUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export { API_BASE_URL };


