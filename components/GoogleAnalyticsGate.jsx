"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  getCookieConsent,
  showCookieConsentSnackbar,
  COOKIE_CONSENT_EVENT,
} from "@/utils/cookieConsent";

export default function GoogleAnalyticsGate({ gaId, requiresConsent }) {
  const [consent, setConsent] = useState(() =>
    requiresConsent ? null : true,
  );

  useEffect(() => {
    const stored = getCookieConsent();
    if (stored) {
      setConsent(stored === "granted");
    } else if (requiresConsent) {
      showCookieConsentSnackbar();
    }
  }, [requiresConsent]);

  useEffect(() => {
    const handleChange = (e) => setConsent(e.detail === "granted");
    window.addEventListener(COOKIE_CONSENT_EVENT, handleChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleChange);
  }, []);

  if (!consent) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
