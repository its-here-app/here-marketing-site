"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/utils/analytics";

const Navbar = ({ className = "", showCTA = true }) => {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" && document.body.dataset.theme === "dark"
  );

  const handleCTAClick = () => {
    trackEvent("navbar_cta_click");
    window.location.href = "/signin";
  };

  const handleSignInClick = () => {
    trackEvent("navbar_signin_click");
  };

  useEffect(() => {
    setIsDark(document.body.dataset.theme === "dark");

    const observer = new MutationObserver(() => {
      setIsDark(document.body.dataset.theme === "dark");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container-lg flex justify-between items-center my-8">
      <Logo button={true} color={isDark ? "white" : "black"} />
      <div className="flex items-center gap-6">
        {showCTA && (
          <>
            <a
              href="/signin"
              onClick={handleSignInClick}
              data-cursor="neon"
            >
              Sign in
            </a>
            <Button
              variant="primary"
              className="sm:block hidden"
              onClick={handleCTAClick}
            >
              Start for free
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
