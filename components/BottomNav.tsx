"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNav() {
  const { t } = useLanguage();
  const n = t.bottomNav;
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<"collection" | "maison" | "contact">(
    "collection"
  );

  // Show after first scroll past the hero
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view (only on home)
  useEffect(() => {
    if (!isHome) return;
    const sections = ["collection", "story", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "collection") setActive("collection");
            if (id === "story") setActive("maison");
            if (id === "contact") setActive("contact");
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const items: {
    id: "collection" | "maison" | "contact";
    label: string;
    href: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "collection",
      label: n.collection,
      href: isHome ? "#collection" : "/#collection",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="4" y="4" width="7" height="7" rx="0.5" />
          <rect x="13" y="4" width="7" height="7" rx="0.5" />
          <rect x="4" y="13" width="7" height="7" rx="0.5" />
          <rect x="13" y="13" width="7" height="7" rx="0.5" />
        </svg>
      ),
    },
    {
      id: "maison",
      label: n.maison,
      href: isHome ? "#story" : "/#story",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v9h14v-9" />
          <path d="M10 19v-5h4v5" />
        </svg>
      ),
    },
    {
      id: "contact",
      label: n.contact,
      href: isHome ? "#contact" : "/#contact",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M20.5 12.5a8.5 8.5 0 0 1-12.7 7.4L3 21l1.1-4.7A8.5 8.5 0 1 1 20.5 12.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory/85 backdrop-blur-xl border-t hairline"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          aria-label="Navigation principale"
        >
          <ul className="grid grid-cols-3">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-[9px] tracking-widest uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-ink"
                        : "text-ink/45"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
