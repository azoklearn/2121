"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const maisonHrefs = ["#story", "#collection", "#services", "#contact"];

  return (
    <footer className="relative bg-ink text-ivory border-t hairline-light overflow-hidden">
      <div className="px-6 md:px-10 pt-20 md:pt-28 pb-10 md:pb-14">
        {/* Top row */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-6 lg:col-span-5"
          >
            <div className="text-[10px] tracking-widest uppercase opacity-50 mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-ivory/40" />
              {f.maisonLabel}
            </div>
            <p className="text-2xl md:text-3xl font-light leading-[1.3] tracking-tight max-w-md">
              {f.maisonText.pre}{" "}
              <span className="font-serif italic">{f.maisonText.italic}</span>
              {f.maisonText.post}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 md:col-span-3 lg:col-span-2"
          >
            <div className="text-[10px] tracking-widest uppercase opacity-50 mb-6">
              {f.connect}
            </div>
            <ul className="space-y-3 text-[13px] tracking-tight">
              <li><a href="https://instagram.com/2121collection" className="hover:opacity-50 transition-opacity duration-500">Instagram ↗</a></li>
              <li><a href="https://threads.net/@2121collection" className="hover:opacity-50 transition-opacity duration-500">Threads ↗</a></li>
              <li><a href="https://wa.me/33621212121" className="hover:opacity-50 transition-opacity duration-500">WhatsApp ↗</a></li>
              <li><a href="mailto:yb@2121collection.com" className="hover:opacity-50 transition-opacity duration-500">Email ↗</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 md:col-span-3 lg:col-span-2"
          >
            <div className="text-[10px] tracking-widest uppercase opacity-50 mb-6">
              {f.maison}
            </div>
            <ul className="space-y-3 text-[13px] tracking-tight">
              {f.maisonLinks.map((label, i) => (
                <li key={i}>
                  <a href={maisonHrefs[i]} className="hover:opacity-50 transition-opacity duration-500">{label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-12 lg:col-span-3 lg:text-right"
          >
            <div className="text-[10px] tracking-widest uppercase opacity-50 mb-6 lg:justify-end flex items-center gap-3">
              <span className="h-px w-6 bg-ivory/40 lg:order-2" />
              <span className="lg:order-1">{f.newsletter}</span>
            </div>
            <p className="text-[14px] leading-[1.7] opacity-80 mb-6 max-w-xs lg:ml-auto">
              {f.newsletterText}
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 text-[11px] tracking-widest uppercase border-b border-ivory/40 pb-2 hover:border-ivory transition-colors duration-700"
            >
              {f.subscribe}
              <span className="transition-transform duration-500 group-hover:translate-x-1">↗</span>
            </a>
          </motion.div>
        </div>

        {/* Massive wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(4.5rem,26vw,32rem)] leading-[0.8] font-light tracking-tightest text-center select-none border-t border-b hairline-light py-8 md:py-12"
        >
          <span className="inline-block">2</span>
          <span className="inline-block">1</span>
          <span className="inline-block">2</span>
          <span className="inline-block">1</span>
        </motion.div>

        {/* Bottom row */}
        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 text-[10px] tracking-widest uppercase opacity-60">
          <div className="col-span-6 md:col-span-3">© MMXXVI 2121</div>
          <div className="col-span-6 md:col-span-3 md:text-center">
            <a href="/mentions-legales" className="hover:opacity-60">{f.legal}</a>
            <span className="mx-2 opacity-40">·</span>
            <a href="/privacy" className="hover:opacity-60">{f.privacy}</a>
          </div>
          <div className="hidden md:block md:col-span-3 text-center italic font-serif tracking-normal text-[12px] opacity-80">
            {f.builtIn}
          </div>
          <div className="col-span-12 md:col-span-3 text-right tnum">
            48.8566° N · 2.3522° E
          </div>
        </div>
      </div>
    </footer>
  );
}
