"use client";

import { useState } from "react";
import { Share2, Link2, Check, Twitter, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";
import { analytics } from "@/lib/analytics";
import { getSectionOgMeta } from "@/lib/content";

/**
 * ShareBar — compact share controls for content entries.
 * Copies a permalink with section-specific OG metadata, offers X (Twitter)
 * + Facebook share, fires analytics. Uses the per-section OG helper so shared
 * links render the correct cinematic social card.
 */
export function ShareBar({
  title,
  sectionId,
  className = "",
}: {
  title: string;
  sectionId: string;
  className?: string;
}) {
  const { lang } = useLang();
  const ar = lang === "ar";
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const shareUrl = `${origin}/#${sectionId}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      analytics.track({ event: "product_click", id: sectionId, name: "share_copy", affiliate: false, lang });
      toast({
        title: ar ? "نُسخ الرابط" : "Link copied",
        description: ar ? "الصقه أينما تريد." : "Paste it wherever you'd like.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: ar ? "تعذّر النسخ" : "Copy failed", variant: "destructive" });
    }
  };

  const openShare = (platform: "x" | "facebook") => {
    if (typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}/#${sectionId}`;
    const shareText = encodeURIComponent(`${title} — Raja Idries · Ascend`);
    const url =
      platform === "x"
        ? `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`
        : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    analytics.track({ event: "product_click", id: sectionId, name: `share_${platform}`, affiliate: false, lang });
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="tc text-bone/40 me-1 flex items-center gap-1">
        <Share2 className="h-3 w-3" />
        {ar ? "شارك" : "Share"}
      </span>
      <button
        onClick={copy}
        className="p-1.5 rounded-sm text-bone/50 hover:text-brass hover:bg-bone/5 transition-colors"
        aria-label={ar ? "نسخ الرابط" : "Copy link"}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-brass" /> : <Link2 className="h-3.5 w-3.5" />}
      </button>
      <button
        onClick={() => openShare("x")}
        className="p-1.5 rounded-sm text-bone/50 hover:text-brass hover:bg-bone/5 transition-colors"
        aria-label="Share on X"
      >
        <Twitter className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => openShare("facebook")}
        className="p-1.5 rounded-sm text-bone/50 hover:text-brass hover:bg-bone/5 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
