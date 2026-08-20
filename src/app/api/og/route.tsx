import { ImageResponse } from "next/og";
import { navLinks, ascend } from "@/lib/content";

export const runtime = "edge";

/**
 * OG image generation route — /api/og?section=<id>&lang=<en|ar>
 * Renders a cinematic 1200×630 social card per section, branded with the
 * Ascend palette (obsidian/brass/ember). Satori requires explicit display
 * on every element with multiple children.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const sectionId = url.searchParams.get("section") || "top";
  const lang = (url.searchParams.get("lang") === "ar" ? "ar" : "en") as "en" | "ar";
  const ar = lang === "ar";

  const link = navLinks.find((l) => l.id === sectionId);
  const title = link
    ? ar ? link.label.ar : link.label.en
    : ar ? "ابنِ جسمك. وجّه حياتك." : "Build the body. Direct the life.";
  const subtitle = ar ? "إرتقِ — نظام عربي للتغيير المستدام" : "Ascend — a sustainable Arabic transformation system";
  const brandLine = "RAJA IDRIES · ASCEND";
  const chapterNum = link ? String(navLinks.indexOf(link) + 1).padStart(2, "0") : "01";
  const cta = ar ? "ابدأ رحلة ارتقِ" : "Join Ascend →";
  const priceLabel = ar ? `إرتقِ · ${ascend.priceUsd}$ شهريًا` : `Ascend · $${ascend.priceUsd}/mo`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #0A0A09 0%, #1B1A18 100%)",
          color: "#F1EEE6",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
{/* Brass corner accents */}
<div style={{ display: "flex", position: "absolute", top: 32, left: 32, width: 24, height: 24, borderTop: "2px solid #B58A4B", borderLeft: "2px solid #B58A4B" }} />
<div style={{ display: "flex", position: "absolute", top: 32, right: 32, width: 24, height: 24, borderTop: "2px solid #B58A4B", borderRight: "2px solid #B58A4B" }} />
<div style={{ display: "flex", position: "absolute", bottom: 32, left: 32, width: 24, height: 24, borderBottom: "2px solid #B58A4B", borderLeft: "2px solid #B58A4B" }} />
<div style={{ display: "flex", position: "absolute", bottom: 32, right: 32, width: 24, height: 24, borderBottom: "2px solid #B58A4B", borderRight: "2px solid #B58A4B" }} />
{/* Ember glow */}
<div style={{ display: "flex", position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, rgba(233,104,58,0.15) 0%, transparent 70%)" }} />

{/* Top row */}
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, letterSpacing: 4, color: "#C8B89B", textTransform: "uppercase", fontWeight: 700 }}>
  <div style={{ display: "flex" }}>{brandLine}</div>
  <div style={{ display: "flex", color: "#B58A4B" }}>{ar ? "الفصل" : "Chapter"} {chapterNum}</div>
</div>

{/* Middle: headline */}
<div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, justifyContent: "center" }}>
  <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.0, letterSpacing: -2, color: "#F1EEE6", maxWidth: 900 }}>
    {title}
  </div>
  <div style={{ display: "flex", fontSize: 26, color: "#B58A4B", fontWeight: 500, letterSpacing: ar ? 0 : 1 }}>
    {subtitle}
  </div>
</div>

{/* Bottom row */}
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, color: "#8C8473" }}>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ display: "flex", width: 8, height: 8, background: "#E9683A", borderRadius: 999 }} />
    <div style={{ display: "flex" }}>{priceLabel}</div>
  </div>
  <div style={{ display: "flex", color: "#C8B89B" }}>{cta}</div>
</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
}
