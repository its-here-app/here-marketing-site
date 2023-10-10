import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Toast = ({ message, down = false, showToast }) => {
  const [toasting, setToasting] = useState(false);
  const [timer, setTimer] = useState(null);
  // listen for triggered prop to change

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        // set showToast to false
        setToasting(false);
        showToast = false;
      }, 2000);
      setToasting(true);
      setTimer(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  return (
    <>
      <AnimatePresence mode="wait">
      {toasting && (
          <motion.div
            // fade from bottom
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: down ? 60 : -60 }}
            exit={{ opacity: 0, y: down? 60 : -60 }}
            transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="toast z-80 text-[--neon] absolute w-max py-2 px-2 right-[0%] bg-black rounded-[12px]">
              <p>{message}</p>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};
