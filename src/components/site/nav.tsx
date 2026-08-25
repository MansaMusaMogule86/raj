"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useLang } from "@/lib/i18n";
import { navLinks, brand, ascend, ctas } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { Timecode } from "@/components/site/cinematic";
import { CommandPaletteTrigger } from "@/components/site/command-palette";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function Nav() {
  const { lang, t, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        // Determine active section by probing at 45vh
        const probe = window.innerHeight * 0.45;
        let current: string | null = null;
        for (const l of navLinks) {
          const el = document.getElementById(l.id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= probe && r.bottom > probe) {
            current = l.id;
            break;
          }
        }
        setActiveSection(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (href: string, id: string) => {
    analytics.navClick(id, lang);
    setOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-obsidian/85 backdrop-blur-md border-b border-bone/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 sm:gap-3 flex-shrink-0"
          aria-label="Raja Idries — home"
        >
          <span className="display-condensed text-bone text-lg md:text-xl tracking-tight">RAJA</span>
          <span className="display-condensed text-brass text-lg md:text-xl tracking-tight">IDRIES</span>
          <span className="hidden 2xl:inline tc text-bone/50 border-s border-bone/20 ps-3 ms-1 text-xs">
            {lang === "ar" ? "إرتقِ" : "ASCEND"}
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-shrink-0">
          {navLinks.slice(0, 6).map((l) => {
            const isActive = activeSection === l.id;
            return (
              <button
                key={l.id}
                onClick={() => go(l.href, l.id)}
                className={`relative tc text-xs 2xl:text-sm tracking-wider uppercase whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive ? "text-bone font-medium" : "text-bone/70 hover:text-bone"
                }`}
              >
                {t(l.label)}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute -bottom-1 inset-x-0 h-px bg-brass"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          <CommandPaletteTrigger onOpen={() => {
            // Dispatch the Cmd+K shortcut programmatically since the palette listens at window level
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
          }} />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="text-bone/70 hover:text-bone hover:bg-bone/5 gap-1.5 px-2 sm:px-3"
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="tc text-xs">{lang === "en" ? "العربية" : "EN"}</span>
          </Button>

          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex bg-brass text-obsidian hover:bg-brass/90 font-medium px-3.5"
            onClick={() => analytics.ascendCta("nav", lang)}
          >
            <a href={ascend.checkoutUrl} target="_blank" rel="noopener noreferrer">
              {t(ctas.joinAscend)}
              <ArrowUpRight className="h-3.5 w-3.5 ms-1" />
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden text-bone p-1" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={lang === "ar" ? "left" : "right"}
              className="w-full sm:w-96 bg-obsidian border-bone/10 p-6 flex flex-col"
            >
              <SheetTitle className="flex items-center justify-between">
                <span className="display-condensed text-bone text-xl">RAJA <span className="text-brass">IDRIES</span></span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu"><X className="h-5 w-5 text-bone" /></Button>
                </SheetClose>
              </SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                <Timecode className="text-bone/40 mb-2">{lang === "ar" ? "الفصول" : "Chapters"}</Timecode>
                {navLinks.map((l, i) => {
                  const isActive = activeSection === l.id;
                  return (
                  <button
                    key={l.id}
                    onClick={() => go(l.href, l.id)}
                    className={`group flex items-center justify-between py-3 border-b transition-colors ${
                      isActive
                        ? "border-brass text-brass ps-3"
                        : "border-bone/10 text-bone/90 hover:text-brass ps-0"
                    }`}
                  >
                    <span className={`display text-2xl ${isActive ? "text-brass" : ""}`}>{t(l.label)}</span>
                    <span className={`tc ${isActive ? "text-brass" : "text-bone/40"}`}>
                      {isActive ? "▸ " : ""}{String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                  );
                })}
              </div>
              <div className="mt-auto pt-6 flex flex-col gap-3">
                <Button
                  asChild
                  className="bg-brass text-obsidian hover:bg-brass/90"
                  onClick={() => analytics.ascendCta("nav_mobile", lang)}
                >
                  <a href={ascend.checkoutUrl} target="_blank" rel="noopener noreferrer">
                    {t(ctas.joinAscend)} <ArrowUpRight className="h-4 w-4 ms-1" />
                  </a>
                </Button>
                <p className="tc text-bone/40 text-center">
                  {lang === "ar" ? `${ascend.memberCountVerified ? ascend.memberCount : "—"} مشترك` : `${ascend.memberCount} members · $${ascend.priceUsd}/mo`}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
