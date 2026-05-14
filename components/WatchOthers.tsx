"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { watches } from "@/lib/watches";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  currentSlug: string;
};

export default function WatchOthers({ currentSlug }: Props) {
  const { t } = useLanguage();
  const w = t.watch;
  const others = watches.filter((w) => w.slug !== currentSlug).slice(0, 3);

  return (
    <section className="py-20 md:py-32 bg-ivory border-t hairline">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="text-[10px] tracking-widest uppercase opacity-55 mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-ink/40" />
              {w.others}
            </div>
            <h2 className="text-[clamp(2rem,4.4vw,4rem)] font-light leading-[1] tracking-tight">
              {w.continueVisit}{" "}
              <span className="font-serif italic">{w.visitItalic}</span>.
            </h2>
          </div>
          <Link
            href="/#collection"
            className="group inline-flex items-center gap-3 text-[11px] tracking-widest uppercase border-b border-ink/40 pb-2 hover:border-ink transition-colors duration-700 self-start"
          >
            {w.allPieces}
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
          {others.map((watch, idx) => (
            <motion.article
              key={watch.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1.2,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={`/watches/${watch.slug}`} className="group block">
                <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-bone mb-3 md:mb-5">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url('${watch.image}')` }}
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/12 transition-colors duration-700" />
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-widest uppercase opacity-55 mb-1.5">
                      {watch.brand}
                    </div>
                    <h3 className="text-base md:text-xl font-light tracking-tight">
                      <span className="font-serif italic mr-1.5">—</span>
                      {watch.model}
                    </h3>
                  </div>
                  <span className="text-[10px] tracking-widest uppercase opacity-50 transition-transform duration-500 group-hover:translate-x-1 shrink-0">
                    ↗
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
