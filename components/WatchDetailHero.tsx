"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import type { Watch } from "@/lib/watches";
import { WHATSAPP_NUMBER } from "@/lib/watches";
import { useLanguage } from "@/contexts/LanguageContext";
import { loc } from "@/lib/i18n";

type Props = { watch: Watch };

export default function WatchDetailHero({ watch }: Props) {
  const { t, lang } = useLanguage();
  const w = t.watch;
  const allImages = watch.images?.length ? watch.images : [watch.image];

  // Localized fields
  const watchReference = loc(watch.reference, lang);
  const watchYear = loc(watch.year, lang);
  const watchIntro = loc(watch.intro, lang);
  const watchDescription = loc(watch.description, lang);

  // Gallery
  const [activeIdx, setActiveIdx] = useState(0);

  // Swipe state (mobile)
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
  const didSwipe = useRef(false);

  // Lightbox
  const [zoomOpen, setZoomOpen] = useState(false);

  // Zoom & pan
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOrigin = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const hasDragged = useRef(false);

  const message = t.whatsapp(watch.brand, watch.model, watchReference);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailSubject = t.emailSubject(watch.brand, watch.model);
  const emailBody = t.emailBody(watch.brand, watch.model, watchReference);
  const emailUrl = `mailto:${w.emailDiscuss}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // Reset zoom when changing image
  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx);
    resetZoom();
  }, [resetZoom]);

  // Keyboard
  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setZoomOpen(false); resetZoom(); }
      if (e.key === "ArrowRight") goTo((activeIdx + 1) % allImages.length);
      if (e.key === "ArrowLeft")  goTo((activeIdx - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomOpen, activeIdx, allImages.length, goTo, resetZoom]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = zoomOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [zoomOpen]);

  // Wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setZoom(prev => {
      const next = prev - e.deltaY * 0.006;
      return Math.max(1, Math.min(7, next));
    });
  }, []);

  // Drag to pan
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    hasDragged.current = false;
    dragOrigin.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  }, [pan]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault(); // prevent text selection while panning
    const dx = e.clientX - dragOrigin.current.x;
    const dy = e.clientY - dragOrigin.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged.current = true;
    setPan({
      x: dragOrigin.current.px + dx,
      y: dragOrigin.current.py + dy,
    });
  }, [dragging]);

  const onMouseUp = useCallback(() => setDragging(false), []);


  // Touch pinch zoom
  const lastDist = useRef<number | null>(null);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (lastDist.current !== null) {
        const delta = dist - lastDist.current;
        setZoom(prev => Math.max(1, Math.min(7, prev + delta * 0.01)));
      }
      lastDist.current = dist;
    }
  }, []);
  const onTouchEnd = useCallback(() => { lastDist.current = null; }, []);

  return (
    <>
      <section className="pt-28 md:pt-36 pb-12 md:pb-20">
        <div className="px-6 md:px-10 max-w-[1600px] mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between text-[10px] tracking-widest uppercase mb-10 md:mb-16 opacity-70"
          >
            <Link href="/#collection" className="inline-flex items-center gap-3 hover:opacity-100 transition-opacity duration-500">
              <span>↖</span>
              <span>{w.back}</span>
            </Link>
            <span className="hidden md:inline">{w.pieceOf} {watch.brand} · 2121 Paris</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 lg:gap-20">

            {/* ── Image (5/12) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5"
            >
              {/* Main image / video */}
              <div
                className={`group relative aspect-[3/4] overflow-hidden bg-bone touch-pan-y select-none ${watch.video && activeIdx === allImages.length ? "cursor-default" : "cursor-zoom-in"}`}
                onClick={() => {
                  if (watch.video && activeIdx === allImages.length) return;
                  if (didSwipe.current) { didSwipe.current = false; return; }
                  setZoomOpen(true);
                }}
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  touchStart.current = { x: t.clientX, y: t.clientY, t: Date.now() };
                  didSwipe.current = false;
                }}
                onTouchEnd={(e) => {
                  const start = touchStart.current;
                  if (!start || allImages.length < 2) return;
                  const t = e.changedTouches[0];
                  const dx = t.clientX - start.x;
                  const dy = t.clientY - start.y;
                  const absX = Math.abs(dx);
                  const absY = Math.abs(dy);
                  // Horizontal swipe: >40px and dominantly horizontal
                  if (absX > 40 && absX > absY * 1.3) {
                    const total = allImages.length + (watch.video ? 1 : 0);
                    if (dx < 0) goTo((activeIdx + 1) % total);
                    else goTo((activeIdx - 1 + total) % total);
                    didSwipe.current = true;
                  }
                  touchStart.current = null;
                }}
              >
                {/* Video slide */}
                {watch.video && activeIdx === allImages.length ? (
                  <video
                    src={watch.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${allImages[activeIdx]}')` }}
                  />
                </AnimatePresence>
                )}
                {/* 2121 stamp + swipe hint — hidden on video slide */}
                {!(watch.video && activeIdx === allImages.length) && (
                  <>
                    <div className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase text-ivory/90 tnum">
                      2121 · Paris
                    </div>
                    {allImages.length > 1 && (
                      <div className="md:hidden absolute bottom-4 right-4 flex items-center gap-2 text-[10px] tracking-widest uppercase text-ivory/80">
                        <span className="opacity-70">{w.swipeHint}</span>
                        <span className="opacity-50">·</span>
                        <span className="tnum">{activeIdx + 1}/{allImages.length}</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 pointer-events-none">
                      <div className="flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-ivory/90 backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-ivory">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4 md:h-[18px] md:w-[18px]" aria-hidden>
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails + video thumbnail */}
              {(allImages.length > 1 || watch.video) && (
                <div className="mt-2.5 flex gap-1.5 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`relative aspect-square w-12 md:w-14 shrink-0 overflow-hidden bg-bone transition-all duration-300 ${
                        activeIdx === i ? "ring-1 ring-ink opacity-100" : "opacity-35 hover:opacity-65"
                      }`}
                    >
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
                    </button>
                  ))}
                  {watch.video && (
                    <button
                      onClick={() => goTo(allImages.length)}
                      className={`relative aspect-square w-12 md:w-14 shrink-0 overflow-hidden bg-bone transition-all duration-300 flex items-center justify-center ${
                        activeIdx === allImages.length ? "ring-1 ring-ink opacity-100" : "opacity-35 hover:opacity-65"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-ink/70"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                  )}
                </div>
              )}

            </motion.div>

            {/* ── Info (7/12) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7"
            >
              {/* Brand as main heading (model now lives in the reference line) */}
              <h1 className="text-[clamp(2.2rem,3.6vw,3.6rem)] font-light leading-[1.05] tracking-tight mb-6 md:mb-8">
                <span className="font-serif italic mr-2">—</span>{watch.brand}
              </h1>

              {/* 1️⃣ Reference, then price below */}
              <div className="border-y hairline py-5 md:py-6 mb-8 md:mb-12 space-y-5 md:space-y-6">
                <div>
                  <div className="text-[9px] md:text-[10px] tracking-widest uppercase opacity-50 mb-1.5">
                    {/* Reference label */}
                    {lang === "fr" ? "Référence" : "Reference"} · {watchYear}
                  </div>
                  <div className="text-[15px] md:text-lg font-light tracking-tight">
                    {watchReference}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] md:text-[10px] tracking-widest uppercase opacity-50 mb-1.5">
                    {w.price}
                  </div>
                  {watch.contactOnly ? (
                    <div className="text-[14px] md:text-[15px] font-light tracking-tight text-ink/70 leading-snug">
                      {lang === "fr"
                        ? "Plus d'informations disponibles sur demande — contactez-nous par message."
                        : "More information available on request — contact us by message."}
                    </div>
                  ) : (
                    <div className="font-serif italic text-2xl md:text-3xl tracking-tight leading-none">
                      {watch.price}
                    </div>
                  )}
                </div>
              </div>

              {/* 2️⃣ Texte explicatif */}
              <p className="font-serif italic text-xl md:text-2xl leading-[1.4] text-ink/85 mb-6 md:mb-8">
                {watchIntro}
              </p>
              <p className="text-[15px] md:text-base leading-[1.8] text-ink/75 mb-10 md:mb-12">
                {watchDescription}
              </p>

              {/* 3️⃣ Specs */}
              <div className="mb-10 md:mb-12">
                <div className="text-[10px] tracking-widest uppercase opacity-55 mb-5 flex items-center gap-3">
                  <span className="h-px w-6 bg-ink/40" />
                  {w.specs}
                </div>
                <ul className="space-y-2 md:space-y-2.5">
                  {watch.specs.map((spec, i) => (
                    <li key={i} className="flex items-baseline gap-3 text-[14px] md:text-[15px] font-light tracking-tight leading-relaxed">
                      <span aria-hidden className="text-ink/45 select-none mt-1 leading-none">•</span>
                      <span>
                        <span className="font-normal">{loc(spec.key, lang)}:</span>{" "}
                        <span className="text-ink/75">{loc(spec.value, lang)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4️⃣ CTAs */}
              <div className="space-y-3">
                {/* WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-between gap-6 bg-ink text-ivory px-6 md:px-8 py-5 md:py-6 transition-all duration-700 hover:bg-ink-soft"
                >
                  <div className="flex items-center gap-4 md:gap-5 min-w-0">
                    <svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5 md:h-6 md:w-6 shrink-0" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[10px] tracking-wider md:tracking-widest uppercase opacity-70 whitespace-nowrap">{w.contactLabel}</span>
                      <span className="text-[15px] md:text-lg font-light tracking-tight">{w.discuss}</span>
                    </div>
                  </div>
                  <span className="text-lg opacity-80 transition-transform duration-500 group-hover:translate-x-1">↗</span>
                </a>

                {/* Email CTA */}
                <a
                  href={emailUrl}
                  className="group relative flex items-center justify-between gap-6 bg-ivory text-ink border hairline px-6 md:px-8 py-5 md:py-6 transition-all duration-700 hover:bg-bone"
                >
                  <div className="flex items-center gap-4 md:gap-5 min-w-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 md:h-6 md:w-6 shrink-0" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="1.5" />
                      <path d="m3.5 6.5 8 6.5a1 1 0 0 0 1.2 0l7.8-6.5" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[10px] tracking-wider md:tracking-widest uppercase opacity-60 whitespace-nowrap">{w.emailLabel}</span>
                      <span className="text-[15px] md:text-lg font-light tracking-tight">{w.emailDiscuss}</span>
                    </div>
                  </div>
                  <span className="text-lg opacity-60 transition-transform duration-500 group-hover:translate-x-1">↗</span>
                </a>
              </div>

              <p className="mt-5 text-[11px] tracking-wider opacity-50 text-left leading-relaxed">{w.disclaimer}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Lightbox with zoom ── */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "rgba(26,26,26,0.97)" }}
            onClick={() => { setZoomOpen(false); resetZoom(); }}
          >
            {/* Zoom container */}
            <div
              className="relative flex items-center justify-center w-full h-full overflow-hidden"
              onWheel={onWheel}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={() => {
                if (hasDragged.current) { hasDragged.current = false; return; }
                setZoomOpen(false);
                resetZoom();
              }}
              style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "pointer" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={allImages[activeIdx]}
                  alt={`${watch.brand} ${watch.model}`}
                  className="max-h-[90vh] max-w-[90vw] object-contain select-none pointer-events-none"
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    transition: dragging ? "none" : "transform 0.15s ease",
                    willChange: "transform",
                  }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            {/* Close */}
            <button
              onClick={() => { setZoomOpen(false); resetZoom(); }}
              className="absolute top-5 right-5 z-10 text-ivory/50 hover:text-ivory transition-colors duration-300 text-[10px] tracking-widest uppercase flex items-center gap-2.5"
            >
              {w.lightboxClose}
              <span className="relative inline-block w-4 h-4">
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="block w-4 h-px bg-current rotate-45 absolute" />
                  <span className="block w-4 h-px bg-current -rotate-45 absolute" />
                </span>
              </span>
            </button>

            {/* Zoom level indicator */}
            {zoom > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-5 left-5 text-ivory/30 text-[10px] tracking-widest tnum"
              >
                {Math.round(zoom * 100)}%
              </motion.div>
            )}

            {/* Hint */}
            {zoom === 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/25 text-[9px] tracking-widest uppercase text-center leading-relaxed pointer-events-none">
                {w.lightboxHint}
              </div>
            )}

            {/* Counter */}
            {allImages.length > 1 && zoom === 1 && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-ivory/35 text-[10px] tracking-widest uppercase">
                {activeIdx + 1} / {allImages.length}
              </div>
            )}

            {/* Arrows */}
            {allImages.length > 1 && zoom === 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goTo((activeIdx - 1 + allImages.length) % allImages.length); }}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-ivory transition-colors duration-300 text-2xl p-4"
                >
                  ←
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goTo((activeIdx + 1) % allImages.length); }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-ivory transition-colors duration-300 text-2xl p-4"
                >
                  →
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
