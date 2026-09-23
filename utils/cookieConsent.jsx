import { snackbar } from "@/components/ui/Snackbar";

export const COOKIE_CONSENT_KEY = "here-cookie-consent";
export const COOKIE_CONSENT_EVENT = "here-cookie-consent-change";

export function getCookieConsent() {
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  return stored === "granted" || stored === "denied" ? stored : null;
}

export function setCookieConsent(value) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }),
  );
}

export function showCookieConsentSnackbar() {
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
    onAction: () => setCookieConsent("granted"),
    onSecondAction: () => setCookieConsent("denied"),
  });
}
