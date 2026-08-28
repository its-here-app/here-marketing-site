// layout.jsx
import "./globals.css";

import { draftMode, headers } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/cms/lib/live";
import ClientWrapper from "./ClientWrapper";
import DisableDraftMode from "@/components/DisableDraftMode";
import GoogleAnalyticsGate from "@/components/GoogleAnalyticsGate";
import { isEuOrUkCountry } from "@/utils/region";

export const metadata = {
  metadataBase: new URL("https://itshere.app"),
  title: "Here* — Discover and share favorite spots through city playlists",
  description: "For the spots you love & the places you'll go.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Here* default OG image",
      },
    ],
  },
};

export default async function RootLayout({ children }) {
  const isDraftMode = (await draftMode()).isEnabled;
  const countryCode = (await headers()).get("x-vercel-ip-country");
  const requiresCookieConsent = isEuOrUkCountry(countryCode);

  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <div className="min-h-screen flex flex-col justify-between gap-8">
            <main className="flex flex-col justify-center">{children}</main>
          </div>
        </ClientWrapper>
        <GoogleAnalyticsGate
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          requiresConsent={requiresCookieConsent}
        />
        <SanityLive />
        {isDraftMode && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
