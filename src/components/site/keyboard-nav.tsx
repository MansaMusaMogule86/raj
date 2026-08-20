"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { navLinks } from "@/lib/content";

/**
 * Keyboard chapter navigation.
 *  - Number keys 1–9 jump to the corresponding chapter (film "scene select")
 *  - ArrowDown / ArrowUp jump to next/prev chapter
 *  - Home / End jump to top / final ascent
 *  - Shows a brief film-slate hint overlay when keys are used
 *
 * Honesty: purely a power-user convenience that reinforces the documentary
 * chapter metaphor. Does not interfere with form inputs (ignores keys when
 * an input/textarea is focused).
 */
export function KeyboardNav() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [hint, setHint] = useState<string | null>(null);
  const [showHintOnce, setShowHintOnce] = useState(false);

  const jump = (href: string, label?: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (label) {
        setHint(label);
        setTimeout(() => setHint(null), 1600);
      }
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in a field
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      // Ignore modifier combos
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const n = parseInt(e.key, 10);
      if (!isNaN(n) && n >= 1 && n <= navLinks.length) {
        e.preventDefault();
        const link = navLinks[n - 1];
        jump(link.href, `${ar ? "الفصل" : "Chapter"} ${String(n).padStart(2, "0")} · ${link.label[lang]}`);
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
        e.preventDefault();
        if (e.key === "Home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setHint(ar ? "البداية" : "Opening");
          setTimeout(() => setHint(null), 1200);
          return;
        }
        if (e.key === "End") {
          jump("#final-ascent", ar ? "الصعود الأخير" : "Final ascent");
          return;
        }
        // Find current chapter index by scroll position
        const probe = window.innerHeight * 0.4;
        let currentIdx = -1;
        for (let i = 0; i < navLinks.length; i++) {
          const el = document.querySelector(navLinks[i].href) as HTMLElement | null;
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= probe && r.bottom > probe) {
            currentIdx = i;
            break;
          }
        }
        const dir = e.key === "ArrowDown" ? 1 : -1;
        const nextIdx = Math.max(0, Math.min(navLinks.length - 1, (currentIdx < 0 ? 0 : currentIdx) + dir));
        const link = navLinks[nextIdx];
        jump(link.href, `${ar ? "الفصل" : "Chapter"} ${String(nextIdx + 1).padStart(2, "0")} · ${link.label[lang]}`);
      }
    };
    window.addEventListener("keydown", onKey);
    // One-time hint after first scroll past hero
    const onScroll = () => {
      if (showHintOnce) return;
      if (window.scrollY > window.innerHeight * 0.7) {
        setShowHintOnce(true);
        setHint(ar ? "اضغط ١–٩ أو الأسهم للتنقل بين الفصول" : "Press 1–9 or arrows to jump chapters");
        setTimeout(() => setHint(null), 4000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [lang, ar, showHintOnce]);

  return (
    <AnimatePresence>
      {hint && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.1, 1] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[75] px-4 py-2 bg-obsidian/90 backdrop-blur-md border border-brass/40 rounded-full shadow-[0_8px_30px_rgba(10,10,9,0.6)]"
          role="status"
          aria-live="polite"
        >
          <span className="tc text-brass">{hint}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
