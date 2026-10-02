"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/utils/analytics";
import { getHomePage } from "@/utils/HomePageUtils";

const isExternalHref = (href) => /^https?:\/\//i.test(href || "");

const AnnouncementBanner = () => {
  const [announcementBanner, setAnnouncementBanner] = useState(null);

  useEffect(() => {
    async function fetchAnnouncementBanner() {
      const homePage = await getHomePage();
      setAnnouncementBanner(homePage?.announcementBanner);
    }
    fetchAnnouncementBanner();
  }, []);

  if (!announcementBanner?.visible) return null;

  const { desktopMessage, mobileMessage, ctaText, href } = announcementBanner;
  if (!desktopMessage) return null;

  const external = isExternalHref(href);

  const handleClick = () => {
    trackEvent("announcement_banner_cta_click");
    if (!href) return;
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor="neon"
      className="group w-full h-[3.25rem] bg-black hover:bg-gray-900 transition-colors duration-300 text-cream px-[var(--side-spacing)] flex items-center gap-8 cursor-pointer"
    >
      <p className="text-body-sm truncate flex-1 text-left">
        <span className="lg:hidden">{mobileMessage || desktopMessage}</span>
        <span className="hidden lg:inline">{desktopMessage}</span>
      </p>
      {ctaText && (
        <span className="flex items-center gap-1 text-body-sm shrink-0">
          <span className="group-hover:underline">{ctaText}</span>
          <img
            src={
              external
                ? "/images/icons/icon-arrow-ne.svg"
                : "/images/icons/icon-arrow-right-white.svg"
            }
            alt=""
            className="size-6 shrink-0"
          />
        </span>
      )}
    </button>
  );
};

export default AnnouncementBanner;
