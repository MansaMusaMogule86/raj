"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/lib/i18n";
import { assessmentQuestions, assessmentPaths, ascend, brand, type PathId } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { ChapterHeader, BrassRule, Timecode } from "@/components/site/cinematic";

export function ChooseNextScene() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [email, setEmail] = useState("");

  // Start assessment fires analytics
  const start = () => {
    analytics.assessmentStart(lang);
    setStarted(true);
  };

  // Score → path mapping
  const path: PathId = useMemo(() => {
    const score = { ascend: 0, consult: 0, guide: 0 };
    for (const q of assessmentQuestions) {
      const ans = answers[q.id];
      if (!ans) continue;
      const opt = q.options.find((o) => o.id === ans);
      if (!opt) continue;
      score.ascend += opt.weight.ascend;
      score.consult += opt.weight.consult;
      score.guide += opt.weight.guide;
    }
    const max = Math.max(score.ascend, score.consult, score.guide);
    if (max === 0) return "guide";
    if (score.ascend === max) return "ascend";
    if (score.consult === max) return "consult";
    return "guide";
  }, [answers]);

  const result = assessmentPaths[path];
  const isLast = step === assessmentQuestions.length - 1;
  const completed = started && step >= assessmentQuestions.length;

  const select = (qid: string, oid: string) => {
    setAnswers((a) => ({ ...a, [qid]: oid }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const captureEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    analytics.emailCapture("assessment", lang);
    analytics.assessmentComplete(path, lang);
    setEmailCaptured(true);
  };

  return (
    <section id="assessment" className="relative bg-obsidian py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 end-0 w-[36rem] h-[36rem] rounded-full bg-brass/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 md:px-8">
        <ChapterHeader
          chapter="04"
          kicker={ar ? "اختر مشهدك القادم" : "Choose Your Next Scene"}
          title={ar ? "ست أسئلة. مسار واحد." : "Six questions. One path."}
          lede={
            ar
              ? "تقييم سريع لأسلوب حياتك. لا يشخّص حالات صحية. يقترح الخطوة العملية التالية — إرتقِ، استشارة، أو دليل مجاني."
              : "A short lifestyle assessment. It does not diagnose health conditions. It suggests one practical next step — Ascend, a consultation, or a free guide."
          }
        />

        <div className="mt-8 sm:mt-12 relative min-h-[360px] sm:min-h-[420px] p-4 sm:p-8 md:p-10 border border-bone/10 bg-secondary/20 frame-marker">
          {/* Progress / timecode */}
          {started && !completed && (
            <div className="flex items-center justify-between mb-8">
              <Timecode>{ar ? `المشهد ${step + 1} / ${assessmentQuestions.length}` : `Scene ${step + 1} / ${assessmentQuestions.length}`}</Timecode>
              <div className="h-1 w-32 bg-bone/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-brass"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step) / assessmentQuestions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Intro */}
          {!started && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-10"
            >
              <p className={`display text-bone text-3xl sm:text-4xl max-w-2xl mx-auto ${ar ? "display-ar" : ""}`}>
                {ar ? "اعرف مشهدك القادم قبل ما تبدأ." : "Know your next scene before you start."}
              </p>
              <p className="text-bone/60 mt-4 max-w-xl mx-auto">
                {ar ? "ست أسئلة، دقيقة وحدة من وقتك. نهايتك: خطوة واضحة." : "Six questions, one minute of your time. Your end: one clear step."}
              </p>
              <Button
                onClick={start}
                size="lg"
                className="mt-8 bg-brass text-obsidian hover:bg-brass/90 rounded-full h-12 px-7"
              >
                {ar ? "ابدأ التقييم" : "Begin the assessment"} <ArrowRight className="h-4 w-4 ms-1 rtl:rotate-180" />
              </Button>
            </motion.div>
          )}

          {/* Question flow */}
          <AnimatePresence mode="wait">
            {started && !completed && (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: reduce ? 0 : ar ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : ar ? 30 : -30 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {(() => {
                  const q = assessmentQuestions[step];
                  return (
                    <>
                      <h3 className={`display text-bone text-2xl sm:text-3xl ${ar ? "display-ar" : ""}`}>
                        {t(q.prompt)}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {q.options.map((o) => {
                          const selected = answers[q.id] === o.id;
                          return (
                            <button
                              key={o.id}
                              onClick={() => select(q.id, o.id)}
                              className={`group text-start p-4 border transition-all ${
                                selected
                                  ? "border-brass bg-brass/10"
                                  : "border-bone/15 hover:border-bone/40 hover:bg-bone/5"
                              }`}
                            >
                              <span className="flex items-center justify-between">
                                <span className="text-bone">{t(o.label)}</span>
                                <ArrowRight className="h-4 w-4 text-bone/40 group-hover:text-brass group-hover:translate-x-1 rtl:rotate-180 transition-transform" />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {step > 0 && (
                        <button
                          onClick={() => setStep((s) => s - 1)}
                          className="tc text-bone/50 hover:text-bone"
                        >
                          ← {ar ? "السابق" : "Back"}
                        </button>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center">
                <Timecode>{ar ? "مسارك" : "Your path"}</Timecode>
                <h3 className={`display text-brass text-4xl sm:text-5xl mt-3 ${ar ? "display-ar" : ""}`}>
                  {t(result.label)}
                </h3>
                <p className="text-bone/70 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">{t(result.desc)}</p>
              </div>
              <BrassRule />

              {/* Email capture (only after value delivered) */}
              {!emailCaptured ? (
                <form onSubmit={captureEmail} className="max-w-md mx-auto space-y-3">
                  <label className="tc text-bone/60 block text-center">
                    {ar ? "ابعته لي — استلم ملخص الخطوة التالية" : "Send it to me — get the next-step summary"}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={ar ? "بريدك الإلكتروني" : "your@email.com"}
                      className="bg-bone/5 border-bone/20 text-bone placeholder:text-bone/40 h-11"
                    />
                    <Button type="submit" size="default" className="bg-brass text-obsidian hover:bg-brass/90 h-11 px-5 flex-shrink-0">
                      <Mail className="h-4 w-4 me-1" /> {ar ? "أرسل" : "Send"}
                    </Button>
                  </div>
                  <p className="tc text-bone/40 text-center">{ar ? "بدون رسائل مزعجة. فقط الخطوة التالية." : "No spam. Just the next step."}</p>
                </form>
              ) : (
                <p className="text-center text-bone/70">
                  {ar ? "تم. تحقق من بريدك." : "Done. Check your inbox."}
                </p>
              )}

              {/* Next step CTA */}
              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-brass text-obsidian hover:bg-brass/90 rounded-full h-12 px-7"
                >
                  <a href={result.href === "#ascend" ? ascend.checkoutUrl : result.href}>
                    {t(result.cta)}
                  </a>
                </Button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setStarted(false);
                    setStep(0);
                    setAnswers({});
                    setEmailCaptured(false);
                    setEmail("");
                  }}
                  className="tc text-bone/50 hover:text-bone inline-flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> {ar ? "إعادة" : "Restart"}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <p className="tc text-bone/40 text-center mt-6 max-w-2xl mx-auto">
          {ar ? "هذا التقييم أسلوب حياة تعليمي، وليس تشخيصًا طبيًا." : "This is an educational lifestyle assessment, not a medical diagnosis."}
        </p>
      </div>
    </section>
  );
}
