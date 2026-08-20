"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Users, Calendar, MessageSquare, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/lib/i18n";
import { ascend, faq, brand } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { ChapterHeader, BrassRule, Timecode } from "@/components/site/cinematic";

const TIMELINE = [
  { icon: Users, en: "You arrive", ar: "تصل", desc: { en: "You join the Skool community and get the welcome guide.", ar: "تنضم لمجتمع سكول وتستلم دليل الترحيب." } },
  { icon: BookOpen, en: "You read the Ascend guide", ar: "تقرأ دليل إرتقِ", desc: { en: "The practical, step-by-step manual for rebuilding your system.", ar: "الدليل العملي خطوة بخطوة لإعادة بناء نظامك." } },
  { icon: Calendar, en: "You join the weekly call", ar: "تنضم للمكالمة الأسبوعية", desc: { en: "Live with Raja — questions, guidance, and the week's focus.", ar: "مباشر مع راجا — أسئلة، توجيه، وتركيز الأسبوع." } },
  { icon: MessageSquare, en: "You apply, with the community", ar: "تطبّق، مع المجتمع", desc: { en: "Daily and weekly actions shared with people on the same path.", ar: "أفعال يومية وأسبوعية تشاركها مع أشخاص بنفس الطريق." } },
];

export function AscendCommunity() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";

  return (
    <section id="ascend" className="relative bg-obsidian py-24 md:py-36 overflow-hidden border-y border-bone/10">
      {/* Brass glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 start-1/4 w-[50rem] h-[50rem] rounded-full bg-brass/8 blur-3xl" />
        <div className="absolute bottom-0 end-0 w-[40rem] h-[40rem] rounded-full bg-olive/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Headline cluster */}
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <ChapterHeader
              chapter="05"
              kicker={ar ? "مجتمع إرتقِ" : "The Ascend Community"}
              title={
                <span>
                  <span className="block">{ar ? "أول مجتمع عربي" : "The first Arabic"}</span>
                  <span className="block text-brass">{ar ? "لتغيير حقيقي و مستدام" : "community for real, sustainable change."}</span>
                </span>
              }
              lede={t(ascend.tagline)}
            />
          </div>
          {/* Live stat card */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 border border-brass/30 bg-secondary/30 frame-marker"
            >
              <Timecode className="text-bone/50">{ar ? "الآن" : "Now"}</Timecode>
              <div className="mt-4 flex items-end gap-2">
                <span className="display text-bone text-5xl">{ascend.memberCount}</span>
                <span className="text-bone/60 text-sm mb-1">{ar ? "مشترك" : "members"}</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="display text-brass text-3xl">${ascend.priceUsd}</span>
                <span className="tc text-bone/60">/ {ar ? "شهر" : "month"}</span>
              </div>
              <p className="tc text-bone/40 mt-2">
                {ar ? `لأول ${ascend.introMemberCap} مشترك، ثم $${ascend.priceUsdFull}` : `First ${ascend.introMemberCap} members, then $${ascend.priceUsdFull}/mo`}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-5 w-full bg-brass text-obsidian hover:bg-brass/90 rounded-full h-12"
              >
                <a
                  href={ascend.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.ascendCta("community_hero", lang)}
                >
                  {ar ? "ابدأ رحلة ارتقِ" : "Join Ascend"} <ArrowUpRight className="h-4 w-4 ms-1" />
                </a>
              </Button>
              <p className="tc text-bone/40 text-center mt-2">{ar ? "ألغِ بأي وقت" : "Cancel anytime"}</p>
            </motion.div>
          </div>
        </div>

        <BrassRule className="mt-16" />

        {/* Benefits grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ascend.benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="p-6 border border-bone/10 bg-secondary/20 hover:border-brass/40 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-brass mt-1 flex-shrink-0" />
                <p className="text-bone/90 leading-relaxed">{t(b)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fit note */}
        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-12 p-8 border-s-4 border-brass bg-secondary/20 ${ar ? "text-right" : ""}`}
        >
          <p className={`display text-bone text-2xl sm:text-3xl ${ar ? "display-ar" : ""} leading-snug`}>
            {t(ascend.fitNote)}
          </p>
          <p className={`display text-brass text-xl sm:text-2xl mt-4 ${ar ? "display-ar" : ""}`}>
            {t(ascend.invitation)}
          </p>
        </motion.blockquote>

        {/* What happens after you join */}
        <div className="mt-20">
          <ChapterHeader
            chapter="05.1"
            kicker={ar ? "بعد الانضمام" : "What happens after you join"}
            title={ar ? "أربعة مشاهد أولى" : "Your first four scenes"}
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIMELINE.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative p-6 border border-bone/10 bg-secondary/20"
              >
                <span className="tc text-brass/70 block mb-4">{String(i + 1).padStart(2, "0")}</span>
                <s.icon className="h-6 w-6 text-brass mb-3" />
                <p className="display text-bone text-xl mb-2">{ar ? s.ar : s.en}</p>
                <p className="text-bone/60 text-sm leading-relaxed">{t(s.desc)}</p>
                {i < TIMELINE.length - 1 && (
                  <span className="absolute top-1/2 -end-3 -translate-y-1/2 text-brass/40 rtl:rotate-180 hidden lg:inline">→</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community preview */}
        <div className="mt-20 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-video overflow-hidden border border-bone/10 frame-marker bg-secondary">
              <img
                src={ascend.previewImage}
                alt={ar ? "معاينة واجهة مجتمع إرتقِ" : "Ascend community interface preview"}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between">
                <Timecode className="text-bone/80">{ar ? "واجهة إرتقِ على سكول" : "Ascend interface on Skool"}</Timecode>
                <a
                  href={ascend.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tc text-brass hover:text-bone"
                >
                  {ar ? "معاينة حية" : "Live preview"} →
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Timecode>{ar ? "الواجهة" : "The interface"}</Timecode>
            <p className={`display text-bone text-3xl sm:text-4xl mt-3 ${ar ? "display-ar" : ""}`}>
              {ar ? "مكان واحد لكل شي." : "One place for everything."}
            </p>
            <p className="text-bone/70 mt-4 leading-relaxed">
              {ar
                ? "الدليل، المكالمات الأسبوعية، المهام، النقاشات، والمجتمع — كلهم بمكان واحد على سكول. بدون تطبيقات منفصلة أو ضياع."
                : "The guide, weekly calls, tasks, discussions, and community — all in one place on Skool. No scattered apps, no lost threads."}
            </p>
            <Button
              asChild
              className="mt-6 bg-brass text-obsidian hover:bg-brass/90 rounded-full"
            >
              <a
                href={ascend.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.ascendCta("community_preview", lang)}
              >
                {ar ? "ابدأ رحلة ارتقِ" : "Join Ascend"} <ArrowUpRight className="h-4 w-4 ms-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <ChapterHeader
              chapter="05.2"
              kicker={ar ? "أسئلة شائعة" : "FAQ"}
              title={ar ? "الأسئلة الجوهرية" : "The honest questions"}
            />
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-bone/15">
                  <AccordionTrigger className="display text-bone text-xl hover:text-brass text-start rtl:text-right">
                    {t(item.q)}
                  </AccordionTrigger>
                  <AccordionContent className="text-bone/70 text-base leading-relaxed text-start rtl:text-right">
                    {t(item.a)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Final community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center p-10 border border-brass/30 bg-secondary/30 frame-marker"
        >
          <p className={`display text-bone text-3xl sm:text-4xl ${ar ? "display-ar" : ""}`}>
            {ar ? "ابدأ. طبّق. تقدّم. خطوة بخطوة." : "Start. Apply. Progress. Step by step."}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-brass text-obsidian hover:bg-brass/90 rounded-full h-12 px-8"
          >
            <a
              href={ascend.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.ascendCta("community_final", lang)}
            >
              {ar ? `ابدأ رحلة ارتقِ — $${ascend.priceUsd}/شهر` : `Join Ascend — $${ascend.priceUsd}/mo`} <ArrowUpRight className="h-4 w-4 ms-1" />
            </a>
          </Button>
          <p className="tc text-bone/40 mt-3">{ar ? "بدون التزام طويل المدى" : "No long-term commitment"}</p>
        </motion.div>
      </div>
    </section>
  );
}
