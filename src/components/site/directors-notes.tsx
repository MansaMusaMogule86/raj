"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Clapperboard, X, ChevronUp, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { directorNotes } from "@/lib/directors-notes";
import { Timecode, ChapterNumber } from "@/components/site/cinematic";

/**
 * Director's Notes — a floating, dismissible film-language element.
 * Reads the current section from scroll position and surfaces the matching
 * creative-direction note (like a director's treatment commentary).
 * Desktop: fixed side card. Mobile: hidden by default (respects space).
 */
export function DirectorsNotes() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const [active, setActive] = useState<(typeof directorNotes)[number] | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (dismissed) return;
        const probe = window.innerHeight * 0.45;
        let current: (typeof directorNotes)[number] | null = null;
        let bestDist = Infinity;
        for (const n of directorNotes) {
          const el = document.getElementById(n.sectionId);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          // Section is "active" if its top is above the probe and bottom below
          if (r.top <= probe && r.bottom > probe) {
            const d = Math.abs(r.top - probe);
            if (d < bestDist) {
              bestDist = d;
              current = n;
            }
          }
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.aside
          key={active.sectionId}
          initial={{ opacity: 0, y: 16, x: ar ? -20 : 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 16, x: ar ? -20 : 20 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: [0.2, 0.7, 0.1, 1] }}
          className={`hidden lg:flex fixed bottom-28 z-30 max-w-[280px] p-4 bg-obsidian/90 backdrop-blur-md border border-brass/30 rounded-sm shadow-[0_8px_40px_rgba(10,10,9,0.6)] ${
            ar ? "left-4" : "right-4"
          }`}
          aria-label={ar ? "ملاحظات المخرج" : "Director's note"}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clapperboard className="h-3.5 w-3.5 text-brass" />
              <Timecode className="text-bone/60">{ar ? "ملاحظات المخرج" : "Director's note"}</Timecode>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-bone/40 hover:text-bone transition-colors"
              aria-label={ar ? "إغلاق" : "Dismiss"}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          {/* Chapter marker */}
          <div className="flex items-baseline gap-2 mb-2">
            <ChapterNumber num={active.chapter} className="text-brass text-2xl" />
            <span className="tc text-bone/40">{ar ? `الفصل ${active.chapter}` : `Frame ${active.chapter}`}</span>
          </div>
          {/* Note */}
          <p className={`text-bone/85 text-sm leading-relaxed ${ar ? "text-right" : ""}`}>
            {t(active.note)}
          </p>
          {/* Footer hairline */}
          <div className="mt-3 pt-2 border-t border-bone/10 flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-brass/60" />
            <span className="tc text-bone/30">{ar ? "إرتقِ — معالجة المخرج" : "ASCEND — dir. treatment"}</span>
          </div>
        </motion.aside>
      )}

      {/* Mobile chip variant — expandable, sits above the mobile sticky CTA */}
      {active && (
        <motion.div
          key={`mobile-${active.sectionId}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
          className="lg:hidden fixed inset-x-3 z-30 bottom-24 bg-obsidian/95 backdrop-blur-md border border-brass/30 rounded-sm shadow-[0_8px_30px_rgba(10,10,9,0.6)] overflow-hidden"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
          aria-label={ar ? "ملاحظات المخرج" : "Director's note"}
        >
          {/* Collapsed chip header — div with role+keyboard to avoid nested buttons */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setMobileExpanded((v) => !v)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setMobileExpanded((v) => !v); } }}
            className="w-full flex items-center justify-between gap-2 p-3 text-start cursor-pointer"
            aria-expanded={mobileExpanded}
          >
            <span className="flex items-center gap-2 min-w-0">
              <Clapperboard className="h-3.5 w-3.5 text-brass flex-shrink-0" />
              <ChapterNumber num={active.chapter} className="text-brass text-base" />
              <span className="tc text-bone/50 truncate">{ar ? "ملاحظات المخرج" : "Director's note"}</span>
            </span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDismissed(true);
                }}
                className="text-bone/40 hover:text-bone p-1"
                aria-label={ar ? "إغلاق" : "Dismiss"}
              >
                <X className="h-3.5 w-3.5" />
              </button>
              {mobileExpanded ? (
                <ChevronDown className="h-4 w-4 text-bone/60" />
              ) : (
                <ChevronUp className="h-4 w-4 text-bone/60" />
              )}
            </span>
          </div>
          <AnimatePresence>
            {mobileExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                className="px-3 pb-3"
              >
                <p className={`text-bone/85 text-sm leading-relaxed pt-1 border-t border-bone/10 ${ar ? "text-right" : ""}`}>
                  {t(active.note)}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-brass/60" />
                  <span className="tc text-bone/30">{ar ? "إرتقِ — معالجة المخرج" : "ASCEND — dir. treatment"}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
