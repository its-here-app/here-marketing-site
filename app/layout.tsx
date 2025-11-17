import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import ModalRootClient from "./ModalRootClient";
import ClientWrapper from "./ClientWrapper";

export const metadata: Metadata = {
  title: "Here*",
  description: "For the spots you love & the places you'll go",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <div className="min-h-screen flex flex-col justify-between gap-8">
            <main className="flex flex-col justify-center">{children}</main>
            <Footer />
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}
