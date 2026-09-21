/**
 * Central configuration for "Make Your First $100 Online" Flagship Offer.
 */
export const CONFIG = {
  BRAND_NAME: "AnjoAura",
  PRODUCT_NAME: "Make Your First $100 Online",
  PRODUCT_SUBTITLE: "A five-part playbook that turns one skill you already have into your first paid client — this week, not someday.",
  PRICE: "₹199",
  ORIGINAL_PRICE: "₹349",
  PRICE_CENTS: 19900,
  CURRENCY: "INR",
  CURRENCY_SYMBOL: "₹",
  TOTAL_COPIES: 100,
  CLAIMED_COUNT_BASELINE: 71, // Aligns claimed counter with active Meta ad copy (e.g. 71 claimed, 29 remaining)
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || "support@anjoaura.com",
  PAYMENT_LINK: "#offer-section",
  DELIVERY_METHOD: "Instant digital download via secure tokenized access immediately upon successful payment.",
  COPYRIGHT_YEAR: "2026",
};
