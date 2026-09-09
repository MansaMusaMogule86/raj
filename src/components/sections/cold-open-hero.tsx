"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { brand, ascend, ctas, lines } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { Timecode } from "@/components/site/cinematic";
import { CinematicBackground } from "@/components/site/cinematic-background";

const FLASH_WORDS = [
  { en: "TRAIN", ar: "درّب" },
  { en: "EAT", ar: "كُل" },
  { en: "LIVE", ar: "عِش" },
];

/**
 * SECTION 1 — THE COLD OPEN
 * Full-screen cinematic hero. Rapid TRAIN / EAT / LIVE flash, then the
 * headline reveal. Static image fallback (video optional & lazy).
 */
export function ColdOpenHero() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const [phase, setPhase] = useState<0 | 1 | 2>(reduce ? 2 : 0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (reduce) {
      const id = window.setTimeout(() => setPhase(2), 0);
      return () => window.clearTimeout(id);
    }
    // Phase 0: flash words ~2.4s, then phase 1: brief hold, then phase 2: full reveal
    const t1 = setTimeout(() => setPhase(1), 2400);
    const t2 = setTimeout(() => setPhase(2), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-obsidian"
      aria-label="Cold open"
    >
      {/* Background: ambient cinematic layer with poster fallback (lazy video slot reserved) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0.55 }}
        transition={{ duration: 1.2 }}
      >
        <CinematicBackground
          posterSrc="/images/raja-idries-hero-desktop.png"
          alt={ar ? "بورتريه سينمائي لراجا إدريس" : "Cinematic portrait of Raja Idries"}
          priority
        />
        {/* Cinematic gradients + vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-obsidian/40 rtl:bg-gradient-to-l" />
        <div className="vignette" />
        <div className="light-leak" />
      </motion.div>

      {/* Top film metadata bar */}
      <div className="absolute top-20 md:top-24 inset-x-0 z-10 flex items-center justify-between px-4 md:px-8 max-w-7xl mx-auto pointer-events-none">
        <Timecode className="text-bone/60">REC · 24FPS · ASCEND_001</Timecode>
        <Timecode className="text-bone/60 hidden sm:inline">TC 00:00:01:00</Timecode>
      </div>

      {/* Flash sequence: TRAIN / EAT / LIVE */}
      <AnimatePresence mode="wait">
        {phase === 0 && !reduce && (
          <motion.div
            key="flash"
            className="absolute inset-0 z-20 flex items-center justify-center bg-obsidian"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <div className="relative">
              {FLASH_WORDS.map((w, i) => (
                <motion.span
                  key={w.en}
                  className="display-condensed text-bone absolute inset-0 text-center text-7xl sm:text-9xl md:text-[12rem]"
                  initial={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [1.15, 1, 1, 0.95], filter: ["blur(12px)", "blur(0px)", "blur(0px)", "blur(6px)"] }}
                  transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1], delay: i * 0.8 }}
                >
                  {ar ? w.ar : w.en}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main hero content */}
      <div className="relative z-30 min-h-[100svh] flex flex-col justify-end px-4 md:px-8 pb-20 md:pb-28 max-w-7xl mx-auto pt-28">
        {/* Kicker line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 flex items-center gap-2.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brass/90" />
          <span className="tc text-brass/90 text-xs sm:text-sm tracking-wider uppercase">
            {t(brand.tagline)}
          </span>
        </motion.div>

        {/* Headline — masked reveal */}
        <h1 className={`display text-bone text-5xl sm:text-7xl md:text-8xl lg:text-9xl max-w-5xl ${ar ? "display-ar" : ""}`}>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: reduce ? 0 : "110%" }}
              animate={{ y: phase >= 2 ? 0 : "110%" }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1], delay: reduce ? 0 : 0.15 }}
            >
              {ar ? "ابنِ جسمك." : "Build the body."}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-brass"
              initial={{ y: reduce ? 0 : "110%" }}
              animate={{ y: phase >= 2 ? 0 : "110%" }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1], delay: reduce ? 0 : 0.3 }}
            >
              {ar ? "وجّه حياتك." : "Direct the life."}
            </motion.span>
          </span>
        </h1>

        {/* Supporting message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 16 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.55 }}
          className={`mt-6 max-w-2xl text-bone/75 text-base sm:text-lg leading-relaxed ${ar ? "text-right" : ""}`}
        >
          {ar
            ? "نظام عربي عملي لبناء حياة أصح وأقوى وأكثر استدامة، عبر التمرين والتغذية والنوم والعادات اليومية — بدون حرمان أو ضغط المثالية."
            : "A practical Arabic system for building a healthier, stronger, and more sustainable life through training, nutrition, sleep, and daily habits — without deprivation or the pressure of perfection."}
        </motion.p>

        {/* CTAs — staggered entrance */}
        <motion.div
          initial="hidden"
          animate={phase >= 2 ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.75 } },
          }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] } } }}
          >
          <Button
            asChild
            size="lg"
            className="bg-brass text-obsidian hover:bg-brass/90 rounded-full text-base px-7 h-12 glow-brass"
          >
            <a
              href={ascend.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.ascendCta("hero_primary", lang)}
            >
              {t(ctas.joinAscend)} <ArrowUpRight className="h-5 w-5 ms-1" />
            </a>
          </Button>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] } } }}
          >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-bone/25 text-bone hover:bg-bone/5 text-base px-7 h-12"
          >
            <a href="#story">
              <Play className="h-4 w-4 me-2" />
              {t(ctas.watchStory)}
            </a>
          </Button>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] } } }}
          >
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-bone/70 hover:text-bone hover:bg-bone/5 rounded-full text-base h-12"
          >
            <a href="#method">{t(ctas.exploreMethod)}</a>
          </Button>
          </motion.div>
        </motion.div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 1.1 }}
          className="mt-10 flex items-center justify-between"
        >
          <span className="tc text-bone/40">
            {ar ? "اضغط الفصول بالأعلى للتنقّل" : "Scroll for the chapters"}
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="tc text-brass/80"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>

      {/* Ambient video audio toggle (toggles future video mute; currently visual) */}
      <div className="absolute bottom-6 end-4 md:end-8 z-30">
        <Button
          variant="ghost"
          size="icon"
          className="text-bone/40 hover:text-bone rounded-full border border-bone/15 hover:border-brass/40 transition-colors"
          aria-label={muted ? (ar ? "تشغيل الصوت" : "Unmute") : (ar ? "كتم الصوت" : "Mute")}
          onClick={() => {
            setMuted((m) => !m);
            analytics.track({ event: "video_play", id: "hero_ambient", title: muted ? "hero_unmute" : "hero_mute", lang });
          }}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </section>
  );
}
