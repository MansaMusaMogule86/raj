"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * BackToTop — floating "rewind" button.
 * Appears after deep scroll (past ~2.5 viewports). Styled as a film-leader
 * countdown button (brass ring + chapter number) to stay on-brand.
 * Respects reduced-motion (instant scroll). RTL-aware position.
 */
export function BackToTop() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 of page scrolled

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const top = window.scrollY || doc.scrollTop;
        const max = (doc.scrollHeight - doc.clientHeight) || 1;
        const p = Math.min(1, Math.max(0, top / max));
        setProgress(p);
        setShow(top > window.innerHeight * 2.5);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  // SVG ring progress (circle stroke-dashoffset)
  const R = 18;
  const CIRC = 2 * Math.PI * R;
  const offset = CIRC * (1 - progress);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.1, 1] }}
          onClick={goTop}
          className={`fixed bottom-24 md:bottom-28 z-30 grid place-items-center h-11 w-11 rounded-full bg-obsidian/80 backdrop-blur-md border border-brass/40 text-brass hover:bg-obsidian hover:border-brass transition-colors ${
            ar ? "left-4" : "right-4"
          }`}
          aria-label={ar ? "العودة للأعلى" : "Back to top"}
          title={ar ? "العودة للأعلى" : "Back to top"}
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r={R} fill="none" stroke="rgba(241,238,230,0.10)" strokeWidth="1.5" />
            <circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="var(--brass)"
              strokeWidth="1.5"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: reduce ? "none" : "stroke-dashoffset 0.15s linear" }}
            />
          </svg>
          <ArrowUp className="h-4 w-4 relative" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
