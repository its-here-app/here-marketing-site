"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyClient() {
  useEffect(() => {
    document.body.dataset.theme = "dark";
    return () => {
      delete document.body.dataset.theme;
    };
  }, []);

  return (
    <div data-cursor="white">
      <Navbar />
      <div className="container-sm pt-10 pb-20">
        <h1 className="text-radio-1 text-default mb-10">Privacy policy</h1>
        <p className="text-body-xs text-default mb-8">
          Last updated: January 2026
        </p>

        <div className="prose-legal">
          <p>
            Here* ("Here", "we", "us", or "our") operates the Here* mobile
            application, website, and related products and services
            (collectively, the "Services"). This Privacy Policy explains how we
            collect, use, disclose, and protect your personal information.
          </p>
          <p>
            By accessing or using the Services, you agree to the practices
            described in this Privacy Policy.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information You Provide to Us</h3>
          <p>
            We collect personal information that you voluntarily provide,
            including:
          </p>
          <ul>
            <li>Name, username, email address</li>
            <li>Profile photo and account metadata</li>
            <li>
              Saved places, lists, reviews, notes, tags, and user-generated
              content
            </li>
            <li>Messages, feedback, and communications</li>
            <li>Social connections and sharing preferences</li>
            <li>Payment information (if premium features are offered)</li>
          </ul>

          <h3>1.2 Automatically Collected Information</h3>
          <p>When you use the Services, we automatically collect:</p>
          <ul>
            <li>IP address</li>
            <li>Device identifiers and operating system</li>
            <li>Browser type and app version</li>
            <li>Usage data (screens viewed, actions taken, timestamps)</li>
            <li>Crash logs and diagnostics</li>
            <li>Advertising identifiers (where applicable)</li>
          </ul>

          <h3>1.3 Location Information</h3>
          <p>
            With your permission, we collect approximate and/or precise location
            data to provide location-based discovery, mapping, search, and
            recommendation features.
          </p>
          <p>
            You may control location permissions at any time via your device
            settings.
          </p>

          <h3>1.4 Information from Third Parties</h3>
          <p>We may receive information from:</p>
          <ul>
            <li>Social login providers (if connected)</li>
            <li>Public sources</li>
            <li>Marketing partners</li>
            <li>Analytics providers</li>
          </ul>
          <p>We may combine this data with information we already hold.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use personal information to:</p>
          <ul>
            <li>Operate, maintain, and improve the Services</li>
            <li>Create and manage accounts</li>
            <li>Enable discovery, personalization, and recommendations</li>
            <li>
              Communicate updates, product announcements, and marketing (opt-out
              available)
            </li>
            <li>Conduct research and analytics</li>
            <li>Detect and prevent fraud, abuse, and security issues</li>
            <li>Enforce terms and comply with law</li>
          </ul>

          <h2>3. Legal Bases for Processing (EEA/UK)</h2>
          <p>Where GDPR applies, we process personal data based on:</p>
          <ul>
            <li>Performance of a contract</li>
            <li>Legitimate interests</li>
            <li>Your consent</li>
            <li>Compliance with legal obligations</li>
          </ul>

          <h2>4. How We Share Information</h2>
          <p>We do not sell personal data.</p>
          <p>We may share personal information with:</p>
          <ul>
            <li>Infrastructure and cloud hosting providers</li>
            <li>Analytics and communications providers</li>
            <li>Payment processors</li>
            <li>Mapping and location services</li>
            <li>Affiliates</li>
            <li>Law enforcement or regulators</li>
            <li>Acquirers in business transfers</li>
          </ul>
          <p>Public content you choose to share is visible to others.</p>

          <h2>5. Cookies &amp; Tracking Technologies</h2>
          <p>We use cookies, SDKs, pixels, and similar technologies for:</p>
          <ul>
            <li>Authentication</li>
            <li>Preferences</li>
            <li>Analytics</li>
            <li>Security</li>
            <li>Marketing performance</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain personal data as long as necessary to provide Services,
            fulfill contractual and legal obligations, and resolve disputes.
            Data may be anonymized or deleted when no longer needed.
          </p>

          <h2>7. Security</h2>
          <p>
            We use administrative, technical, and physical safeguards, but no
            system is completely secure.
          </p>

          <h2>8. Your Rights &amp; Choices</h2>
          <p>You may have rights to:</p>
          <ul>
            <li>Access your data</li>
            <li>Correct inaccuracies</li>
            <li>Delete your data</li>
            <li>Object to processing</li>
            <li>Request portability</li>
            <li>Withdraw consent</li>
            <li>Opt out of marketing</li>
          </ul>
          <p>
            Requests: <a href="mailto:team@itshere.app">team@itshere.app</a>
          </p>

          <h2>9. Children's Privacy</h2>
          <p>Here* is not intended for users under 13.</p>

          <h2>10. International Transfers</h2>
          <p>
            Data may be processed in the United States, United Kingdom, and
            other countries with appropriate safeguards.
          </p>

          <h2>11. Changes</h2>
          <p>
            We may update this policy. Material changes will be communicated.
          </p>

          <h2>12. Contact</h2>
          <p>
            📩&nbsp;
            <a href="mailto:team@itshere.app">team@itshere.app</a>
          </p>
        </div>
      </div>
      <Footer variant="basic" />
    </div>
  );
}
