"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

export default function VideoSection() {
  const { t } = useLanguage();
  const v = t.videoSection;
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const caption = captionRef.current;
    const video = videoRef.current;
    if (!section || !sticky || !wrapper || !overlay || !title || !caption) return;

    // Set starting state (framed video, smaller)
    gsap.set(wrapper, {
      width: "min(74vw, 1280px)",
      height: "min(56vh, 720px)",
      borderRadius: 0,
    });
    gsap.set(overlay, { opacity: 0.35 });

    const ctx = gsap.context(() => {
      // Master timeline scrubbed by scroll: framed → fullscreen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          scrub: 1.4,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        wrapper,
        {
          width: "100vw",
          height: "100vh",
          ease: "none",
        },
        0
      )
        .to(
          overlay,
          {
            opacity: 0.55,
            ease: "none",
          },
          0
        )
        .to(
          caption,
          {
            opacity: 0,
            y: -30,
            ease: "none",
          },
          0
        )
        .fromTo(
          title,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.55
        );
    }, section);

    // Try to play video once it can play
    if (video) {
      const play = () => video.play().catch(() => {});
      if (video.readyState >= 2) play();
      else video.addEventListener("canplay", play, { once: true });
    }

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="maison-in-motion"
      className="relative w-full bg-ivory text-ink"
    >
      {/* Section overline (sits above the sticky frame) */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 pt-10 md:pt-14 flex items-center justify-between text-[10px] tracking-widest uppercase opacity-60 pointer-events-none">
        <div>{v.badge}</div>
        <div className="hidden md:block">{v.headerRight}</div>
      </div>

      <div
        ref={stickyRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-ivory"
      >
        {/* Floating caption above the framed video */}
        <div
          ref={captionRef}
          className="absolute top-24 md:top-32 left-0 right-0 z-20 flex flex-col items-center text-center px-6 pointer-events-none"
        >
          <div className="text-[10px] tracking-widest uppercase opacity-50 mb-3 flex items-center gap-3">
            <span className="h-px w-6 bg-ink/40" />
            {v.scrollHint}
            <span className="h-px w-6 bg-ink/40" />
          </div>
          <p className="font-serif italic text-lg md:text-xl opacity-70">
            {v.pressPlay}
          </p>
        </div>

        {/* Video frame — grows to fullscreen */}
        <div
          ref={wrapperRef}
          className="relative overflow-hidden bg-ink will-change-[width,height] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero.png"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/maison.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay — opacity scrubbed */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-ink pointer-events-none"
          />

          {/* Fullscreen title — appears at the end */}
          <div
            ref={titleRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 md:px-10 text-ivory pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div className="text-[10px] tracking-widest uppercase opacity-70 mb-6 md:mb-10 flex items-center gap-3">
              <span className="h-px w-8 bg-ivory/60" />
              {v.interlude}
              <span className="h-px w-8 bg-ivory/60" />
            </div>
            <h2 className="font-serif font-light leading-[0.92] tracking-tight text-[clamp(3rem,11vw,11rem)]">
              {v.h2Pre} <span className="italic">{v.h2Italic}</span>{v.h2End}
            </h2>
            <p className="mt-8 md:mt-12 max-w-md text-[14px] md:text-[15px] leading-[1.75] opacity-80 whitespace-pre-line">
              {v.tagline}
            </p>
          </div>

          {/* Corner credits inside the frame */}
          <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 z-10 flex items-center justify-between text-[9px] md:text-[10px] tracking-widest uppercase text-ivory/70 pointer-events-none">
            <span>{v.signature}</span>
            <span>Plate V</span>
          </div>
          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 z-10 flex items-center justify-between text-[9px] md:text-[10px] tracking-widest uppercase text-ivory/70 pointer-events-none">
            <span className="tnum">48.8566° N · 2.3522° E</span>
            <span className="hidden md:inline font-serif italic tracking-normal text-[12px]">
              {v.cornerCaption}
            </span>
            <span>MMXXVI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
