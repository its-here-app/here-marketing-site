"use client";
import { motion } from "framer-motion";

export default function FadeIn({
  children,
  duration = 0.2,
  once = true,
  amount = 0.5,
  className = "",
  stagger = 0,
  staggerStep = 0.1,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
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
