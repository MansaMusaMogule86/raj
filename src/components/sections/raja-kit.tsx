"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Tag, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { kitItems, kitCategories, type KitItem } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { ChapterHeader, Timecode, FrameMarker, BrassRule } from "@/components/site/cinematic";

export function RajaKit() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const [cat, setCat] = useState<"all" | KitItem["category"]>("all");

  const filtered = useMemo(
    () => (cat === "all" ? kitItems : kitItems.filter((i) => i.category === cat)),
    [cat]
  );

  return (
    <section id="kit" className="relative bg-obsidian py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-0 end-1/4 w-[40rem] h-[40rem] rounded-full bg-brass/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ChapterHeader
          chapter="09"
          kicker={ar ? "عتاد راجا" : "Raja's Kit"}
          title={ar ? "مكتبة توصيات منسّقة." : "A curated recommendation library."}
          lede={
            ar
              ? "ليست متجر. أدوات يستخدمها راجا فعلًا، مرتّبة حسب الفئة — مع كود الخصم متى وُجد، وإفصاح واضح عن الروابط التابعة."
              : "Not a store. Tools Raja actually uses, organized by category — with discount codes where they exist, and clear affiliate disclosure."
          }
        />

        {/* Affiliate disclosure */}
        <div className="mt-6 flex items-start gap-2 p-3 border-s-2 border-brass bg-secondary/20 max-w-2xl">
          <Info className="h-4 w-4 text-brass flex-shrink-0 mt-0.5" />
          <p className="text-bone/60 text-sm leading-relaxed">
            {ar
              ? "بعض الروابط تابعة (affiliate). إذا اشتريت عبرها، يحصل راجا على عمولة بنفس السعر لك — لا يؤثر ذلك على اختياره للأدوات."
              : "Some links are affiliate. If you buy through them, Raja earns a commission at no extra cost to you — it does not influence which tools he recommends."}
          </p>
        </div>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setCat("all")}
            className={`tc px-4 py-2 border transition-colors ${
              cat === "all" ? "border-brass bg-brass text-obsidian" : "border-bone/15 text-bone/70 hover:border-bone/40"
            }`}
          >
            {ar ? "الكل" : "All"}
          </button>
          {kitCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`tc px-4 py-2 border transition-colors ${
                cat === c.id ? "border-brass bg-brass text-obsidian" : "border-bone/15 text-bone/70 hover:border-bone/40"
              }`}
            >
              {t(c.label)}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: reduce ? 0 : 0.35, delay: i * 0.04 }}
                className="group relative flex flex-col p-5 border border-bone/10 bg-secondary/20 frame-marker hover:border-brass/40 transition-colors lift"
              >
                {/* Product image placeholder */}
                <div className="relative aspect-square mb-4 overflow-hidden bg-obsidian border border-bone/10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-bone/5 via-obsidian to-obsidian" />
                  <span className="tc text-bone/30 relative z-10">
                    {item.placeholder ? (ar ? "صورة منتج — يضافها راجا" : "Product image — Raja to add") : (ar ? "صورة المنتج" : "Product image")}
                  </span>
                  {item.code && (
                    <span className="absolute top-2 end-2 flex items-center gap-1 bg-ember text-obsidian px-2 py-1 rounded text-xs font-medium">
                      <Tag className="h-3 w-3" /> {item.code}
                    </span>
                  )}
                </div>

                {/* Category + name */}
                <span className="tc text-brass/70 mb-1">{item.category.toUpperCase()}</span>
                <h3 className="display text-bone text-xl mb-3">{item.name}</h3>

                {/* Why + for whom */}
                <div className="space-y-3 flex-1">
                  <div>
                    <span className="tc text-bone/40 block mb-1">{ar ? "ليش يستخدمه" : "Why Raja uses it"}</span>
                    <p className="text-bone/75 text-sm leading-relaxed">{t(item.why)}</p>
                  </div>
                  <div>
                    <span className="tc text-bone/40 block mb-1">{ar ? "لمين مفيد" : "Useful for"}</span>
                    <p className="text-bone/75 text-sm leading-relaxed">{t(item.forWhom)}</p>
                  </div>
                </div>

                {/* Purchase */}
                <div className="mt-5 pt-4 border-t border-bone/10">
                  {item.url ? (
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-brass text-obsidian hover:bg-brass/90"
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        onClick={() => analytics.productClick(item.id, item.name, item.affiliate, lang)}
                      >
                        {ar ? "اشترِ الآن" : "Buy now"} <ExternalLink className="h-3 w-3 ms-1" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-bone/15 text-bone/50"
                      disabled
                    >
                      {ar ? "الرابط قادم" : "Link coming"}
                    </Button>
                  )}
                  {item.affiliate && (
                    <p className="tc text-bone/30 text-center mt-2">{ar ? "رابط تابع" : "Affiliate link"}</p>
                  )}
                </div>

                {item.placeholder && (
                  <span className="absolute top-2 start-2 tc text-brass/50 bg-obsidian/80 px-2 py-1 rounded">
                    {ar ? "مؤقت" : "Draft"}
                  </span>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <BrassRule className="mt-12" />

        {/* Subordination note — Kit does not overpower Ascend */}
        <p className="tc text-bone/40 text-center max-w-2xl mx-auto mt-6 leading-relaxed">
          {ar
            ? "العتاد طبقة داعمة، ليس الهدف. النظام الحقيقي يبدأ بإرتقِ — الأدوات تساعد على التطبيق، لا تعوّض عنه."
            : "The kit is a supporting layer, not the goal. The real system starts with Ascend — tools help you apply, not replace it."}
        </p>
      </div>
    </section>
  );
}
