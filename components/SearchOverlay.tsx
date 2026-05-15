"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { watches } from "@/lib/watches";
import { useLanguage } from "@/contexts/LanguageContext";
import { loc } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, lang } = useLanguage();

  // Auto-focus input when opening
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return watches;
    return watches.filter((w) =>
      [w.brand, w.model, loc(w.reference, lang), loc(w.year, lang), loc(w.condition, lang)]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, lang]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[70] bg-ivory/95 backdrop-blur-2xl flex flex-col"
        >
          {/* Top bar */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between px-6 md:px-10 py-5 md:py-6 border-b hairline"
          >
            <span className="text-[10px] tracking-widest uppercase opacity-60">
              {t.search.header}
            </span>
            <button
              onClick={onClose}
              className="text-[11px] tracking-widest uppercase hover:opacity-60 transition-opacity duration-500"
            >
              {t.search.close}
            </button>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 md:px-10 pt-10 md:pt-16 pb-6 md:pb-10"
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center gap-4 md:gap-6 border-b hairline-thick pb-4 md:pb-6">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  className="opacity-50 shrink-0"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="flex-1 bg-transparent text-2xl md:text-5xl font-light tracking-tight outline-none placeholder:text-ink/25 py-1"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="hidden md:inline text-[10px] tracking-widest uppercase opacity-40">
                  {results.length}{" "}
                  {results.length > 1 ? t.search.pieces : t.search.piece}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Results list */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10">
            <div className="max-w-[1400px] mx-auto">
              {results.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-20 text-center text-ink/50 font-serif italic text-xl md:text-2xl"
                >
                  {t.search.empty}
                </motion.div>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-px bg-ink/10">
                  {results.map((watch, idx) => (
                    <motion.li
                      key={watch.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.1 + idx * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="bg-ivory"
                    >
                      <Link
                        href={`/watches/${watch.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-5 md:gap-8 py-5 md:py-7 transition-all duration-500 hover:pl-2"
                      >
                        <div className="relative w-16 h-20 md:w-20 md:h-24 overflow-hidden bg-bone shrink-0">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{
                              backgroundImage: `url('${watch.image}')`,
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] tracking-widest uppercase opacity-50 mb-1.5">
                            {watch.brand}
                          </div>
                          <div className="text-lg md:text-2xl font-light tracking-tight leading-tight truncate">
                            <span className="font-serif italic mr-1.5">—</span>
                            {watch.model}
                          </div>
                          <div className="text-[11px] opacity-60 mt-1.5 truncate">
                            {loc(watch.reference, lang)}
                          </div>
                        </div>
                        <span className="text-[14px] opacity-50 group-hover:translate-x-1 transition-transform duration-500 shrink-0">
                          ↗
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Footer hint */}
          <div className="px-6 md:px-10 py-4 border-t hairline flex items-center justify-between text-[9px] md:text-[10px] tracking-widest uppercase opacity-50">
            <span>{t.search.footer}</span>
            <span className="hidden md:inline font-serif italic tracking-normal text-[12px]">
              {t.search.inventory}
            </span>
            <span>2121 · Paris</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
