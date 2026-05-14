"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
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
          <div>— A Letter from Paris</div>
          <div className="hidden md:block">Maison Privée · Depuis MMXXI</div>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          {/* Text — full width now that the image is gone */}
          <div className="col-span-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,4.6vw,4.8rem)] font-light leading-[1.05] tracking-tighter mb-8 md:mb-16 text-balance"
            >
              We don&apos;t sell{" "}
              <span className="font-serif italic">watches</span> —
              <br />
              we curate{" "}
              <span className="font-serif italic">stories</span> on the wrist.
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1.2,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[15px] md:text-base leading-[1.75] text-ink/75"
              >
                Founded in Paris, 2121 is a confidential maison dedicated to the
                discreet collector. Each piece passes through our hands the way
                a paragraph passes through an editor&apos;s — slowly, carefully,
                until only what matters remains.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[15px] md:text-base leading-[1.75] text-ink/75"
              >
                We source rare references from private archives across Europe,
                Japan and the Americas. Authenticity is not a promise — it is
                the foundation of every relationship we build, one timepiece
                at a time.
              </motion.p>
            </div>

            {/* Stats / signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1.2,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 md:mt-24 grid grid-cols-3 gap-4 md:gap-10 max-w-2xl border-t hairline pt-8 md:pt-10"
            >
              <div>
                <div className="text-[10px] tracking-widest uppercase opacity-50 mb-3">
                  — Founded
                </div>
                <div className="text-2xl md:text-3xl font-light tracking-tight tnum">
                  MMXXI
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-widest uppercase opacity-50 mb-3">
                  — Pieces Sourced
                </div>
                <div className="text-2xl md:text-3xl font-light tracking-tight tnum">
                  421+
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-widest uppercase opacity-50 mb-3">
                  — Collectors
                </div>
                <div className="text-2xl md:text-3xl font-light tracking-tight tnum">
                  Worldwide
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="mt-10 md:mt-20 flex items-center gap-4 text-[10px] tracking-widest uppercase"
            >
              <span className="h-px w-12 bg-ink/40" />
              <span>2121, Paris — Maison Privée</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
