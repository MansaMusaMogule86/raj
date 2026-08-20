"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

type Theme = "dark" | "light";
const KEY = "ascend-theme";

/**
 * ThemeToggle — switches between the default cinematic dark and a warm
 * bone/sand light variant. Remembers preference in localStorage.
 * The brand lives in the dark; the light variant is an opt-in alternative
 * for daylight reading comfort.
 */
export function ThemeToggle() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  // hydrate
  useEffect(() => {
    let stored: Theme | null = null;
    try {
      const v = localStorage.getItem(KEY);
      if (v === "dark" || v === "light") stored = v;
    } catch {
      /* ignore */
    }
    const id = window.setTimeout(() => {
      setTheme(stored || "dark");
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // reflect on <html>
  useEffect(() => {
    if (!ready) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, ready]);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="text-bone/70 hover:text-bone hover:bg-bone/5 rounded-full"
      aria-label={theme === "dark" ? (ar ? "الوضع الفاتح" : "Light mode") : (ar ? "الوضع الداكن" : "Dark mode")}
      title={ar ? "تبديل المظهر" : "Toggle appearance"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
