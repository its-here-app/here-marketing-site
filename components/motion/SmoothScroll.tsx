"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css"; // Import Lenis styles

export default function SmoothScroll({ enabled = true }) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1, // How long the smooth scroll takes
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: "vertical", // 'vertical' or 'horizontal'
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1, // Scroll speed multiplier
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [enabled]);

  return null;
}
