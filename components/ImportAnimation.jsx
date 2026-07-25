"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useMotionValue, animate } from "motion/react";

// reference size the fan/gap offsets below were tuned at; actual rendered
// height is clamped responsively and measured live (see cardHeight state)
const BASE_HEIGHT = 445;
const BASE_GAP = 20;
const CARD_ASPECT = 1101 / 1278;
const FINAL_ASPECT = 1052 / 1074;

// desktop scales with viewport, reaching its full 445px height at the 2xl breakpoint (1536px)
const HEIGHT_CLAMP = "clamp(320px, 28.971354vw, 445px)";
// mobile uses a fixed height instead of scaling (matches the clamp's floor)
const MOBILE_HEIGHT = 280;

// animation states the progress value passes through: row -> fan 1 -> fan 2 -> settle into card 4
const STATES = [0, 1, 2, 3];

// forward timeline: each convergence step transitions, then pauses before the next
const TRANSITION = 0.6;
const PAUSE = 0.2;
const SEGMENT_DURATIONS = [TRANSITION, PAUSE, TRANSITION, PAUSE, TRANSITION];
const FORWARD_DURATION = SEGMENT_DURATIONS.reduce((a, b) => a + b, 0);
const FORWARD_TIMES = SEGMENT_DURATIONS.reduce(
  (acc, d) => [...acc, acc[acc.length - 1] + d / FORWARD_DURATION],
  [0]
);
// bounce on the two convergence transitions (row->fan1, fan1->fan2); plain ease on holds and the final settle
const FORWARD_EASE = ["backOut", "linear", "backOut", "linear", "easeInOut"];

const DEFAULT_SOURCE_IMAGES = [
  "/images/graphics/home/import-list-animation/01.webp",
  "/images/graphics/home/import-list-animation/02.webp",
  "/images/graphics/home/import-list-animation/03.webp",
];
const DEFAULT_FINAL_IMAGE = "/images/graphics/home/import-list-animation/04.webp";

const CARD_CONFIGS = [
  {
    id: 0,
    rowIndex: 0,
    fan1: { dx: -70, y: 12, rotate: -24 },
    fan2: { dx: -34, y: 6, rotate: -14 },
    zIndex: 12,
  },
  {
    id: 1,
    rowIndex: 1,
    fan1: { dx: 0, y: -6, rotate: -3 },
    fan2: { dx: 0, y: -3, rotate: -3 },
    zIndex: 11,
  },
  {
    id: 2,
    rowIndex: 2,
    fan1: { dx: 70, y: 12, rotate: 14 },
    fan2: { dx: 34, y: 6, rotate: 7 },
    zIndex: 10,
  },
];

const SourceCard = ({
  progress,
  card,
  centerX,
  cardHeight,
  cardWidth,
  rowOffset,
  scaleFactor,
  isMobile,
}) => {
  const { fan1, fan2 } = card;
  const restX = centerX - cardWidth / 2;
  const rowX = isMobile ? restX + (card.rowIndex - 1) * rowOffset : card.rowIndex * rowOffset;

  const xStops = [rowX, restX + fan1.dx * scaleFactor, restX + fan2.dx * scaleFactor, restX];
  const yStops = [0, fan1.y * scaleFactor, fan2.y * scaleFactor, 0];
  const rotateStops = [0, fan1.rotate, fan2.rotate, 0];

  const x = useTransform(progress, STATES, xStops);
  const y = useTransform(progress, STATES, yStops);
  const rotate = useTransform(progress, STATES, rotateStops);
  const opacity = useTransform(progress, STATES, [1, 1, 1, 0]);
  const scale = useTransform(progress, STATES, [1, 1, 1, 0.85]);

  return (
    <motion.img
      src={card.src}
      alt=""
      style={{
        x,
        y,
        rotate,
        opacity,
        scale,
        height: cardHeight,
        width: "auto",
        position: "absolute",
        left: 0,
        top: "50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: card.zIndex,
        borderRadius: "24px",
      }}
    />
  );
};

const ImportAnimation = ({
  isActive,
  isMobile,
  sourceImages = DEFAULT_SOURCE_IMAGES,
  finalImage = DEFAULT_FINAL_IMAGE,
}) => {
  const stageRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: BASE_HEIGHT });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = isActive
      ? animate(progress, [0, 1, 1, 2, 2, 3], {
          times: FORWARD_TIMES,
          duration: FORWARD_DURATION,
          ease: FORWARD_EASE,
        })
      : animate(progress, 0, { duration: 0.8, ease: "easeInOut" });
    return () => controls.stop();
  }, [isActive, progress]);

  const finalOpacity = useTransform(progress, [2, 3], [0, 1]);
  const finalScale = useTransform(progress, [2, 3], [0.88, 1]);

  const { width: containerWidth, height: cardHeight } = containerSize;
  const centerX = containerWidth / 2;
  const scaleFactor = cardHeight / BASE_HEIGHT;
  const cardWidth = cardHeight * CARD_ASPECT;
  const gap = BASE_GAP * scaleFactor;
  const rowOffset = cardWidth + gap;
  const finalWidth = cardHeight * FINAL_ASPECT;

  return (
    <div
      ref={stageRef}
      className="relative w-full md:max-w-[50%] -mt-4 md:mt-0 mb-5 md:mb-0"
      style={{ height: isMobile ? MOBILE_HEIGHT : HEIGHT_CLAMP }}
    >
      {CARD_CONFIGS.map((card, i) => (
        <SourceCard
          key={card.id}
          progress={progress}
          card={{ ...card, src: sourceImages[i] ?? DEFAULT_SOURCE_IMAGES[i] }}
          centerX={centerX}
          cardHeight={cardHeight}
          cardWidth={cardWidth}
          rowOffset={rowOffset}
          scaleFactor={scaleFactor}
          isMobile={isMobile}
        />
      ))}

      <motion.img
        src={finalImage}
        alt=""
        style={{
          opacity: finalOpacity,
          scale: finalScale,
          height: cardHeight,
          width: "auto",
          position: "absolute",
          left: centerX - finalWidth / 2,
          top: "50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "24px",
        }}
      />
    </div>
  );
};

export default ImportAnimation;
