"use client";
import { motion } from "framer-motion";

export default function FadeIn({
  children,
  duration = 0.6,
  once = true,
  amount = 0.5,
  className = "",
  stagger = 0,
  staggerStep = 0.1,
  direction = "bottom", // NEW
  distance = 50, // NEW (replaces y)
}) {
  // Determine the axis offset based on direction
  const directions = {
    bottom: { x: 0, y: distance },
    top: { x: 0, y: -distance },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  };

  const offset = directions[direction] || directions.bottom;

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay: stagger * staggerStep,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
