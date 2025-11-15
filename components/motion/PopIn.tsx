"use client";
import { motion } from "framer-motion";

export default function PopIn({
  children,
  duration = 0.5,
  once = true,
  amount = 0.5,
  className = "",
  stagger = 0,
  staggerStep = 0.1,
  startScale = 0.8,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: startScale,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay: stagger * staggerStep,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      style={{ transformOrigin: "center center" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
