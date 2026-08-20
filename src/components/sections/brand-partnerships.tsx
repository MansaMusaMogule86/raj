"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { partnerships, brand } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { ChapterHeader, BrassRule, Timecode } from "@/components/site/cinematic";

export function BrandPartnerships() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";

  return (
    <section id="partnerships" className="relative bg-obsidian py-24 md:py-36 overflow-hidden border-t border-bone/10">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-10 end-0 w-[36rem] h-[36rem] rounded-full bg-olive/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ChapterHeader
          chapter="11"
          kicker={ar ? "شراكات العلامات" : "Brand Partnerships"}
          title={ar ? "انضمامي انتقائي." : "Selective by default."}
          lede={t(partnerships.intro)}
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-start">
          {/* Criteria */}
          <div className="lg:col-span-7">
            <Timecode className="block mb-4">{ar ? "المعايير" : "The criteria"}</Timecode>
            <ul className="space-y-3">
              {partnerships.criteria.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: reduce ? 0 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-4 border border-bone/10 bg-secondary/20"
                >
                  <Check className="h-5 w-5 text-brass mt-1 flex-shrink-0" />
                  <span className="text-bone/85 text-lg">{t(c)}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Pitch card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 border border-brass/30 bg-secondary/30 frame-marker"
            >
              <Timecode className="text-bone/60">{ar ? "للعلامات" : "For brands"}</Timecode>
              <p className={`display text-bone text-3xl mt-3 ${ar ? "display-ar" : ""}`}>
                {t(partnerships.cta)}
              </p>
              <p className="text-bone/70 mt-4 leading-relaxed">
                {ar
                  ? "ابعث بريد إلكتروني واضح: العلامة، المنتج، الجمهور، ولما تناسب مع نهج راجا المستدام."
                  : "Send a clear email: the brand, the product, the audience, and why it fits Raja's sustainable approach."}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 w-full bg-brass text-obsidian hover:bg-brass/90 rounded-full h-12"
              >
                <a href={`mailto:${partnerships.email}?subject=${encodeURIComponent(ar ? "اقتراح شراكة" : "Partnership pitch")}`}>
                  <Mail className="h-4 w-4 me-2" /> {partnerships.email}
                </a>
              </Button>
              {brand.emailPlaceholderNote && (
                <p className="tc text-bone/40 text-center mt-3">
                  {ar ? "بريد مؤقت — يؤكّده راجا" : "Placeholder email — Raja to confirm"}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        <BrassRule className="mt-16" />

        {/* Subordination note */}
        <p className="tc text-bone/40 text-center max-w-2xl mx-auto mt-6 leading-relaxed">
          {ar
            ? "الشراكات لا تتقدّم على مصلحة المجتمع. أي علامة تُرى هنا تكون قد استخدمها راجا فعلًا وتناسب نهجه."
            : "Partnerships never precede the community's interest. Any brand featured here has been used by Raja and fits his approach."}
        </p>
      </div>
    </section>
  );
}
