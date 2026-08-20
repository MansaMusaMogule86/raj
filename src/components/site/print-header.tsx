"use client";

import { useLang } from "@/lib/i18n";
import { navLinks } from "@/lib/content";

/**
 * PrintHeader — a per-section chapter header that appears ONLY in print
 * (hidden on screen via the print stylesheet's display rules). Renders the
 * real chapter number + title so printed pages have proper chapter labels
 * instead of the generic "— Chapter —" from the CSS pseudo-element.
 *
 * Mount inside a <section>; it reads the section id from its parent.
 */
export function PrintHeader({ sectionId }: { sectionId: string }) {
  const { lang, t } = useLang();
  const ar = lang === "ar";
  const idx = navLinks.findIndex((l) => l.id === sectionId);
  const link = navLinks[idx];
  if (!link) return null;
  const num = String(idx + 1).padStart(2, "0");

  return (
    <div
      className="print-only-chapter-header"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <span className="print-chapter-num">{num}</span>
      <span className="print-chapter-title">{t(link.label)}</span>
      <span className="print-chapter-label">{ar ? "إرتقِ · راجا إدريس" : "ASCEND · Raja Idries"}</span>
      <style>{`
        @media print {
          .print-only-chapter-header {
            display: flex !important;
            align-items: baseline;
            gap: 0.75rem;
            border-bottom: 1px solid #8A6630;
            padding-bottom: 0.3rem;
            margin: 1.5rem 0 0.75rem;
            font-family: var(--font-mono), monospace;
            font-size: 9pt;
            color: #8A6630;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          .print-chapter-num {
            font-weight: 700;
            font-size: 11pt;
          }
          .print-chapter-title {
            color: #1B1A18;
            font-family: var(--font-display), sans-serif;
            font-size: 13pt;
            letter-spacing: 0;
            text-transform: none;
            font-weight: 700;
          }
          .print-chapter-label {
            margin-inline-start: auto;
            font-size: 7pt;
            color: #6B6356;
          }
        }
      `}</style>
    </div>
  );
}
