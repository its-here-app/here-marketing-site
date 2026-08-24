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

export default function TermsClient({ termsPage }) {
  useEffect(() => {
    document.body.dataset.theme = "dark";
    return () => {
      delete document.body.dataset.theme;
    };
  }, []);

  const title = termsPage?.title || "Terms of use";
  const effectiveDate = termsPage?.effectiveDate;

  return (
    <div data-cursor="white">
      <Navbar />
      <div className="container-sm pt-10 pb-20">
        <h1 className="text-radio-1 text-default mb-10">{title}</h1>
        {effectiveDate && termsPage?.body && (
          <p className="text-body-xs text-default mb-8">
            Effective date: {effectiveDate}
          </p>
        )}

        <div className="prose-legal">
          {termsPage?.body ? (
            <PortableText value={termsPage.body} components={portableTextComponents} />
          ) : (
            <p>Content coming soon.</p>
          )}
        </div>
      </div>
      <Footer variant="basic" />
    </div>
  );
}
