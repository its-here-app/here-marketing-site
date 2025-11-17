"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import SlideIn from "@/components/motion/SlideIn";

const PhoneSection = ({ className = "" }) => {
  const containerRef = useRef(null);

  // Track dynamic heights
  const [dimensions, setDimensions] = useState({
    feedHeight: 1573,
    visibleHeight: 773,
    maxScroll: -(1573 - 773),
  });

  // Recalculate sizes based on breakpoints
  const recalcDimensions = () => {
    const isMobile = window.innerWidth < 768; // Tailwind's "md" breakpoint

    const feedHeight = isMobile ? 1241 : 1573; // example mobile feed height
    const visibleHeight = isMobile ? 610 : 773;

    const maxScroll = -(feedHeight - visibleHeight);

    setDimensions({ feedHeight, visibleHeight, maxScroll });
  };

  // Recalculate on mount + resize
  useEffect(() => {
    recalcDimensions();
    window.addEventListener("resize", recalcDimensions);
    window.addEventListener("orientationchange", recalcDimensions);

    return () => {
      window.removeEventListener("resize", recalcDimensions);
      window.removeEventListener("orientationchange", recalcDimensions);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const speed = 1.5;

  const fastProgress = useTransform(scrollYProgress, (v) =>
    Math.min(v * speed, 1)
  );

  const feedY = useTransform(fastProgress, [0, 1], [0, dimensions.maxScroll]);

  return (
    <div
      ref={containerRef}
      className={`min-h-[calc(100vh+100vh)] h-full bg-gradient-to-t from-neon to-neon/0 -mb-16 text-center flex flex-col items-center relative pt-16 pb-36 ${className}`}
    >
      <div className="sticky container top-0 flex flex-col items-center z-20">
        <SlideIn>
          <h2 className="text-balance text-radio-1 max-w-[44rem] mt-[10vh] mb-[7vh]">
            It's here*
          </h2>
        </SlideIn>
        <div className="relative h-[610px] w-[300px] md:h-[773px] md:w-[380px] pointer-events-none select-none">
          <img
            className="absolute top-0 z-20 pointer-events-none"
            src="/images/graphics/phone.png"
            alt="iPhone"
            style={{ height: "100%" }}
          />
          <div className="overflow-hidden absolute top-[14px] md:top-[20px] left-0 h-[580px] w-[300px] md:w-[380px] md:h-[740px] rounded-[4rem] md:rounded-[4.5rem]">
            <motion.img
              style={{ y: feedY }}
              src="/images/graphics/home-feed.png"
              alt="Here home feed"
              className="w-full"
            />
          </div>
        </div>
        <SlideIn>
          <Button variant="primary" className="mt-[8vh]">
            Start for free
          </Button>
        </SlideIn>
      </div>
    </div>
  );
};

export default PhoneSection;
