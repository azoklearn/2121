import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WatchDetailHero from "@/components/WatchDetailHero";
import WatchSpecs from "@/components/WatchSpecs";
import WatchOthers from "@/components/WatchOthers";
import { watches, getWatch } from "@/lib/watches";

export function generateStaticParams() {
  return watches.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const watch = getWatch(params.slug);
  if (!watch) return { title: "2121 — Pièce introuvable" };
  return {
    title: `${watch.brand} ${watch.model} — 2121 Maison Privée`,
    description: watch.intro,
  };
}

export default function WatchPage({
  params,
}: {
  params: { slug: string };
}) {
  const watch = getWatch(params.slug);
  if (!watch) notFound();

  return (
    <main className="relative bg-ivory text-ink min-h-screen">
      <Navbar />

      <WatchDetailHero watch={watch} />

      <WatchSpecs specs={watch.specs} description={watch.description} />

      <WatchOthers currentSlug={watch.slug} />

      <Footer />
    </main>
  );
}
