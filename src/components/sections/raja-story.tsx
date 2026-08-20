"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { storyFrames } from "@/lib/content";
import { ChapterHeader, BrassRule, Timecode, FrameMarker } from "@/components/site/cinematic";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Film } from "lucide-react";
import { ascend, ctas } from "@/lib/content";
import { analytics } from "@/lib/analytics";

export function RajaStory() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";

  return (
    <section id="story" className="relative bg-bone text-obsidian py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-20 end-10 w-[36rem] h-[36rem] rounded-full bg-sand/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ChapterHeader
          chapter="06"
          kicker={ar ? "قصة راجا — معالجة المخرج" : "Raja's Story — Director's Treatment"}
          title={ar ? "أربع لقطات." : "Four frames."}
          lede={
            ar
              ? "ليست سيرة ذاتية كاملة. أربع لقطات تشرح ليش هذا النظام موجود. التفاصيل الكاملة لم تُقدّم بعد — المواضع الناقصة موضّحة كأماكن مؤقتة."
              : "Not a full biography. Four frames that explain why this system exists. Full details not yet provided — missing material is clearly marked as placeholder."
          }
        />

        {/* Director's intro band */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-obsidian frame-marker">
              <img
                src="/images/scene-story.png"
                alt={ar ? "بورتريه سينمائي — راجا خلف الكاميرا" : "Cinematic portrait — Raja behind the camera"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
              <div className="absolute top-3 start-3 flex items-center gap-2">
                <Film className="h-4 w-4 text-brass" />
                <Timecode className="text-bone/80">DIR. TREATMENT</Timecode>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className={`display text-obsidian text-3xl sm:text-4xl ${ar ? "display-ar" : ""} leading-snug`}>
              {ar
                ? "قبل الجسم، كان العدسة. سنوات ورا الكاميرا علمت راجا يلاحظ — يقرا الإنسان، الضوء، اللحظة، ويحكي حقيقتها."
                : "Before the body, there was the lens. Years behind a camera taught Raja to observe — to read a person, a light, a moment, and to tell the truth of it."}
            </p>
            <p className="text-obsidian/70 text-lg leading-relaxed">
              {ar
                ? "هالحس لسه يؤطّر كل شي بيبنيه — من كيف يكتب التمرين، لكيف يحكي قصة تحوّل بصدق."
                : "That instinct still frames everything he builds — from how he writes a training program to how he tells a transformation story honestly."}
            </p>
          </div>
        </div>

        <BrassRule className="my-16" />

        {/* Frames grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {storyFrames.map((f, i) => (
            <motion.article
              key={f.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative p-8 border border-obsidian/15 bg-white/40 backdrop-blur-sm frame-marker group hover:border-brass/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="chapter-num text-brass text-5xl">{f.num}</span>
                <div className="flex-1">
                  <Timecode className="text-obsidian/50">{ar ? "لقطة" : "Frame"}</Timecode>
                  <h3 className={`display text-obsidian text-3xl ${ar ? "display-ar" : ""}`}>{t(f.title)}</h3>
                </div>
              </div>
              <p className="text-obsidian/80 text-base sm:text-lg leading-relaxed">{t(f.body)}</p>
              {f.placeholder && (
                <p className="tc text-brass/60 mt-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brass/60" />
                  {ar ? "تفاصيل السيرة — يستلمها راجا قبل الإطلاق" : "Biography detail — Raja to provide before launch"}
                </p>
              )}
            </motion.article>
          ))}
        </div>

        {/* Mission CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-10 border border-brass/30 bg-obsidian text-bone text-center frame-marker"
        >
          <Timecode className="text-bone/60">{ar ? "المهمة" : "The mission"}</Timecode>
          <p className={`display text-bone text-3xl sm:text-4xl mt-3 max-w-3xl mx-auto ${ar ? "display-ar" : ""} leading-snug`}>
            {ar
              ? "مساعدة العرب يبنوا حياة صحية يقدروا يحافظوا عليها — بلغتهم، بدون حرمان أو ضغط المثالية."
              : "Help Arabic-speaking people build healthier lives they can maintain — in their own language, without deprivation or the pressure of perfection."}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-brass text-obsidian hover:bg-brass/90 rounded-full"
              onClick={() => analytics.ascendCta("story_cta", lang)}
            >
              <a href={ascend.checkoutUrl} target="_blank" rel="noopener noreferrer">
                {t(ctas.joinAscend)} <ArrowUpRight className="h-4 w-4 ms-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-bone/25 text-bone hover:bg-bone/5">
              <a href="#method">{t(ctas.exploreMethod)}</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
