import type { L } from "./i18n";
import watchesData from "@/data/watches.json";

/** A single key/value spec line — both sides may be localized. */
export type Spec = { key: L; value: L };

export type Watch = {
  slug: string;
  brand: string;
  model: string;
  reference: L;
  year: L;
  condition: L;
  price: string;
  image: string;
  images: string[];
  intro: L;
  description: L;
  specs: Spec[];
  papers?: boolean; // box & papers indicator (default true)
  sold?: boolean;   // marks piece as sold (shown with badge, still visible)
  reserved?: boolean; // marks piece as reserved (badge shown, price still visible)
  video?: string;   // optional video URL for the detail page gallery
  contactOnly?: boolean; // hides price, shows "more info on request"
};

export const WHATSAPP_NUMBER = "33638768692";

/** Source of truth: data/watches.json, edited through /admin. */
export const watches: Watch[] = watchesData as Watch[];

export function getWatch(slug: string): Watch | undefined {
  return watches.find((w) => w.slug === slug);
}

export function buildWhatsAppLink(watch: Watch) {
  // Kept for backward compatibility — components now build the link via i18n.
  const message = `Bonjour 2121, je suis intéressé par la ${watch.brand} ${watch.model}. Pourriez-vous me communiquer plus d'informations ?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
