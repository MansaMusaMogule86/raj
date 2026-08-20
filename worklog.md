# Raja Idries — "ASCEND: A Life in Motion" Website Worklog

## Project Brief
World-class bilingual (Arabic RTL + English LTR) cinematic website for Raja Idries — cinematographer, natural bodybuilder, lifestyle coach. Single-route Next.js 16 app (`/`) with 11 homepage sections that flow like chapters of a documentary film. Premium dark/warm/tactile identity. Real content preserved; clearly-marked placeholders for missing assets.

## Verified Real Source Content (from linktr.ee/RajaIdries + skool.com/ascend-by-raja-3003)
- **Identity**: Cinematographer · Natural bodybuilder · Lifestyle coach
- **Instagram**: https://instagram.com/_r.a.ja
- **TikTok**: https://tiktok.com/@r.a.ja
- **YouTube**: https://www.youtube.com/channel/UCQirKQinz3P-6IBdCjD0Dig
- **Ascend community**: name "Ascend by Raja" (إرتقِ), $29/mo (first 50 members, then $39), 44 members, 2 admins
- **Skool checkout**: https://www.skool.com/ascend-by-raja-3003/
- **Skool preview image**: https://assets.skool.com/f/398178e265dc437686b08089c46952f0/fc06a7acd1aa4adea27bb6cd603c8c4300946ed6110e4bc098c09e9bbc36740a.jpg
- **Real affiliate link**: https://fitlab-me.com/plans?affiliate_user=6a4f5513f0ec0280d80cd832&utm_source=Raja
- **Real discount code**: FITRAJA10 (for meal subscription "اشتراك الوجبات")
- **Real Arabic copy (Raja's actual voice — preserve verbatim)**:
  > إرتقِ هو أول مجتمع تطبيقي بالعالم العربي للأشخاص اللي فعلًا بدهم يغيروا إسلوب حياتهم لنظام صحي ومستدام، ومستعدين يحطوا مجهود على حالهم خطوة بخطوة، بدون حرمان أو ضغط المثالية.
  > داخل المجتمع رح تحصل على: • دليل ارتقِ العملي • محتوى أسبوعي عن الأكل، التمرين، النوم والعادات اليومية • خطوات ومهام واضحة • مكالمات أسبوعية مباشرة معي • مجتمع داعم.
  > مش مطلوب منك تكون مثالي؛ المطلوب تبدأ، تطبّق وتتقدّم معنا خطوة بخطوة.
  > الاشتراك حاليًا 29 دولار لأول 50 مشترك، وبعدها رح يرتفع إلى 39 دولار.

## Known Missing Assets (use clearly-labeled placeholders)
- Raja's full personal biography / story details (only general identity)
- Specific client transformation stories & photos (none provided)
- Full product kit list (only FitLab meals + FITRAJA10 confirmed)
- Specific videos/journal entries (only YouTube channel, not individual videos)
- Business email (none published — use placeholder `contact@rajaidries.com`)
- Booking link for 1:1 consultation (use configurable placeholder)

## Architecture Decision
Single route `/` (sandbox constraint). The 9 "pages" from the brief are implemented as anchored sections within one long cinematic scrolling homepage. Nav uses hash anchors (#ascend, #coaching, #method, #story, #journal, #kit, #partnerships, #contact).

## Color Palette (locked)
- Obsidian black: #0A0A09
- Warm bone: #F1EEE6
- Desert sand: #C8B89B
- Burnished brass: #B58A4B
- Deep olive: #485340
- Ember accent: #E9683A

## Build Phases
- Phase 1: Foundation (i18n, content data, theme, fonts, layout, nav, footer, sticky CTA, grain, cinematic primitives)
- Phase 2: Homepage sections 1–11
- Phase 3: Analytics, SEO, structured data, hreflang
- Phase 4: Agent-browser self-verification + fixes
- Phase 5: 15-min webDevReview cron job

---
Task ID: 1
Agent: orchestrator (main)
Task: Initialize worklog and set up project foundation

Work Log:
- Fetched and analyzed real source content from linktr.ee/RajaIdries and skool.com/ascend-by-raja-3003
- Extracted verified social links, Ascend pricing, real Arabic copy, FitLab affiliate + FITRAJA10 code
- Established single-route architecture (sections as anchors)
- Initialized this worklog with verified facts and locked palette

Stage Summary:
- Foundation research complete; ready to build design system + i18n + content data layer

---
Task ID: 2-8
Agent: orchestrator (main)
Task: Build complete cinematic homepage (11+ sections), wire analytics/SEO, self-verify with agent-browser

Work Log:
- Built design system in globals.css: cinematic palette (obsidian/bone/sand/brass/olive/ember), film grain, light leak, vignette, timecode, chapter-num, mask-reveal, slow-zoom, frame-marker utilities, sticky-footer enforcement, RTL helpers
- Configured fonts in layout.tsx: Oswald (English display), Inter (body), JetBrains Mono (timecodes), Alexandria (Arabic) + Person/FAQPage JSON-LD + hreflang + OG metadata
- Built src/lib/content.ts: single source of truth preserving Raja's REAL verified data — Instagram/_r.a.ja, TikTok/@r.a.ja, YouTube channel, Ascend $29/$39 pricing + 44 members + real Arabic copy verbatim, FitLab affiliate + FITRAJA10 code, Skool checkout URL, Skool preview image; all missing assets flagged with placeholder:true
- Built src/lib/i18n.tsx: LanguageProvider with localStorage persistence + RTL/LTR html attribute sync + analytics dispatch on change
- Built src/lib/analytics.ts: tracker for ascend_cta_click, consult_cta_click, assessment_start/complete, video_play, product_click, language_change, email_capture, nav_click → dataLayer
- Built site chrome: Nav (sticky, language switcher, mobile Sheet), StickyCTA (desktop floating cluster + mobile bottom bar with safe-area), Footer (sticky, final CTA strip, socials, disclaimer), FilmGrain (CSS overlay)
- Built cinematic.tsx primitives: Timecode, ChapterNumber, BrassRule, FrameMarker, ChapterHeader (staggered reveal), MaskLine, ParallaxImage
- Built 13 homepage sections (all single-route anchors):
  1. ColdOpenHero — TRAIN/EAT/LIVE flash → BUILD THE BODY. DIRECT THE LIFE. masked reveal, hero portrait, dual CTAs, reduced-motion fallback
  2. RealProblem — editorial statement + 6-step cycle visualization that "breaks here" + compassionate framing
  3. AscendMethod — 4 interactive pillars (Training/Nutrition/Sleep/Habits) with hover-to-reveal lesson/example/related content + active pillar visual swap
  4. ChooseNextScene — 6-question assessment with weighted scoring → Ascend/Consult/Guide path + email capture AFTER value delivered + no-diagnosis disclaimer
  5. AscendCommunity — real Skool data ($29, 44 members), 5 benefits, 4-step "after you join" timeline, interface preview, FAQ accordion, multiple Join CTAs to real checkout
  6. RajaStory — director's treatment, 4 frames (Camera/Body/System/Mission) with placeholder flags, scene-story visual
  7. TransformationStories — documentary-style cards with 6 fields each (reality/obstacle/habit/approach/result/sustainable), portrait-pending placeholders, health disclaimer
  8. TheRajaCut — contact-sheet layout with film perforations, 6 filters (Training/Nutrition/Habits/Mindset/Camera/Conversations), VIDs/PODs/NOTEs, draft flags, YouTube channel CTA
  9. RajaKit — 6 categories, product cards with why/for-whom/discount-code/affiliate-disclosure, FitLab as real entry, subordination note (kit supports Ascend, doesn't lead)
  10. OneToOneConsultation — who-for/can-help/how-it-works/prepare/after, sticky booking card, no-results promise, placeholder booking link flagged
  11. BrandPartnerships — selective positioning, 3 criteria, pitch card → email
  12. Contact — form posting to /api/contact (verified working, stores messages), direct email, socials, Ascend alt-CTA
  13. FinalAscent — full-screen closing with masked headline "Your next version is not discovered. It is built." / نسختك القادمة لا تنتظر أن تكتشفها. ابنِها. + Start Your Ascent CTA
- Built /api/contact route (POST stores, GET counts) — verified end-to-end via agent-browser (count returned 1 after test submit)
- Generated 3 cinematic placeholder images via image-generation skill (hero-portrait, scene-training, scene-nutrition); scene-story + scene-final regenerating

Verification (agent-browser + VLM):
- Desktop hero: VLM confirms "excellent visual hierarchy, highly premium cinematic aesthetic, no visual bugs, portrait flawless"
- Full page: VLM confirms "cinematic feel achieved, sophisticated grid, footer correctly at bottom, palette consistent"
- Mobile 390px: VLM confirms "clean vertical stacking, excellent text readability, tappable CTAs (44px+), sticky bottom bar works"
- Language switch EN→AR: nav labels + all content translate, document.documentElement.dir = "rtl", lang = "ar", localStorage persists "en"/"ar"
- Assessment flow: 6 questions → "مسار إرتقِ" result → email capture → Join CTA (value before capture ✓)
- Contact form: submit → /api/contact 200 → GET returns count:1
- Sticky CTA: appears after 85vh scroll, hides near final-ascent, mobile bottom bar with safe-area padding
- Console/errors: clean on reload, no runtime errors
- Lint: 0 errors, 0 warnings

Stage Summary:
- Complete bilingual cinematic website live on / route
- All real verified content preserved (socials, Ascend pricing/members/copy, FitLab+FITRAJA10, Skool checkout)
- All missing assets clearly marked with placeholder flags + UI "Draft"/"pending" labels
- 13 sections flow as documentary chapters; reduced-motion respected throughout
- Analytics wired for all 8 required event types
- SEO: Person + FAQPage JSON-LD, hreflang, OG, bilingual metadata
- Sticky footer enforced via flex-col shell
- Two images (scene-story, scene-final) regenerating in background; onError handlers hide broken images gracefully in the meantime

---
Task ID: FINAL
Agent: orchestrator (main)
Task: Finalize — verify all images, create 15-min webDevReview cron job, handover

Work Log:
- Regenerated scene-story.png (864x1152) and scene-final.png (1344x768) — all 5 cinematic images now present
- agent-browser verified both images load (naturalWidth>0) in Raja Story + Final Ascent sections
- VLM confirmed Final Ascent: "powerful full-screen closing, CTA clear, image supports the journey's-end theme"
- Created cron job (id 331062): fixed_rate 900s (every 15 min), tz Asia/Dubai, payload.kind=webDevReview, priority 10
- Verified cron job active (status:1) via cron list

Stage Summary — PROJECT COMPLETE (v1):
- Single-route bilingual cinematic website live at http://localhost:3000 (preview via Preview Panel → "Open in New Tab")
- 13 documentary-chapter sections, EN LTR + AR RTL with remembered preference
- All real verified Raja content preserved (Instagram/_r.a.ja, TikTok/@r.a.ja, YouTube, Ascend $29/$39 + 44 members + verbatim Arabic copy, FitLab + FITRAJA10, Skool checkout)
- All missing assets clearly flagged as placeholders (email, booking link, biography details, transformation stories, full kit list, individual videos)
- Analytics wired (8 event types → dataLayer), SEO (Person + FAQPage JSON-LD, hreflang, OG), reduced-motion respected, sticky footer enforced
- Lint clean, no console errors, VLM-verified on desktop + mobile
- 15-min webDevReview cron will autonomously continue QA + feature work

Next-phase recommendations (for the webDevReview agent):
- Replace placeholder email (contact@rajaidries.com) with Raja's real business email
- Replace placeholder booking URL (cal.com/rajaidries) with real scheduling link
- Add real Raja biography to story frames (currently placeholder:true)
- Add verified + authorized transformation stories to replace placeholders
- Fill out Raja's Kit with real product links + images (only FitLab is real)
- Add real journal/video entries to The Raja Cut (currently all draft:true)
- Lazy-mount muted hero video with poster fallback (currently static image only)
- Add cookie/analytics consent banner if required by jurisdiction
- Add Open Graph hero image (currently uses metadataBase)
