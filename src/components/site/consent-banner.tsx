"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Check, X, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLang } from "@/lib/i18n";

type Consent = "accepted" | "declined" | null;
const KEY = "ascend-consent";
const PREFS_KEY = "ascend-consent-prefs";

interface Prefs {
  analytics: boolean;
  marketing: boolean;
}

export function ConsentBanner() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ analytics: true, marketing: false });
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    let stored: Consent = null;
    try {
      const v = localStorage.getItem(KEY);
      if (v === "accepted" || v === "declined") stored = v;
    } catch {
      /* ignore */
    }
    // Defer state updates out of the effect body to avoid cascading renders
    const id = window.setTimeout(() => {
      setConsent(stored);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // Slight delay so it doesn't fight the hero cold-open animation; auto-dismiss
  // after 25s if no decision (non-blocking — visitor can still scroll).
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (ready && consent === null) {
      const id = setTimeout(() => setShow(true), 3200);
      const autoId = setTimeout(() => {
        // Auto-dismiss after 25s visible — does NOT set consent, just hides
        setShow(false);
      }, 28200);
      return () => {
        clearTimeout(id);
        clearTimeout(autoId);
      };
    }
  }, [ready, consent]);

  // Allow re-opening the banner from the footer "Cookie preferences" button
  // — sets consent back to null so the visitor can re-decide with their prefs.
  useEffect(() => {
    const onReopen = () => {
      setConsent(null);
      setShow(true);
      setShowPrefs(true);
    };
    window.addEventListener("ascend:reopen-consent", onReopen);
    return () => window.removeEventListener("ascend:reopen-consent", onReopen);
  }, []);

  const decide = (c: Exclude<Consent, null>) => {
    setConsent(c);
    setShow(false);
    try {
      localStorage.setItem(KEY, c);
      // Save granular prefs alongside the consent decision
      localStorage.setItem(PREFS_KEY, JSON.stringify(c === "accepted" ? prefs : { analytics: false, marketing: false }));
    } catch {
      /* ignore */
    }
    // Notify analytics layer
    window.dispatchEvent(new CustomEvent("ascend:consent", { detail: { consent: c, prefs: c === "accepted" ? prefs : null } }));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}
          className="fixed bottom-0 inset-x-0 z-[80] md:bottom-0"
          role="dialog"
          aria-label={ar ? "موافقة الكوكيز" : "Cookie consent"}
        >
          <div
            className="mx-auto max-w-5xl m-3 md:m-4 p-4 md:p-5 rounded-sm bg-obsidian/95 backdrop-blur-md border border-brass/30 shadow-[0_8px_40px_rgba(10,10,9,0.7)]"
            style={{ marginBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-full bg-brass/15">
                  <Cookie className="h-4 w-4 text-brass" />
                </div>
                <div className="min-w-0">
                  <p className="tc text-bone/60 mb-1">
                    {ar ? "إرتقِ — الموافقة" : "ASCEND — consent"}
                  </p>
                  <p className="text-bone/85 text-sm leading-relaxed">
                    {ar
                      ? "نستخدم تحليلات مجهولة الهوية لفهم أي الفصول تهمك، لتحسين التجربة. لا نخزّن بيانات شخصية ولا نبيع شيئًا."
                      : "We use anonymous analytics to understand which chapters you care about, so the experience improves. No personal data stored, nothing sold."}
                  </p>
                  <p className="tc text-bone/40 mt-1.5 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    {ar ? "يمكنك التراجع بأي وقت من شريط اللغة بالأعلى." : "You can change this anytime from the language bar."}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPrefs((v) => !v)}
                  className="text-bone/50 hover:text-bone hover:bg-bone/5 rounded-full gap-1"
                  aria-expanded={showPrefs}
                  aria-label={ar ? "تخصيص التفضيلات" : "Customize preferences"}
                >
                  {showPrefs ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  {ar ? "تفضيلات" : "Customize"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => decide("declined")}
                  className="border-bone/25 text-bone/70 hover:bg-bone/5 rounded-full"
                >
                  <X className="h-3.5 w-3.5 me-1" />
                  {ar ? "رفض" : "Decline"}
                </Button>
                <Button
                  size="sm"
                  onClick={() => decide("accepted")}
                  className="bg-brass text-obsidian hover:bg-brass/90 rounded-full"
                >
                  <Check className="h-3.5 w-3.5 me-1" />
                  {ar ? "موافق" : "Accept"}
                </Button>
              </div>
            </div>

            {/* Granular preferences — expandable */}
            <AnimatePresence>
              {showPrefs && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-bone/10 space-y-3">
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                      <span>
                        <span className="text-bone/90 text-sm block">{ar ? "تحليلات مجهولة الهوية" : "Anonymous analytics"}</span>
                        <span className="tc text-bone/40">{ar ? "أي الفصول تهمك — بدون بيانات شخصية" : "Which chapters you care about — no personal data"}</span>
                      </span>
                      <Switch
                        checked={prefs.analytics}
                        onCheckedChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                        aria-label={ar ? "تحليلات" : "Analytics"}
                      />
                    </label>
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                      <span>
                        <span className="text-bone/90 text-sm block">{ar ? "إرسال شهري" : "Monthly dispatch"}</span>
                        <span className="tc text-bone/40">{ar ? "أفكار راجا مرة بالشهر" : "Raja's notes once a month"}</span>
                      </span>
                      <Switch
                        checked={prefs.marketing}
                        onCheckedChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                        aria-label={ar ? "إرسال" : "Dispatch"}
                      />
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Read consent synchronously for analytics gating. */
export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(KEY);
    if (v === "accepted" || v === "declined") return v;
  } catch {
    /* ignore */
  }
  return null;
}
