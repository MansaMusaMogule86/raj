"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * RunTime — film-style "run time" badge for a section.
 * Estimates reading time from the section's text content (word count / 200 wpm),
 * displayed as a timecode (e.g. "RT 02:14"). Cached per section id after first
 * measurement. Honesty: estimate only, not a precise metric.
 */
export function RunTime({ sectionId, className = "" }: { sectionId: string; className?: string }) {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [rt, setRt] = useState<string | null>(null);

  useEffect(() => {
    // Defer measurement to after paint
    const id = window.setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const text = el.innerText || el.textContent || "";
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      if (words < 40) return; // too short to badge
      const minutes = Math.max(1, Math.round(words / 200));
      const mm = String(minutes).padStart(2, "0");
      const ss = String(Math.round((words % 200) / 200 * 60)).padStart(2, "0");
      setRt(`${mm}:${ss}`);
    }, 300);
    return () => window.clearTimeout(id);
  }, [sectionId, lang]);

  if (!rt) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 tc text-brass/80 ${className}`}
      title={ar ? "تقدير وقت القراءة" : "Estimated reading time"}
    >
      <Clock className="h-3 w-3" />
      <span>{ar ? `مدة ${rt}` : `RT ${rt}`}</span>
    </span>
  );
}
