export type Language = "fr" | "en";

export const translations = {
  fr: {
    navbar: {
      searchLabel: "Rechercher une pièce",
      menuLabel: "Ouvrir le menu",
      close: "Fermer",
      links: ["Nos Montres", "Story", "Services", "Rendez-vous"] as string[],
      langSwitch: "EN",
    },
    search: {
      header: "— Rechercher une pièce",
      close: "Fermer ⤬",
      placeholder: "Rolex, Daytona, 14060M, Vacheron…",
      pieces: "pièces",
      piece: "pièce",
      empty:
        "Aucune pièce ne correspond — réessayez avec une autre référence.",
      footer: "↵ Sélectionner — esc Fermer",
      inventory: "Inventaire confidentiel — mis à jour chaque semaine",
    },
    collection: {
      badge: "Nos Montres",
      updated: "Mis à jour chaque semaine",
      title: "Collection",
      titleItalic: "",
      subtitle:
        "Une sélection silencieuse — sourcée pièce par pièce, à travers nos réseaux privés en Europe et au-delà.",
      hoverView: "— Voir la pièce",
      discreteInventory: "— Un inventaire discret",
      discreteText: "Le reste de la collection est partagé",
      discreteItalic: "privément",
      discreteSuffix: ", sur demande.",
      catalog: "Recevoir le catalogue",
    },
    watch: {
      back: "Retour aux montres",
      pieceOf: "Pièce",
      year: "Année",
      condition: "État",
      price: "Prix",
      contactLabel: "Contacter sur WhatsApp",
      discuss: "Discutons de cette pièce",
      emailLabel: "Écrire par email",
      emailDiscuss: "private@2121.paris",
      disclaimer:
        "Messages pré-remplis — réponse sous 24h. Discrétion garantie.",
      photo: "Photographiée à l'atelier — 21 Rue de la Paix",
      onePiece: "une pièce",
      wordOfHouse: "Le mot de la maison",
      specs: "Spécifications",
      others: "Autres pièces",
      continueVisit: "Poursuivre la",
      visitItalic: "visite",
      allPieces: "Toutes les pièces",
    },
    gate: {
      subtitle: "Maison Privée · Paris",
    },
    banner: {
      label: "La maison est disponible",
      cta: "Contacter sur WhatsApp",
      phone: "+33 (0)6 21 21 21 21",
    },
    whatsapp: (brand: string, model: string, ref: string) =>
      `Bonjour 2121, je suis intéressé par la ${brand} ${model} (${ref}). Pourriez-vous me communiquer plus d'informations — disponibilité, papiers, photos additionnelles, prix ?`,
    emailSubject: (brand: string, model: string) =>
      `2121 — Demande d'informations · ${brand} ${model}`,
    emailBody: (brand: string, model: string, ref: string) =>
      `Bonjour 2121,\n\nJe me permets de vous contacter au sujet de la ${brand} ${model} (${ref}) présentée sur votre site.\n\nPourriez-vous me communiquer:\n— la disponibilité actuelle de la pièce\n— les papiers et l'historique de provenance\n— des photos additionnelles si possible\n— les modalités de paiement et de livraison\n\nDans l'attente de votre retour,\nCordialement,`,
  },
  en: {
    navbar: {
      searchLabel: "Search a piece",
      menuLabel: "Open menu",
      close: "Close",
      links: ["Our Watches", "Story", "Services", "Appointment"] as string[],
      langSwitch: "FR",
    },
    search: {
      header: "— Search a piece",
      close: "Close ⤬",
      placeholder: "Rolex, Daytona, 14060M, Vacheron…",
      pieces: "pieces",
      piece: "piece",
      empty: "No watch found — try another brand, model or reference.",
      footer: "↵ Select — esc Close",
      inventory: "Confidential inventory — updated weekly",
    },
    collection: {
      badge: "Our Watches",
      updated: "Updated weekly",
      title: "Collection",
      titleItalic: "",
      subtitle:
        "A silent selection — sourced piece by piece, through our private networks across Europe and beyond.",
      hoverView: "— View the piece",
      discreteInventory: "— A discreet inventory",
      discreteText: "The rest of the collection is shared",
      discreteItalic: "privately",
      discreteSuffix: ", on request.",
      catalog: "Receive the catalogue",
    },
    watch: {
      back: "Back to watches",
      pieceOf: "Piece",
      year: "Year",
      condition: "Condition",
      price: "Price",
      contactLabel: "Contact on WhatsApp",
      discuss: "Let's discuss this piece",
      emailLabel: "Write by email",
      emailDiscuss: "private@2121.paris",
      disclaimer:
        "Pre-filled messages — reply within 24h. Discretion guaranteed.",
      photo: "Photographed at the workshop — 21 Rue de la Paix",
      onePiece: "one piece",
      wordOfHouse: "From the house",
      specs: "Specifications",
      others: "Other pieces",
      continueVisit: "Continue the",
      visitItalic: "visit",
      allPieces: "All pieces",
    },
    gate: {
      subtitle: "Private Maison · Paris",
    },
    banner: {
      label: "The maison is available",
      cta: "Reach us on WhatsApp",
      phone: "+33 (0)6 21 21 21 21",
    },
    whatsapp: (brand: string, model: string, ref: string) =>
      `Hello 2121, I am interested in the ${brand} ${model} (${ref}). Could you share more information — availability, papers, additional photos, price?`,
    emailSubject: (brand: string, model: string) =>
      `2121 — Information request · ${brand} ${model}`,
    emailBody: (brand: string, model: string, ref: string) =>
      `Hello 2121,\n\nI am writing about the ${brand} ${model} (${ref}) featured on your site.\n\nCould you please share:\n— current availability of the piece\n— papers and provenance history\n— additional photos if possible\n— payment and shipping terms\n\nLooking forward to your reply,\nBest regards,`,
  },
} as const;

export type T = (typeof translations)["fr"];
