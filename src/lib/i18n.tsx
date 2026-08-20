"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Bi, Lang } from "@/lib/content";

interface LangCtx {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (b: Bi) => string;
  ready: boolean;
}

const Ctx = createContext<LangCtx | null>(null);
const STORAGE_KEY = "ascend-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  // hydrate from localStorage / browser preference (client-only, deferred)
  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY) as Lang | null;
      } catch {
        return null;
      }
    })();
    const browserAr = typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("ar");
    const next: Lang = stored === "ar" || stored === "en" ? stored : browserAr ? "ar" : "en";
    // Defer state updates out of the effect body to avoid cascading renders.
    const id = window.setTimeout(() => {
      setLangState((prev) => (prev === next ? prev : next));
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // reflect lang/dir on <html>
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      // Also set a cookie so the server can render the correct dir/lang on
      // the NEXT request (no-flash, no hydration mismatch).
      document.cookie = `${STORAGE_KEY}=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch {
      /* ignore */
    }
    // Reflect immediately on <html> for the current session
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.lang = l;
      html.dir = l === "ar" ? "rtl" : "ltr";
    }
    // analytics
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ascend:analytics", { detail: { event: "language_change", lang: l } }));
    }
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "ar" : "en"), [lang, setLang]);

  const t = useCallback((b: Bi) => (b ? b[lang] : ""), [lang]);

  const value = useMemo<LangCtx>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, toggle, t, ready }),
    [lang, setLang, toggle, t, ready]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
