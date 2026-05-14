"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "2121-lang";

export default function LanguageGate() {
  const { setLang } = useLanguage();
  const [visible, setVisible] = useState(false);

  // Check on mount — small delay so hydration is complete
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function choose(lang: "fr" | "en") {
    setLang(lang);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="lang-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center select-none"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <Image
              src="/logo.png"
              alt="2121"
              width={108}
              height={44}
              className="invert opacity-90"
              priority
            />
          </motion.div>

          {/* Thin separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-16 bg-ivory/20 mb-14 origin-center"
          />

          {/* Language choices */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center"
          >
            <button
              onClick={() => choose("fr")}
              className="group relative px-10 py-5 text-[11px] tracking-[0.3em] uppercase text-ivory/45 hover:text-ivory transition-all duration-500"
            >
              Français
              <span className="absolute bottom-[14px] left-10 right-10 h-px bg-ivory/0 group-hover:bg-ivory/30 transition-all duration-500" />
            </button>

            <span className="text-ivory/15 text-[10px] leading-none">|</span>

            <button
              onClick={() => choose("en")}
              className="group relative px-10 py-5 text-[11px] tracking-[0.3em] uppercase text-ivory/45 hover:text-ivory transition-all duration-500"
            >
              English
              <span className="absolute bottom-[14px] left-10 right-10 h-px bg-ivory/0 group-hover:bg-ivory/30 transition-all duration-500" />
            </button>
          </motion.div>

          {/* Bottom watermark */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.7 }}
            className="absolute bottom-9 text-[10px] tracking-widest uppercase text-ivory/18"
          >
            Maison Privée · Paris
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
