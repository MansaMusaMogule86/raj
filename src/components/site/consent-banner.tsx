"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Check, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

type Consent = "accepted" | "declined" | null;
const KEY = "ascend-consent";

export function ConsentBanner() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

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

  // Slight delay so it doesn't fight the hero cold-open animation
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (ready && consent === null) {
      const id = setTimeout(() => setShow(true), 3200);
      return () => clearTimeout(id);
    }
  }, [ready, consent]);

  const decide = (c: Exclude<Consent, null>) => {
    setConsent(c);
    setShow(false);
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* ignore */
    }
    // Notify analytics layer
    window.dispatchEvent(new CustomEvent("ascend:consent", { detail: { consent: c } }));
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
