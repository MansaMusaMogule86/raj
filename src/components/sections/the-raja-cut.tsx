"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, FileText, Mic, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cutEntries, cutCategories, type CutEntry } from "@/lib/content";
import { ChapterHeader, Timecode, FrameMarker } from "@/components/site/cinematic";
import { ShareBar } from "@/components/site/share-bar";

const ICONS: Record<CutEntry["kind"], typeof Play> = {
  video: Play,
  note: FileText,
  podcast: Mic,
};

export function TheRajaCut() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const [filter, setFilter] = useState<"all" | CutEntry["category"]>("all");

  const filtered = useMemo(
    () => (filter === "all" ? cutEntries : cutEntries.filter((e) => e.category === filter)),
    [filter]
  );

  return (
    <section id="journal" className="relative bg-bone text-obsidian py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute bottom-0 end-0 w-[36rem] h-[36rem] rounded-full bg-brass/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ChapterHeader
          chapter="08"
          kicker={ar ? "أفكار راجا — الـ CUT" : "The Raja Cut"}
          title={
            <>
              <span className="block">THE RAJA CUT</span>
              <span className="block text-brass mt-1">{ar ? "أفكار راجا" : ""}</span>
            </>
          }
          lede={
            ar
              ? "دروس قصيرة، تفكيك تغذية، استراتيجيات عادات، ظهور بودكاست، فيديوهات، خلف الكاميرا، وتأملات شخصية — تُعرض كأفلام وليس كبطاقات مدوّنة."
              : "Short lessons, nutrition breakdowns, habit strategies, podcast appearances, videos, behind-the-camera notes, and personal reflections — presented as frames, not blog cards."
          }
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`tc px-4 py-2 border transition-colors ${
              filter === "all" ? "border-brass bg-brass text-obsidian" : "border-obsidian/15 text-obsidian/70 hover:border-obsidian/40"
            }`}
          >
            {ar ? "الكل" : "All"}
          </button>
          {cutCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`tc px-4 py-2 border transition-colors ${
                filter === c.id ? "border-brass bg-brass text-obsidian" : "border-obsidian/15 text-obsidian/70 hover:border-obsidian/40"
              }`}
            >
              {t(c.label)}
            </button>
          ))}
        </div>

        {/* Contact sheet */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((e, i) => {
              const Icon = ICONS[e.kind];
              return (
                <motion.article
                  key={e.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: reduce ? 0 : 0.35, delay: i * 0.03 }}
                  className="group relative p-5 border border-obsidian/15 bg-white/40 backdrop-blur-sm frame-marker hover:border-brass/50 hover:bg-white/70 transition-all cursor-pointer lift"
                >
                  {/* Top metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="tc text-obsidian/40">{e.kind === "video" ? "VID" : e.kind === "podcast" ? "POD" : "NOTE"}</span>
                    {e.duration && <span className="tc text-brass">{e.duration}</span>}
                  </div>

                  {/* Visual frame */}
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-obsidian">
                    <div className="absolute inset-0 bg-gradient-to-br from-olive/30 via-obsidian to-obsidian" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-bone/60 group-hover:text-brass transition-colors" />
                    </div>
                    {/* film perforations */}
                    <div className="absolute top-0 inset-x-0 h-2 flex">
                      {Array.from({ length: 8 }).map((_, k) => (
                        <span key={k} className="flex-1 border-x border-obsidian/40 bg-obsidian/60 mx-px mt-px h-2" />
                      ))}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-2 flex">
                      {Array.from({ length: 8 }).map((_, k) => (
                        <span key={k} className="flex-1 border-x border-obsidian/40 bg-obsidian/60 mx-px mb-px h-2" />
                      ))}
                    </div>
                  </div>

                  <h3 className={`display text-obsidian text-xl ${ar ? "display-ar" : ""} leading-snug`}>
                    {t(e.title)}
                  </h3>
                  <p className="text-obsidian/65 text-sm mt-2 leading-relaxed">{t(e.excerpt)}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="tc text-obsidian/40">{e.category.toUpperCase()}</span>
                    <ArrowUpRight className="h-4 w-4 text-obsidian/40 group-hover:text-brass transition-colors" />
                  </div>

                  <div className="mt-3 pt-3 border-t border-obsidian/10">
                    <ShareBar title={t(e.title)} sectionId={`cut-${e.id}`} />
                  </div>

                  {e.placeholder && (
                    <span className="absolute top-2 end-2 tc text-brass/50 bg-obsidian/80 px-2 py-1 rounded">
                      {ar ? "مؤقت" : "Draft"}
                    </span>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Channel CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border border-obsidian/15 bg-white/40"
        >
          <div>
            <Timecode>{ar ? "المصدر الحي" : "The live source"}</Timecode>
            <p className={`display text-obsidian text-2xl mt-1 ${ar ? "display-ar" : ""}`}>
              {ar ? "قناة راجا على يوتيوب" : "Raja's YouTube channel"}
            </p>
          </div>
          <a
            href="https://www.youtube.com/channel/UCQirKQinz3P-6IBdCjD0Dig"
            target="_blank"
            rel="noopener noreferrer"
            className="tc text-obsidian hover:text-brass transition-colors flex items-center gap-1"
          >
            {ar ? "افتح القناة" : "Open the channel"} <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
