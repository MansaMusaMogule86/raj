"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp, CornerUpLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { navLinks } from "@/lib/content";

/**
 * BackToTop — floating "rewind" button cluster.
 * Primary: scrolls to top with a circular scroll-progress ring.
 * Secondary (on hover): "return to last chapter" — remembers the last
 * section the visitor was reading and jumps back to it.
 * Respects reduced-motion. RTL-aware position.
 */
export function BackToTop() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastChapter, setLastChapter] = useState<{ href: string; label: string } | null>(null);
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const top = window.scrollY || doc.scrollTop;
        const max = (doc.scrollHeight - doc.clientHeight) || 1;
        const p = Math.min(1, Math.max(0, top / max));
        setProgress(p);
        setShow(top > window.innerHeight * 2.5);

        // Track the last chapter the visitor was in (probe at 45vh)
        const probe = window.innerHeight * 0.45;
        for (let i = 0; i < navLinks.length; i++) {
          const el = document.getElementById(navLinks[i].id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= probe && r.bottom > probe) {
            setLastChapter({ href: navLinks[i].href, label: navLinks[i].label[lang] });
            break;
          }
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [lang]);

  const goTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  const goLast = () => {
    if (!lastChapter) return;
    const el = document.querySelector(lastChapter.href);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const R = 18;
  const CIRC = 2 * Math.PI * R;
  const offset = CIRC * (1 - progress);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.1, 1] }}
          className={`fixed bottom-24 md:bottom-28 z-30 flex flex-col items-center gap-2`}
          style={{ [ar ? "left" : "right"]: "1rem" } as React.CSSProperties}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Secondary: return to last chapter (appears on hover) */}
          <AnimatePresence>
            {hovered && lastChapter && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 8 }}
                transition={{ duration: 0.2 }}
                onClick={goLast}
                className="group flex items-center gap-2 px-3 py-2 bg-obsidian/90 backdrop-blur-md border border-brass/40 rounded-full text-bone hover:bg-obsidian shadow-[0_8px_30px_rgba(10,10,9,0.6)]"
                aria-label={ar ? "العودة للفصل السابق" : "Return to last chapter"}
                title={ar ? `العودة إلى: ${lastChapter.label}` : `Return to: ${lastChapter.label}`}
              >
                <CornerUpLeft className="h-3.5 w-3.5 text-brass" />
                <span className="tc text-bone/70 max-w-[120px] truncate">{lastChapter.label}</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Primary: back to top with progress ring */}
          <motion.button
            onClick={goTop}
            className="grid place-items-center h-11 w-11 rounded-full bg-obsidian/80 backdrop-blur-md border border-brass/40 text-brass hover:bg-obsidian hover:border-brass transition-colors"
            aria-label={ar ? "العودة للأعلى" : "Back to top"}
            title={ar ? "العودة للأعلى" : "Back to top"}
          >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

