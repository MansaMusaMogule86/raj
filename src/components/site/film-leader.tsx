"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";

/**
 * FilmLeader — an SMPTE-style countdown leader that plays once on the first
 * visit, then never again (remembered in localStorage). Reinforces the
 * "you are about to watch a film" opening. Respects reduced-motion
 * (skips entirely). Esc/skip dismisses early.
 *
 * Honesty: purely a cinematic framing device. No content claims.
 */
const KEY = "ascend-intro-seen";

export function FilmLeader() {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const ar = lang === "ar";
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (reduce) return;
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    const id = window.setTimeout(() => setActive(true), 0);
    return () => window.clearTimeout(id);
  }, [reduce]);

  const dismiss = () => {
    if (exiting) return;
    setExiting(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    // Unmount after CSS fade-out completes
    const id = window.setTimeout(() => {
      setActive(false);
      setExiting(false);
    }, 400);
    return () => window.clearTimeout(id);
  };

  // Countdown 3 → 2 → 1 → 0 (then dismiss)
  useEffect(() => {
    if (!active || exiting) return;
    if (count <= 0) {
      const id = window.setTimeout(() => dismiss(), 350);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setCount((c) => c - 1), 750);
    return () => window.clearTimeout(id);
  }, [active, count, exiting]);

  // Esc to skip
  useEffect(() => {
    if (!active || exiting) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, exiting]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-obsidian flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      role="presentation"
      aria-hidden="true"
      onClick={dismiss}
    >
          {/* Static SMPTE-style ring with subtle CSS pulse (avoids exit conflicts) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="min(70vw, 70vh)" height="min(70vw, 70vh)" viewBox="0 0 200 200" fill="none" style={{ animation: "leaderPulse 2s ease-in-out infinite" }}>
              {/* Outer ring with rotating pattern */}
              <circle cx="100" cy="100" r="90" stroke="var(--brass)" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
              <circle cx="100" cy="100" r="80" stroke="var(--bone)" strokeWidth="0.5" opacity="0.2" />
              {/* Crosshair */}
              <line x1="100" y1="10" x2="100" y2="30" stroke="var(--brass)" strokeWidth="1.5" />
              <line x1="100" y1="170" x2="100" y2="190" stroke="var(--brass)" strokeWidth="1.5" />
              <line x1="10" y1="100" x2="30" y2="100" stroke="var(--brass)" strokeWidth="1.5" />
              <line x1="170" y1="100" x2="190" y2="100" stroke="var(--brass)" strokeWidth="1.5" />
              {/* Center circle */}
              <circle cx="100" cy="100" r="40" stroke="var(--brass)" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>
          <style>{`@keyframes leaderPulse { 0%,100% { opacity: 0.85; } 50% { opacity: 1; } }`}</style>

          {/* Countdown number */}
          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ opacity: 0, scale: 1.4, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
                className="display-condensed text-bone text-[30vw] sm:text-[20vw] md:text-[14rem] leading-none"
              >
                {count > 0 ? count : ""}
              </motion.div>
            </AnimatePresence>
            {/* Brand mark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 flex items-center justify-center gap-3"
            >
              <span className="display-condensed text-bone text-xl">RAJA</span>
              <span className="display-condensed text-brass text-xl">IDRIES</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="tc text-bone/40 mt-2"
            >
              {ar ? "إرتقِ · بدء العرض" : "ASCEND · STARTING"}
            </motion.p>
          </div>

          {/* Skip hint */}
          <button
            onClick={dismiss}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 tc text-bone/40 hover:text-bone transition-colors border border-bone/15 rounded-full px-4 py-1.5 opacity-0"
            style={{ animation: "fadeIn 0.5s ease 1s forwards" }}
          >
            {ar ? "تخطّ (Esc)" : "Skip (Esc)"}
          </button>
          <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>

          {/* Top/bottom film perforations */}
          <div className="absolute top-0 inset-x-0 h-3 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="flex-1 border-x border-bone/10 bg-bone/5 mx-px" />
            ))}
          </div>
          <div className="absolute bottom-0 inset-x-0 h-3 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="flex-1 border-x border-bone/10 bg-bone/5 mx-px" />
            ))}
          </div>
    </div>
  );
}
