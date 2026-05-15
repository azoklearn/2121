import type { L } from "./i18n";

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
};

export const WHATSAPP_NUMBER = "33621212121";

export const watches: Watch[] = [
  {
    slug: "rolex-submariner-14060m",
    brand: "Rolex",
    model: "Submariner",
    reference: { fr: "Submariner 14060M — 2 lignes", en: "Submariner 14060M — Two-liner" },
    year: { fr: "Époque de transition", en: "Transition era" },
    condition: { fr: "Excellent", en: "Excellent" },
    price: "11 500 €",
    image: "/montre/rolex/1.jpg",
    images: [
      "/montre/rolex/1.jpg",
      "/montre/rolex/PHOTO-2026-05-13-12-38-40%20(1).jpg",
      "/montre/rolex/PHOTO-2026-05-13-12-38-40%20(2).jpg",
      "/montre/rolex/PHOTO-2026-05-13-12-38-40%20(5).jpg",
      "/montre/rolex/5.jpg",
    ],
    intro: {
      fr: "La référence de transition entre l'esthétique classique des premiers Submariner sans date et la modernité des modèles plus récents.",
      en: "The transitional reference bridging the classic aesthetic of the early no-date Submariners and the modernity of the more recent models.",
    },
    description: {
      fr: "Cette 14060M deux lignes incarne un moment charnière de l'histoire Rolex : la fin des cadrans peints au tritium, le passage au Super-LumiNova, et l'introduction du calibre 3130. Une montre de plongée pure, sans date, fidèle à l'esprit originel du Submariner. Sourcée auprès d'un collectionneur privé, en parfait état d'origine.",
      en: "This two-liner 14060M captures a pivotal moment in Rolex history: the end of tritium-painted dials, the move to Super-LumiNova, and the introduction of the calibre 3130. A pure dive watch with no date, faithful to the original spirit of the Submariner. Sourced from a private collector and in perfect original condition.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Rolex" },
      { key: { fr: "Année", en: "Year" }, value: "2002" },
      { key: { fr: "Référence", en: "Reference" }, value: "14060M" },
      { key: { fr: "Numéro de série", en: "Serial" }, value: "F87xxxxx" },
      { key: { fr: "Matière", en: "Material" }, value: { fr: "Acier 904L", en: "904L Steel" } },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Automatique — Calibre 3130", en: "Automatic — Calibre 3130" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Oyster acier, fermoir Oysterclasp", en: "Oyster steel, Oysterclasp clasp" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: "40 mm / 20 mm" },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Disponibles sur demande", en: "Available on request" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "1 an — maison 2121", en: "1 year — 2121 maison" } },
    ],
  },
  {
    slug: "audemars-piguet-royal-oak",
    brand: "Audemars Piguet",
    model: "Royal Oak",
    reference: "Royal Oak 56175SP — 33 mm",
    year: { fr: "Vintage", en: "Vintage" },
    condition: { fr: "Excellent", en: "Excellent" },
    price: "22 800 €",
    image: "/montre/ap/PHOTO-2026-05-13-12-38-39%20(3).jpg",
    images: [
      "/montre/ap/PHOTO-2026-05-13-12-38-39%20(3).jpg",
      "/montre/ap/PHOTO-2026-05-13-12-38-39%20(4).jpg",
      "/montre/ap/PHOTO-2026-05-13-12-38-40%202.jpg",
    ],
    intro: {
      fr: "Royal Oak référence 56175SP, 33 mm. Lunette platine, boîtier acier, cadran noir. Une icône dans son format mid-size.",
      en: "Royal Oak reference 56175SP, 33 mm. Platinum bezel, steel case, black dial. An icon in its mid-size format.",
    },
    description: {
      fr: "Dessinée par Gérald Genta, la Royal Oak n'a jamais cessé d'être désirable. Cette 56175SP combine la lunette octogonale en platine avec un boîtier en acier — bi-matière subtile, raffinement absolu. Cadran noir épuré, mouvement quartz d'une précision implacable. Une pièce vintage en condition remarquable, prête pour un nouveau collectionneur.",
      en: "Designed by Gérald Genta, the Royal Oak has never lost its appeal. This 56175SP pairs the octagonal platinum bezel with a steel case: a subtle two-material composition, refined to the core. Clean black dial, quartz movement of unwavering precision. A vintage piece in remarkable condition, ready for its next collector.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Audemars Piguet" },
      { key: { fr: "Année", en: "Year" }, value: "1985" },
      { key: { fr: "Référence", en: "Reference" }, value: "56175SP" },
      { key: { fr: "Numéro de série", en: "Serial" }, value: "B-4xxxx" },
      { key: { fr: "Matière", en: "Material" }, value: { fr: "Acier inoxydable / Lunette platine 950", en: "Stainless steel / Platinum 950 bezel" } },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Quartz haute précision", en: "High-precision quartz" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Acier intégré AP, fermoir déployant", en: "AP integrated steel, deployant clasp" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: "33 mm / 17 mm" },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Aucun", en: "None" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "1 an — maison 2121", en: "1 year — 2121 maison" } },
    ],
  },
  {
    slug: "breguet-classique",
    brand: "Breguet",
    model: "Classique",
    reference: { fr: "Classique — Or rose, Manufacture", en: "Classique — Rose gold, Manufacture" },
    year: { fr: "Contemporain", en: "Contemporary" },
    condition: { fr: "Excellent", en: "Excellent" },
    price: "19 400 €",
    image: "/montre/breguet/1.jpg",
    images: [
      "/montre/breguet/1.jpg",
      "/montre/breguet/PHOTO-2026-05-13-12-38-39.jpg",
      "/montre/breguet/PHOTO-2026-05-13-12-38-39%20(1).jpg",
      "/montre/breguet/PHOTO-2026-05-13-12-38-39%20(2).jpg",
      "/montre/breguet/PHOTO-2026-05-13-12-38-40%20(9).jpg",
    ],
    intro: {
      fr: "Une Breguet Classique en or rose, cadran guilloché argenté. L'horlogerie à son état le plus pur, dépouillée et souveraine.",
      en: "A Breguet Classique in rose gold with a silvered guilloché dial. Watchmaking at its purest: stripped back and sovereign.",
    },
    description: {
      fr: "Depuis 1775, Breguet incarne l'idée même du raffinement horloger. Cette Classique en or rose perpétue la tradition des cadrans guillochés à la main, des aiguilles en pomme creuses et des chiffres arabes gravés. Le mouvement ultra-plat, visible au travers du fond saphir, témoigne d'un savoir-faire irréductible. Pour le collectionneur qui sait que le vrai luxe est invisible.",
      en: "Since 1775, Breguet has embodied the very idea of horological refinement. This Classique in rose gold carries on the tradition of hand-guilloché dials, hollow apple hands, and engraved Arabic numerals. The ultra-thin movement, visible through the sapphire caseback, testifies to an uncompromising craftsmanship. For the collector who knows true luxury is invisible.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Breguet" },
      { key: { fr: "Année", en: "Year" }, value: "2018" },
      { key: { fr: "Référence", en: "Reference" }, value: "Classique 5177BR" },
      { key: { fr: "Numéro de série", en: "Serial" }, value: "55xxxxx" },
      { key: { fr: "Matière", en: "Material" }, value: { fr: "Or rose 18k", en: "18k rose gold" } },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Automatique manufacture — Calibre 777Q", en: "In-house automatic — Calibre 777Q" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Alligator brun, boucle ardillon or rose", en: "Brown alligator, rose gold pin buckle" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: "38 mm / 20 mm" },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Boîte et papiers Breguet", en: "Breguet box and papers" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "Internationale Breguet — 2 ans restants", en: "Breguet international — 2 years remaining" } },
    ],
  },
  {
    slug: "patek-philippe-calatrava",
    brand: "Patek Philippe",
    model: "Calatrava",
    reference: { fr: "Calatrava 5196 — Or blanc", en: "Calatrava 5196 — White gold" },
    year: { fr: "Contemporain", en: "Contemporary" },
    condition: { fr: "Très bon", en: "Very good" },
    price: "26 500 €",
    image: "/montre/patek/1.jpg",
    images: [
      "/montre/patek/1.jpg",
      "/montre/patek/2.jpg",
      "/montre/patek/3.jpg",
    ],
    intro: {
      fr: "La Calatrava 5196 en or blanc, l'archétype de la montre habillée selon Patek Philippe. Rien de superflu, tout de précis.",
      en: "The Calatrava 5196 in white gold, the archetype of the dress watch according to Patek Philippe. Nothing superfluous, everything precise.",
    },
    description: {
      fr: "Il n'existe pas de montre plus épurée qu'une Calatrava. La 5196 en or blanc trace une ligne directe jusqu'à la 96 de 1932 : cadran nacré blanc, index bâtons, aiguilles dauphine. Le calibre 215 PS, manufacture, tient 44 heures de réserve dans un boîtier de 37 mm d'une finesse absolue. Portée, elle disparaît sous la manchette, et c'est précisément là sa grandeur.",
      en: "No watch is more pared back than a Calatrava. The 5196 in white gold draws a direct line back to the 96 of 1932: pearled white dial, baton indices, dauphine hands. The in-house calibre 215 PS holds 44 hours of power reserve in a 37 mm case of absolute slimness. On the wrist, it disappears beneath the cuff, and that is precisely where its greatness lies.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Patek Philippe" },
      { key: { fr: "Année", en: "Year" }, value: "2015" },
      { key: { fr: "Référence", en: "Reference" }, value: "5196G-001" },
      { key: { fr: "Numéro de série", en: "Serial" }, value: "60xxxxx" },
      { key: { fr: "Matière", en: "Material" }, value: { fr: "Or blanc 18k", en: "18k white gold" } },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Manuel manufacture — Calibre 215 PS", en: "In-house manual — Calibre 215 PS" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Alligator noir, boucle ardillon or blanc", en: "Black alligator, white gold pin buckle" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: "37 mm / 19 mm" },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Full set — boîte, papiers, archives", en: "Full set — box, papers, archives" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "Patek Philippe — extension disponible", en: "Patek Philippe — extension available" } },
    ],
  },
  {
    slug: "vacheron-constantin-malachite-1970s",
    brand: "Vacheron Constantin",
    model: "Malachite 18k",
    reference: { fr: "Malachite — Or jaune, Années 1970", en: "Malachite — Yellow gold, 1970s" },
    year: { fr: "Vintage 1970s", en: "Vintage 1970s" },
    condition: { fr: "Cadran rare", en: "Rare dial" },
    price: "17 200 €",
    image: "/montre/vacheron/1.jpg",
    images: [
      "/montre/vacheron/1.jpg",
      "/montre/vacheron/2.jpg",
    ],
    intro: {
      fr: "Une Vacheron Constantin des années 1970, or jaune 18k, cadran en malachite naturelle. Pièce rare, presque introuvable.",
      en: "A Vacheron Constantin from the 1970s, 18k yellow gold, dial cut from natural malachite. A rare piece, almost impossible to find.",
    },
    description: {
      fr: "Le summum de l'horlogerie genevoise rencontre la pierre semi-précieuse. Cette Vacheron Constantin vintage présente un cadran taillé dans la malachite, minéral aux veines vertes profondes, chaque pièce unique par nature. Le bracelet milanais en or jaune 18k déploie une texture tissée d'une finesse rare, signature des années 70. Pour le collectionneur qui cherche autre chose qu'une montre : une œuvre.",
      en: "The pinnacle of Genevan watchmaking meets the semi-precious stone. This vintage Vacheron Constantin features a dial cut from malachite, a mineral with deep green veining, each piece unique by nature. The Milanese mesh bracelet in 18k yellow gold unfolds a woven texture of rare finesse, a signature of the 70s. For the collector who is looking for something more than a watch: a work of art.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Vacheron Constantin" },
      { key: { fr: "Année", en: "Year" }, value: "1973" },
      { key: { fr: "Référence", en: "Reference" }, value: { fr: "Cadran malachite", en: "Malachite dial" } },
      { key: { fr: "Numéro de série", en: "Serial" }, value: "47xxxxx" },
      { key: { fr: "Matière", en: "Material" }, value: { fr: "Or jaune 18k", en: "18k yellow gold" } },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Mécanique manuel — Calibre maison", en: "Manual mechanical — In-house calibre" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Tissé milanais or jaune 18k", en: "18k yellow gold Milanese mesh" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: { fr: "22 mm / intégré", en: "22 mm / integrated" } },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Aucun — pièce unique disponible", en: "None — one piece available" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "1 an — maison 2121", en: "1 year — 2121 maison" } },
    ],
  },
  {
    slug: "cartier-tortue",
    brand: "Cartier",
    model: "Tortue",
    reference: { fr: "Tortue — Or jaune 18k, Alligator vert", en: "Tortue — 18k yellow gold, Green alligator" },
    year: { fr: "Vintage", en: "Vintage" },
    condition: { fr: "Excellent", en: "Excellent" },
    price: "6 800 €",
    image: "/montre/verte/1.jpg",
    images: [
      "/montre/verte/1.jpg",
      "/montre/verte/2.jpg",
    ],
    intro: {
      fr: "La Cartier Tortue, pièce sculpturale née en 1912, dessinée par Louis Cartier. Boîtier en or jaune 18k, cadran argenté à chiffres romains, bracelet alligator vert. Une icône intemporelle.",
      en: "The Cartier Tortue, a sculptural piece born in 1912 and designed by Louis Cartier. 18k yellow gold case, silvered dial with Roman numerals, green alligator strap. A timeless icon.",
    },
    description: {
      fr: "Dessinée par Louis Cartier en 1912, la Tortue est une silhouette d'horlogerie absolue : un boîtier tonneau adouci, des cornes courtes, un cabochon de saphir bleu en couronne. Cet exemplaire en or jaune 18k arbore un cadran argenté aux chiffres romains profilés et aux aiguilles glaive bleuies à la flamme, signature de la maison. Le bracelet en alligator vert profond accompagne la pièce avec une rare élégance. Mouvement quartz manufacture, mention Cartier Paris Swiss Made 18k gravée au dos. Numéro de série 810870142. Sourcée auprès d'une collection privée européenne.",
      en: "Designed by Louis Cartier in 1912, the Tortue is an absolute horological silhouette: a softened tonneau case, short lugs, a blue sapphire cabochon set into the crown. This example in 18k yellow gold carries a silvered dial with profiled Roman numerals and flame-blued sword hands, a maison signature. The deep-green alligator strap accompanies the piece with rare elegance. In-house quartz movement, Cartier Paris Swiss Made 18k engraved on the caseback. Serial number 810870142. Sourced from a European private collection.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Cartier" },
      { key: { fr: "Année", en: "Year" }, value: { fr: "Vintage", en: "Vintage" } },
      { key: { fr: "Référence", en: "Reference" }, value: "Tortue" },
      { key: { fr: "Numéro de série", en: "Serial" }, value: "810870142" },
      { key: { fr: "Matière", en: "Material" }, value: { fr: "Or jaune 18k", en: "18k yellow gold" } },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Quartz manufacture Cartier", en: "Cartier in-house quartz" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Alligator vert, boucle ardillon or 18k", en: "Green alligator, 18k gold pin buckle" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: "26 mm / 14 mm" },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Aucun", en: "None" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "1 an — maison 2121", en: "1 year — 2121 maison" } },
    ],
  },
];

export function getWatch(slug: string): Watch | undefined {
  return watches.find((w) => w.slug === slug);
}

export function buildWhatsAppLink(watch: Watch) {
  // Kept for backward compatibility — components now build the link via i18n.
  const message = `Bonjour 2121, je suis intéressé par la ${watch.brand} ${watch.model}. Pourriez-vous me communiquer plus d'informations ?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
