/**
 * Lightweight analytics dispatcher.
 * Captures Ascend CTA clicks, consultation clicks, assessment starts/completions,
 * video plays, product clicks, language changes, and email captures.
 *
 * Events are emitted to window 'ascend:analytics' and forwarded to dataLayer
 * (GTM-compatible) + a console endpoint for visibility during development.
 * Swap `sink` for a real provider (Plausible, GA4, PostHog) without touching
 * call sites.
 */

export type AscendEvent =
  | { event: "ascend_cta_click"; location: string; lang: string }
  | { event: "consult_cta_click"; location: string; lang: string }
  | { event: "assessment_start"; lang: string }
  | { event: "assessment_complete"; path: string; lang: string }
  | { event: "video_play"; id: string; title: string; lang: string }
  | { event: "product_click"; id: string; name: string; affiliate: boolean; lang: string }
  | { event: "language_change"; lang: string }
  | { event: "email_capture"; source: string; lang: string }
  | { event: "nav_click"; target: string; lang: string };

declare global {
  interface Window {
    dataLayer?: AscendEvent[];
  }
}

function sink(ev: AscendEvent) {
  if (typeof window === "undefined") return;
  // Gate on consent — if declined, drop events. If undecided, still
  // dispatch the custom event (so the UI layer can react) but don't push
  // to dataLayer until consent is accepted.
  let consent: "accepted" | "declined" | null = null;
  try {
    const v = localStorage.getItem("ascend-consent");
    if (v === "accepted" || v === "declined") consent = v;
  } catch {
    /* ignore */
  }
  if (consent === "declined") return;
  if (consent === "accepted") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(ev);
  }
  window.dispatchEvent(new CustomEvent("ascend:analytics", { detail: ev }));
  if (process.env.NODE_ENV !== "production" && consent === "accepted") {
    console.debug("[ascend:analytics]", ev);
  }
}

export function track(ev: AscendEvent) {
  sink(ev);
}

// Convenience helpers for the most common events
export const analytics = {
  track,
  ascendCta: (location: string, lang: string) => track({ event: "ascend_cta_click", location, lang }),
  consultCta: (location: string, lang: string) => track({ event: "consult_cta_click", location, lang }),
  assessmentStart: (lang: string) => track({ event: "assessment_start", lang }),
  assessmentComplete: (path: string, lang: string) => track({ event: "assessment_complete", path, lang }),
  videoPlay: (id: string, title: string, lang: string) => track({ event: "video_play", id, title, lang }),
  productClick: (id: string, name: string, affiliate: boolean, lang: string) =>
    track({ event: "product_click", id, name, affiliate, lang }),
  emailCapture: (source: string, lang: string) => track({ event: "email_capture", source, lang }),
  navClick: (target: string, lang: string) => track({ event: "nav_click", target, lang }),
};

// Wire language-change events from the i18n provider into analytics
export function bindLanguageAnalytics() {
  if (typeof window === "undefined") return;
  window.addEventListener("ascend:analytics", ((e: CustomEvent) => {
    if (e.detail?.event === "language_change") {
      track({ event: "language_change", lang: e.detail.lang });
    }
  }) as EventListener);
}
