"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { ascend } from "@/lib/content";
import { ChapterHeader, MaskLine, BrassRule } from "@/components/site/cinematic";

const CYCLE = [
  { en: "Motivation", ar: "تحفيز" },
  { en: "Extreme plan", ar: "خطة قاسية" },
  { en: "Short-term progress", ar: "تقدّم مؤقت" },
  { en: "Burnout", ar: "إنهاك" },
  { en: "Guilt", ar: "ذنب" },
  { en: "Start again", ar: "إعادة البدء" },
];

export function RealProblem() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";

  return (
    <section id="problem" className="relative bg-obsidian py-24 md:py-36 overflow-hidden">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 start-1/4 w-[40rem] h-[40rem] rounded-full bg-olive/20 blur-3xl" />
        <div className="absolute bottom-0 end-0 w-[30rem] h-[30rem] rounded-full bg-ember/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ChapterHeader
          chapter="02"
          kicker={ar ? "المشكلة الحقيقية" : "The Real Problem"}
          title={
            <>
              <MaskLine>{ar ? "أنت لا تحتاج" : "You do not need more"}</MaskLine>
              <MaskLine delay={0.05} className="text-bone/60">
                {ar ? "معلومات لياقة أكتر." : "fitness information."}
              </MaskLine>
              <MaskLine delay={0.1} className="text-brass mt-2">
                {ar ? "تحتاج نظام يقدر يصمد." : "You need a system you can live with."}
              </MaskLine>
            </>
          }
        />

        {/* The cycle */}
        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="tc text-bone/50 mb-6">{ar ? "الدائرة المألوفة" : "The familiar cycle"}</p>
            <ol className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CYCLE.map((c, i) => (
                <motion.li
                  key={c.en}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative p-4 border border-bone/10 rounded-sm bg-secondary/40 frame-marker"
                >
                  <span className="tc text-brass/70 block mb-2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-bone text-xl">{ar ? c.ar : c.en}</span>
                  {i < CYCLE.length - 1 && (
                    <span className="absolute -end-2 top-1/2 -translate-y-1/2 text-brass/40 rtl:rotate-180 hidden sm:inline">→</span>
                  )}
                </motion.li>
              ))}
            </ol>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="h-px flex-1 bg-ember/40" />
              <span className="tc text-ember">{ar ? "تنكسر هنا" : "It breaks here"}</span>
              <span className="h-px flex-1 bg-ember/40" />
            </motion.div>
          </div>

          {/* Compassionate framing */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <p className={`display text-bone text-3xl sm:text-4xl ${ar ? "display-ar" : ""} leading-snug`}>
                {ar
                  ? "ليست مشكلة إرادة. أغلب الناس يملكون الإرادة. المشكلة هي بناء نظام لا يكسر بعد أسبوعين."
                  : "It is not a willpower problem. Most people have willpower. The problem is a system that breaks after two weeks."}
              </p>
              <p className="text-bone/70 text-lg leading-relaxed">
                {ar
                  ? "اللوم على نفسك بسبب الفشل بمخطط مستحيل هو اللي بيخلّي ترجع لنفس الدائرة. كسر الدائرة يعني تبني نظام يصمد بأيامك السيّئة، مش بس بأيامك المثالية."
                  : "Blaming yourself for failing an impossible plan is what sends you back into the loop. Breaking the cycle means building a system that survives your worst days — not just your perfect ones."}
              </p>
              <BrassRule />
              <p className={`display text-brass text-2xl sm:text-3xl ${ar ? "display-ar" : ""}`}>
                {t(ascend.invitation)}
              </p>
              <a
                href="#ascend"
                className="inline-flex items-center gap-2 tc text-bone/70 hover:text-brass transition-colors"
              >
                {ar ? "إرتقِ — النظام القابل للحياة" : "Ascend — the livable system"} →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
