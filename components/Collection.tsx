"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { watches, WHATSAPP_NUMBER } from "@/lib/watches";
import { useLanguage } from "@/contexts/LanguageContext";
import { loc } from "@/lib/i18n";

const SCROLL_KEY = "2121-collection-scroll";

export default function Collection() {
  const { t, lang } = useLanguage();
  const c = t.collection;

  // Restore scroll position when returning from a watch detail page
  useEffect(() => {
    const stored = sessionStorage.getItem(SCROLL_KEY);
    if (stored) {
      const y = parseInt(stored, 10);
      sessionStorage.removeItem(SCROLL_KEY);
      // Defer to next frame so layout is ready
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior }));
    }
  }, []);

  const saveScroll = () => {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  };

  const whatsappCtaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappGeneric)}`;

  return (
    <section
      id="collection"
      className="relative bg-ivory text-ink py-16 md:py-36 border-t hairline scroll-mt-32 md:scroll-mt-36"
    >
      <div className="mx-auto px-6 md:px-10 max-w-[1600px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 mb-10 md:mb-16 text-[10px] tracking-widest uppercase opacity-60"
        >
          <div>— {c.badge}</div>
          <div className="hidden md:block">{c.updated}</div>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[0.95] tracking-tighter text-balance"
          >
            {c.title} {c.titleItalic}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm text-[14px] md:text-[15px] leading-[1.7] text-ink/70"
          >
            {c.subtitle}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {watches.map((watch, idx) => {
            // Extract data from specs for the card description
            const getSpec = (frKey: string) => {
              const s = watch.specs.find((sp) => {
                const k = typeof sp.key === "string" ? sp.key : sp.key.fr;
                return k === frKey;
              });
              if (!s) return "";
              return typeof s.value === "string" ? s.value : s.value[lang] ?? s.value.fr;
            };
            const yearVal = getSpec("Année");
            const material = getSpec("Matière");
            const dimensions = getSpec("Dimensions");
            const summaryParts = [material, dimensions].filter(Boolean);
            const summary = summaryParts.join(" · ");
            const hasPapers = watch.papers !== false;
            const papersLabel = lang === "fr"
              ? (hasPapers ? "Box & papiers" : "Sans papiers")
              : (hasPapers ? "Box & papers" : "No papers");
            const availableLabel = lang === "fr" ? "Disponible" : "Available";
            const viewLabel = lang === "fr" ? "Voir" : "View";

            return (
              <motion.article
                key={watch.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1.3,
                  delay: (idx % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group h-full"
              >
                <Link href={`/watches/${watch.slug}`} onClick={saveScroll} className="block h-full">
                  {/* ─── Mobile layout (1 bloc = 1 montre) ─── */}
                  <div className="md:hidden h-full flex flex-col bg-ivory-soft border hairline transition-shadow duration-500 group-hover:shadow-[0_4px_20px_-8px_rgba(26,26,26,0.18)]">
                    <div className="relative aspect-[5/4] overflow-hidden bg-bone shrink-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                        style={{ backgroundImage: `url('${watch.image}')`, filter: watch.sold ? "grayscale(0.4)" : "none" }}
                      />
                      {watch.sold && (
                        <div className="absolute inset-0 bg-ivory/30" />
                      )}
                      {watch.sold && (
                        <div className="absolute top-2.5 left-2.5 bg-ink text-ivory px-2 py-1 text-[9px] tracking-widest uppercase">
                          {lang === "fr" ? "Vendue" : "Sold"}
                        </div>
                      )}
                    </div>

                    {/* Info block */}
                    <div className="p-3 pb-3.5 flex-1 flex flex-col">
                      {/* Brand */}
                      <div className="text-[12px] font-medium tracking-[0.18em] uppercase opacity-90 leading-tight mb-2">
                        {watch.brand}
                      </div>

                      {/* Model in large italic serif — negative margin compensates italic left-side bearing */}
                      <h3 className="font-serif italic text-[18px] leading-[1.1] tracking-tight mb-1 text-ink -ml-[2px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {watch.model}
                      </h3>

                      {/* Reference — strip model prefix to avoid duplication */}
                      {(() => {
                        const refFull = loc(watch.reference, lang);
                        const refShort = refFull.startsWith(watch.model)
                          ? refFull.slice(watch.model.length).replace(/^[\s·—]+/, '')
                          : refFull;
                        return refShort ? (
                          <div className="text-[10px] tracking-wide opacity-55 mb-2 leading-tight">
                            {refShort}
                          </div>
                        ) : null;
                      })()}

                      {/* Short summary */}
                      {summary && (
                        <p className="text-[11px] leading-[1.5] opacity-60 mb-3 text-balance">
                          {summary}
                        </p>
                      )}

                      {/* Price + VIEW — pushed to bottom for equal-height cards */}
                      <div className="mt-auto flex items-end justify-between pt-1">
                        <div className={`font-serif text-[18px] leading-none tracking-tight ${watch.sold ? "opacity-50" : ""}`}>
                          {watch.sold ? (lang === "fr" ? "Vendue" : "Sold") : watch.price}
                        </div>
                        {!watch.sold && (
                          <span className="text-[10px] tracking-widest uppercase opacity-70 flex items-center gap-1">
                            {viewLabel} <span className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ─── Desktop layout (auction-house caption) ─── */}
                  <div className="hidden md:block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-bone mb-3 md:mb-4">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                        style={{ backgroundImage: `url('${watch.image}')`, filter: watch.sold ? "grayscale(0.4)" : "none" }}
                      />
                      {watch.sold && <div className="absolute inset-0 bg-ivory/30" />}
                      {watch.sold && (
                        <div className="absolute top-3 left-3 bg-ink text-ivory px-2 py-1 text-[10px] tracking-widest uppercase">
                          {lang === "fr" ? "Vendue" : "Sold"}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors duration-700" />
                      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-between text-[10px] tracking-widest uppercase text-ivory">
                        <span>{c.hoverView}</span>
                        <span>↗</span>
                      </div>
                    </div>
                    <div className="text-center px-2 mt-2">
                      <h3 className="font-serif text-[14px] tracking-[0.08em] uppercase leading-[1.5] text-ink/90 text-balance">
                        {yearVal && /^\d{4}$/.test(yearVal) ? `${yearVal} ` : ""}{watch.brand} {loc(watch.reference, lang)}
                      </h3>
                      <div className={`font-serif text-[15px] mt-3 tracking-tight ${watch.sold ? "text-ink/40" : "text-ink/65"}`}>
                        {watch.sold ? (lang === "fr" ? "Vendue" : "Sold") : watch.price}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* CTA WhatsApp — point d'intention maximale après la grille */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 max-w-3xl mx-auto"
        >
          <div className="border hairline bg-ivory-soft p-7 md:p-10 text-center">
            <h3 className="font-serif italic text-2xl md:text-3xl tracking-tight leading-tight mb-3">
              {c.ctaTitle}
            </h3>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-ink/65 max-w-md mx-auto mb-7 md:mb-8">
              {c.ctaSubtitle}
            </p>
            <a
              href={whatsappCtaUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-ink text-ivory px-7 md:px-10 py-4 md:py-5 min-h-[48px] hover:bg-ink-soft transition-colors duration-700 text-[13px] md:text-[14px] tracking-widest uppercase font-light w-full sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5 shrink-0" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span>{c.ctaButton}</span>
              <span className="opacity-80 transition-transform duration-500 group-hover:translate-x-1">↗</span>
            </a>
            <p className="mt-5 text-[10px] md:text-[11px] tracking-widest uppercase opacity-50">
              {c.ctaNote}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
