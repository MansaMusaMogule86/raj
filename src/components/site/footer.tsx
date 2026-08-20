"use client";

import { ArrowUpRight, Globe, Mail, Cookie } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { brand, socials, navLinks, healthDisclaimer, ascend, ctas } from "@/lib/content";
import { Timecode, BrassRule } from "@/components/site/cinematic";
import { Button } from "@/components/ui/button";
import { SubscribeBand } from "@/components/site/subscribe-form";

export function Footer() {
  const { lang, t, setLang } = useLang();
  const ar = lang === "ar";
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative bg-obsidian border-t border-bone/10 mt-24">
      <div className="light-leak opacity-40" />
      {/* Final CTA strip */}
      <div className="relative border-b border-bone/10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 flex flex-col items-center text-center gap-6">
          <Timecode>{ar ? "الفصل الأخير" : "Final Frame"}</Timecode>
          <h2 className={`display text-bone text-4xl sm:text-5xl md:text-6xl max-w-3xl ${ar ? "display-ar" : ""}`}>
            {ar ? "ابنِ جسمك. وجّه حياتك." : "Build the body. Direct the life."}
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-brass text-obsidian hover:bg-brass/90 rounded-full"
            >
              <a href={ascend.checkoutUrl} target="_blank" rel="noopener noreferrer">
                {t(ctas.joinAscend)} <ArrowUpRight className="h-4 w-4 ms-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-bone/20 text-bone hover:bg-bone/5">
              <a href={brand.bookingUrl} target="_blank" rel="noopener noreferrer">{t(ctas.bookConsult)}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Subscribe band */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 pt-12">
        <SubscribeBand />
      </div>

      {/* Main footer grid */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="display-condensed text-bone text-2xl">RAJA</span>
            <span className="display-condensed text-brass text-2xl">IDRIES</span>
          </div>
          <p className="text-bone/60 text-sm leading-relaxed max-w-xs">{t(brand.tagline)}</p>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(ar ? "en" : "ar")}
              className="text-bone/70 hover:text-bone hover:bg-bone/5 gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="tc">{ar ? "English" : "العربية"}</span>
            </Button>
          </div>
        </div>

        <div className="md:col-span-3">
          <Timecode className="mb-4 block">{ar ? "الفصول" : "Chapters"}</Timecode>
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={l.href} className="text-bone/70 hover:text-brass transition-colors text-sm link-underline">
                  {t(l.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <Timecode className="mb-4 block">{ar ? "تواصل" : "Connect"}</Timecode>
          <ul className="flex flex-col gap-2">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-bone/70 hover:text-brass transition-colors text-sm"
                >
                  {s.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <Timecode className="mb-1">{ar ? "تواصل مباشر" : "Direct"}</Timecode>
          <a href={`mailto:${brand.email}`} className="group inline-flex items-center gap-2 text-bone hover:text-brass transition-colors text-sm">
            <Mail className="h-4 w-4" /> {brand.email}
          </a>
          {brand.emailPlaceholderNote && (
            <p className="tc text-bone/30">
              {ar ? "بريد مؤقت — ليؤكّده راجا قبل الإطلاق" : "Placeholder email — Raja to confirm before launch"}
            </p>
          )}
        </div>
      </div>

      <BrassRule className="mx-auto max-w-7xl" />

      {/* Disclaimer + legal */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-start">
        <p className="tc text-bone/40 max-w-3xl">{t(healthDisclaimer)}</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("ascend:reopen-consent"));
              }
            }}
            className="tc text-bone/40 hover:text-brass transition-colors flex items-center gap-1"
            aria-label={ar ? "تفضيلات الكوكيز" : "Cookie preferences"}
          >
            <Cookie className="h-3 w-3" />
            {ar ? "تفضيلات" : "Cookies"}
          </button>
          <p className="tc text-bone/40 whitespace-nowrap">
            © {year} Raja Idries · {ar ? "إرتقِ" : "Ascend"}
          </p>
        </div>
      </div>
    </footer>
  );
}
