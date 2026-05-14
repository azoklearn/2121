"use client";

import { motion } from "framer-motion";

const grid = [
  {
    src: "/watches/submariner.jpg",
    caption: "Submariner / Transition",
    place: "Paris",
  },
  {
    src: "/watches/daytona.jpg",
    caption: "Daytona / Sourced",
    place: "Paris",
  },
  {
    src: "/watches/royal-oak.jpg",
    caption: "Royal Oak / Steel",
    place: "Atelier",
  },
  {
    src: "/watches/vacheron.jpg",
    caption: "Malachite / 18k",
    place: "Rue Saint-Honoré",
  },
  {
    src: "/watches/submariner.jpg",
    caption: "Two-line Dial",
    place: "Atelier",
  },
  {
    src: "/watches/daytona.jpg",
    caption: "126500LN",
    place: "Private Sale",
  },
];

export default function Instagram() {
  return (
    <section className="relative bg-ivory text-ink py-32 md:py-48 border-t hairline">
      <div className="mx-auto px-6 md:px-10 max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-6 mb-12 md:mb-20 text-[10px] tracking-widest uppercase opacity-60"
        >
          <div className="col-span-2 md:col-span-1">04</div>
          <div className="col-span-10 md:col-span-7">— Instants & Journal</div>
          <div className="hidden md:block md:col-span-4 text-right">
            From the Atelier
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,5.6vw,5.6rem)] font-light leading-[1] tracking-tighter"
          >
            <span className="font-serif italic">@2121</span>collection
          </motion.h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-[11px] tracking-widest uppercase border-b border-ink/40 pb-2 hover:border-ink transition-colors duration-700 self-start md:self-auto"
          >
            Follow Our Journal
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-ink/15">
          {grid.map((item, idx) => (
            <motion.a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative aspect-square overflow-hidden bg-bone block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('${item.src}')`,
                  filter: "saturate(0.65) contrast(1.04)",
                }}
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-700" />

              {/* Number top-left */}
              <div className="absolute top-3 md:top-4 left-3 md:left-4 text-[9px] md:text-[10px] tracking-widest uppercase text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                — {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Caption bottom */}
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
