"use client";

const brands = [
  "Rolex",
  "Patek Philippe",
  "Audemars Piguet",
  "Daniel Roth",
  "Cartier",
  "Vacheron Constantin",
  "A. Lange & Söhne",
  "Breguet",
  "F.P. Journe",
  "Heuer",
];

export default function Marquee() {
  return (
    <div className="relative bg-ivory border-y hairline overflow-hidden py-7 md:py-10 select-none">
      <div className="flex items-center animate-marquee whitespace-nowrap will-change-transform">
        {[...Array(2)].map((_, copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {brands.map((brand, idx) => (
              <div
                key={`${copy}-${idx}`}
                className="flex items-center px-8 md:px-14"
              >
                <span className="text-[clamp(1.6rem,3.2vw,3.6rem)] font-light tracking-tighter">
                  {brand}
                </span>
                <span className="ml-8 md:ml-14 font-serif italic opacity-30 text-[clamp(1.2rem,2.5vw,2.4rem)]">
                  ·
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient masks at edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-ivory to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-ivory to-transparent" />
    </div>
  );
}
