// layout.jsx
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/Footer";
import ClientWrapper from "./ClientWrapper";

export const metadata = {
  title: "Here*",
  description: "For the spots you love & the places you'll go.",
  openGraph: {
    images: [
      {
        url: "/images/og/og.jpg",
        width: 1200,
        height: 630,
        alt: "Here* default OG image",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <div className="min-h-screen flex flex-col justify-between gap-8">
            <main className="flex flex-col justify-center">{children}</main>
            <Footer />
          </div>
        </ClientWrapper>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
