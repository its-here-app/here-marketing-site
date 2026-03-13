"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Resolved value of --neon token, used for Framer Motion color interpolation
// (CSS variables can't be interpolated directly by Framer Motion)
const NEON = "#daff70";
const WHITE = "#ffffff";

function parseCursorEl(el) {
  if (!el) return { state: "default", rotation: 0, size: null };
  const state = el.dataset.cursor ?? "default";
  const rotation = parseInt(el.dataset.cursorRotation ?? "0", 10);
  const size = el.dataset.cursorSize ?? null;
  return { state, rotation, size };
}

const SPRING_CONFIG = { stiffness: 500, damping: 40, mass: 0.5 };

export default function CustomCursor({ size }) {
  const [cursorState, setCursorState] = useState("default");
  const [cursorSize, setCursorSize] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const arrowElRef = useRef(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, SPRING_CONFIG);
  const smoothY = useSpring(cursorY, SPRING_CONFIG);

  const rotationMV = useMotionValue(0);
  const smoothRotation = useSpring(rotationMV, { stiffness: 300, damping: 25 });

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      if (arrowElRef.current) {
        const rect = arrowElRef.current.getBoundingClientRect();
        const dx = rect.left + rect.width / 2 - e.clientX;
        const dy = rect.top + rect.height / 2 - e.clientY;
        rotationMV.set(Math.atan2(dy, dx) * (180 / Math.PI));
      }
    };

    const onMouseOver = (e) => {
      const cursorEl = e.target.closest("[data-cursor]");
      const sizeEl = e.target.closest("[data-cursor-size]");
      const { state } = parseCursorEl(cursorEl);
      setCursorState(state);
      arrowElRef.current = state === "arrow" ? cursorEl : null;
      setCursorSize(sizeEl?.dataset.cursorSize ?? null);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (isTouchDevice) return null;

  const isArrow = cursorState === "arrow";
  const circleColor = cursorState === "neon" ? NEON : cursorState === "white" ? WHITE : "#000000";

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      {/* default / neon circle */}
      <motion.div
        animate={{
          opacity: isArrow ? 0 : 1,
          backgroundColor: circleColor,
          width: isArrow ? 90 : (cursorSize ?? size) === "sm" ? 14 : 24,
          height: isArrow ? 90 : (cursorSize ?? size) === "sm" ? 14 : 24,
        }}
        transition={{
          backgroundColor: { type: "tween", duration: 0.25, ease: "easeOut" },
          opacity: { duration: 0.2, delay: isArrow ? 0.05 : 0 },
          width: { type: "spring", stiffness: 350, damping: 28 },
          height: { type: "spring", stiffness: 350, damping: 28 },
        }}
        style={{
          borderRadius: "50%",
          position: "absolute",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* arrow */}
      <motion.div
        animate={{
          opacity: isArrow ? 1 : 0,
          scale: isArrow ? 1 : 0.3,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: "spring", stiffness: 350, damping: 28 },
        }}
        style={{
          position: "absolute",
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div style={{ rotate: smoothRotation, color: "var(--neon)" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
          >
            <rect width="90" height="90" rx="45" fill="currentColor" />
            <path
              d="M47.1637 60.8835L45.0136 58.7516L57.6958 46.0876H25.9902V43.0264L57.6958 43.0264L45.0136 30.3624L47.1637 28.2305L63.4902 44.557L47.1637 60.8835Z"
              fill="black"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
