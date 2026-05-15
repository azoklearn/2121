export type Watch = {
  slug: string;
  brand: string;
  model: string;
  reference: string;
  year: string;
  condition: string;
  price: string;
  image: string;       // card thumbnail (1st image)
  images: string[];    // all images for detail page gallery
  description: string;
  intro: string;
  specs: Record<string, string>;
};

export const WHATSAPP_NUMBER = "33621212121";

export const watches: Watch[] = [
  {
    slug: "rolex-submariner-14060m",
    brand: "Rolex",
    model: "Submariner",
    reference: "14060M — Two-liner",
    year: "Transition era",
    condition: "Excellent",
    price: "11 500 €",
    image: "/montre/rolex/1.jpg",
    images: [
      "/montre/rolex/1.jpg",
      "/montre/rolex/PHOTO-2026-05-13-12-38-40%20(1).jpg",
      "/montre/rolex/PHOTO-2026-05-13-12-38-40%20(2).jpg",
      "/montre/rolex/PHOTO-2026-05-13-12-38-40%20(5).jpg",
      "/montre/rolex/5.jpg",
    ],
    intro:
      "La référence de transition entre l'esthétique classique des premiers Submariner sans date et la modernité des modèles plus récents.",
    description:
      "Cette 14060M deux lignes incarne un moment charnière de l'histoire Rolex : la fin des cadrans peints au tritium, le passage au Super-LumiNova, et l'introduction du calibre 3130. Une montre de plongée pure, sans date, fidèle à l'esprit originel du Submariner — sobre, lisible, intemporelle. Sourcée auprès d'un collectionneur privé, en parfait état d'origine.",
    specs: {
      Marque: "Rolex",
      Année: "2002",
      Référence: "14060M",
      "Numéro de série": "F87xxxxx",
      Matière: "Acier 904L",
      Mouvement: "Automatique — Calibre 3130",
      Bracelet: "Oyster acier, fermoir Oysterclasp",
      Dimensions: "40 mm / 20 mm",
      Accessoires: "Disponibles sur demande",
      Garantie: "1 an — maison 2121",
    },
  },
  {
    slug: "audemars-piguet-royal-oak",
    brand: "Audemars Piguet",
    model: "Royal Oak",
    reference: "56175SP — 33 mm",
    year: "Vintage",
    condition: "Excellent",
    price: "22 800 €",
    image: "/montre/ap/PHOTO-2026-05-13-12-38-39%20(3).jpg",
    images: [
      "/montre/ap/PHOTO-2026-05-13-12-38-39%20(3).jpg",
      "/montre/ap/PHOTO-2026-05-13-12-38-39%20(4).jpg",
      "/montre/ap/PHOTO-2026-05-13-12-38-40%202.jpg",
    ],
    intro:
      "Royal Oak référence 56175SP, 33 mm. Lunette platine, boîtier acier, cadran noir. Une icône dans son format mid-size.",
    description:
      "Dessinée par Gérald Genta, la Royal Oak n'a jamais cessé d'être désirable. Cette 56175SP combine la lunette octogonale en platine avec un boîtier en acier — bi-matière subtile, raffinement absolu. Cadran noir épuré, mouvement quartz d'une précision implacable. Une pièce vintage en condition remarquable, prête pour un nouveau collectionneur.",
    specs: {
      Marque: "Audemars Piguet",
      Année: "1985",
      Référence: "56175SP",
      "Numéro de série": "B-4xxxx",
      Matière: "Acier inoxydable / Lunette platine 950",
      Mouvement: "Quartz haute précision",
      Bracelet: "Acier intégré AP, fermoir déployant",
      Dimensions: "33 mm / 17 mm",
      Accessoires: "Aucun",
      Garantie: "1 an — maison 2121",
    },
  },
  {
    slug: "breguet-classique",
    brand: "Breguet",
    model: "Classique",
    reference: "Or rose — Manufacture",
    year: "Contemporain",
    condition: "Excellent",
    price: "19 400 €",
    image: "/montre/breguet/1.jpg",
    images: [
      "/montre/breguet/1.jpg",
      "/montre/breguet/PHOTO-2026-05-13-12-38-39.jpg",
      "/montre/breguet/PHOTO-2026-05-13-12-38-39%20(1).jpg",
      "/montre/breguet/PHOTO-2026-05-13-12-38-39%20(2).jpg",
      "/montre/breguet/PHOTO-2026-05-13-12-38-40%20(9).jpg",
    ],
    intro:
      "Une Breguet Classique en or rose, cadran guilloché argenté. L'horlogerie à son état le plus pur — dépouillée, souveraine.",
    description:
      "Depuis 1775, Breguet incarne l'idée même du raffinement horloger. Cette Classique en or rose perpétue la tradition des cadrans guillochés à la main, des aiguilles en pomme creuses et des chiffres arabes gravés. Le mouvement ultra-plat, visible au travers du fond saphir, témoigne d'un savoir-faire irréductible. Pour le collectionneur qui sait que le vrai luxe est invisible.",
    specs: {
      Marque: "Breguet",
      Année: "2018",
      Référence: "Classique 5177BR",
      "Numéro de série": "55xxxxx",
      Matière: "Or rose 18k",
      Mouvement: "Automatique manufacture — Calibre 777Q",
      Bracelet: "Alligator brun, boucle ardillon or rose",
      Dimensions: "38 mm / 20 mm",
      Accessoires: "Boîte et papiers Breguet",
      Garantie: "Internationale Breguet — 2 ans restants",
    },
  },
  {
    slug: "patek-philippe-calatrava",
    brand: "Patek Philippe",
    model: "Calatrava",
    reference: "5196 — Or blanc",
    year: "Contemporain",
    condition: "Très bon",
    price: "26 500 €",
    image: "/montre/patek/1.jpg",
    images: [
      "/montre/patek/1.jpg",
      "/montre/patek/2.jpg",
      "/montre/patek/3.jpg",
    ],
    intro:
      "La Calatrava 5196 en or blanc — l'archétype de la montre habillée selon Patek Philippe. Rien de superflu. Tout de précis.",
    description:
      "Il n'existe pas de montre plus épurée qu'une Calatrava. La 5196 en or blanc trace une ligne directe jusqu'à la 96 de 1932 : cadran nacré blanc, index bâtons, aiguilles dauphine. Le calibre 215 PS, manufacture, tient 44 heures de réserve dans un boîtier de 37 mm d'une finesse absolue. Portée, elle disparaît sous la manchette — c'est précisément là sa grandeur.",
    specs: {
      Marque: "Patek Philippe",
      Année: "2015",
      Référence: "5196G-001",
      "Numéro de série": "60xxxxx",
      Matière: "Or blanc 18k",
      Mouvement: "Manuel manufacture — Calibre 215 PS",
      Bracelet: "Alligator noir, boucle ardillon or blanc",
      Dimensions: "37 mm / 19 mm",
      Accessoires: "Full set — boîte, papiers, archives",
      Garantie: "Patek Philippe — extension disponible",
    },
  },
  {
    slug: "vacheron-constantin-malachite-1970s",
    brand: "Vacheron Constantin",
    model: "Malachite 18k",
    reference: "Or jaune — 1970s",
    year: "Vintage 1970s",
    condition: "Rare Dial",
    price: "17 200 €",
    image: "/montre/vacheron/1.jpg",
    images: [
      "/montre/vacheron/1.jpg",
      "/montre/vacheron/2.jpg",
    ],
    intro:
      "Une Vacheron Constantin des années 1970, or jaune 18k, cadran en malachite naturelle. Pièce rare, presque introuvable.",
    description:
      "Le summum de l'horlogerie genevoise rencontre la pierre semi-précieuse. Cette Vacheron Constantin vintage présente un cadran taillé dans la malachite — minéral aux veines vertes profondes, chaque pièce unique par nature. Le bracelet milanais en or jaune 18k déploie une texture tissée d'une finesse rare, signature des années 70. Pour le collectionneur qui cherche autre chose qu'une montre : une œuvre.",
    specs: {
      Marque: "Vacheron Constantin",
      Année: "1973",
      Référence: "Cadran malachite",
      "Numéro de série": "47xxxxx",
      Matière: "Or jaune 18k",
      Mouvement: "Mécanique manuel — Calibre maison",
      Bracelet: "Tissé milanais or jaune 18k",
      Dimensions: "22 mm / intégré",
      Accessoires: "Aucun — pièce unique disponible",
      Garantie: "1 an — maison 2121",
    },
  },
  {
    slug: "cartier-tortue",
    brand: "Cartier",
    model: "Tortue",
    reference: "Or jaune 18k — Alligator vert",
    year: "Vintage",
    condition: "Excellent",
    price: "6 800 €",
    image: "/montre/verte/1.jpg",
    images: [
      "/montre/verte/1.jpg",
      "/montre/verte/2.jpg",
    ],
    intro:
      "La Cartier Tortue — pièce sculpturale née en 1912, dessinée par Louis Cartier. Boîtier en or jaune 18k, cadran argenté à chiffres romains, bracelet alligator vert. Une icône intemporelle.",
    description:
      "Dessinée par Louis Cartier en 1912, la Tortue est une silhouette d'horlogerie absolue : un boîtier tonneau adouci, des cornes courtes, un cabochon de saphir bleu en couronne. Cet exemplaire en or jaune 18k arbore un cadran argenté aux chiffres romains profilés et aux aiguilles glaive bleuies à la flamme — signature de la maison. Le bracelet en alligator vert profond accompagne la pièce avec une rare élégance. Mouvement quartz manufacture, mention « Cartier Paris · Swiss Made 18k » gravée au dos. Numéro de série 810870142. Sourcée auprès d'une collection privée européenne.",
    specs: {
      Marque: "Cartier",
      Année: "Vintage",
      Référence: "Tortue",
      "Numéro de série": "810870142",
      Matière: "Or jaune 18k",
      Mouvement: "Quartz manufacture Cartier",
      Bracelet: "Alligator vert, boucle ardillon or 18k",
      Dimensions: "26 mm / 14 mm",
      Accessoires: "Aucun",
      Garantie: "1 an — maison 2121",
    },
  },
];

export function getWatch(slug: string): Watch | undefined {
  return watches.find((w) => w.slug === slug);
}

export function buildWhatsAppLink(watch: Watch) {
  const message = `Bonjour 2121, je suis intéressé par la ${watch.brand} ${watch.model} (${watch.reference}). Pourriez-vous me communiquer plus d'informations — disponibilité, papiers, photos additionnelles, prix ?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
