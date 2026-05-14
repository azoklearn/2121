"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TopBanner() {
  const { t } = useLanguage();
  const b = t.banner;

  return (
    <a
      href="https://wa.me/33621212121"
      target="_blank"
      rel="noreferrer"
      className="group fixed top-0 left-0 right-0 z-[55] bg-ink text-ivory border-b hairline-light hover:bg-ink-soft transition-colors duration-500"
      aria-label={b.cta}
    >
      <div className="px-4 md:px-10 h-11 md:h-14 flex items-center justify-center md:justify-between text-[11px] md:text-[13px] tracking-widest uppercase">
        {/* Left — label (desktop only) */}
        <span className="hidden md:flex items-center gap-3 opacity-60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ivory/70 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ivory" />
          </span>
          {b.label}
        </span>

        {/* Center — CTA */}
        <span className="flex items-center gap-2 md:gap-3">
          {/* Mobile pulse dot */}
          <span className="md:hidden relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ivory/70 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ivory" />
          </span>
          {/* WhatsApp icon */}
          <svg
            viewBox="0 0 24 24"
            fill="#25D366"
            className="h-5 w-5 md:h-[22px] md:w-[22px]"
            aria-hidden
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span className="font-light tracking-widest">{b.cta}</span>
          <span className="hidden sm:inline opacity-40">·</span>
          <span className="hidden sm:inline font-serif italic normal-case tracking-normal text-[12px] opacity-80">
            {b.phone}
          </span>
          <span className="opacity-70 transition-transform duration-500 group-hover:translate-x-1">
            ↗
          </span>
        </span>

        {/* Right — Paris timestamp (desktop only) */}
        <span className="hidden md:inline opacity-50 italic font-serif normal-case tracking-normal text-[12px]">
          Paris · Réponse &lt; 24h
        </span>
      </div>
    </a>
  );
}
