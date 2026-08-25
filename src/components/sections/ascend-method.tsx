"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { pillars } from "@/lib/content";
import { ChapterHeader, BrassRule } from "@/components/site/cinematic";
import { PrintButton } from "@/components/site/print-button";
import { PrintHeader } from "@/components/site/print-header";

const PILLAR_IMAGES: Record<string, string> = {
  training: "/images/scene-training.png",
  nutrition: "/images/scene-nutrition.png",
  sleep: "/images/scene-story.png",
  habits: "/images/raja-idries-hero-desktop.png",
};

export function AscendMethod() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const [active, setActive] = useState(0);
  const current = pillars[active];

  return (
    <section id="method" className="relative bg-bone text-obsidian py-24 md:py-36 overflow-hidden">
      {/* Warm texture */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute -top-32 start-0 w-[40rem] h-[40rem] rounded-full bg-sand/30 blur-3xl" />
        <div className="absolute bottom-0 end-10 w-[30rem] h-[30rem] rounded-full bg-brass/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <PrintHeader sectionId="method" />
        <ChapterHeader
          chapter="03"
          kicker={ar ? "منهجية إرتقِ" : "The Ascend Method"}
          title={ar ? "أربعة أعمدة. نظام واحد." : "Four pillars. One system."}
          lede={
            ar
              ? "لا يوجد عمود يعمل بمفرده. التمرين يبني الجسم، التغذية تشغّله، النوم يثبّته، والعادات تربطهم معًا بحياة حقيقية."
              : "No pillar works alone. Training builds the body. Nutrition fuels it. Sleep consolidates it. Habits bind all three to a real life."
          }
        />

        {/* Pillar selector tabs */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative text-start p-6 border transition-all duration-300 ${
                  isActive
                    ? "border-brass bg-obsidian text-bone"
                    : "border-obsidian/15 bg-transparent text-obsidian hover:border-obsidian/40"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`chapter-num text-2xl ${isActive ? "text-brass" : "text-obsidian/30"}`}>{p.num}</span>
                  <span className={`tc ${isActive ? "text-bone/60" : "text-obsidian/40"}`}>{t(p.title)}</span>
                </div>
                <p className={`display text-3xl ${ar ? "display-ar" : ""} ${isActive ? "text-bone" : "text-obsidian"}`}>
                  {t(p.title)}
                </p>
                <p className={`mt-3 text-sm ${isActive ? "text-bone/70" : "text-obsidian/60"}`}>
                  {t(p.principle)}
                </p>
                {isActive && (
                  <motion.span
                    layoutId="pillar-active"
                    className="absolute -bottom-px start-0 h-0.5 w-full bg-brass"
                    transition={{ duration: reduce ? 0 : 0.3 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active pillar detail */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-obsidian frame-marker">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={PILLAR_IMAGES[current.id]}
                  alt={t(current.title)}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.2, 0.7, 0.1, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
                <span className="tc text-bone/70">FRAME · {current.num}</span>
                <span className="chapter-num text-bone text-3xl">{current.num}</span>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <span className="tc text-brass">{t(current.title)}</span>
                  <p className={`display text-obsidian text-4xl sm:text-5xl mt-2 ${ar ? "display-ar" : ""}`}>
                    {t(current.principle)}
                  </p>
                </div>
                <BrassRule className="bg-obsidian" />
                <div>
                  <span className="tc text-obsidian/50">{ar ? "الدرس" : "The lesson"}</span>
                  <p className="text-obsidian/80 text-lg leading-relaxed mt-2">{t(current.lesson)}</p>
                </div>
                <div>
                  <span className="tc text-obsidian/50">{ar ? "مثال عملي" : "Practical example"}</span>
                  <p className="text-obsidian/80 text-lg leading-relaxed mt-2">{t(current.example)}</p>
                </div>
                <div>
                  <span className="tc text-obsidian/50 block mb-3">{ar ? "محتوى ذو علاقة" : "Related from Raja"}</span>
                  <ul className="flex flex-col gap-2">
                    {current.content.map((c, i) => (
                      <li key={i}>
                        <a
                          href="#journal"
                          className="group inline-flex items-center gap-2 text-obsidian hover:text-brass transition-colors"
                        >
                          <span className="tc text-obsidian/40">{c.kind === "video" ? "VID" : "NOTE"}</span>
                          <span className="border-b border-transparent group-hover:border-brass">{t(c.label)}</span>
                          <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className={`display text-obsidian/80 text-3xl sm:text-4xl max-w-3xl mx-auto ${ar ? "display-ar" : ""}`}>
            {ar ? "العادات تبقى. التحفيز يمشي. ابنِ نظام يصمد." : "Habits stay. Motivation leaves. Build what lasts."}
          </p>
          <a href="#ascend" className="mt-6 inline-flex items-center gap-2 tc text-brass hover:text-obsidian transition-colors">
            {ar ? "اكتشف إرتقِ" : "Explore Ascend"} →
          </a>
          <div className="mt-6">
            <PrintButton className="border-obsidian/20 text-obsidian/70 hover:text-obsidian hover:bg-obsidian/5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
