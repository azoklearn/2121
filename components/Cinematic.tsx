"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Cinematic() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.35,
  });

  const frameScale = useTransform(smoothProgress, [0, 0.34, 0.72, 1], [0.62, 0.78, 1, 1]);
  const radius = useTransform(smoothProgress, [0, 0.62], ["28px", "0px"]);
  const videoScale = useTransform(smoothProgress, [0, 0.72, 1], [1.06, 1, 1]);
  const videoFilter = useTransform(
    smoothProgress,
    [0, 0.44, 1],
    ["blur(5px) saturate(0.78) contrast(0.92)", "blur(0px) saturate(1.02) contrast(1.04)", "blur(0px) saturate(1) contrast(1.02)"]
  );
  const backdropOpacity = useTransform(smoothProgress, [0, 0.35, 0.72], [0.34, 0.2, 0]);
  const focusOpacity = useTransform(smoothProgress, [0, 0.45, 0.8], [0.5, 0.18, 0]);
  const copyY = useTransform(smoothProgress, [0, 0.42, 0.72], [50, 0, -80]);
  const copyOpacity = useTransform(smoothProgress, [0, 0.18, 0.58], [0, 1, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.52, 0.22, 0.34]);

  return (
    <section
      ref={ref}
      className="relative h-[300svh] w-full bg-ink text-ivory"
    >
      <motion.div
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-ink" />

        <motion.div
          style={{ scale: frameScale, borderRadius: radius }}
          className="absolute inset-0 overflow-hidden bg-ink shadow-[0_44px_140px_rgba(0,0,0,0.55)] will-change-transform"
        >
          <motion.video
            src="/maison.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ opacity: backdropOpacity }}
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
          />
          <motion.video
            src="/maison.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ scale: videoScale, filter: videoFilter }}
            className="relative z-[1] h-full w-full object-contain will-change-transform"
          />
          <motion.div
            style={{ opacity: focusOpacity }}
            className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_0%,transparent_38%,rgba(0,0,0,0.72)_100%)]"
          />
          <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-ink" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-b from-ink/42 via-transparent to-ink/50" />
        </motion.div>

        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute top-10 md:top-14 left-6 md:left-10 right-6 md:right-10 z-10 flex items-center justify-between text-[10px] tracking-widest uppercase"
        >
          <span className="flex items-center gap-3">
            <span className="h-px w-6 bg-ivory/60" />
            Plate IV
          </span>
          <span>Film</span>
        </motion.div>

        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-10 text-center"
        >
          <div className="mb-6 md:mb-10 flex items-center gap-3 text-[10px] tracking-widest uppercase opacity-70">
            <span className="h-px w-8 bg-ivory/60" />
            An Interlude
            <span className="h-px w-8 bg-ivory/60" />
          </div>

          <h2 className="text-[clamp(4rem,15vw,14rem)] font-light leading-[0.85] tracking-tighter">
            Time,
            <br />
            <span className="font-serif italic">in motion.</span>
          </h2>

          <p className="mt-12 md:mt-16 max-w-md text-[14px] md:text-[15px] leading-[1.75] opacity-75">
            A timepiece is not measured in minutes. It is measured in the lives
            it accompanies.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute bottom-6 md:bottom-8 left-6 md:left-10 right-6 md:right-10 z-10 flex items-center justify-between text-[9px] md:text-[10px] tracking-widest uppercase opacity-60"
        >
          <span className="tnum">— 2026 / Vol. 01</span>
          <span>Scroll to Fullscreen</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
