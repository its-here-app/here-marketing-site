// layout.jsx
import "./globals.css";

import { draftMode } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/cms/lib/live";
import ClientWrapper from "./ClientWrapper";
import DisableDraftMode from "@/components/DisableDraftMode";

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

  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <div className="min-h-screen flex flex-col justify-between gap-8">
            <main className="flex flex-col justify-center">{children}</main>
          </div>
        </ClientWrapper>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
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
