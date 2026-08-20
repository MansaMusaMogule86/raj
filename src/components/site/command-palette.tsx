"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, CornerDownLeft, ArrowUp, ArrowDown, Clapperboard } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { navLinks } from "@/lib/content";
import { analytics } from "@/lib/analytics";

/**
 * ResultsList — the command palette results with an internal scroll-progress
 * bar (brass hairline) that appears when the list overflows. Keeps keyboard
 * navigation + active-item tracking intact.
 */
function ResultsList({
  results,
  active,
  setActive,
  jump,
  ar,
}: {
  results: { id: string; label: string; num: string; href: string }[];
  active: number;
  setActive: (n: number | ((p: number) => number)) => void;
  jump: (href: string, id: string) => void;
  ar: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1); // 1 = at top, 0 = at bottom

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 0) {
      setProgress(1);
      return;
    }
    setProgress(1 - el.scrollTop / max);
  };

  // Keep active item in view during keyboard nav
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeEl = el.querySelector(`[data-idx="${active}"]`) as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [active]);

  const overflow = results.length > 5;

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="max-h-[50vh] overflow-y-auto thin-scroll py-2"
      >
        {results.length === 0 ? (
          <p className="px-4 py-6 tc text-bone/40 text-center">{ar ? "لا نتائج" : "No results"}</p>
        ) : (
          results.map((r, i) => (
            <button
              key={r.id}
              data-idx={i}
              onMouseEnter={() => setActive(i)}
              onClick={() => jump(r.href, r.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-start transition-colors ${
                i === active ? "bg-brass/10 border-s-2 border-brass" : "border-s-2 border-transparent"
              }`}
            >
              <span className="chapter-num text-brass text-lg flex-shrink-0">{r.num}</span>
              <span className="display text-bone text-base flex-1 truncate">{r.label}</span>
              {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-bone/50" />}
            </button>
          ))
        )}
      </div>
      {/* Scroll-progress hairline — brass, bottom of results, shrinks as you scroll down */}
      {overflow && (
        <div className="absolute bottom-0 inset-x-0 h-px bg-bone/5 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-brass to-ember"
            style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * CommandPalette — Cmd/Ctrl+K chapter quick-jump (film "scene select").
 * Fuzzy search across chapters, keyboard navigable (↑↓ to move, Enter to
 * jump, Esc to close). Fires nav_click analytics on jump.
 *
 * Accessibility: full focus-trap (Tab/Shift+Tab cycle within the panel),
 * focus restored to the trigger on close, aria-modal + labelled.
 */
export function CommandPalette() {
  const { lang, t } = useLang();
  const ar = lang === "ar";
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Cmd/Ctrl+K to open; Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus management: save trigger focus, move focus into panel on open,
  // restore on close. Trap Tab within the panel.
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      const id = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    } else if (lastFocused.current) {
      lastFocused.current.focus();
      lastFocused.current = null;
    }
  }, [open]);

  // Focus-trap: when open, Tab cycles within the panel
  useEffect(() => {
    if (!open) return;
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === panel) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onTab);
    return () => window.removeEventListener("keydown", onTab);
  }, [open]);

  // Reset on close (deferred to avoid cascading renders)
  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => {
      setQ("");
      setActive(0);
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const items = navLinks.map((l, i) => ({
      id: l.id,
      label: t(l.label),
      num: String(i + 1).padStart(2, "0"),
      href: l.href,
      idx: i,
    }));
    if (!query) return items;
    return items.filter((it) => it.label.toLowerCase().includes(query) || it.num.includes(query));
  }, [q, t]);

  // Reset active when results change (deferred)
  useEffect(() => {
    const id = window.setTimeout(() => setActive(0), 0);
    return () => window.clearTimeout(id);
  }, [results]);

  const jump = (href: string, id: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    analytics.navClick(id, lang);
    setOpen(false);
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) jump(r.href, r.id);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] px-4 bg-obsidian/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={ar ? "اختيار الفصل" : "Scene select"}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.2, 0.7, 0.1, 1] }}
            onClick={(e) => e.stopPropagation()}
            ref={panelRef}
            className="w-full max-w-xl bg-obsidian border border-brass/30 rounded-sm shadow-[0_24px_80px_rgba(10,10,9,0.8)] overflow-hidden"
          >
            {/* Search header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-bone/10">
              <Clapperboard className="h-4 w-4 text-brass flex-shrink-0" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onListKey}
                placeholder={ar ? "ابحث عن فصل..." : "Search a chapter..."}
                className="flex-1 bg-transparent outline-none text-bone placeholder:text-bone/40 text-base"
                aria-label={ar ? "بحث الفصول" : "Search chapters"}
              />
              <kbd className="tc text-bone/40 border border-bone/15 rounded px-1.5 py-0.5 text-[10px]">ESC</kbd>
            </div>

            {/* Results — with scroll-progress bar when content overflows */}
            <ResultsList results={results} active={active} setActive={setActive} jump={jump} ar={ar} />

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-bone/10 tc text-bone/40">
              <span className="flex items-center gap-2">
                <ArrowUp className="h-3 w-3" />
                <ArrowDown className="h-3 w-3" />
                {ar ? "تنقّل" : "navigate"}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border border-bone/15 rounded px-1.5 py-0.5 text-[10px]">↵</kbd>
                {ar ? "اختيار" : "select"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** A small trigger button for the palette, for discoverability in the nav. */
export function CommandPaletteTrigger({ onOpen }: { onOpen: () => void }) {
  const { lang } = useLang();
  const ar = lang === "ar";
  return (
    <button
      onClick={onOpen}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-bone/15 rounded-full text-bone/50 hover:text-bone hover:border-brass/40 transition-colors"
      aria-label={ar ? "بحث الفصول (Cmd+K)" : "Search chapters (Cmd+K)"}
      title={ar ? "بحث الفصول (⌘K)" : "Scene select (⌘K)"}
    >
      <Search className="h-3.5 w-3.5" />
      <kbd className="tc text-[10px]">⌘K</kbd>
    </button>
  );
}
