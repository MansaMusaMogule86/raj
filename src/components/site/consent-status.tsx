"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type Consent = "accepted" | "declined" | null;

/**
 * ConsentStatus — a tiny status indicator showing the visitor's current
 * consent state (accepted / declined / not set). Appears next to the
 * footer's "Cookies" button so visitors can see their state at a glance.
 * Updates reactively when the consent banner's `ascend:consent` event fires.
 */
export function ConsentStatus() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const v = localStorage.getItem("ascend-consent");
        setConsent(v === "accepted" || v === "declined" ? v : null);
      } catch {
        setConsent(null);
      }
      setReady(true);
    };
    const id = window.setTimeout(read, 0);
    // React to consent changes
    const onChange = () => read();
    window.addEventListener("ascend:consent", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("ascend:consent", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!ready) return null;

  const dotColor =
    consent === "accepted" ? "bg-emerald-400" : consent === "declined" ? "bg-bone/30" : "bg-ember";
  const label =
    consent === "accepted"
      ? ar ? "موافق" : "Accepted"
      : consent === "declined"
        ? ar ? "مرفوض" : "Declined"
        : ar ? "غير محدّد" : "Not set";

  return (
    <span
      className="tc text-bone/30 flex items-center gap-1"
      title={ar ? "حالة الموافقة" : "Consent status"}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}
