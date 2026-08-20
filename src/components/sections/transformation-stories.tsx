"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { transformStories, healthDisclaimer } from "@/lib/content";
import { ChapterHeader, BrassRule, Timecode, FrameMarker } from "@/components/site/cinematic";

const FIELDS: { key: keyof typeof transformStories[number]; label: { en: string; ar: string } }[] = [
  { key: "reality", label: { en: "Starting reality", ar: "الواقع البدئي" } },
  { key: "obstacle", label: { en: "Main obstacle", ar: "العائق الرئيسي" } },
  { key: "habit", label: { en: "Habit that changed everything", ar: "العادة اللي غيّرت كل شي" } },
  { key: "approach", label: { en: "Training & nutrition", ar: "التمرين والتغذية" } },
  { key: "result", label: { en: "What changed", ar: "ما تغيّر" } },
  { key: "sustainable", label: { en: "What became sustainable", ar: "ما صار مستدام" } },
];

export function TransformationStories() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";

  return (
    <section id="stories" className="relative bg-obsidian py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 start-0 w-[40rem] h-[40rem] rounded-full bg-olive/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ChapterHeader
          chapter="07"
          kicker={ar ? "قصص تحوّل" : "Transformation Stories"}
          title={ar ? "ليست معرض قبل-وبعد." : "Not a before-and-after gallery."}
          lede={
            ar
              ? "كل قصة محقّقة تُحكى كوثائقي قصير: الواقع، العائق، العادة، التمرين، النتيجة، وما صار مستدام. النتائج تُذكر فقط متى تحقّقت وأُذِن بها."
              : "Every verified story is told as a short documentary: reality, obstacle, habit, training, result, and what became sustainable. Outcomes appear only when verified and authorized."
          }
        />

        {/* Documentary cards */}
        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {transformStories.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative p-6 sm:p-8 border border-bone/10 bg-secondary/20 frame-marker"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="chapter-num text-brass text-4xl">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <Timecode className="text-bone/50">{ar ? "وثائقي قصير" : "Short documentary"}</Timecode>
                    <p className="display text-bone text-xl">{ar ? "مشترك إرتقِ" : "Ascend member"}</p>
                  </div>
                </div>
                <Quote className="h-6 w-6 text-brass/40" />
              </div>

              {/* Portrait placeholder */}
              <div className="relative aspect-video mb-6 overflow-hidden bg-obsidian border border-bone/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-olive/20 via-obsidian to-obsidian" />
                <span className="tc text-bone/40 relative z-10">{ar ? "بورتريه — يحتاج إذن" : "Portrait — pending consent"}</span>
              </div>

              {/* Fields */}
              <dl className="space-y-4">
                {FIELDS.map((f) => (
                  <div key={f.key} className="grid grid-cols-12 gap-3 pb-4 border-b border-bone/10 last:border-0">
                  <dt className="col-span-12 sm:col-span-4 tc text-bone/50">
                    {ar ? f.label.ar : f.label.en}
                  </dt>
                  <dd className="col-span-12 sm:col-span-8 text-bone/85 leading-relaxed text-sm sm:text-base">
                    {t(s[f.key] as { en: string; ar: string })}
                  </dd>
                </div>
                ))}
              </dl>

              <p className="tc text-brass/60 mt-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brass/60" />
                {ar ? "قصة مرشدة — تُتحقّق وتُؤذن قبل الإطلاق" : "Curated story — to verify & authorize before launch"}
              </p>
            </motion.article>
          ))}
        </div>

        <BrassRule className="mt-14" />

        {/* Disclaimer */}
        <p className="tc text-bone/40 max-w-3xl mx-auto text-center mt-8 leading-relaxed">
          {t(healthDisclaimer)}
        </p>
      </div>
    </section>
  );
}
