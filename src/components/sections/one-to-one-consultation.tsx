"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { consult, brand, ascend, ctas } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { ChapterHeader, BrassRule, Timecode, FrameMarker } from "@/components/site/cinematic";

export function OneToOneConsultation() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";

  return (
    <section id="coaching" className="relative bg-bone text-obsidian py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-20 start-0 w-[36rem] h-[36rem] rounded-full bg-sand/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ChapterHeader
          chapter="10"
          kicker={ar ? "توجيه ١:١" : "One-to-One Consultation"}
          title={ar ? "جلسة مركّزة. زاوية واحدة." : "A focused session. One edge."}
          lede={t(consult.whoFor)}
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-8">
          {/* Left: what & how */}
          <div className="lg:col-span-7 space-y-10">
            {/* What Raja can help with */}
            <div>
              <Timecode className="block mb-4">{ar ? "بما يساعدك" : "What Raja can help with"}</Timecode>
              <ul className="space-y-3">
                {consult.canHelp.map((c, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: reduce ? 0 : -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 text-brass mt-1 flex-shrink-0" />
                    <span className="text-obsidian/80 text-lg">{t(c)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <BrassRule className="bg-obsidian" />

            {/* How it works */}
            <div>
              <Timecode className="block mb-4">{ar ? "كيف تجري الجلسة" : "How the session works"}</Timecode>
              <ol className="space-y-4">
                {consult.howItWorks.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <span className="chapter-num text-brass text-2xl flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-obsidian/80 text-lg leading-relaxed pt-1">{t(s)}</span>
                  </motion.li>
                ))}
              </ol>
            </div>

            <BrassRule className="bg-obsidian" />

            {/* What to prepare */}
            <div>
              <Timecode className="block mb-4">{ar ? "حضّر معك" : "What to prepare"}</Timecode>
              <ul className="grid sm:grid-cols-3 gap-3">
                {consult.prepare.map((p, i) => (
                  <li key={i} className="p-4 border border-obsidian/15 bg-white/40 frame-marker">
                    <span className="tc text-obsidian/40 block mb-2">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-obsidian/80">{t(p)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <BrassRule className="bg-obsidian" />

            {/* What happens after */}
            <div>
              <Timecode className="block mb-3">{ar ? "ماذا بعد الجلسة" : "What happens afterward"}</Timecode>
              <p className="text-obsidian/80 text-lg leading-relaxed">{t(consult.after)}</p>
            </div>
          </div>

          {/* Right: booking card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28 p-8 border border-brass/30 bg-obsidian text-bone frame-marker"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-brass" />
                <div>
                  <Timecode className="text-bone/60">{ar ? "حجز مباشر" : "Direct booking"}</Timecode>
                  <p className="display text-bone text-2xl">{ar ? "استشارة ٤٥ دقيقة" : "45-minute consultation"}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-bone/70 text-sm">
                  <Check className="h-4 w-4 text-brass mt-0.5 flex-shrink-0" /> {ar ? "ملخص مكتوب بعد الجلسة" : "Written summary after the session"}
                </li>
                <li className="flex items-start gap-2 text-bone/70 text-sm">
                  <Check className="h-4 w-4 text-brass mt-0.5 flex-shrink-0" /> {ar ? "اتجاه ٩٠ يوم واضح" : "Clear 90-day direction"}
                </li>
                <li className="flex items-start gap-2 text-bone/70 text-sm">
                  <Check className="h-4 w-4 text-brass mt-0.5 flex-shrink-0" /> {ar ? "أول فعل قابل للتكرار" : "First repeatable action"}
                </li>
                <li className="flex items-start gap-2 text-bone/70 text-sm">
                  <Check className="h-4 w-4 text-brass mt-0.5 flex-shrink-0" /> {ar ? "بدون التزام متابعة" : "No follow-up obligation"}
                </li>
              </ul>

              <Button
                asChild
                size="lg"
                className="w-full bg-brass text-obsidian hover:bg-brass/90 rounded-full h-12"
                onClick={() => analytics.consultCta("coaching_card", lang)}
              >
                <a href={brand.bookingUrl} target="_blank" rel="noopener noreferrer">
                  {t(ctas.bookConsult)} <ArrowUpRight className="h-4 w-4 ms-1" />
                </a>
              </Button>

              {brand.bookingPlaceholderNote && (
                <p className="tc text-bone/40 text-center mt-3">
                  {ar ? "رابط الحجز — يضبطه راجا قبل الإطلاق" : "Booking link — Raja to set before launch"}
                </p>
              )}

              <div className="mt-6 pt-6 border-t border-bone/10 text-center">
                <p className="tc text-bone/40 mb-3">{ar ? "أو انضم لإرتقِ أولاً" : "Or join Ascend first"}</p>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-bone/70 hover:text-bone hover:bg-bone/5"
                  onClick={() => analytics.ascendCta("coaching_ascend_alt", lang)}
                >
                  <a href={ascend.checkoutUrl} target="_blank" rel="noopener noreferrer">
                    {t(ctas.joinAscend)} <ArrowUpRight className="h-4 w-4 ms-1" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* No-results promise */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="tc text-obsidian/50 text-center max-w-2xl mx-auto mt-12 leading-relaxed"
        >
          {ar
            ? "لا يُعِد بنتائج جسدية مضمونة. النتائج تعتمد على نقطة بدايتك، استمراريتك، نومك، ضغطك، وجيناتك. ما يُعِد به: نظام، توجيه، وأول فعل قابل للتكرار."
            : "No guaranteed physical results. Outcomes depend on your starting point, consistency, sleep, stress, and genetics. What it does promise: a system, direction, and the first repeatable action."}
        </motion.p>
      </div>
    </section>
  );
}
