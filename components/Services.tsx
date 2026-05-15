"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section
      id="services"
      className="relative bg-ivory text-ink py-20 md:py-48 border-t hairline"
    >
      <div className="mx-auto px-6 md:px-10 max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 mb-12 md:mb-20 text-[10px] tracking-widest uppercase opacity-60"
        >
          <div>{s.badge}</div>
          <div className="hidden md:block">{s.headerRight}</div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.5rem,6.4vw,6.4rem)] font-light leading-[0.98] tracking-tighter mb-12 md:mb-28 max-w-4xl text-balance"
        >
          {s.titlePre}{" "}
          <span className="font-serif italic">{s.titleItalic}</span>
          {s.titlePost}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
          {s.items.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1.2,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-ivory p-7 md:p-10 lg:p-12 group min-h-0 md:min-h-[420px] flex flex-col justify-between transition-colors duration-700 hover:bg-ivory-soft"
            >
              <div>
                <div className="flex items-center justify-between mb-7 md:mb-16">
                  <span className="text-[10px] tracking-widest uppercase opacity-50">
                    — {service.id}
                  </span>
                  <span className="block w-3 h-px bg-ink/40 transition-all duration-700 group-hover:w-8" />
                </div>
                <h3 className="text-2xl md:text-[28px] font-light tracking-tight leading-[1.1] mb-8">
                  {service.title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.75] text-ink/70 max-w-xs">
                  {service.description}
                </p>
              </div>

              <div className="mt-7 md:mt-12 pt-5 md:pt-6 border-t hairline flex items-center justify-between text-[10px] tracking-widest uppercase">
                <span className="opacity-60 italic font-serif text-[12px] tracking-normal">
                  {service.detail}
                </span>
                <span className="opacity-50 transition-transform duration-500 group-hover:translate-x-1">
                  ↗
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
