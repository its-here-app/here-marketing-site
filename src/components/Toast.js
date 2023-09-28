import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Toast = ({ message, showToast }) => {
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
            animate={{ opacity: 1, y: -50 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="toast text-[--neon] absolute w-max py-2 px-2 right-[20%] bg-black rounded-[12px]">
              <p>{message}</p>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};
