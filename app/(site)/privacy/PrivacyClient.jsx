"use client";

import { useEffect } from "react";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const portableTextComponents = {
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PrivacyClient({ privacyPage }) {
  useEffect(() => {
    document.body.dataset.theme = "dark";
    return () => {
      delete document.body.dataset.theme;
    };
  }, []);

  const title = privacyPage?.title || "Privacy policy";
  const effectiveDate = privacyPage?.effectiveDate;

  return (
    <div data-cursor="white" className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container-sm pt-10 pb-20 flex-1">
        <h1 className="text-radio-1 text-default mb-10">{title}</h1>
        {effectiveDate && privacyPage?.body && (
          <p className="text-body-xs text-default mb-8">
            Effective date: {effectiveDate}
          </p>
        )}

        <div className="prose-legal">
          {privacyPage?.body ? (
            <PortableText value={privacyPage.body} components={portableTextComponents} />
          ) : (
            <p>Content coming soon.</p>
          )}
        </div>
      </div>
      <Footer variant="basic" />
    </div>
  );
}
