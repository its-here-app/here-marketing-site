"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import EmailInput from "@/components/ui/EmailInput";
import { ReactSVG } from "react-svg";

export default function StartYourPlaylistModal({ open, onClose }) {
  // Handle ESC key to close
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content (full bleed) */}
          <motion.div
            className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // prevent backdrop close
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute top-0 w-full text-white mt-[var(--side-spacing)] z-50">
              <div className="container-xl text-right">
                <ReactSVG
                  src="/images/icons/icon-close.svg"
                  width=""
                  className="cursor-pointer inline-block hidden hover:scale-120 transition duration-200"
                  aria-label="Close modal"
                  onClick={onClose}
                />
              </div>
            </div>
            <div className="container-sm">
              <div className="flex flex-col md:flex-row md:gap-[clamp(3rem,8vw,8rem)]">
                {/* Text */}
                <div className="relative flex flex-col justify-center min-w-[26rem] basis-[60%]">
                  <h1 className="text-radio-3 mb-6">
                    We're excited
                    <br /> that you're excited
                  </h1>
                  <p>
                    Join our waitlist and get notified when we officially
                    launch. Be the first to know when it comes to exclusive
                    access or updates!
                  </p>
                  <EmailInput className="sm:max-w-[100%] w-full mt-10" />
                  {/* Mobile images */}
                  <img
                    src="/images/stickers/modal-smiley.svg"
                    alt="Smiley face"
                    className="md:hidden absolute top-[-75%] left-[-9%] w-[8.5rem]"
                  />
                  <img
                    src="/images/stickers/modal-coming-soon.svg"
                    alt="Coming soon"
                    className="md:hidden absolute top-[-45%] right-[-8%] w-[15rem]"
                  />
                </div>
                {/* Desktop images */}
                <div className="modal_image hidden md:flex items-center justify-center select-none pointer-eventsnone basis-[40%] pr-8 ">
                  <div className="relative">
                    <img
                      src="/images/stickers/modal-smiley.svg"
                      alt="Smiley face"
                      className="sticker-1 sticker-transition absolute top-[7%] left-[-20%] w-[clamp(8rem,12vw,10rem)]"
                    />
                    <img
                      src="/images/stickers/modal-coming-soon.svg"
                      alt="Coming soon"
                      className="sticker-2 sticker-transition absolute bottom-[-10%] right-[-10%] w-[clamp(15rem,20vw,15rem)]"
                    />
                    <img
                      src="/images/photos/modal-photo.webp"
                      className="rounded-2xl w-full max-w-[27rem]"
                      alt="Photo of street"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
