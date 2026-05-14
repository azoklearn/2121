"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const HLS_SRC =
  "https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8";

function BlurIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SplitText({
  text,
  className,
  wordClassName,
  baseDelay = 0,
  stagger = 0.08,
  duration = 0.6,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  baseDelay?: number;
  stagger?: number;
  duration?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration,
              delay: baseDelay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${wordClassName ?? ""}`}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroAI() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    } else {
      let hls: any;
      (async () => {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(HLS_SRC);
          hls.attachMedia(video);
        }
      })();
      return () => {
        if (hls) hls.destroy();
      };
    }
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#070612" }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover origin-left"
        style={{ marginLeft: 200, transform: "scale(1.2)", transformOrigin: "left center" }}
      />

      {/* Bottom fade gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40"
        style={{
          background:
            "linear-gradient(to top, #070612 0%, rgba(7,6,18,0) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex h-full w-full items-center">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 lg:px-12">
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <BlurIn duration={0.6} delay={0}>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-white/80" />
                <span className="text-sm font-medium text-white/80">
                  New AI Automation Ally
                </span>
              </div>
            </BlurIn>

            {/* Heading */}
            <h1 className="text-4xl font-medium leading-tight text-white md:text-5xl lg:text-6xl lg:leading-[1.2]">
              <span className="block">
                <SplitText text="Unlock the Power of AI" />
              </span>
              <SplitText text="for Your" baseDelay={0.08 * 5} />
              <span>&nbsp;</span>
              <SplitText
                text="Business."
                wordClassName="font-serif italic"
                baseDelay={0.08 * 7}
              />
            </h1>

            {/* Subtitle */}
            <BlurIn duration={0.6} delay={0.4}>
              <p className="max-w-xl text-lg font-normal leading-relaxed text-white/80">
                Our cutting-edge AI platform automates, analyzes, and
                accelerates your workflows so you can focus on what really
                matters.
              </p>
            </BlurIn>
          </div>

          {/* CTAs */}
          <BlurIn duration={0.6} delay={0.6}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/book-call"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#070612] transition hover:bg-white/90"
              >
                Book A Free Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-white/20 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/30"
              >
                Learn now
              </button>
            </div>
          </BlurIn>
        </div>
      </div>
    </section>
  );
}
