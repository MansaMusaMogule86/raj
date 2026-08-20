"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";
import { analytics } from "@/lib/analytics";
import { Timecode } from "@/components/site/cinematic";

/**
 * Newsletter subscribe form.
 * Posts to /api/subscribe, fires email_capture analytics on success.
 * Compact variant for the footer; full variant for inline use.
 */
export function SubscribeForm({ source = "footer", className = "" }: { source?: string; className?: string }) {
  const { lang } = useLang();
  const ar = lang === "ar";
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("failed");
      analytics.emailCapture(`subscribe_${source}`, lang);
      setStatus("done");
      setEmail("");
      toast({
        title: ar ? "تم الاشتراك" : "Subscribed",
        description: ar ? "أول إرسال يصلك قريبًا." : "Your first dispatch arrives soon.",
      });
    } catch {
      setStatus("error");
      toast({
        title: ar ? "خطأ" : "Error",
        description: ar ? "حاول مجددًا." : "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (status === "done") {
    return (
      <div className={`flex items-center gap-2 text-bone/80 ${className}`}>
        <Check className="h-4 w-4 text-brass" />
        <span className="text-sm">{ar ? "أنت في القائمة." : "You're on the list."}</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder={ar ? "بريدك للإرسال الشهري" : "Your email for the monthly dispatch"}
        className="bg-bone/5 border-bone/20 text-bone placeholder:text-bone/40"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        size="sm"
        className="bg-brass text-obsidian hover:bg-brass/90 rounded-full flex-shrink-0"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {ar ? "اشترك" : "Subscribe"} <ArrowRight className="h-4 w-4 ms-1 rtl:rotate-180" />
          </>
        )}
      </Button>
    </form>
  );
}

/** Compact one-line subscribe band — used in the footer. */
export function SubscribeBand() {
  const { lang, t } = useLang();
  const ar = lang === "ar";
  return (
    <div className="relative p-5 border border-brass/30 bg-secondary/30 frame-marker">
      <Timecode className="text-bone/50 block mb-2">{ar ? "الإرسال الشهري" : "Monthly dispatch"}</Timecode>
      <p className={`display text-bone text-xl mb-3 ${ar ? "display-ar" : ""}`}>
        {ar ? "أفكار راجا، مرة بالشهر، بدون ضجيج." : "Raja's notes, once a month, no noise."}
      </p>
      <SubscribeForm source="footer_band" />
      <p className="tc text-bone/40 mt-2">{ar ? "بدون بريد مزعج. ألغِ بإرسال واحدة." : "No spam. Unsubscribe in one email."}</p>
    </div>
  );
}
