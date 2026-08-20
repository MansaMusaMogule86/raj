"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { finalAscent } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { Timecode, MaskLine } from "@/components/site/cinematic";

export function FinalAscent() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const headline = t(finalAscent.headline).split("\n");

  return (
    <section
      id="final-ascent"
      className="relative min-h-[100svh] w-full overflow-hidden bg-obsidian flex items-center"
      aria-label={ar ? "الصعود الأخير" : "Final ascent"}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: reduce ? 1 : 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.1, 1] }}
      >
        <img
          src="/images/scene-final.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0";
          }}
        />
        <div className="absolute inset-0 bg-obsidian/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/80" />
        <div className="vignette" />
        <div className="light-leak" />
      </motion.div>

      {/* Top frame markers */}
      <div className="absolute top-24 inset-x-0 z-10 flex items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <Timecode className="text-bone/60">{ar ? "الفصل الأخير · ١٣" : "Final frame · 13"}</Timecode>
        <Timecode className="text-bone/60 hidden sm:inline">TC 00:13:00:00</Timecode>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 text-center py-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="tc text-brass mb-6"
        >
          {ar ? "الصعود الأخير" : "The final ascent"}
        </motion.p>

        <h1 className={`display text-bone text-5xl sm:text-7xl md:text-8xl ${ar ? "display-ar" : ""}`}>
          {headline.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: reduce ? 0 : "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1], delay: reduce ? 0 : i * 0.15 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.6 }}
          className="mt-10"
        >
          <Button
            asChild
            size="lg"
            className="bg-brass text-obsidian hover:bg-brass/90 rounded-full text-lg px-10 h-14"
            onClick={() => analytics.ascendCta("final_ascent", lang)}
          >
            <a href={finalAscent.href === "#ascend" ? "https://www.skool.com/ascend-by-raja-3003/" : finalAscent.href} target="_blank" rel="noopener noreferrer">
              {t(finalAscent.cta)} <ArrowUpRight className="h-5 w-5 ms-1" />
            </a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.9 }}
          className={`mt-10 max-w-2xl mx-auto text-bone/60 ${ar ? "display-ar text-lg" : "display text-xl"} leading-snug`}
        >
          {ar ? "أنت مش مستني قصة تحوّلك. أنت بتوجّهها." : "You are not waiting for your transformation story. You are directing it."}
        </motion.p>
      </div>

      {/* Bottom signature */}
      <div className="absolute bottom-6 inset-x-0 z-10 flex items-center justify-center gap-3">
        <span className="display-condensed text-bone/60 text-sm">RAJA</span>
        <span className="display-condensed text-brass text-sm">IDRIES</span>
        <span className="tc text-bone/40 border-s border-bone/20 ps-3 ms-1">ASCEND_001 · END</span>
      </div>
    </section>
  );
}
