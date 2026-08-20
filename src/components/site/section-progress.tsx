"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SectionProgress — a thin vertical hairline fixed to the viewport edge that
 * fills as the visitor reads through whichever long section is currently
 * in view. Reinforces the "reading the reel" cinematic metaphor.
 *
 * Mounts a single fixed element; tracks the in-view section's own progress.
 */
export function SectionProgress() {
  const reduce = useReducedMotion();
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const ids = [
      "problem", "method", "assessment", "ascend", "story",
      "stories", "journal", "kit", "coaching", "partnerships", "contact", "final-ascent",
    ];

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const probe = vh * 0.5;
        let currentId: string | null = null;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= probe && r.bottom > probe) {
            currentId = id;
            break;
          }
        }
        setSectionId(currentId);
        if (currentId) {
          const el = document.getElementById(currentId);
          if (el) {
            const r = el.getBoundingClientRect();
            const scrollable = r.height - vh;
            if (scrollable > 0) {
              const p = Math.min(1, Math.max(0, -r.top / scrollable));
              setProgress(p);
            } else {
              setProgress(0);
            }
          }
        } else {
          setProgress(0);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (reduce) return null;

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 z-20 h-48 w-[3px] rounded-full bg-bone/10 pointer-events-none hidden lg:block overflow-hidden"
      style={{ insetInlineEnd: "0.75rem" } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Track glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bone/5 to-transparent" />
      {/* Progress fill — brass to ember */}
      <div
        className="absolute top-0 inset-x-0 rounded-full bg-gradient-to-b from-brass via-brass to-ember shadow-[0_0_12px_rgba(181,138,75,0.5)]"
        style={{ height: `${progress * 100}%`, transition: "height 0.15s linear" }}
      />
      {/* Progress head dot */}
      <div
        className="absolute inset-x-0 h-1 rounded-full bg-ember"
        style={{ top: `calc(${progress * 100}% - 2px)`, transition: "top 0.15s linear", boxShadow: "0 0 8px rgba(233,104,58,0.8)" }}
      />
    </div>
  );
}
