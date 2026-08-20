"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";

/**
 * SectionDivider — cinematic chapter transition between sections.
 * Renders a thin brass rule with timecode metadata + a slow wipe-in,
 * reinforcing the documentary chapter feel between major scenes.
 */
export function SectionDivider({
  fromChapter,
  toChapter,
  label,
  className = "",
}: {
  fromChapter: string;
  toChapter: string;
  label: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const ar = lang === "ar";
  return (
    <div
      className={`relative py-6 ${className}`}
      role="separator"
      aria-label={ar ? `انتقال من الفصل ${fromChapter} إلى ${toChapter}` : `Transition from chapter ${fromChapter} to ${toChapter}`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center gap-4">
        <span className="tc text-bone/30 whitespace-nowrap">CH {fromChapter}</span>
        <div className="relative flex-1 h-px bg-bone/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-brass/60 via-brass to-ember/60 rtl:bg-gradient-to-l"
            initial={{ width: reduce ? "100%" : "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.2, ease: [0.2, 0.7, 0.1, 1] }}
          />
        </div>
        <span className="tc text-brass whitespace-nowrap">{label}</span>
        <div className="relative flex-1 h-px bg-bone/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 right-0 bg-gradient-to-l from-brass/60 via-brass to-ember/60 rtl:bg-gradient-to-r"
            initial={{ width: reduce ? "100%" : "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.2, ease: [0.2, 0.7, 0.1, 1] }}
          />
        </div>
        <span className="tc text-bone/30 whitespace-nowrap">CH {toChapter}</span>
      </div>
    </div>
  );
}
