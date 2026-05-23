"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Manifesto() {
  const { t } = useLanguage();
  const m = t.manifesto;

  return (
    <section
      id="story"
      className="relative bg-ivory text-ink py-20 md:py-48 overflow-hidden"
    >
      <div className="mx-auto px-6 md:px-10 max-w-[1600px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 mb-10 md:mb-32 text-[10px] tracking-widest uppercase opacity-60"
        >
          <div>{m.badge}</div>
          <div className="hidden md:block">{m.headerRight}</div>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,4.6vw,4.8rem)] font-light leading-[1.05] tracking-tighter mb-8 md:mb-16 text-balance"
            >
              {m.h2Pre}{" "}
              <span className="font-serif italic text-[1.18em]">{m.h2Italic1}</span> {m.h2Mid}
              <br />
              {m.h2Post}{" "}
              <span className="font-serif italic text-[1.18em]">{m.h2Italic2}</span>{" "}
              {m.h2End}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15px] md:text-base leading-[1.75] text-ink/75"
              >
                {m.para1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15px] md:text-base leading-[1.75] text-ink/75"
              >
                {m.para2}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="mt-10 md:mt-20 flex items-center gap-4 text-[10px] tracking-widest uppercase"
            >
              <span className="h-px w-12 bg-ink/40" />
              <span>{m.signature}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
