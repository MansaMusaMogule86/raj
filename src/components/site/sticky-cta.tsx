"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { ascend, ctas, brand } from "@/lib/content";
import { analytics } from "@/lib/analytics";

/**
 * Sticky conversion cluster.
 * Desktop: floating bottom-corner card that appears after the hero.
 * Mobile: compact bottom bar with the primary CTA.
 */
export function StickyCTA() {
  const { lang, t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      // Hide when near the final-ascend section to avoid CTA stacking
      const finalAscent = document.getElementById("final-ascent");
      let nearEnd = false;
      if (finalAscent) {
        const r = finalAscent.getBoundingClientRect();
        nearEnd = r.top < window.innerHeight * 0.5;
      }
      setShow(past && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop floating cluster */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.1, 1] }}
            className="hidden md:flex fixed bottom-6 z-40 items-center gap-3 p-2 ps-4 rounded-full bg-obsidian/80 backdrop-blur-md border border-bone/15 shadow-[0_8px_40px_rgba(10,10,9,0.6)]"
            style={{ [lang === "ar" ? "left" : "right"]: "1.5rem" } as React.CSSProperties}
          >
            <span className="tc text-bone/60 hidden lg:inline">
              {lang === "ar" ? "ابدأ الآن" : "Begin"}
            </span>
            <Button
              asChild
              size="sm"
              className="bg-brass text-obsidian hover:bg-brass/90 rounded-full"
              onClick={() => analytics.ascendCta("sticky_desktop", lang)}
            >
              <a href={ascend.checkoutUrl} target="_blank" rel="noopener noreferrer">
                {t(ctas.joinAscend)} <ArrowUpRight className="h-4 w-4 ms-1" />
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full border-bone/20 text-bone hover:bg-bone/5"
              onClick={() => analytics.consultCta("sticky_desktop", lang)}
            >
              <a href={brand.bookingUrl} target="_blank" rel="noopener noreferrer">
                <Calendar className="h-4 w-4 me-1" /> {t(ctas.bookConsult)}
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.1, 1] }}
            className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-obsidian/95 backdrop-blur-md border-t border-bone/15 px-3 py-2.5 flex items-center gap-2"
            style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex-1 min-w-0">
              <p className="tc text-bone/50 truncate">
                {lang === "ar" ? `${ascend.memberCount} مشترك · $${ascend.priceUsd}/شهر` : `${ascend.memberCount} members · $${ascend.priceUsd}/mo`}
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="bg-brass text-obsidian hover:bg-brass/90 rounded-full flex-shrink-0"
              onClick={() => analytics.ascendCta("sticky_mobile", lang)}
            >
              <a href={ascend.checkoutUrl} target="_blank" rel="noopener noreferrer">
                {t(ctas.joinAscend)} <ArrowUpRight className="h-4 w-4 ms-1" />
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
