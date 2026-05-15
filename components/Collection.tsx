"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { watches } from "@/lib/watches";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Collection() {
  const { t } = useLanguage();
  const c = t.collection;

  return (
    <section
      id="collection"
      className="relative bg-ivory text-ink pt-36 md:pt-52 pb-16 md:pb-36"
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

        {/* Grid — 3 per row, same size */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {watches.map((watch, idx) => (
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
              className="group"
            >
              <Link href={`/watches/${watch.slug}`} className="block">
                {/* Image — same aspect for all */}
                <div className="relative aspect-[4/5] overflow-hidden bg-bone mb-3 md:mb-4">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url('${watch.image}')` }}
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/12 transition-colors duration-700" />

                  {/* Top stamps */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-end text-[10px] tracking-widest uppercase text-ivory">
                    <span className="opacity-90 hidden md:inline">
                      {watch.condition}
                    </span>
                  </div>

                  {/* Hover overlay — price + view hint */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="text-ivory font-serif italic text-lg md:text-xl leading-none mb-2 tracking-tight">
                      {watch.price}
                    </div>
                    <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-ivory">
                      <span>{c.hoverView}</span>
                      <span>↗</span>
                    </div>
                  </div>
                </div>

                {/* Caption — serif centered, auction-house style */}
                <div className="text-center px-2 mt-2">
                  {(() => {
                    const year = watch.specs?.Année;
                    const yearPrefix =
                      year && /^\d{4}$/.test(year) ? `${year} ` : "";
                    const title = `${yearPrefix}${watch.brand} ${watch.model} ${watch.reference}`;
                    return (
                      <h3 className="font-serif text-[12px] md:text-[14px] tracking-[0.08em] uppercase leading-[1.5] text-ink/90 text-balance">
                        {title}
                      </h3>
                    );
                  })()}
                  <div className="font-serif text-[13px] md:text-[15px] text-ink/65 mt-2 md:mt-3 tracking-tight">
                    {watch.price}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
