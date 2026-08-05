/**
 * Fires a GA4 event via gtag, if available
 * @param name - event name
 * @param params - event parameters
 */
export function trackEvent(name, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
