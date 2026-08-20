import type { Metadata } from "next";
import { headers } from "next/headers";
import { Oswald, Inter, JetBrains_Mono, Alexandria } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/i18n";
import { FilmGrain } from "@/components/site/film-grain";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const alexandria = Alexandria({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rajaidries.com"),
  title: {
    default: "Raja Idries — Build the Body. Direct the Life.",
    template: "%s · Raja Idries",
  },
  description:
    "A practical Arabic system for building a healthier, stronger, and more sustainable life through training, nutrition, sleep, and daily habits — without deprivation or the pressure of perfection.",
  keywords: [
    "Raja Idries",
    "Arabic fitness",
    "natural bodybuilding",
    "Ascend",
    "إرتقِ",
    "lifestyle coach",
    "nutrition",
    "habits",
    "sustainable fitness",
  ],
  authors: [{ name: "Raja Idries" }],
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", ar: "/" },
  },
  openGraph: {
    title: "Raja Idries — Build the Body. Direct the Life.",
    description:
      "A practical Arabic system for building a healthier, stronger, and more sustainable life — without deprivation or the pressure of perfection.",
    url: "https://rajaidries.com",
    siteName: "Raja Idries",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_AR",
    images: [
      {
        url: "/api/og?section=top&lang=en",
        width: 1200,
        height: 630,
        alt: "Raja Idries — Build the body. Direct the life.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raja Idries — Build the Body. Direct the Life.",
    description:
      "A practical Arabic system for sustainable transformation through training, nutrition, sleep, and habits.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read language preference from cookie (set by the client on change) so the
  // server renders the correct dir/lang on the FIRST paint — no hydration
  // mismatch, no flash of wrong direction.
  const h = await headers();
  const cookieLang = h.get("cookie") || "";
  const m = cookieLang.match(/ascend-lang=(en|ar)/);
  const lang = m ? (m[1] as "en" | "ar") : "en";
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        {/* No-flash language bootstrap: apply localStorage lang before paint,
            but only if it differs from the server-rendered value (avoids
            touching the DOM when already correct). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var v=localStorage.getItem('ascend-lang');if(v==='ar'||v==='en'){var h=document.documentElement;if(h.lang!==v){h.lang=v;h.dir=v==='ar'?'rtl':'ltr';}}}catch(e){}})();`,
          }}
        />
        {/* JSON-LD: Organization / Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Raja Idries",
              jobTitle: "Cinematographer, Natural Bodybuilder, Lifestyle Coach",
              description:
                "Cinematographer and natural bodybuilder offering 1:1 lifestyle coaching and the Ascend Arabic transformation community.",
              url: "https://rajaidries.com",
              image: "https://rajaidries.com/images/hero-portrait.png",
              sameAs: [
                "https://instagram.com/_r.a.ja",
                "https://tiktok.com/@r.a.ja",
                "https://www.youtube.com/channel/UCQirKQinz3P-6IBdCjD0Dig",
                "https://linktr.ee/RajaIdries",
              ],
              knowsAbout: ["Natural bodybuilding", "Nutrition", "Sleep", "Habit formation", "Cinematography"],
            }),
          }}
        />
        {/* JSON-LD: FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is Ascend suitable for beginners?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Ascend is built for people who want a system they can actually live with — whether you are starting today or restarting after years off.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you promise physical results?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Results depend on your starting point, consistency, sleep, stress, and genetics. What Ascend promises is a system, guidance, and a community that improves your odds.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does Ascend cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The current membership is $29/month for the first 50 members, then $39/month. Cancel anytime.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${oswald.variable} ${inter.variable} ${jetbrains.variable} ${alexandria.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>{children}</LanguageProvider>
        <FilmGrain />
        <Toaster />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('ascend:analytics',function(e){if(e.detail&&e.detail.event==='language_change'){(window.dataLayer=window.dataLayer||[]).push({event:'language_change',lang:e.detail.lang});}});`,
          }}
        />
      </body>
    </html>
  );
}
