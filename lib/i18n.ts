export type Language = "fr" | "en";

export const translations = {
  fr: {
    navbar: {
      searchLabel: "Rechercher une pièce",
      menuLabel: "Ouvrir le menu",
      close: "Fermer",
      links: ["Collection", "Story", "Services", "Rendez-vous"] as string[],
      langSwitch: "EN",
      menuMaison: "· Maison Privée",
      menuLanguage: "— Langue",
      menuParis: "— Paris",
      menuWhatsApp: "— WhatsApp",
      menuInstagram: "— Instagram",
      menuCoords: "— Coordonnées",
    },
    search: {
      header: "— Rechercher une pièce",
      close: "Fermer ⤬",
      placeholder: "Rolex, Daytona, 14060M, Vacheron…",
      pieces: "pièces",
      piece: "pièce",
      empty: "Aucune pièce ne correspond. Réessayez avec une autre référence.",
      footer: "↵ Sélectionner — esc Fermer",
      inventory: "Inventaire confidentiel, mis à jour chaque semaine",
    },
    hero: {
      eyebrow: "— Maison Privée · Paris",
      titlePre: "Maison parisienne spécialisée dans les",
      titleItalic: "montres de collection",
      titlePost: ".",
      description:
        "Spécialistes en horlogerie de collection. Chaque pièce de notre collection est soigneusement sourcée auprès de collectionneurs européens, expertisée puis confiée, dans la plus grande discrétion.",
      cta: "Découvrir la collection",
    },
    collection: {
      badge: "Collection",
      updated: "Mise à jour chaque semaine",
      title: "Nos montres",
      titleItalic: "",
      subtitle:
        "Chaque pièce est sourcée avec soin à travers notre réseau. Nous apportons une attention particulière aux demandes de nos clients pour leur délivrer la pièce qui leur correspond.",
      hoverView: "— Voir la pièce",
      ctaTitle: "Une pièce vous intéresse ?",
      ctaSubtitle: "Discutons-en. Réponse sous 24 heures.",
      ctaButton: "Contacter sur WhatsApp",
      ctaNote: "Réponse < 24 HR",
    },
    watch: {
      back: "Retour à la collection",
      pieceOf: "Pièce",
      year: "Année",
      condition: "État",
      price: "Prix",
      contactLabel: "Contacter sur WhatsApp",
      discuss: "Discutons de cette pièce",
      emailLabel: "Écrire par email",
      emailDiscuss: "yb@2121collection.com",
      disclaimer:
        "Messages pré-remplis. Réponse sous 24h.",
      photo: "Photographiée à l'atelier · 3 avenue de Bouvines",
      onePiece: "une pièce",
      wordOfHouse: "Le mot de la maison",
      specs: "Spécifications",
      others: "Autres pièces",
      continueVisit: "Poursuivre la",
      visitItalic: "visite",
      allPieces: "Toutes les pièces",
      lightboxClose: "Fermer",
      lightboxHint: "Scroll ou pincer pour zoomer · Cliquer pour fermer",
      swipeHint: "← Glisser →",
    },
    manifesto: {
      badge: "— Une lettre depuis Paris",
      headerRight: "Maison Privée · Depuis MMXXI",
      h2Pre: "Haute horlogerie",
      h2Italic1: "moderne",
      h2Mid: "&",
      h2Post: "",
      h2Italic2: "néo-vintage",
      h2End: ", depuis Paris.",
      para1:
        "Fondée à Paris, 2121Collection est une maison spécialisée en haute horlogerie moderne et néo-vintage. Chaque pièce est choisie avec soin pour sa référence, son authenticité et sa condition. Nous accompagnons nos clients dans l'acquisition de montres rares et d'exception, avec la précision et l'engagement que ces pièces exigent.",
      para2: "",
      statFounded: "— Fondée",
      statFoundedValue: "MMXXI",
      statSourced: "— Pièces sourcées",
      statSourcedValue: "421+",
      statCollectors: "— Collectionneurs",
      statCollectorsValue: "Mondial",
      signature: "2121, Paris — Maison Privée",
    },
    services: {
      badge: "— Services & Expérience",
      headerRight: "Sur mesure · Confidentiel",
      titlePre: "Une approche",
      titleItalic: "discrète",
      titlePost: ", de bout en bout.",
      items: [
        {
          id: "01",
          title: "Sourcing & Recherche Privée",
          description:
            "Confiez-nous votre recherche. Nous localisons la pièce que vous cherchez au sein de réseaux privés de collectionneurs.",
          detail: "Réseau Mondial",
        },
        {
          id: "02",
          title: "Authenticité Garantie",
          description:
            "Toutes nos pièces sont inspectées par notre horloger et couvertes par une garantie de 90 jours. Les montres révisées bénéficient d'une garantie mécanique d'un an.\n\nLes interventions sont effectuées exclusivement avec des composants d'origine. La garantie ne couvre pas les dommages liés à l'usage. Pour les pièces vintage, étanchéité et précision de marche sont garanties uniquement sur les montres ayant fait l'objet d'un service complet.",
          detail: "",
        },
        {
          id: "03",
          title: "Livraison Internationale",
          description:
            "Les pièces sont expédiées via DHL Express ou FedEx Express, soigneusement emballées et intégralement assurées.\n\nÀ réception, merci d'ouvrir le colis en présence du livreur et de signaler immédiatement tout dommage apparent. Sans ce constat, aucune réclamation liée au transport ne pourra être prise en charge.\n\nPour toute expédition hors Union Européenne, la valeur réelle de la pièce est déclarée en douane. Les frais d'importation et taxes locales éventuels restent à la charge du destinataire.",
          detail: "DHL · FedEx Express",
        },
        {
          id: "04",
          title: "Paiement",
          description:
            "Pour votre confort, nous proposons le virement bancaire et le paiement par lien sécurisé. Tout règlement s'effectue en euros.",
          detail: "Virement · Lien sécurisé",
        },
        {
          id: "05",
          title: "Mentions Légales",
          description:
            "2121Collection est édité par 2121 SAS, dont le siège social est situé au 3 avenue de Bouvines, 75011 Paris. SIRET : 942 304 403 00010.\n\nLe directeur de la publication est Monsieur Yann Brosolo.\n\nPour nous contacter : yb@2121collection.com\n\nLe site est hébergé par Vercel.",
          detail: "2121 SAS · Paris",
        },
      ],
    },
    contact: {
      badge: "— Rendez-vous Privé",
      headerRight: "Paris · Mondial",
      h2Pre: "Pour une consultation",
      h2Italic: "privée",
      h2Post: ".",
      description:
        "Nous sommes disponibles sur rendez-vous ou par contact direct. Joignez-nous via le canal de votre choix. Nous répondons sous vingt-quatre heures.",
      channels: [
        {
          label: "WhatsApp",
          value: "+33 (0)6 38 76 86 92",
          link: "https://wa.me/33638768692",
          note: "Réponse < 24h",
        },
        {
          label: "Email",
          value: "yb@2121collection.com",
          link: "mailto:yb@2121collection.com",
          note: "Échange discret",
        },
      ],
      addressLabel: "Adresse",
      addressLines: ["3 avenue de Bouvines", "75011 Paris", "France"],
      hoursLabel: "Horaires",
      hoursLines: [
        "Lundi — Samedi",
        "11h00 — 19h00",
        "Sur rendez-vous uniquement",
      ],
      coordsLabel: "Coordonnées",
      coordsValue: "48,8501° N · 2,4001° E",
      coordsExtra: "— Quartier Nation",
    },
    videoSection: {
      badge: "— Maison en Mouvement",
      headerRight: "Paris · Cinématique",
      signature: "— Maison 2121",
      scrollHint: "Faire défiler",
      pressPlay: "Pressez lecture sur la maison.",
      interlude: "Un Interlude",
      h2Pre: "Le temps,",
      h2Italic: "en mouvement",
      h2End: ".",
      tagline:
        "Derrière chaque pièce, un atelier qui ne s'arrête jamais.\nDerrière chaque transaction, une histoire encore à écrire.",
      cornerCaption: "en mouvement",
    },
    instagram: {
      header: "Depuis l'Atelier",
      badge: "— Instants & Journal",
      follow: "Suivre notre page",
      items: [
        { caption: "Submariner / Transition", place: "Paris" },
        { caption: "Daytona / Sourced", place: "Paris" },
        { caption: "Royal Oak / Acier", place: "Atelier" },
        { caption: "Malachite / 18k", place: "Rue Saint-Honoré" },
        { caption: "Cadran 2 lignes", place: "Atelier" },
        { caption: "126500LN", place: "Vente privée" },
      ],
    },
    footer: {
      maisonLabel: "La Maison",
      maisonText: {
        pre: "Une maison parisienne",
        italic: "indépendante",
        post: " dédiée aux montres de collection, choisies avec exigence.",
      },
      connect: "— Réseaux",
      maison: "— Maison",
      maisonLinks: ["Story", "Collection", "Services", "Rendez-vous"],
      newsletter: "Newsletter",
      newsletterText:
        "Une lettre occasionnelle depuis Paris — nouvelles arrivées, trouvailles vintage, et réflexions discrètes sur l'horlogerie.",
      subscribe: "S'abonner",
      legal: "Mentions Légales",
      privacy: "Confidentialité",
      builtIn: "Bâti en silence à Paris",
    },
    banner: {
      label: "La maison est disponible",
      cta: "Contacter sur WhatsApp",
      phone: "+33 (0)6 38 76 86 92",
      hours: "Paris · Réponse < 24h",
    },
    bottomNav: {
      collection: "Collection",
      maison: "Maison",
      contact: "Contact",
    },
    loader: {
      brand: "Collection 2121",
      loading: "Chargement",
      city: "Paris",
    },
    whatsapp: (brand: string, model: string, ref: string) =>
      `Bonjour 2121, je suis intéressé par la ${brand} ${model} (${ref}). Pourriez-vous me communiquer plus d'informations sur la disponibilité, les papiers et le prix ?`,
    whatsappGeneric:
      "Bonjour 2121, je suis intéressé(e) par une pièce de votre collection. Pourriez-vous me communiquer plus d'informations ?",
    emailSubject: (brand: string, model: string) =>
      `2121 · Demande d'informations · ${brand} ${model}`,
    emailBody: (brand: string, model: string, ref: string) =>
      `Bonjour 2121,\n\nJe vous contacte au sujet de la ${brand} ${model} (${ref}) présentée sur votre site.\n\nPourriez-vous me communiquer la disponibilité actuelle, les papiers et l'historique de provenance, des photos additionnelles si possible, ainsi que les modalités de paiement et de livraison ?\n\nCordialement,`,
  },
  en: {
    navbar: {
      searchLabel: "Search a piece",
      menuLabel: "Open menu",
      close: "Close",
      links: ["Collection", "Story", "Services", "Appointment"] as string[],
      langSwitch: "FR",
      menuMaison: "· Private Maison",
      menuLanguage: "— Language",
      menuParis: "— Paris",
      menuWhatsApp: "— WhatsApp",
      menuInstagram: "— Instagram",
      menuCoords: "— Coordinates",
    },
    search: {
      header: "— Search a piece",
      close: "Close ⤬",
      placeholder: "Rolex, Daytona, 14060M, Vacheron…",
      pieces: "pieces",
      piece: "piece",
      empty: "No watch found. Try another brand, model or reference.",
      footer: "↵ Select — esc Close",
      inventory: "Confidential inventory, updated weekly",
    },
    hero: {
      eyebrow: "— Private Maison · Paris",
      titlePre: "Parisian maison specialising in",
      titleItalic: "collectible watches",
      titlePost: ".",
      description:
        "Specialists in collectible horology. Every piece in our collection is carefully sourced from European collectors, appraised and then entrusted — with the utmost discretion.",
      cta: "Discover the collection",
    },
    collection: {
      badge: "Collection",
      updated: "Updated weekly",
      title: "Our watches",
      titleItalic: "",
      subtitle:
        "Every piece is sourced with care through our network. We pay particular attention to our clients' requests in order to find the piece that truly corresponds to them.",
      hoverView: "— View the piece",
      ctaTitle: "A piece caught your eye?",
      ctaSubtitle: "Let's talk. We reply within 24 hours.",
      ctaButton: "Reach us on WhatsApp",
      ctaNote: "Reply < 24 HR",
    },
    watch: {
      back: "Back to collection",
      pieceOf: "Piece",
      year: "Year",
      condition: "Condition",
      price: "Price",
      contactLabel: "Contact on WhatsApp",
      discuss: "Let's discuss this piece",
      emailLabel: "Write by email",
      emailDiscuss: "yb@2121collection.com",
      disclaimer:
        "Pre-filled messages — reply within 24h. Discretion guaranteed.",
      photo: "Photographed at the workshop · 3 avenue de Bouvines",
      onePiece: "one piece",
      wordOfHouse: "From the house",
      specs: "Specifications",
      others: "Other pieces",
      continueVisit: "Continue the",
      visitItalic: "visit",
      allPieces: "All pieces",
      lightboxClose: "Close",
      lightboxHint: "Scroll or pinch to zoom · Click to close",
      swipeHint: "← Swipe →",
    },
    manifesto: {
      badge: "— A Letter from Paris",
      headerRight: "Private Maison · Since MMXXI",
      h2Pre: "Fine watchmaking,",
      h2Italic1: "modern",
      h2Mid: "&",
      h2Post: "",
      h2Italic2: "neo-vintage",
      h2End: ", from Paris.",
      para1:
        "Founded in Paris, 2121Collection is a maison specialising in modern and neo-vintage fine watchmaking. Each piece is carefully selected for its reference, authenticity and condition. We guide our clients in acquiring rare and exceptional timepieces, with the precision and commitment these pieces demand.",
      para2: "",
      statFounded: "— Founded",
      statFoundedValue: "MMXXI",
      statSourced: "— Pieces Sourced",
      statSourcedValue: "421+",
      statCollectors: "— Collectors",
      statCollectorsValue: "Worldwide",
      signature: "2121, Paris — Private Maison",
    },
    services: {
      badge: "— Services & Experience",
      headerRight: "Bespoke · Confidential",
      titlePre: "A",
      titleItalic: "discreet",
      titlePost: " approach, from start to finish.",
      items: [
        {
          id: "01",
          title: "Private Sourcing & Search",
          description:
            "Entrust us with your search. We locate the piece you are looking for within private collector networks.",
          detail: "Worldwide Network",
        },
        {
          id: "02",
          title: "Guaranteed Authenticity",
          description:
            "All our pieces are inspected by our watchmaker and covered by a 90-day warranty. Serviced watches benefit from a one-year mechanical warranty.\n\nAll work is carried out exclusively using original components. The warranty does not cover damage resulting from use. For vintage pieces, water resistance and timekeeping accuracy are only guaranteed on watches that have undergone a complete service.",
          detail: "",
        },
        {
          id: "03",
          title: "International Delivery",
          description:
            "Pieces are shipped via DHL Express or FedEx Express, carefully packaged and fully insured.\n\nUpon receipt, please open the parcel in the presence of the courier and immediately report any visible damage. Without such a record, no transport-related claim can be accepted.\n\nFor any shipment outside the European Union, the actual value of the piece is declared at customs. Any import duties and local taxes remain the responsibility of the recipient.",
          detail: "DHL · FedEx Express",
        },
        {
          id: "04",
          title: "Payment",
          description:
            "For your convenience, we offer bank transfer and payment via secure link. All settlements are made in euros.",
          detail: "Transfer · Secure link",
        },
        {
          id: "05",
          title: "Legal Notice",
          description:
            "2121Collection is published by 2121 SAS, with registered office at 3 avenue de Bouvines, 75011 Paris. SIRET: 942 304 403 00010.\n\nThe publication director is Mr Yann Brosolo.\n\nTo contact us: yb@2121collection.com\n\nThe site is hosted by Vercel.",
          detail: "2121 SAS · Paris",
        },
      ],
    },
    contact: {
      badge: "— Private Appointment",
      headerRight: "Paris · Worldwide",
      h2Pre: "For a",
      h2Italic: "private",
      h2Post: " consultation.",
      description:
        "We are available by appointment or direct contact. Reach us through the channel of your choice. We respond within twenty-four hours.",
      channels: [
        {
          label: "WhatsApp",
          value: "+33 (0)6 38 76 86 92",
          link: "https://wa.me/33638768692",
          note: "Reply < 24h",
        },
        {
          label: "Email",
          value: "yb@2121collection.com",
          link: "mailto:yb@2121collection.com",
          note: "Discreet inquiry",
        },
      ],
      addressLabel: "Address",
      addressLines: ["3 avenue de Bouvines", "75011 Paris", "France"],
      hoursLabel: "Hours",
      hoursLines: [
        "Monday — Saturday",
        "11h00 — 19h00",
        "By appointment only",
      ],
      coordsLabel: "Coordinates",
      coordsValue: "48.8501° N · 2.4001° E",
      coordsExtra: "— Nation Quarter",
    },
    videoSection: {
      badge: "— Maison in Motion",
      headerRight: "Paris · Cinematic",
      signature: "— Maison 2121",
      scrollHint: "Scroll to enter",
      pressPlay: "Press play on the maison.",
      interlude: "An Interlude",
      h2Pre: "Time,",
      h2Italic: "in motion",
      h2End: ".",
      tagline:
        "Behind every piece, an atelier that never stops.\nBehind every transaction, a story still being written.",
      cornerCaption: "in motion",
    },
    instagram: {
      header: "From the Atelier",
      badge: "— Moments & Journal",
      follow: "Follow our page",
      items: [
        { caption: "Submariner / Transition", place: "Paris" },
        { caption: "Daytona / Sourced", place: "Paris" },
        { caption: "Royal Oak / Steel", place: "Atelier" },
        { caption: "Malachite / 18k", place: "Rue Saint-Honoré" },
        { caption: "Two-line Dial", place: "Atelier" },
        { caption: "126500LN", place: "Private Sale" },
      ],
    },
    footer: {
      maisonLabel: "The Maison",
      maisonText: {
        pre: "An",
        italic: "independent",
        post: " Parisian maison dedicated to collectible watches, chosen with discernment.",
      },
      connect: "— Connect",
      maison: "— Maison",
      maisonLinks: ["Story", "Collection", "Services", "Appointment"],
      newsletter: "Newsletter",
      newsletterText:
        "An occasional letter from Paris — new arrivals, vintage finds, and quiet thoughts on horology.",
      subscribe: "Subscribe",
      legal: "Legal Notice",
      privacy: "Privacy",
      builtIn: "Built quietly in Paris",
    },
    banner: {
      label: "The maison is available",
      cta: "Reach us on WhatsApp",
      phone: "+33 (0)6 38 76 86 92",
      hours: "Paris · Reply < 24h",
    },
    bottomNav: {
      collection: "Collection",
      maison: "Maison",
      contact: "Contact",
    },
    loader: {
      brand: "Collection 2121",
      loading: "Loading",
      city: "Paris",
    },
    whatsapp: (brand: string, model: string, ref: string) =>
      `Hello 2121, I am interested in the ${brand} ${model} (${ref}). Could you share more information on availability, papers and price?`,
    whatsappGeneric:
      "Hello 2121, I am interested in a piece from your collection. Could you share more information?",
    emailSubject: (brand: string, model: string) =>
      `2121 · Information request · ${brand} ${model}`,
    emailBody: (brand: string, model: string, ref: string) =>
      `Hello 2121,\n\nI am writing about the ${brand} ${model} (${ref}) featured on your site.\n\nCould you share the current availability, papers and provenance history, additional photos if possible, as well as payment and shipping terms?\n\nBest regards,`,
  },
} as const;

export type T = (typeof translations)["fr"];

/**
 * Localized string — either a plain string (same in both languages) or
 * an object with explicit fr/en values.
 */
export type L = string | { fr: string; en: string };

/** Resolve a localized value to the active language, with fr fallback. */
export function loc(value: L | undefined, lang: Language): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.fr ?? "";
}
