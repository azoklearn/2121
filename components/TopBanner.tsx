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
      <div className="px-4 md:px-10 h-8 md:h-9 flex items-center justify-center md:justify-between text-[10px] md:text-[11px] tracking-widest uppercase">
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
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 opacity-90"
            aria-hidden
          >
            <path d="M20.5 12.5a8.5 8.5 0 0 1-12.7 7.4L3 21l1.1-4.7A8.5 8.5 0 1 1 20.5 12.5Z" />
            <path d="M8.5 9c.3 1.4 1.4 3.4 2.8 4.6 1.3 1.3 3.3 2.5 4.7 2.7.4.1.9 0 1.2-.4l.7-.9c.2-.3.1-.7-.2-.8l-1.6-1c-.3-.2-.7-.1-.9.2l-.5.6c-1.2-.4-2.4-1.2-3.1-1.9-.7-.7-1.6-1.9-2-3.2l.6-.5c.3-.2.4-.6.2-.9l-1-1.6c-.2-.3-.6-.4-.8-.2l-.9.7c-.4.3-.5.7-.4 1.2Z" />
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
