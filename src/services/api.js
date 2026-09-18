/**
 * Centralized API Service for Digital Product Backend Communication
 */

import { getMetaAttribution } from '../utils/attribution';

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
