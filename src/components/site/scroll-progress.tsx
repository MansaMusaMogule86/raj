"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { navLinks } from "@/lib/content";

/**
 * Scroll-linked chapter progress.
 *  - A thin brass progress bar fixed at the very top (above nav).
 *  - A floating "chapter reel" indicator (timecode style) that shows the
 *    current chapter number + label as the visitor scrolls.
 *  - Respects prefers-reduced-motion (bar still updates, indicator is static).
 */
export function ScrollProgress() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const [progress, setProgress] = useState(0); // 0..1
  const [chapter, setChapter] = useState<{ num: string; label: string } | null>(null);
  const [hidden, setHidden] = useState(true); // hide until scrolled past hero

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const max = (doc.scrollHeight - doc.clientHeight) || 1;
        const p = Math.min(1, Math.max(0, scrollTop / max));
        setProgress(p);
        setHidden(scrollTop < window.innerHeight * 0.6);

        // Determine current chapter by finding the section whose top is
        // closest to ~35% of the viewport.
        const probe = window.innerHeight * 0.35;
        let current: { num: string; label: string } | null = null;
        let bestDist = Infinity;
        navLinks.forEach((l, i) => {
          const el = document.querySelector(l.href);
          if (!el) return;
          const r = (el as HTMLElement).getBoundingClientRect();
          const d = Math.abs(r.top - probe);
          if (r.top < window.innerHeight * 0.6 && d < bestDist) {
            bestDist = d;
            current = { num: String(i + 1).padStart(2, "0"), label: t(l.label) };
          }
        });
        setChapter(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [t]);

  return (
    <>
      {/* Top progress bar — brass, thin, fixed at viewport top */}
      <div className="fixed top-0 inset-x-0 z-[70] h-[2px] bg-bone/5 pointer-events-none" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-brass via-brass to-ember"
          style={{ width: `${progress * 100}%` }}
          transition={reduce ? { duration: 0 } : { duration: 0.1 }}
        />
      </div>

      {/* Floating chapter reel indicator */}
      <AnimatePresence>
        {!hidden && chapter && (
          <motion.div
            initial={{ opacity: 0, y: 12, x: ar ? -12 : 12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 12, x: ar ? -12 : 12 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.1, 1] }}
            className={`hidden md:flex fixed top-24 z-40 items-center gap-3 px-3 py-2 bg-obsidian/80 backdrop-blur-md border border-bone/15 rounded-full ${
              ar ? "left-4" : "right-4"
            }`}
            aria-live="polite"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
            <span className="tc text-bone/50">{ar ? "الفصل" : "Chapter"}</span>
            <span className="chapter-num text-brass text-base">{chapter.num}</span>
            <span className="h-3 w-px bg-bone/20" />
            <span className="tc text-bone/80 max-w-[140px] truncate">{chapter.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
