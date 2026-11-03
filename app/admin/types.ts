export type L = string | { fr: string; en: string };
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
  papers?: boolean;
  sold?: boolean;
  reserved?: boolean;
  video?: string;
  contactOnly?: boolean;
};

export type Status = "available" | "reserved" | "sold";

export function statusOf(w: Watch): Status {
  if (w.sold) return "sold";
  if (w.reserved) return "reserved";
  return "available";
}

export function fr(v: L | undefined): string {
  if (v == null) return "";
  return typeof v === "string" ? v : v.fr ?? "";
}

export function en(v: L | undefined): string {
  if (v == null) return "";
  return typeof v === "string" ? v : v.en ?? "";
}

/** Keep a plain string when both languages match, so the JSON stays tidy. */
export function makeL(frVal: string, enVal: string): L {
  const f = frVal.trim();
  const e = enVal.trim();
  if (!e || e === f) return f;
  return { fr: f, en: e };
}

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function emptyWatch(): Watch {
  return {
    slug: "",
    brand: "",
    model: "",
    reference: "",
    year: "",
    condition: "",
    price: "",
    image: "",
    images: [],
    intro: "",
    description: "",
    specs: [],
  };
}
