"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
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
      {/* Background image */}
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.png')",
          }}
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/75" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative h-full w-full px-6 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.35, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10"
        >
          <img
            src="/logo.png"
            alt="2121"
            className="invert opacity-90 w-[clamp(11rem,38vw,46rem)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
