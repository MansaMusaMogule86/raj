"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * ShortcutsHint — a discoverable card showing the film-language keyboard
 * controls. Floating button toggles a panel. First-time auto-hint already
 * handled by KeyboardNav; this gives permanent discoverability.
 */
export function ShortcutsHint() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const shortcuts: { keys: string; label: { en: string; ar: string } }[] = [
    { keys: "1—9", label: { en: "Jump to chapter", ar: "انتقل لفصل" } },
    { keys: "↑ / ↓", label: { en: "Prev / next chapter", ar: "الفصل السابق/التالي" } },
    { keys: "Home / End", label: { en: "Opening / final ascent", ar: "البداية / الصعود الأخير" } },
    { keys: "⌘ K", label: { en: "Scene select (search)", ar: "اختيار المشهد (بحث)" } },
    { keys: "Esc", label: { en: "Close overlay", ar: "إغلاق" } },
  ];

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-24 md:bottom-28 z-30 grid place-items-center h-9 w-9 rounded-full bg-obsidian/80 backdrop-blur-md border border-bone/15 text-bone/50 hover:text-brass hover:border-brass/40 transition-colors ${
          ar ? "left-16 md:left-20" : "right-16 md:right-20"
        }`}
        aria-label={ar ? "اختصارات لوحة المفاتيح" : "Keyboard shortcuts"}
        title={ar ? "اختصارات" : "Shortcuts"}
      >
        <Keyboard className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.2, 0.7, 0.1, 1] }}
            className={`fixed bottom-40 md:bottom-40 z-30 w-64 p-4 bg-obsidian/95 backdrop-blur-md border border-brass/30 rounded-sm shadow-[0_8px_40px_rgba(10,10,9,0.7)] ${
              ar ? "left-4" : "right-4"
            }`}
            role="dialog"
            aria-label={ar ? "اختصارات لوحة المفاتيح" : "Keyboard shortcuts"}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="tc text-bone/60 flex items-center gap-1.5">
                <Keyboard className="h-3.5 w-3.5 text-brass" />
                {ar ? "اختصارات الإخراج" : "Director's shortcuts"}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-bone/40 hover:text-bone"
                aria-label={ar ? "إغلاق" : "Close"}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="space-y-2">
              {shortcuts.map((s) => (
                <li key={s.keys} className="flex items-center justify-between gap-2">
                  <span className="text-bone/70 text-sm">{ar ? s.label.ar : s.label.en}</span>
                  <kbd className="tc text-bone/60 border border-bone/15 rounded px-1.5 py-0.5 text-[10px] whitespace-nowrap">
                    {s.keys}
                  </kbd>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
