"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchOverlay from "./SearchOverlay";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else if (!searchOpen) {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  // Always use light style — no dark hero behind navbar anywhere
  const useLightStyle = true;

  const linkHrefs = isHome
    ? ["#collection", "#story", "#services", "#contact"]
    : ["/#collection", "/#story", "/#services", "/#contact"];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-11 md:top-14 left-0 right-0 z-50 transition-all duration-700 ease-out
          ${
            useLightStyle
              ? "bg-ivory/85 backdrop-blur-md text-ink border-b hairline"
              : "bg-transparent text-ivory"
          }`}
      >
        <div className="px-6 md:px-10 py-5 md:py-6 grid grid-cols-3 items-center">
          {/* Left: Hamburger */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t.navbar.menuLabel}
              className="group relative flex flex-col items-start justify-center h-10 w-12 md:h-11 md:w-14 gap-[5px] transition-transform duration-500 hover:scale-[1.03]"
            >
              <span className="block h-px w-7 md:w-8 bg-current transition-all duration-500 group-hover:w-9 md:group-hover:w-10" />
              <span className="block h-px w-5 md:w-6 bg-current transition-all duration-500 group-hover:w-9 md:group-hover:w-10" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="group flex items-center justify-center">
              <img
                src="/logo.png"
                alt="2121"
                className={`h-20 w-auto md:h-24 object-contain transition-all duration-700 ${
                  useLightStyle ? "" : "invert"
                }`}
              />
            </Link>
          </div>

          {/* Right: Search */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t.navbar.searchLabel}
              className="group relative flex items-center justify-center h-10 w-10 md:h-11 md:w-11 transition-transform duration-500 hover:scale-105"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 md:h-[22px] md:w-[22px]"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.6-3.6" />
              </svg>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-current transition-all duration-700 group-hover:w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hamburger full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-ink text-ivory flex flex-col"
          >
            {/* Top bar */}
            <div className="flex justify-between items-center px-6 md:px-10 py-5 md:py-6 border-b hairline-light">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="2121"
                  className="h-10 w-10 md:h-11 md:w-11 object-contain invert"
                />
                <span className="hidden md:inline text-[10px] tracking-widest uppercase opacity-50 leading-none">
                  {t.navbar.menuMaison}
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[11px] tracking-widest uppercase hover:opacity-60 transition-opacity duration-500 flex items-center gap-3"
              >
                <span className="hidden md:inline">{t.navbar.close}</span>
                <span className="inline-block w-7">
                  <span className="block h-px bg-current rotate-45 translate-y-[0.5px] origin-center" />
                  <span className="block h-px bg-current -rotate-45 -translate-y-[0.5px] origin-center" />
                </span>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-6 md:px-10 gap-3 md:gap-5 leading-[0.9]">
              {t.navbar.links.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25 + i * 0.08,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={linkHrefs[i]}
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex items-baseline hover:opacity-60 transition-opacity duration-700"
                  >
                    <span className="font-serif text-[10vw] md:text-[8.5vw] font-light tracking-tighter group-hover:italic transition-all duration-700">
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="border-t hairline-light"
            >
              {/* Language switcher */}
              <div className="flex items-center gap-5 px-6 md:px-10 pt-5 pb-4">
                <span className="text-[10px] tracking-widest uppercase opacity-40">
                  {t.navbar.menuLanguage}
                </span>
                <div className="flex items-center gap-0">
                  <button
                    onClick={() => setLang("fr")}
                    className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all duration-400 ${
                      lang === "fr"
                        ? "text-ivory"
                        : "text-ivory/35 hover:text-ivory/70"
                    }`}
                  >
                    FR
                  </button>
                  <span className="text-ivory/20 text-[10px]">|</span>
                  <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all duration-400 ${
                      lang === "en"
                        ? "text-ivory"
                        : "text-ivory/35 hover:text-ivory/70"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Contacts strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 px-6 md:px-10 py-5 md:py-7 text-[10px] tracking-widest uppercase opacity-60">
                <div>
                  <div className="opacity-60 mb-2">{t.navbar.menuParis}</div>
                  <div className="font-serif italic normal-case tracking-normal text-[12px]">
                    21, Rue de la Paix
                  </div>
                </div>
                <div>
                  <div className="opacity-60 mb-2">{t.navbar.menuWhatsApp}</div>
                  <a
                    href="https://wa.me/33621212121"
                    className="font-serif italic normal-case tracking-normal text-[12px] hover:opacity-100"
                  >
                    +33 (0)6 21 21 21 21
                  </a>
                </div>
                <div>
                  <div className="opacity-60 mb-2">{t.navbar.menuInstagram}</div>
                  <a
                    href="https://instagram.com"
                    className="font-serif italic normal-case tracking-normal text-[12px] hover:opacity-100"
                  >
                    @2121collection
                  </a>
                </div>
                <div className="md:text-right">
                  <div className="opacity-60 mb-2">{t.navbar.menuCoords}</div>
                  <div className="tnum normal-case tracking-normal text-[11px]">
                    48.85° N · 2.35° E
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
