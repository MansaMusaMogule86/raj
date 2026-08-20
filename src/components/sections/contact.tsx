"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Send, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";
import { brand, socials, ascend, ctas } from "@/lib/content";
import { analytics } from "@/lib/analytics";
import { ChapterHeader, Timecode, BrassRule } from "@/components/site/cinematic";

export function Contact() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      analytics.emailCapture("contact_form", lang);
      setSent(true);
      toast({ title: ar ? "تم الإرسال" : "Sent", description: ar ? "سأعود إليك قريبًا." : "I'll be back to you shortly." });
    } catch {
      toast({ title: ar ? "خطأ" : "Error", description: ar ? "حاول مجددًا أو راسلني مباشرة." : "Try again or email me directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-bone text-obsidian py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-20 end-1/4 w-[36rem] h-[36rem] rounded-full bg-sand/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <ChapterHeader
          chapter="12"
          kicker={ar ? "تواصل" : "Contact"}
          title={ar ? "تواصل مباشر." : "Direct line."}
          lede={
            ar
              ? "للأسئلة، التعاون، الشراكات، أو ببساطة لمتابعة العمل. البريد أدناه مؤقت — سيؤكّده راجا قبل الإطلاق."
              : "For questions, collaboration, partnerships, or simply to follow the work. The email below is a placeholder — Raja will confirm it before launch."
          }
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="space-y-5 p-6 sm:p-8 border border-obsidian/15 bg-white/40 backdrop-blur-sm">
              <div>
                <Label htmlFor="name" className="tc text-obsidian/60 mb-2 block">{ar ? "الاسم" : "Name"}</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent border-obsidian/20 text-obsidian"
                />
              </div>
              <div>
                <Label htmlFor="email" className="tc text-obsidian/60 mb-2 block">{ar ? "البريد" : "Email"}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent border-obsidian/20 text-obsidian"
                />
              </div>
              <div>
                <Label htmlFor="message" className="tc text-obsidian/60 mb-2 block">{ar ? "الرسالة" : "Message"}</Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-transparent border-obsidian/20 text-obsidian resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={submitting || sent}
                className="w-full bg-obsidian text-bone hover:bg-obsidian/90 rounded-full h-12"
              >
                {sent ? (ar ? "تم" : "Sent") : submitting ? (ar ? "يُرسل..." : "Sending...") : (ar ? "أرسل" : "Send message")}
                <Send className="h-4 w-4 ms-1" />
              </Button>
            </form>
          </div>

          {/* Direct + socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 border border-obsidian/15 bg-white/40">
              <Timecode className="text-obsidian/50">{ar ? "مباشر" : "Direct"}</Timecode>
              <a href={`mailto:${brand.email}`} className="group flex items-center gap-3 mt-2 text-obsidian hover:text-brass transition-colors">
                <Mail className="h-5 w-5" />
                <span className="text-lg">{brand.email}</span>
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              {brand.emailPlaceholderNote && (
                <p className="tc text-obsidian/40 mt-2">{ar ? "بريد مؤقت" : "Placeholder email"}</p>
              )}
            </div>

            <div className="p-6 border border-obsidian/15 bg-white/40">
              <Timecode className="text-obsidian/50">{ar ? "تابع" : "Follow"}</Timecode>
              <ul className="mt-3 space-y-2">
                {socials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between text-obsidian hover:text-brass transition-colors py-1"
                    >
                      <span>{s.label}</span>
                      <span className="tc text-obsidian/40 group-hover:text-brass">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 border border-brass/30 bg-obsidian text-bone">
              <Timecode className="text-bone/60">{ar ? "الأسرع: انضم" : "Fastest: join"}</Timecode>
              <p className={`display text-bone text-2xl mt-2 ${ar ? "display-ar" : ""}`}>
                {ar ? "أسئلة كتير؟ إرتقِ يجاوب عليهم أسبوعيًا." : "Many questions? Ascend answers them weekly."}
              </p>
              <Button
                asChild
                size="sm"
                className="mt-4 bg-brass text-obsidian hover:bg-brass/90 rounded-full"
                onClick={() => analytics.ascendCta("contact_ascend", lang)}
              >
                <a href={ascend.checkoutUrl} target="_blank" rel="noopener noreferrer">
                  {t(ctas.joinAscend)} <ArrowUpRight className="h-4 w-4 ms-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <BrassRule className="mt-14" />
      </div>
    </section>
  );
}
