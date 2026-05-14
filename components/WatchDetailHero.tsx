"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import type { Watch } from "@/lib/watches";
import { WHATSAPP_NUMBER } from "@/lib/watches";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = { watch: Watch };

export default function WatchDetailHero({ watch }: Props) {
  const { t } = useLanguage();
  const w = t.watch;
  const allImages = watch.images?.length ? watch.images : [watch.image];

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

  const message = t.whatsapp(watch.brand, watch.model, watch.reference);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailSubject = t.emailSubject(watch.brand, watch.model);
  const emailBody = t.emailBody(watch.brand, watch.model, watch.reference);
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
    e.preventDefault();
    setDragging(true);
    dragOrigin.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  }, [pan]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    setPan({
      x: dragOrigin.current.px + e.clientX - dragOrigin.current.x,
      y: dragOrigin.current.py + e.clientY - dragOrigin.current.y,
    });
  }, [dragging]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  // Double-click to toggle zoom
  const onDblClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoom > 1) { resetZoom(); } else { setZoom(2.5); setPan({ x: 0, y: 0 }); }
  }, [zoom, resetZoom]);

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
              {/* Main image */}
              <div
                className="relative aspect-[3/4] overflow-hidden bg-bone cursor-zoom-in touch-pan-y select-none"
                onClick={() => {
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
                    if (dx < 0) goTo((activeIdx + 1) % allImages.length);
                    else goTo((activeIdx - 1 + allImages.length) % allImages.length);
                    didSwipe.current = true;
                  }
                  touchStart.current = null;
                }}
              >
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
                <div className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase text-ivory/90 tnum">
                  2121 · Paris
                </div>
                {/* Mobile swipe hint + counter */}
                {allImages.length > 1 && (
                  <div className="md:hidden absolute bottom-4 right-4 flex items-center gap-2 text-[10px] tracking-widest uppercase text-ivory/80">
                    <span className="opacity-70">← Swipe →</span>
                    <span className="opacity-50">·</span>
                    <span className="tnum">{activeIdx + 1}/{allImages.length}</span>
                  </div>
                )}
                {/* Zoom hint */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 text-[9px] tracking-widest uppercase text-ivory/60 flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-3 h-3">
                    <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 8v6M8 11h6"/>
                  </svg>
                  Zoom
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
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
              <div className="text-[10px] tracking-widest uppercase opacity-55 mb-4">{watch.brand}</div>
              <h1 className="text-[clamp(2.2rem,3.6vw,3.6rem)] font-light leading-[1.05] tracking-tight mb-4">
                <span className="font-serif italic mr-2">—</span>{watch.model}
              </h1>
              <div className="text-[13px] opacity-60 mb-10 md:mb-14">{watch.reference}</div>

              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-10 md:mb-14 border-y hairline py-5 md:py-7">
                <div>
                  <div className="text-[9px] md:text-[10px] tracking-widest uppercase opacity-50 mb-1.5 md:mb-2">{w.year}</div>
                  <div className="text-[13px] md:text-lg font-light tracking-tight leading-snug">{watch.year}</div>
                </div>
                <div>
                  <div className="text-[9px] md:text-[10px] tracking-widest uppercase opacity-50 mb-1.5 md:mb-2">{w.condition}</div>
                  <div className="text-[13px] md:text-lg font-light tracking-tight leading-snug">{watch.condition}</div>
                </div>
                <div>
                  <div className="text-[9px] md:text-[10px] tracking-widest uppercase opacity-50 mb-1.5 md:mb-2">{w.price}</div>
                  <div className="text-[13px] md:text-lg font-light tracking-tight font-serif italic leading-snug">{watch.price}</div>
                </div>
              </div>

              <p className="font-serif italic text-xl md:text-2xl leading-[1.4] text-ink/85 mb-10 md:mb-12">
                {watch.intro}
              </p>

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
            onClick={() => { if (zoom <= 1) { setZoomOpen(false); resetZoom(); } else resetZoom(); }}
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
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={onDblClick}
              style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
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
              Fermer
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
                Scroll ou pincer pour zoomer · Double-clic pour agrandir
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
