"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations } from "@/lib/i18n";
import type { Language, T } from "@/lib/i18n";

const STORAGE_KEY = "2121-lang";

type Ctx = {
  lang: Language;
  setLang: (l: Language) => void;
  t: T;
  /** true once localStorage has been read (avoids SSR mismatch) */
  resolved: boolean;
};

const LanguageContext = createContext<Ctx>({
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
  resolved: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
    }
    setResolved(true);
  }, []);

  function setLang(l: Language) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang] as T, resolved }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
