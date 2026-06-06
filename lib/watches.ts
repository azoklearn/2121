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
  papers?: boolean; // box & papers indicator (default true)
  sold?: boolean;   // marks piece as sold (shown with badge, still visible)
  video?: string;   // optional video URL for the detail page gallery
  contactOnly?: boolean; // hides price, shows "more info on request"
};

export const WHATSAPP_NUMBER = "33638768692";

export const watches: Watch[] = [
  {
    slug: "rolex-submariner-14060m",
    brand: "Rolex",
    model: "Submariner No Date",
    reference: { fr: "Submariner 14060M — Two Lines", en: "Submariner 14060M — Two Lines" },
    year: "2001",
    condition: { fr: "Excellent", en: "Excellent" },
    price: "9 680 €",
    image: "/montre/rolex/WhatsApp%20Image%202026-06-02%20at%2009.39.11.jpeg",
    images: [
      "/montre/rolex/WhatsApp%20Image%202026-06-02%20at%2009.39.11.jpeg",
      "/montre/rolex/port%C3%A9.jpeg",
      "/montre/rolex/sd.jpeg",
      "/montre/rolex/box.jpeg",
    ],
    intro: {
      fr: "Nous apprécions cette Submariner pour son état proche du neuf, son set complet et sa configuration particulièrement recherchée des collectionneurs. Cette série K de 2001 réunit plusieurs attributs emblématiques des premières 14060M, avec son cadran « Two Lines » et ses cornes percées.",
      en: "We value this Submariner for its near-mint condition, complete set and its particularly sought-after configuration among collectors. This 2001 K-series brings together several emblematic attributes of the early 14060M, with its Two Lines dial and drilled lugs.",
    },
    description: {
      fr: "Considérée comme la dernière Submariner aux proportions fines et discrètes avant l'évolution vers des générations plus imposantes, elle incarne l'équilibre parfait entre le charme des références vintage et la fiabilité des Rolex modernes. Une icône néo-vintage robuste, polyvalente et intemporelle.",
      en: "Regarded as the last Submariner with slim, discreet proportions before the evolution towards larger generations, it embodies the perfect balance between the charm of vintage references and the reliability of modern Rolex. A robust, versatile and timeless neo-vintage icon.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Rolex" },
      { key: { fr: "Modèle", en: "Model" }, value: { fr: "Submariner No Date", en: "Submariner No Date" } },
      { key: { fr: "Référence", en: "Reference" }, value: "14060M" },
      { key: { fr: "Année", en: "Year" }, value: { fr: "2001 (série K)", en: "2001 (K-series)" } },
      { key: { fr: "Boîtier", en: "Case" }, value: { fr: "Acier inoxydable", en: "Stainless steel" } },
      { key: { fr: "Diamètre", en: "Diameter" }, value: "40 mm" },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Rolex calibre 3130, automatique", en: "Rolex calibre 3130, automatic" } },
      { key: { fr: "Cadran", en: "Dial" }, value: { fr: "Noir « Two Lines »", en: "Black \"Two Lines\"" } },
      { key: { fr: "Verre", en: "Crystal" }, value: { fr: "Saphir", en: "Sapphire" } },
      { key: { fr: "Lunette", en: "Bezel" }, value: { fr: "Aluminium noire, unidirectionnelle", en: "Black aluminium, unidirectional" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Oyster 93150, end-links 501B", en: "Oyster 93150, end-links 501B" } },
      { key: { fr: "Particularités", en: "Features" }, value: { fr: "Cornes percées (drilled lugs)", en: "Drilled lugs" } },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Full set", en: "Full set" } },
      { key: { fr: "Révision", en: "Service" }, value: { fr: "Rolex Service Center — 2021", en: "Rolex Service Center — 2021" } },
      { key: { fr: "État", en: "Condition" }, value: { fr: "Excellent, proche du neuf", en: "Excellent, near mint" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "1 an · maison 2121", en: "1 year · 2121 maison" } },
    ],
  },
  {
    slug: "audemars-piguet-royal-oak",
    brand: "Audemars Piguet",
    model: "Royal Oak",
    reference: "Royal Oak 56175SP",
    year: "1998",
    condition: { fr: "Excellent", en: "Excellent" },
    price: "17 800 €",
    image: "/montre/ap/WhatsApp%20Image%202026-06-02%20at%2010.08.57.jpeg",
    images: [
      "/montre/ap/WhatsApp%20Image%202026-06-02%20at%2010.08.57.jpeg",
      "/montre/ap/WhatsApp%20Image%202026-06-02%20at%2010.05.25.jpeg",
      "/montre/ap/WhatsApp%20Image%202026-06-02%20at%2010.05.37.jpeg",
      "/montre/ap/WhatsApp%20Image%202026-06-02%20at%2010.10.42.jpeg",
    ],
    intro: {
      fr: "Avec ses proportions équilibrées, son profil ultra-plat et son association d'acier et de platine, la référence 56175SP occupe une place à part dans la collection Royal Oak. Son cadran noir à chiffres romains apporte une touche d'élégance au dessin de Gérald Genta, tandis que son format de 33 mm lui confère une présence discrète au poignet.",
      en: "With its balanced proportions, ultra-flat profile and combination of steel and platinum, the 56175SP holds a special place in the Royal Oak collection. Its black dial with Roman numerals adds elegance to Gérald Genta's design, while its 33 mm format lends a discreet presence on the wrist.",
    },
    description: {
      fr: "Une référence caractéristique des productions Audemars Piguet de la fin des années 1990.",
      en: "A reference characteristic of Audemars Piguet production from the late 1990s.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Audemars Piguet" },
      { key: { fr: "Modèle", en: "Model" }, value: "Royal Oak" },
      { key: { fr: "Référence", en: "Reference" }, value: "56175SP" },
      { key: { fr: "Année", en: "Year" }, value: "1998" },
      { key: { fr: "Boîtier", en: "Case" }, value: { fr: "Acier inoxydable", en: "Stainless steel" } },
      { key: { fr: "Lunette", en: "Bezel" }, value: { fr: "Platine massif", en: "Solid platinum" } },
      { key: { fr: "Diamètre", en: "Diameter" }, value: "33 mm" },
      { key: { fr: "Épaisseur", en: "Thickness" }, value: "6 mm" },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Audemars Piguet calibre 2612, quartz", en: "Audemars Piguet calibre 2612, quartz" } },
      { key: { fr: "Cadran", en: "Dial" }, value: { fr: "Noir à chiffres romains", en: "Black with Roman numerals" } },
      { key: { fr: "Verre", en: "Crystal" }, value: { fr: "Saphir", en: "Sapphire" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Royal Oak intégré en acier", en: "Integrated Royal Oak steel bracelet" } },
      { key: { fr: "Fermoir", en: "Clasp" }, value: { fr: "Double boucle déployante Audemars Piguet", en: "Audemars Piguet double deployant clasp" } },
      { key: { fr: "Étanchéité", en: "Water resistance" }, value: "50 m" },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Extrait d'archives AP + boîtier de voyage AP", en: "AP archive extract + AP travel case" } },
      { key: { fr: "État", en: "Condition" }, value: { fr: "Excellent état", en: "Excellent condition" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "1 an · maison 2121", en: "1 year · 2121 maison" } },
    ],
  },
  {
    slug: "breguet-marine-3400ba",
    brand: "Breguet",
    model: "Marine",
    reference: "Marine 3400BA",
    year: { fr: "Circa 2000", en: "Circa 2000" },
    condition: { fr: "Excellent", en: "Excellent" },
    price: "8 200 €",
    image: "/montre/breguet/first.jpeg",
    images: [
      "/montre/breguet/first.jpeg",
      "/montre/breguet/de.jpeg",
      "/montre/breguet/dezs.jpeg",
      "/montre/breguet/ze.jpeg",
      "/montre/breguet/WhatsApp%20Image%202026-06-02%20at%2010.54.01.jpeg",
    ],
    intro: {
      fr: "Issue de la première génération de la collection Marine, la référence 3400BA associe les codes traditionnels de Breguet à un boîtier sport-chic de 36 mm en or jaune. Son cadran argenté guilloché à la main, ses aiguilles Breguet bleuies et son calibre automatique Breguet 517GG, dérivé du Jaeger-LeCoultre 889/2, en font l'une des références emblématiques de cette période de production.",
      en: "From the first generation of the Marine collection, the 3400BA reference combines Breguet's traditional codes with a sport-chic 36 mm yellow gold case. Its hand-guilloché silvered dial, blued Breguet hands and Breguet 517GG automatic calibre — derived from the Jaeger-LeCoultre 889/2 — make it one of the emblematic references of this production period.",
    },
    description: {
      fr: "Présentée en excellente condition, cette montre est accompagnée d'un bracelet neuf en crocodile Breguet et de sa boucle déployante Breguet en or jaune.",
      en: "Presented in excellent condition, this watch comes with a new Breguet crocodile strap and its Breguet yellow gold deployant clasp.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Breguet" },
      { key: { fr: "Modèle", en: "Model" }, value: "Marine" },
      { key: { fr: "Référence", en: "Reference" }, value: "3400BA" },
      { key: { fr: "Circa", en: "Circa" }, value: "2000" },
      { key: { fr: "Boîtier", en: "Case" }, value: { fr: "Or jaune 18k", en: "18k yellow gold" } },
      { key: { fr: "Diamètre", en: "Diameter" }, value: "36 mm" },
      { key: { fr: "Cadran", en: "Dial" }, value: { fr: "Argenté guilloché à la main", en: "Hand-guilloché silvered" } },
      { key: { fr: "Fonctions", en: "Functions" }, value: { fr: "Heures, minutes, secondes, date", en: "Hours, minutes, seconds, date" } },
      { key: { fr: "Calibre", en: "Calibre" }, value: "Breguet 517GG" },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Automatique", en: "Automatic" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Crocodile Breguet (neuf)", en: "Breguet crocodile (new)" } },
      { key: { fr: "Boucle", en: "Clasp" }, value: { fr: "Déployante Breguet en or jaune", en: "Breguet yellow gold deployant" } },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Aucun", en: "None" } },
      { key: { fr: "État", en: "Condition" }, value: { fr: "Excellent", en: "Excellent" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "6 mois · maison 2121", en: "6 months · 2121 maison" } },
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
    model: "Quantième Perpétuel",
    reference: { fr: "Quantième Perpétuel 5140R-011", en: "Perpetual Calendar 5140R-011" },
    year: "2017",
    condition: { fr: "Excellent", en: "Excellent" },
    price: "52 000 €",
    image: "/montre/patek/1.jpg",
    images: [
      "/montre/patek/1.jpg",
      "/montre/patek/2.jpg",
      "/montre/patek/3.jpg",
    ],
    intro: {
      fr: "Aujourd'hui arrêtée, la référence 5140R compte parmi les quantièmes perpétuels les plus élégants de Patek Philippe. Son boîtier extra-plat de 37,2 mm en or rose abrite le calibre manufacture 240 Q à micro-rotor, reconnu pour sa finesse et son architecture raffinée.",
      en: "Now discontinued, the 5140R reference ranks among the most elegant perpetual calendars from Patek Philippe. Its extra-slim 37.2 mm rose gold case houses the in-house calibre 240 Q with micro-rotor, renowned for its refinement and sophisticated architecture.",
    },
    description: {
      fr: "Cette montre est accompagnée de sa boîte remontoir Patek Philippe, de son bracelet crocodile Patek Philippe et de sa boucle déployante en or rose.",
      en: "This watch comes with its Patek Philippe winding box, its Patek Philippe crocodile strap and its rose gold deployant clasp.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Patek Philippe" },
      { key: { fr: "Année", en: "Year" }, value: "2017" },
      { key: { fr: "Référence", en: "Reference" }, value: "5140R-001" },
      { key: { fr: "Matière", en: "Material" }, value: { fr: "Or rose 18k", en: "18k rose gold" } },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Automatique manufacture — Calibre 240 Q", en: "In-house automatic — Calibre 240 Q" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Crocodile brun Patek Philippe, boucle déployante or rose", en: "Brown Patek Philippe crocodile, rose gold deployant clasp" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: "37,2 mm / 20 mm" },
      { key: { fr: "Étanchéité", en: "Water resistance" }, value: "30 m" },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Boîte remontoir Patek Philippe", en: "Patek Philippe winding box" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "6 mois · maison 2121", en: "6 months · 2121 maison" } },
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
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "1 an · maison 2121", en: "1 year · 2121 maison" } },
    ],
  },
  {
    slug: "cartier-tortue",
    brand: "Cartier",
    model: "Mini Tortue",
    reference: { fr: "Mini Tortue — Or jaune 18k", en: "Mini Tortue — 18k yellow gold" },
    year: { fr: "Vintage", en: "Vintage" },
    condition: { fr: "Très bon", en: "Very good" },
    price: "4 800 €",
    image: "/montre/verte/1.jpg",
    images: [
      "/montre/verte/1.jpg",
      "/montre/verte/2.jpg",
    ],
    intro: {
      fr: "Véritable icône de la maison Cartier, la Mini Tortue se distingue par son boîtier en forme de tortue, une silhouette élégante et intemporelle qui compte parmi les créations les plus emblématiques de la marque.",
      en: "A true icon of the Cartier maison, the Mini Tortue stands out with its distinctive tortue-shaped case — an elegant and timeless silhouette among the brand's most emblematic creations.",
    },
    description: {
      fr: "Réalisée en or jaune 18 carats, cette version de 24 mm est animée par un mouvement à quartz et montée sur un bracelet en cuir avec boucle Cartier. Une montre discrète et raffinée, idéale pour les amateurs de montres de forme et du style intemporel propre à Cartier.",
      en: "Crafted in 18-carat yellow gold, this 24 mm version is powered by a quartz movement and fitted with a leather strap with Cartier buckle. A discreet and refined watch, ideal for connoisseurs of shaped watches and the timeless style that defines Cartier.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Cartier" },
      { key: { fr: "Matière", en: "Material" }, value: { fr: "Or jaune 18 carats", en: "18-carat yellow gold" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: "24 mm" },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Quartz", en: "Quartz" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Cuir", en: "Leather" } },
      { key: { fr: "Boucle", en: "Buckle" }, value: { fr: "Boucle ardillon Cartier or jaune 18 carats", en: "Cartier 18-carat yellow gold pin buckle" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "6 mois · maison 2121", en: "6 months · 2121 maison" } },
    ],
  },
  {
    slug: "rolex-day-date-1803",
    brand: "Rolex",
    model: "Day-Date",
    reference: "Day-Date 1803",
    year: "1973",
    condition: { fr: "Excellent", en: "Excellent" },
    price: "11 700 €",
    contactOnly: true,
    image: "/montre/roro/ds.jpeg",
    images: [
      "/montre/roro/ds.jpeg",
      "/montre/roro/WhatsApp%20Image%202026-06-02%20at%2010.29.36.jpeg",
    ],
    video: "/montre/roro/videororo.mp4",
    intro: {
      fr: "Produite en 1973, cette Rolex Day-Date référence 1803 est réalisée en or blanc 18 carats. Elle présente un cadran argenté d'origine avec aiguilles assorties. Son boîtier a conservé des proportions particulièrement généreuses et sa lunette cannelée d'origine reste bien définie. L'ensemble est présenté en excellente condition.",
      en: "Produced in 1973, this Rolex Day-Date reference 1803 is crafted in 18-carat white gold. It features an original silvered dial with matching hands. The case has retained particularly generous proportions and its original fluted bezel remains well-defined. The whole is presented in excellent condition.",
    },
    description: {
      fr: "La montre est montée sur un bracelet neuf en crocodile bleu marine et équipée d'une boucle ardillon Rolex en acier.",
      en: "The watch is fitted with a new navy blue crocodile strap and a Rolex steel pin buckle.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Rolex" },
      { key: { fr: "Modèle", en: "Model" }, value: "Day-Date" },
      { key: { fr: "Référence", en: "Reference" }, value: "1803" },
      { key: { fr: "Numéro de série", en: "Serial" }, value: "363XXXX" },
      { key: { fr: "Année", en: "Year" }, value: "1973" },
      { key: { fr: "Boîtier", en: "Case" }, value: { fr: "Or blanc 18k", en: "18k white gold" } },
      { key: { fr: "Diamètre", en: "Diameter" }, value: "36 mm" },
      { key: { fr: "Lunette", en: "Bezel" }, value: { fr: "Cannelée en or blanc", en: "Fluted white gold" } },
      { key: { fr: "Cadran", en: "Dial" }, value: { fr: "Argenté d'origine", en: "Original silvered" } },
      { key: { fr: "Aiguilles", en: "Hands" }, value: { fr: "Assorties au cadran", en: "Matching dial" } },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Automatique", en: "Automatic" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Crocodile bleu marine (neuf)", en: "Navy blue crocodile (new)" } },
      { key: { fr: "Boucle", en: "Buckle" }, value: { fr: "Ardillon Rolex en acier", en: "Rolex steel pin buckle" } },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Aucun", en: "None" } },
      { key: { fr: "État", en: "Condition" }, value: { fr: "Excellent", en: "Excellent" } },
      { key: { fr: "Garantie", en: "Warranty" }, value: { fr: "6 mois · maison 2121", en: "6 months · 2121 maison" } },
    ],
  },
  {
    slug: "patek-philippe-golden-ellipse-5028g",
    brand: "Patek Philippe",
    model: "Golden Ellipse",
    reference: "Golden Ellipse 5028G",
    year: "2002",
    condition: { fr: "Excellent", en: "Excellent" },
    price: "Vendue",
    sold: true,
    image: "/montre/patek2/WhatsApp%20Image%202026-06-02%20at%2010.20.55.jpeg",
    images: [
      "/montre/patek2/WhatsApp%20Image%202026-06-02%20at%2010.20.55.jpeg",
      "/montre/patek2/d.jpeg",
    ],
    intro: {
      fr: "Avec son cadran noir à chiffres arabes et sa petite seconde, la référence 5028G se distingue nettement des Golden Ellipse traditionnelles. Produite à moins de 500 exemplaires selon les estimations communément admises par les collectionneurs, elle associe l'élégance intemporelle du boîtier Ellipse au calibre automatique 240 à micro-rotor, l'un des mouvements les plus emblématiques de Patek Philippe.",
      en: "With its black dial with Arabic numerals and small seconds, the 5028G stands clearly apart from traditional Golden Ellipses. Produced in fewer than 500 examples according to estimates widely accepted among collectors, it pairs the timeless elegance of the Ellipse case with the automatic calibre 240 micro-rotor, one of Patek Philippe's most iconic movements.",
    },
    description: {
      fr: "Une référence confidentielle et recherchée, appréciée pour son esthétique singulière au sein de la collection Golden Ellipse.",
      en: "A discreet and sought-after reference, valued for its singular aesthetic within the Golden Ellipse collection.",
    },
    specs: [
      { key: { fr: "Marque", en: "Brand" }, value: "Patek Philippe" },
      { key: { fr: "Modèle", en: "Model" }, value: "Golden Ellipse" },
      { key: { fr: "Référence", en: "Reference" }, value: "5028G" },
      { key: { fr: "Année", en: "Year" }, value: "2002" },
      { key: { fr: "Boîtier", en: "Case" }, value: { fr: "Or gris 18k", en: "18k white gold" } },
      { key: { fr: "Dimensions", en: "Dimensions" }, value: "31 × 35 mm" },
      { key: { fr: "Mouvement", en: "Movement" }, value: { fr: "Patek Philippe calibre 240 PS, automatique à micro-rotor", en: "Patek Philippe calibre 240 PS, automatic micro-rotor" } },
      { key: { fr: "Fonctions", en: "Functions" }, value: { fr: "Heures, minutes, petite seconde", en: "Hours, minutes, small seconds" } },
      { key: { fr: "Cadran", en: "Dial" }, value: { fr: "Noir à chiffres arabes blancs", en: "Black with white Arabic numerals" } },
      { key: { fr: "Verre", en: "Crystal" }, value: { fr: "Saphir", en: "Sapphire" } },
      { key: { fr: "Bracelet", en: "Bracelet" }, value: { fr: "Cuir", en: "Leather" } },
      { key: { fr: "Boucle", en: "Buckle" }, value: { fr: "Patek Philippe en or gris 18k", en: "Patek Philippe in 18k white gold" } },
      { key: { fr: "Accessoires", en: "Accessories" }, value: { fr: "Extrait d'archives Patek Philippe", en: "Patek Philippe archive extract" } },
      { key: { fr: "État", en: "Condition" }, value: { fr: "Excellent état", en: "Excellent condition" } },
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
