"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const h = t.hero;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-ivory"
    >
      {/* Background image with parallax */}
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpeg')" }}
        />
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/15 to-ink/85" />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative h-full w-full px-6 md:px-10 flex items-end pb-8 md:pb-12"
      >
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-light leading-[1.05] tracking-tighter text-balance max-w-5xl text-[clamp(2.2rem,5.4vw,5.8rem)]"
          >
            {h.titlePre}{" "}
            <span className="font-serif italic">{h.titleItalic}</span>{" "}
            {h.titlePost}
          </motion.h1>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-12"
          >
            <Link
              href="#collection"
              className="group inline-flex items-center gap-3 text-[11px] tracking-widest uppercase border-b border-ivory/40 pb-2 hover:border-ivory transition-colors duration-700"
            >
              {h.cta}
              <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
