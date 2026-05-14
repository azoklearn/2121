"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  specs: Record<string, string>;
  description: string;
};

export default function WatchSpecs({ specs, description }: Props) {
  const { t } = useLanguage();
  const entries = Object.entries(specs);

  return (
    <section className="py-20 md:py-32 bg-ivory border-t hairline">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <div className="text-[10px] tracking-widest uppercase opacity-55 mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-ink/40" />
              {t.watch.wordOfHouse}
            </div>
            <p className="text-[15px] md:text-base leading-[1.8] text-ink/75">
              {description}
            </p>
          </motion.div>

          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <div className="text-[10px] tracking-widest uppercase opacity-55 mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-ink/40" />
              {t.watch.specs}
            </div>
            <dl className="divide-y hairline border-t border-b hairline">
              {entries.map(([key, value], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.05 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid grid-cols-12 gap-4 py-4 md:py-5 items-baseline"
                >
                  <dt className="col-span-5 md:col-span-4 text-[10px] tracking-widest uppercase opacity-55">
                    {key}
                  </dt>
                  <dd className="col-span-7 md:col-span-8 text-sm md:text-[15px] font-light tracking-tight">
                    {value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
