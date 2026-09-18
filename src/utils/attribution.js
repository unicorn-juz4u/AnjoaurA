/**
 * Meta Ads Attribution & Tracking Helper
 * Safely extracts and preserves Meta tracking identifiers (_fbp, _fbc, fbclid)
 * for deduplicated server-side / client-side conversion attribution.
 */

const STORAGE_FBCLID_KEY = 'anjoaura_meta_fbclid';

/**
 * Parses a cookie value by name from document.cookie
 * @param {string} name
 * @returns {string|null}
 */
export function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Initializes and captures Meta click ID from URL parameters
 */
export function captureUrlAttribution() {
  if (typeof window === 'undefined') return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');

    if (fbclid) {
      sessionStorage.setItem(STORAGE_FBCLID_KEY, fbclid);
    }
  } catch (err) {
    // Non-fatal if storage/url parsing fails
    console.debug('[Attribution] URL parsing bypassed:', err);
  }
}

/**
 * Returns current Meta attribution parameters
 * @returns {{ fbp: string|null, fbc: string|null, fbclid: string|null }}
 */
export function getMetaAttribution() {
  if (typeof window === 'undefined') {
    return { fbp: null, fbc: null, fbclid: null };
  }

  // 1. Get _fbp cookie set by Meta Pixel
  const fbp = getCookie('_fbp');

  // 2. Get _fbc cookie if already set by Meta Pixel
  let fbc = getCookie('_fbc');

  // 3. Fallback: check fbclid from URL or session storage
  let fbclid = null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    fbclid = urlParams.get('fbclid') || sessionStorage.getItem(STORAGE_FBCLID_KEY);

    if (!fbc && fbclid) {
      // Standard Meta fbc format: fb.1.<creationTime>.<fbclid>
      fbc = `fb.1.${Date.now()}.${fbclid}`;
    }
  } catch {
    // Storage access or URL parsing denied
  }

  return {
    fbp: fbp || null,
    fbc: fbc || null,
    fbclid: fbclid || null,
  };
}
