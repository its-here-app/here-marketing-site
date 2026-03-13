"use client";

import { motion, useTransform, useSpring } from "motion/react";

const GRAY = "#757575";
const NEON = "#daff70";

const floatingElements = [
  {
    id: 0,
    src: "/images/photos/import-list/import-list_1.webp",
    initX: -280,
    initY: -260,
    stagger: 0,
    end: 0.46,
    zIndex: 15,
  },
  {
    id: 1,
    src: "/images/photos/import-list/import-list_2.webp",
    initX: 240,
    initY: -290,
    stagger: 0.1,
    end: 0.51,
    zIndex: 5,
  },
  {
    id: 2,
    src: "/images/photos/import-list/import-list_3.webp",
    initX: 260,
    initY: 240,
    stagger: 0.2,
    end: 0.56,
    zIndex: 15,
  },
  {
    id: 3,
    src: "/images/photos/import-list/import-list_4.webp",
    initX: -240,
    initY: 270,
    stagger: 0.3,
    end: 0.62,
    zIndex: 5,
  },
];

const FloatingElement = ({ scrollYProgress, src, initX, initY, stagger, end, zIndex }) => {
  const rawProgress = useTransform(scrollYProgress, [0.15 + stagger, end], [0, 1]);
  const easedProgress = useTransform(rawProgress, (t) =>
    Math.pow(Math.min(Math.max(t, 0), 1), 4),
  );
  const x = useTransform(easedProgress, [0, 1], [initX, 0]);
  const y = useTransform(easedProgress, [0, 1], [initY, 0]);
  const opacity = useTransform(
    scrollYProgress,
    [0.15 + stagger, 0.25 + stagger, end - 0.08, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.img
      src={src}
      alt=""
      style={{
        x,
        y,
        opacity,
        width: "100%",
        maxWidth: "21.25rem",
        position: "absolute",
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex,
      }}
    />
  );
};

const ImportAnimation = ({ scrollYProgress }) => {
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });
  const imageOpacity = useTransform(smoothProgress, [0.58, 0.68], [0, 1]);
  const textColor = useTransform(smoothProgress, [0.58, 0.68], [GRAY, NEON]);
  const borderColor = useTransform(
    smoothProgress,
    [0.58, 0.64],
    ["rgba(117,117,117,1)", "rgba(117,117,117,0)"],
  );

  return (
    <div className="relative w-full md:max-w-[50%] flex items-center justify-center -mt-4 md:mt-0">
      {/* Square */}
      <motion.div
        className="relative w-full aspect-square flex items-center justify-center overflow-hidden max-w-[445px]"
        style={{
          borderRadius: "24px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor,
          zIndex: 10,
        }}
      >
        <motion.img
          src="/images/photos/playlists/waterfronts.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: imageOpacity }}
        />
        <motion.div
          className="relative z-10 text-center select-none p-[10%]"
          style={{ color: textColor }}
        >
          <h3 className="text-crimson-2">Chicago</h3>
          <h4 className="text-golos-2">All time favs</h4>
        </motion.div>
        <motion.div
          className="text-body-sm absolute bottom-[8%] z-10 select-none"
          style={{ color: textColor }}
        >
          by juliettewang
        </motion.div>
      </motion.div>

      {/* Floating elements — positioned relative to this wrapper, converge to center */}
      {floatingElements.map((el) => (
        <FloatingElement
          key={el.id}
          scrollYProgress={smoothProgress}
          src={el.src}
          initX={el.initX}
          initY={el.initY}
          stagger={el.stagger}
          end={el.end}
          zIndex={el.zIndex}
        />
      ))}
    </div>
  );
};

export default ImportAnimation;
