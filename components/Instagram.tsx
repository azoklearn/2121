"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const images = [
  "/watches/submariner.jpg",
  "/watches/daytona.jpg",
  "/watches/royal-oak.jpg",
  "/watches/vacheron.jpg",
  "/watches/submariner.jpg",
  "/watches/daytona.jpg",
];

export default function Instagram() {
  const { t } = useLanguage();
  const ig = t.instagram;

  return (
    <section className="relative bg-ivory text-ink py-32 md:py-48 border-t hairline">
      <div className="mx-auto px-6 md:px-10 max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 mb-12 md:mb-20 text-[10px] tracking-widest uppercase opacity-60"
        >
          <div>{ig.badge}</div>
          <div className="hidden md:block">{ig.header}</div>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <motion.a
            href="https://instagram.com/2121collection"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-[clamp(2rem,5.6vw,5.6rem)] font-light leading-[1] tracking-tight hover:opacity-70 transition-opacity duration-500"
          >
            @2121collection
          </motion.a>
          <a
            href="https://instagram.com/2121collection"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-[11px] tracking-widest uppercase border-b border-ink/40 pb-2 hover:border-ink transition-colors duration-700 self-start md:self-auto"
          >
            {ig.follow}
            <span className="transition-transform duration-500 group-hover:translate-x-1">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-px bg-ink/15">
          {ig.items.slice(0, 3).map((item, idx) => (
            <motion.a
              key={idx}
              href="https://instagram.com/2121collection"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-square overflow-hidden bg-bone block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${images[idx]}')`, filter: "saturate(0.65) contrast(1.04)" }}
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-700" />

              <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5 flex items-end justify-between text-[9px] md:text-[10px] tracking-widest uppercase text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span>— {item.caption}</span>
                <span className="hidden md:inline italic font-serif tracking-normal text-[12px]">
                  {item.place}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
