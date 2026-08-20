"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

/**
 * PrintButton — triggers window.print() with a film-style label.
 * Uses the global print stylesheet (in globals.css @media print) which
 * cleans the layout for offline reading of the Method + Kit chapters.
 */
export function PrintButton({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  const ar = lang === "ar";
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
      className={`border-bone/20 text-bone/70 hover:text-bone hover:bg-bone/5 rounded-full gap-2 ${className}`}
      title={ar ? "اطبع هذا الفصل" : "Print this chapter"}
    >
      <Printer className="h-3.5 w-3.5" />
      <span className="tc">{ar ? "اطبع" : "Print"}</span>
    </Button>
  );
}
