import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/contexts/LanguageContext";
import TopBanner from "@/components/TopBanner";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://2121.paris"),
  title: "2121 Modern & Vintage Watches | Maison Privée Paris",
  description:
    "Maison parisienne privée dédiée à l'achat, la vente et le sourcing de montres de collection. Une approche silencieuse du luxe horloger, entre tradition et modernité.",
  keywords: [
    "vintage watches",
    "watch collector",
    "Rolex",
    "Patek Philippe",
    "Audemars Piguet",
    "Daniel Roth",
    "Cartier",
    "watches Paris",
    "horlogerie Paris",
    "private watch dealer",
  ],
  authors: [{ name: "2121 Maison" }],
  creator: "2121",
  openGraph: {
    title: "2121 Modern & Vintage Watches",
    description: "A private Parisian maison for the discreet watch collector.",
    type: "website",
    locale: "en_US",
    siteName: "2121",
  },
  twitter: {
    card: "summary_large_image",
    title: "2121 Modern & Vintage Watches",
    description: "A private Parisian maison for the discreet watch collector.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-ivory text-ink antialiased overflow-x-hidden font-sans">
        <LanguageProvider>
          <TopBanner />
          <SmoothScroll>{children}</SmoothScroll>
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
