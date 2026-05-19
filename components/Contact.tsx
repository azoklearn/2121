"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section
      id="contact"
      className="relative bg-ink text-ivory py-20 md:py-48 overflow-x-hidden"
    >
      <div className="mx-auto px-6 md:px-10 max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 mb-12 md:mb-20 text-[10px] tracking-widest uppercase opacity-50"
        >
          <div>{c.badge}</div>
          <div className="hidden md:block">{c.headerRight}</div>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-8 gap-x-0 md:gap-20">
          {/* Left column */}
          <div className="col-span-12 md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.9rem,7.4vw,7.6rem)] font-light leading-[0.95] tracking-tighter mb-8 md:mb-12 text-balance"
            >
              {c.h2Pre}{" "}
              <span className="font-serif italic text-[1.18em]">{c.h2Italic}</span>
              {c.h2Post}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] md:text-base leading-[1.75] text-ivory/70 w-full max-w-md mb-8 md:mb-24"
            >
              {c.description}
            </motion.p>

            <div className="space-y-px bg-ivory/15">
              {c.channels.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex items-center justify-between bg-ink py-6 md:py-8 px-1 hover:px-5 transition-all duration-700 ease-out"
                >
                  <div className="flex items-center gap-3 md:gap-10 min-w-0">
                    <span className="text-[10px] tracking-widest uppercase opacity-50 w-16 md:w-24 shrink-0">
                      — {item.label}
                    </span>
                    <span className="text-[13px] md:text-2xl tracking-tight font-light min-w-0 break-all md:break-normal md:truncate">
                      {item.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 shrink-0 ml-4">
                    <span className="hidden lg:inline text-[10px] tracking-widest uppercase opacity-40 italic font-serif tracking-normal text-[12px]">
                      {item.note}
                    </span>
                    <span className="text-[14px] opacity-60 transition-transform duration-500 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 md:col-span-5 md:pl-12 lg:pl-20 md:border-l hairline-light mt-10 md:mt-0 pt-10 md:pt-0 border-t md:border-t-0 hairline-light">
            <div className="space-y-8 md:space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-[10px] tracking-widest uppercase opacity-50 mb-4 flex items-center gap-3">
                  <span className="h-px w-6 bg-ivory/40" />
                  {c.addressLabel}
                </div>
                <p className="text-base md:text-lg font-light leading-[1.55]">
                  {c.addressLines.map((l, i) => (
                    <span key={i} className={i === c.addressLines.length - 1 ? "opacity-60" : ""}>
                      {l}
                      {i < c.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-[10px] tracking-widest uppercase opacity-50 mb-4 flex items-center gap-3">
                  <span className="h-px w-6 bg-ivory/40" />
                  {c.hoursLabel}
                </div>
                <p className="text-base md:text-lg font-light leading-[1.55]">
                  {c.hoursLines.map((l, i) => (
                    <span key={i} className={i === c.hoursLines.length - 1 ? "opacity-60 italic font-serif" : ""}>
                      {l}
                      {i < c.hoursLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-[10px] tracking-widest uppercase opacity-50 mb-4 flex items-center gap-3">
                  <span className="h-px w-6 bg-ivory/40" />
                  {c.coordsLabel}
                </div>
                <p className="text-base md:text-lg font-light leading-[1.55] tnum">
                  {c.coordsValue}
                  <br />
                  <span className="opacity-60 text-sm">{c.coordsExtra}</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
