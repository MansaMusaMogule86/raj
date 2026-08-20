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

  // Use per-section OG metadata for richer social sharing
  const ogMeta = getSectionOgMeta(sectionId, lang);
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/#${sectionId}`
    : "";
  const shareText = encodeURIComponent(`${title} — Raja Idries · Ascend`);

  const copy = async () => {
    try {
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

  const buttons = [
    {
      label: "X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

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
      {buttons.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            analytics.track({ event: "product_click", id: sectionId, name: `share_${b.label}`, affiliate: false, lang })
          }
          className="p-1.5 rounded-sm text-bone/50 hover:text-brass hover:bg-bone/5 transition-colors"
          aria-label={`Share on ${b.label}`}
        >
          <b.icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
