"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const MIN_LOADER_TIME = 1350;
const MAX_LOADER_TIME = 2400;

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const { t } = useLanguage();
  const l = t.loader;

  useEffect(() => {
    const startedAt = window.performance.now();
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const close = () => {
      const elapsed = window.performance.now() - startedAt;
      const delay = Math.max(0, MIN_LOADER_TIME - elapsed);
      window.setTimeout(() => setVisible(false), delay);
    };

    if (document.readyState === "complete") {
      close();
    } else {
      window.addEventListener("load", close, { once: true });
    }

    const fallback = window.setTimeout(() => setVisible(false), MAX_LOADER_TIME);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("load", close);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden bg-ink text-ivory"
          aria-label="Loading"
        >
          <motion.div
            initial={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 origin-left bg-[#111]"
          />
          <motion.div
            initial={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 origin-right bg-[#111]"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-7"
          >
            <motion.img
              src="/logo.png"
              alt=""
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-24 w-24 object-contain invert md:h-28 md:w-28"
            />
            <div className="h-px w-28 overflow-hidden bg-ivory/15">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                  repeat: Infinity,
                  repeatDelay: 0.15,
                }}
                className="h-full w-full bg-ivory"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[10px] uppercase tracking-[0.42em]"
            >
              {l.brand}
            </motion.div>
          </motion.div>

          <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-ivory/35 md:left-10 md:right-10">
            <span>{l.city}</span>
            <motion.span
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {l.loading}
            </motion.span>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 z-10 h-px w-full origin-left bg-ivory/45"
          />

          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-ink" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(180deg, currentColor 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
