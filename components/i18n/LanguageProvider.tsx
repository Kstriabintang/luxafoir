"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translate, LANG_KEY, type Lang } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default 'en' so SSR/first client render match (avoids hydration mismatch).
  const [lang, setLangState] = useState<Lang>("en");

  // After mount: read saved preference, else auto-detect from browser.
  useEffect(() => {
    let next: Lang | null = null;
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "id") next = saved;
    } catch {
      /* ignore */
    }
    if (!next && typeof navigator !== "undefined" && navigator.language.startsWith("id")) {
      next = "id";
    }
    if (next && next !== "en") setLangState(next);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback when used outside the provider (e.g. isolated render).
    return { lang: "en" as Lang, setLang: () => {}, t: (k: string) => translate("en", k) };
  }
  return ctx;
}
