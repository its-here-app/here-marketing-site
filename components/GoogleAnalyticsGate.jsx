"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { snackbar } from "@/components/ui/Snackbar";

const CONSENT_KEY = "here-cookie-consent";

export default function GoogleAnalyticsGate({ gaId, requiresConsent }) {
  const [consent, setConsent] = useState(() =>
    requiresConsent ? null : true,
  );

  useEffect(() => {
    if (!requiresConsent) return;

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "granted" || stored === "denied") {
      setConsent(stored === "granted");
      return;
    }

    snackbar({
      key: "cookie-consent",
      duration: 0,
      message: (
        <>
          We use cookies for Google Analytics ·{" "}
          <a href="/privacy" data-cursor-size="sm" className="underline">
            Privacy policy
          </a>
        </>
      ),
      actionLabel: "Allow",
      secondActionLabel: "Decline",
      onAction: () => {
        localStorage.setItem(CONSENT_KEY, "granted");
        setConsent(true);
      },
      onSecondAction: () => {
        localStorage.setItem(CONSENT_KEY, "denied");
        setConsent(false);
      },
    });
  }, [requiresConsent]);

  if (!consent) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
