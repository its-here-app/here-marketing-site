"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import EmailInput from "@/components/ui/EmailInput";
import StickerCTA from "@/components/ui/StickerCTA";
import { trackEvent } from "@/utils/analytics";
import { showCookieConsentSnackbar } from "@/utils/cookieConsent";
import { getFooter } from "@/utils/FooterUtils";

const isExternalHref = (href) => /^https?:\/\//i.test(href || "");

const DEFAULT_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/itshere.app/" },
  { label: "Contact", href: "mailto:team@itshere.app" },
  {
    label: "Give us feedback",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScsPPpWZztGYAwZH3V3czQodyYgmy4mQFYhTmdLr33k08Bd1g/viewform?usp=sf_link",
  },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const Footer = ({
  variant = "default",
  className = "",
  ctaPosition = "absolute",
  ctaColor = "neon",
}) => {
  const isBasic = variant === "basic";
  const [links, setLinks] = useState(DEFAULT_LINKS);

  useEffect(() => {
    async function fetchFooter() {
      const footer = await getFooter();
      if (footer?.links?.length) setLinks(footer.links);
    }
    fetchFooter();
  }, []);

  const handleStartPlaylistClick = () => {
    trackEvent("footer_start_playlist_click");
    window.location.href = "/signin";
  };

  return (
    <footer
      data-cursor="white"
      className={`${className} w-full text-white bg-black rounded-t-[2.25rem] overflow-hidden relative`}
    >
      <div className="container-lg pt-16 md:pt-20 pb-10 relative">
        {!isBasic && (
          <>
            <h2 className="text-radio-4 mb-6 md:mb-9">
              Keep up with our new<br></br>features and exclusives
            </h2>
            <EmailInput className="mb-16" />
          </>
        )}
        <Logo button={true} color="white" className="mb-8" />
        <div className="text-gray-700 flex flex-col lg:flex-row lg:gap-20">
          <ul className="flex flex-col lg:flex-row lg:flex-wrap lg:flex-1 gap-5 lg:gap-x-10 lg:gap-y-3 mb-10 lg:mb-0">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={isExternalHref(href) ? "_blank" : undefined}
                  rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
                  data-cursor-size="sm"
                  className="py-1 -my-1 block"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={showCookieConsentSnackbar}
                data-cursor-size="sm"
                className="py-1 -my-1 block cursor-pointer"
              >
                Cookie settings
              </button>
            </li>
          </ul>
          <p className="shrink-0 whitespace-nowrap">© Here* 2026. All rights reserved</p>
        </div>
        {!isBasic && (
          <Logo
            color="blue"
            type="icon"
            className="absolute bottom-[6.5rem] right-[-.5rem] lg:bottom-[55%] lg:right-[3%] rotate-[12deg] !w-[4.375rem] md:!w-[5.625rem]"
          />
        )}
        {!isBasic && (
          <div onClick={handleStartPlaylistClick}>
            <StickerCTA
              color={ctaColor}
              className={`${ctaPosition} cursor-pointer scale-0 lg:scale-100 rotate-20 lg:rotate-0 right-[8%] bottom-24 hover:rotate-10 z-100`}
            />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
