/**
 * ASCEND content layer — single source of truth.
 * All bilingual copy, real links, prices, codes, products, and CTAs live here.
 * Real verified data is preserved verbatim. Missing assets are clearly marked
 * with a `placeholder` flag so Raja can replace them before launch.
 *
 * Verified sources:
 *  - https://linktr.ee/RajaIdries (schema.org sameAs + significantLink)
 *  - https://www.skool.com/ascend-by-raja-3003/about (community copy + pricing)
 */

export type Lang = "en" | "ar";

export interface Bi {
  en: string;
  ar: string;
}

/* ------------------------------------------------------------------ */
/* BRAND CONFIG                                                        */
/* ------------------------------------------------------------------ */
export const brand = {
  name: { en: "Raja Idries", ar: "رaja إدريس" } as Bi,
  // Real handle / display name
  handle: "RAJA IDRIES",
  tagline: {
    en: "Cinematographer · Natural Bodybuilder · Lifestyle Coach",
    ar: "مصوّر سينمائي · لاعب كمال أجسام طبيعي · مدرّب أسلوب حياة",
  } as Bi,
  // Business email — placeholder (not published by Raja yet)
  email: "contact@rajaidries.com", // PLACEHOLDER — Raja to confirm
  emailPlaceholderNote: true,
  // 1:1 booking link — placeholder (configurable)
  bookingUrl: "https://cal.com/rajaidries", // PLACEHOLDER — Raja to set
  bookingPlaceholderNote: true,
};

/* ------------------------------------------------------------------ */
/* SOCIAL LINKS (verified real)                                        */
/* ------------------------------------------------------------------ */
export const socials = [
  { id: "instagram", label: "Instagram", handle: "@_r.a.ja", url: "https://instagram.com/_r.a.ja" },
  { id: "tiktok", label: "TikTok", handle: "@r.a.ja", url: "https://tiktok.com/@r.a.ja" },
  {
    id: "youtube",
    label: "YouTube",
    handle: "Raja Idries",
    url: "https://www.youtube.com/channel/UCQirKQinz3P-6IBdCjD0Dig",
  },
  { id: "skool", label: "Ascend on Skool", handle: "ascend-by-raja-3003", url: "https://www.skool.com/ascend-by-raja-3003" },
];

/* ------------------------------------------------------------------ */
/* ASCEND COMMUNITY (verified real data)                               */
/* ------------------------------------------------------------------ */
export const ascend = {
  name: { en: "Ascend", ar: "إرتقِ" } as Bi,
  fullName: { en: "Ascend by Raja", ar: "إرتقِ بواسطة راجا" } as Bi,
  // Skool checkout — real
  checkoutUrl: "https://www.skool.com/ascend-by-raja-3003/",
  previewImage:
    "https://assets.skool.com/f/398178e265dc437686b08089c46952f0/fc06a7acd1aa4adea27bb6cd603c8c4300946ed6110e4bc098c09e9bbc36740a.jpg",
  // Pricing — real, editable config
  priceUsd: 29,
  priceUsdIntro: 29,
  priceUsdFull: 39,
  introMemberCap: 50,
  // Member count — real at time of fetch (44). Editable; shown only when verified.
  memberCount: 44,
  memberCountVerified: true,
  // Real Arabic tagline (verbatim from Raja's Skool page)
  tagline: {
    en: "The first applied Arabic community for people who genuinely want to change their lifestyle into a healthy, sustainable system — ready to put effort into themselves, step by step, without deprivation or the pressure of perfection.",
    ar: "أول مجتمع تطبيقي بالعالم العربي للأشخاص اللي فعلًا بدهم يغيروا إسلوب حياتهم لنظام صحي ومستدام، ومستعدين يحطوا مجهود على حالهم خطوة بخطوة، بدون حرمان أو ضغط المثالية.",
  } as Bi,
  benefits: [
    {
      en: "The practical Ascend guide to rebuilding your system and lifestyle in a balanced way.",
      ar: "دليل ارتقِ العملي لتغيير نظامك وأسلوب حياتك بطريقة صحية ومتوازنة.",
    },
    {
      en: "Weekly content on nutrition, training, sleep, and daily habits.",
      ar: "محتوى أسبوعي عن الأكل، التمرين، النوم والعادات اليومية.",
    },
    {
      en: "Clear steps and tasks that move you from knowledge to implementation.",
      ar: "خطوات ومهام واضحة تساعدك تنتقل من المعرفة للتطبيق.",
    },
    {
      en: "Weekly live calls with me for support, guidance, and answers.",
      ar: "مكالمات أسبوعية مباشرة معي للدعم، التوجيه والإجابة عن أسئلتك.",
    },
    {
      en: "A supportive community walking the same path.",
      ar: "مجتمع داعم من أشخاص ماشيين بنفس الرحلة.",
    },
  ] as Bi[],
  fitNote: {
    en: "Ascend is for you if you want to change your relationship with food, training, and daily habits — and be part of a space that pushes you to apply and work on yourself, not just collect information.",
    ar: "Ascend مناسب إلك إذا بدك تغير علاقتك مع الأكل، التمرين وعاداتك اليومية، وتكون جزءًا من مساحة تشجعك على التطبيق والعمل على حالك، مش بس جمع معلومات.",
  } as Bi,
  invitation: {
    en: "You are not asked to be perfect. You are asked to start, apply, and progress with us — step by step.",
    ar: "مش مطلوب منك تكون مثالي؛ المطلوب تبدأ، تطبّق وتتقدّم معنا خطوة بخطوة.",
  } as Bi,
};

/* ------------------------------------------------------------------ */
/* THE METHOD — four interconnected pillars                            */
/* ------------------------------------------------------------------ */
export type Pillar = {
  id: string;
  num: string;
  title: Bi;
  principle: Bi;
  lesson: Bi;
  example: Bi;
  content: { label: Bi; kind: "video" | "note"; url?: string }[];
};

export const pillars: Pillar[] = [
  {
    id: "training",
    num: "01",
    title: { en: "Training", ar: "التمرين" },
    principle: { en: "Train with intention, not punishment.", ar: "درّب جسمك بنية، لا بعقاب." },
    lesson: {
      en: "Sessions are built around progressive overload, clean technique, and recovery that lets you come back stronger next week — not around exhaustion for its own sake.",
      ar: "تمارين مبنية على التحمّل التصاعدي، وتقنية نظيفة، وتعافٍ يخليك ترجع أقوى الأسبوع الجاي — مش مجرد تعب للحظة.",
    },
    example: {
      en: "Four focused sessions a week, 45–60 minutes, with a clear log of weights and reps.",
      ar: "أربع جلسات مركّزة أسبوعيًا، ٤٥–٦٠ دقيقة، مع سجل واضح للأوزان والتكرارات.",
    },
    content: [
      { label: { en: "How to build your first training block", ar: "كيف تبني أول مرحلة تمرين" }, kind: "note" },
      { label: { en: "The warm-up that actually works", ar: "إحماء يشتغل فعليًا" }, kind: "video" },
    ],
  },
  {
    id: "nutrition",
    num: "02",
    title: { en: "Nutrition", ar: "التغذية" },
    principle: { en: "Eat for progress without living in deprivation.", ar: "كُل للتقدّم، بدون ما تعيش محروم." },
    lesson: {
      en: "Protein, fiber, and enough food to recover — structured around your real life, not a spreadsheet of restrictions. Sustainability beats perfection every time.",
      ar: "بروتين، ألياف، وكفاية أكل للتعافي — مرتّب حول حياتك الحقيقية، مش جدول حرمانات. الاستمرارية بتغلب الكمال كل مرة.",
    },
    example: {
      en: "A plate method you can repeat in any kitchen: protein + color + carb portion by goal.",
      ar: "طريقة الصحن اللي تقدر تكررها بأي مطبخ: بروتين + لون + كمية كربوهيدرات حسب هدفك.",
    },
    content: [
      { label: { en: "The repeatable plate method", ar: "طريقة الصحن القابلة للتكرار" }, kind: "note" },
      { label: { en: "Reading labels without overthinking", ar: "اقرأ الملصقات بدون تعقيد" }, kind: "video" },
    ],
  },
  {
    id: "sleep",
    num: "03",
    title: { en: "Sleep", ar: "النوم" },
    principle: { en: "Treat recovery as part of the plan.", ar: "اعتبر التعافي جزء من الخطة." },
    lesson: {
      en: "Sleep is where the work you did in training actually becomes a result. Light exposure, evening rhythm, and a consistent wake time do more than any supplement.",
      ar: "النوم هو وين شغلك بالتمرين بيتحوّل نتيجة فعلية. التعرض للضوء، روتين المساء، ووقت استيقاظ ثابت بيعملوا أكثر من أي مكمل.",
    },
    example: {
      en: "A 30-minute wind-down: dim lights, no training talk, one page of reading.",
      ar: "تهدئة ٣٠ دقيقة: أضوية خافتة، بدون حكي عن التمرين، صفحة قراءة.",
    },
    content: [
      { label: { en: "Build your evening wind-down", ar: "ابنِ روتين استرخاء المساء" }, kind: "note" },
      { label: { en: "Light, circadian rhythm & energy", ar: "الضوء، الإيقاع اليومي والطاقة" }, kind: "video" },
    ],
  },
  {
    id: "habits",
    num: "04",
    title: { en: "Habits", ar: "العادات" },
    principle: { en: "Build routines that survive real life.", ar: "ابنِ روتينات تصمد أمام الحقيقي." },
    lesson: {
      en: "Motivation arrives and leaves. Habits stay. We design small repeatable actions that keep working when motivation is gone, when travel happens, when life gets hard.",
      ar: "التحفيز بييجي وبيمشي. العادات بتبقى. بنبني أفعال صغيرة قابلة للتكرار بتكمل تشتغل لما التحفيز يغيب، أو تسافر، أو الحياة تضيق.",
    },
    example: {
      en: "One 'minimum viable day' — the smallest version of your routine you can still hit on the worst day.",
      ar: "يوم بأدنى حدّ ممكن — أصغر نسخة من روتينك اللي تقدر تعملها بأسوأ يوم.",
    },
    content: [
      { label: { en: "Design your minimum viable day", ar: "صمّم يومك بأدنى حدّ ممكن" }, kind: "note" },
      { label: { en: "Identity-based habits", ar: "عادات مبنية على الهوية" }, kind: "video" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* RAJA'S STORY — director's treatment frames                         */
/* ------------------------------------------------------------------ */
export type StoryFrame = {
  num: string;
  title: Bi;
  body: Bi;
  placeholder?: boolean;
};

export const storyFrames: StoryFrame[] = [
  {
    num: "01",
    title: { en: "The Camera", ar: "الكاميرا" },
    body: {
      en: "Before the body, there was the lens. Years behind a camera taught Raja to observe — to read a person, a light, a moment, and to tell the truth of it. That instinct still frames everything he builds.",
      ar: "قبل الجسم، كان العدسة. سنوات ورا الكاميرا علمت راجا يلاحظ — يقرا الإنسان، الضوء، اللحظة، ويحكي حقيقتها. هالحس لسه يؤطّر كل شي بيبنيه.",
      // Story detail not provided by Raja — clearly marked
    },
    placeholder: true,
  },
  {
    num: "02",
    title: { en: "The Body", ar: "الجسم" },
    body: {
      en: "Natural bodybuilding became a practice of discipline rather than a pursuit of a physique. Reps, rest, food, sleep — a system you can repeat for years without breaking.",
      ar: "كمال الأجسام الطبيعي صار تمرين للانضباط بدل السعي لشكل معين. تكرارات، راحة، أكل، نوم — نظام تقدر تكرره لسنين بدون ما ينكسر.",
    },
    placeholder: true,
  },
  {
    num: "03",
    title: { en: "The System", ar: "النظام" },
    body: {
      en: "Motivation failed too many times to trust it. So Raja built a system instead — one that survives a bad week, a busy month, a life that never stays still.",
      ar: "التحفيز فشل مرات كتيرة فما عد يسأله. فبنى نظام بداله — نظام يصمد أمام أسبوع سيّئ، شهر مشغول، وحياة ما بتنضبط.",
    },
    placeholder: true,
  },
  {
    num: "04",
    title: { en: "The Mission", ar: "المهمة" },
    body: {
      en: "Help Arabic-speaking people build healthier lives they can actually maintain — through training, nutrition, sleep, and daily habits, in their own language, without deprivation or the pressure of perfection.",
      ar: "يساعد العرب يبنوا حياة صحية يقدروا فعليًا يحافظوا عليها — من خلال التمرين، التغذية، النوم، والعادات اليومية، بلغتهم، بدون حرمان أو ضغط المثالية.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* THE RAJA CUT — editorial content                                    */
/* All entries are placeholders until Raja provides real URLs/titles. */
/* ------------------------------------------------------------------ */
export type CutEntry = {
  id: string;
  category: "training" | "nutrition" | "habits" | "mindset" | "camera" | "conversations" | "sleep";
  title: Bi;
  excerpt: Bi;
  duration?: string;
  kind: "note" | "video" | "podcast";
  url?: string;
  placeholder?: boolean;
};

export const cutCategories: { id: CutEntry["category"]; label: Bi }[] = [
  { id: "training", label: { en: "Training", ar: "تمرين" } },
  { id: "nutrition", label: { en: "Nutrition", ar: "تغذية" } },
  { id: "habits", label: { en: "Habits", ar: "عادات" } },
  { id: "sleep", label: { en: "Sleep & Recovery", ar: "نوم واستشفاء" } },
  { id: "mindset", label: { en: "Mindset", ar: "ذهنية" } },
  { id: "camera", label: { en: "Behind the Camera", ar: "خلف الكاميرا" } },
  { id: "conversations", label: { en: "Conversations", ar: "حوارات" } },
];

const rawCutEntries: CutEntry[] = [
  {
    id: "c1",
    category: "habits",
    title: { en: "Consistency is a skill", ar: "الاستمرارية مهارة" },
    excerpt: {
      en: "Motivation gets you started. Consistency is what you train. Here is how to make a small action repeatable enough to outlast your worst week.",
      ar: "التحفيز بيبدّئك. الاستمرارية هي اللي بتتدرّب. كيف تخلي فعل صغير يتكرر لدرجة يصمد بأسوأ أسبوع.",
    },
    kind: "note",
    placeholder: true,
  },
  {
    id: "c2",
    category: "nutrition",
    title: { en: "The repeatable plate method", ar: "طريقة الصحن القابلة للتكرار" },
    excerpt: {
      en: "A plate you can build in any kitchen, anywhere — protein, color, and a carb portion tuned to your goal.",
      ar: "صحن تقدر تبنيه بأي مطبخ، بأي مكان — بروتين، لون، وكمية كربوهيدرات مضبوطة لهدفك.",
    },
    kind: "video",
    duration: "06:14",
    placeholder: true,
  },
  {
    id: "c3",
    category: "training",
    title: { en: "Progress without punishment", ar: "تقدّم بدون عقاب" },
    excerpt: {
      en: "How to program a week that pushes you forward without grinding you down — and why exhaustion is not the signal you think it is.",
      ar: "كيف تبرمج أسبوع يقدّمك للأمام بدون ما يطحنك — وليش التعب مش الإشارة اللي بتفتكرها.",
    },
    kind: "video",
    duration: "09:02",
    placeholder: true,
  },
  {
    id: "c4",
    category: "mindset",
    title: { en: "Do not chase perfect. Build repeatable.", ar: "لا تطوّر الكمال. ابنِ القابل للتكرار." },
    excerpt: {
      en: "Perfection is a finish line that moves. Repeatable is a system that stays. Choose the one you can live with for a decade.",
      ar: "الكمال خط نهاية بيتحرّك. القابل للتكرار نظام يبقى. اختر اللي تعيش معه عشر سنين.",
    },
    kind: "note",
    placeholder: true,
  },
  {
    id: "c5",
    category: "camera",
    title: { en: "Light, grain, and truth", ar: "ضوء، حبيبات، وحقيقة" },
    excerpt: {
      en: "What cinematography taught me about telling a transformation story honestly — and why the rough cut often matters more than the polished one.",
      ar: "شنو علمتني التصوير عن حكي قصة تحوّل بصدق — وليش النسخة الخام أحيانًا بتعني أكتر من المصقولة.",
    },
    kind: "note",
    placeholder: true,
  },
  {
    id: "c6",
    category: "conversations",
    title: { en: "On discipline, freedom, and direction", ar: "عن الانضباط، الحرية، والتوجيه" },
    excerpt: {
      en: "A long-form conversation about why discipline is not the opposite of freedom — it is the path to it.",
      ar: "حوار مطوّل عن ليش الانضباط مش نقيض الحرية — هو طريقها.",
    },
    kind: "podcast",
    duration: "1:24:30",
    placeholder: true,
  },
  {
    id: "c7",
    category: "sleep",
    title: { en: "Your evening wind-down", ar: "روتين استرخاء المساء" },
    excerpt: {
      en: "The smallest possible evening routine that still protects your sleep and your next morning.",
      ar: "أصغر روتين مساء ممكن، يحمي نومك وصباحك الجاي.",
    },
    kind: "note",
    placeholder: true,
  },
  {
    id: "c8",
    category: "training",
    title: { en: "Reading your own log", ar: "اقرأ سجلّك" },
    excerpt: {
      en: "The training log is the most honest mirror you own. Here is how to actually use one.",
      ar: "سجل التمرين أم مرايا صادقة إلك. كيف تستخدمه فعليًا.",
    },
    kind: "video",
    duration: "04:48",
    placeholder: true,
  },
];

export const cutEntries: CutEntry[] = rawCutEntries.filter((e) =>
  cutCategories.some((c) => c.id === e.category)
);

/* ------------------------------------------------------------------ */
/* TRANSFORMATION STORIES (placeholders — Raja to provide verified)   */
/* ------------------------------------------------------------------ */
export type TransformStory = {
  id: string;
  name: string;
  reality: Bi;
  obstacle: Bi;
  habit: Bi;
  approach: Bi;
  result: Bi;
  sustainable: Bi;
  placeholder: true; // all unverified
};

export const transformStories: TransformStory[] = [
  {
    id: "t1",
    name: "—", // placeholder name
    reality: { en: "Trained hard for two weeks, then stopped for three months. Repeated for years.", ar: "تمرين قوي لأسبوعين، ثم توقف لثلاث أشهر. تكرر لسنوات." },
    obstacle: { en: "All-or-nothing thinking. If a session was missed, the week was lost.", ar: "تفكير كله-أو-لاشي. ضياع جلسة = ضياع الأسبوع." },
    habit: { en: "A minimum viable session — 20 minutes, no excuses version.", ar: "جلسة بأدنى حدّ — ٢٠ دقيقة، بدون أعذار." },
    approach: { en: "Three repeatable sessions a week, protein at every meal, fixed wake time.", ar: "ثلاث جلسات أسبوعيًا، بروتين بكل وجبة، وقت استيقاظ ثابت." },
    result: { en: "Consistency held through a busy season for the first time.", ar: "الاستمرارية صمدت بموسم مشغول لأول مرة." },
    sustainable: { en: "A system that bends instead of breaks when life gets hard.", ar: "نظام يثني بدل ما ينكسر لما الحياة تضيق." },
    placeholder: true,
  },
  {
    id: "t2",
    name: "—",
    reality: { en: "Knew everything about nutrition. Applied almost none of it.", ar: "عارف كل شي عن التغذية. ما طبّق منها تقريبًا شي." },
    obstacle: { en: "Perfectionism. If the day wasn't a perfect eating day, it was a failed day.", ar: "المثالية. إذا ما كان يوم أكل مثالي، كان يوم فاشل." },
    habit: { en: "The repeatable plate at one meal a day to start.", ar: "الصحن القابل للتكرار بوجبة وحدة يوميًا للبداية." },
    approach: { en: "Protein target first, everything else flexible around it.", ar: "هدف البروتين أولاً، والباقي مرن حوله." },
    result: { en: "Energy stabilized. Training improved without changing the program.", ar: "الطاقة استقرت. التمرين تحسّن بدون تغيير البرنامج." },
    sustainable: { en: "A relationship with food that survives restaurants and travel.", ar: "علاقة مع الأكل تصمد بالمطاعم والسفر." },
    placeholder: true,
  },
];

/* ------------------------------------------------------------------ */
/* RAJA'S KIT — curated recommendations                               */
/* Real: FitLab meals + FITRAJA10. Others are clearly-marked          */
/* placeholders organized by category for Raja to fill in.             */
/* ------------------------------------------------------------------ */
export type KitItem = {
  id: string;
  category: "supplements" | "protein" | "kitchen" | "training" | "grooming" | "camera";
  name: string;
  why: Bi;
  forWhom: Bi;
  url?: string;
  code?: string;
  affiliate: boolean;
  placeholder?: boolean;
};

export const kitCategories: { id: KitItem["category"]; label: Bi }[] = [
  { id: "supplements", label: { en: "Supplements", ar: "مكملات" } },
  { id: "protein", label: { en: "High-Protein Foods", ar: "أطعمة عالية البروتين" } },
  { id: "kitchen", label: { en: "Kitchen Tools", ar: "أدوات المطبخ" } },
  { id: "training", label: { en: "Training Essentials", ar: "أساسيات التمرين" } },
  { id: "grooming", label: { en: "Grooming & Curly Hair", ar: "العناية والشعر المجعّد" } },
  { id: "camera", label: { en: "Camera Equipment", ar: "معدّات تصوير" } },
];

export const kitItems: KitItem[] = [
  {
    id: "k1",
    category: "protein",
    name: "FitLab Meal Plans",
    why: {
      en: "A practical way to keep high-protein meals available on busy weeks without cooking every day.",
      ar: "طريقة عملية توفّر وجبات عالية البروتين بأسبوعك المشغول بدون تطبخ كل يوم.",
    },
    forWhom: { en: "Anyone building consistency with protein intake.", ar: "أي حدا بيبني استمرارية بكمية البروتين." },
    url: "https://fitlab-me.com/plans?affiliate_user=6a4f5513f0ec0280d80cd832&utm_source=Raja",
    code: "FITRAJA10",
    affiliate: true,
  },
  {
    id: "k2",
    category: "supplements",
    name: "Whey protein isolate",
    why: { en: "Convenient way to close a protein gap on high-training days.", ar: "طريقة مريحة تسدّ فجوة البروتين بأيام التمرين العالية." },
    forWhom: { en: "People short on time or appetite post-session.", ar: "الأشخاص اللي بوقت أو شهية قليل بعد التمرين." },
    affiliate: true,
    placeholder: true,
  },
  {
    id: "k3",
    category: "kitchen",
    name: "Digital kitchen scale",
    why: { en: "Removes the guesswork from portions for the first two weeks of a new habit.", ar: "يشل التخمين من الكميات بأول أسبوعين من عادة جديدة." },
    forWhom: { en: "Beginners building an accurate sense of portions.", ar: "المبتدئين اللي ببنوا حس دقيق بالكميات." },
    affiliate: true,
    placeholder: true,
  },
  {
    id: "k4",
    category: "training",
    name: "Lifting straps & belt",
    why: { en: "Support grip and bracing on heavier pulls — not for every set, only when it matters.", ar: "يدعم القبض والثبات بالرفعات الثقيلة — مش لكل تكرار، بس لمّا يفرق." },
    forWhom: { en: "Intermediate lifters moving into heavier work.", ar: "اللاعبين المتوسطين اللي بيتحركوا لأوزان أثقل." },
    affiliate: true,
    placeholder: true,
  },
  {
    id: "k5",
    category: "grooming",
    name: "Curl-defining routine",
    why: { en: "A simple, repeatable routine that respects curl pattern without a 12-step ritual.", ar: "روتين بسيط قابل للتكرار يحترم نمط التجعّد بدون طقوس من ١٢ خطوة." },
    forWhom: { en: "Anyone with curly hair who wants repeatable, low-effort care.", ar: "أي حدا بشعر مجعّد يريد عناية بسيطة قابلة للتكرار." },
    affiliate: true,
    placeholder: true,
  },
  {
    id: "k6",
    category: "camera",
    name: "Cinema prime lens",
    why: { en: "The single piece of glass I reach for when a story needs honesty and light needs restraint.", ar: "العدسة الوحدة اللي بروح لها لمّا القصة تحتاج صدق والضوء يحتاج ضبط." },
    forWhom: { en: "Creators who shoot people and want one lens to commit to.", ar: "صنّاع المحتوى اللي بتصوّر الناس وبدن عدسة وحدة يلتزموا فيها." },
    affiliate: true,
    placeholder: true,
  },
];

/* ------------------------------------------------------------------ */
/* ASSESSMENT — Choose Your Next Scene                                */
/* Maps answers to one of three next steps. No health diagnosis.      */
/* ------------------------------------------------------------------ */
export type AssessmentQuestion = {
  id: string;
  prompt: Bi;
  options: { id: string; label: Bi; weight: { ascend: number; consult: number; guide: number } }[];
};

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "goal",
    prompt: { en: "What is your main goal right now?", ar: "شنو هدفك الرئيسي هسا؟" },
    options: [
      { id: "fat", label: { en: "Lose body fat", ar: "خسارة دهون" }, weight: { ascend: 2, consult: 1, guide: 1 } },
      { id: "muscle", label: { en: "Build muscle", ar: "بناء عضلات" }, weight: { ascend: 2, consult: 1, guide: 1 } },
      { id: "consistency", label: { en: "Restore consistency", ar: "استرجاع الاستمرارية" }, weight: { ascend: 3, consult: 0, guide: 1 } },
      { id: "energy", label: { en: "Improve energy", ar: "تحسين الطاقة" }, weight: { ascend: 2, consult: 1, guide: 2 } },
      { id: "habits", label: { en: "Develop sustainable habits", ar: "تطوير عادات مستدامة" }, weight: { ascend: 3, consult: 0, guide: 2 } },
    ],
  },
  {
    id: "training",
    prompt: { en: "How consistent is your training?", ar: "قد إيش تمرينك منتظم؟" },
    options: [
      { id: "rarely", label: { en: "Rarely train", ar: "نادرًا أتمرّن" }, weight: { ascend: 2, consult: 2, guide: 1 } },
      { id: "onoff", label: { en: "On-and-off for years", ar: "فترات متقطعة لسنوات" }, weight: { ascend: 3, consult: 1, guide: 1 } },
      { id: "steady", label: { en: "Steady but plateaued", ar: "منتظم بس وصلت سقف" }, weight: { ascend: 2, consult: 2, guide: 0 } },
      { id: "consistent", label: { en: "Consistent and clear", ar: "منتظم وواضح" }, weight: { ascend: 1, consult: 2, guide: 0 } },
    ],
  },
  {
    id: "food",
    prompt: { en: "Your relationship with food today?", ar: "علاقتك مع الأكل هسا؟" },
    options: [
      { id: "restrict", label: { en: "Restrictive, then rebounds", ar: "تقييد، ثم ارتداد" }, weight: { ascend: 3, consult: 1, guide: 1 } },
      { id: "unstructured", label: { en: "Unstructured", ar: "غير منظّم" }, weight: { ascend: 3, consult: 0, guide: 2 } },
      { id: "decent", label: { en: "Decent but inconsistent", ar: "مقبول بس غير ثابت" }, weight: { ascend: 2, consult: 1, guide: 1 } },
      { id: "solid", label: { en: "Solid and repeatable", ar: "ثابت وقابل للتكرار" }, weight: { ascend: 1, consult: 2, guide: 0 } },
    ],
  },
  {
    id: "sleep",
    prompt: { en: "Your sleep quality?", ar: "جودة نومك؟" },
    options: [
      { id: "poor", label: { en: "Poor and irregular", ar: "ضعيف وغير منتظم" }, weight: { ascend: 2, consult: 1, guide: 2 } },
      { id: "ok", label: { en: "Okay, unstable", ar: "مقبول، غير مستقر" }, weight: { ascend: 2, consult: 1, guide: 1 } },
      { id: "good", label: { en: "Good and steady", ar: "جيد وثابت" }, weight: { ascend: 1, consult: 1, guide: 0 } },
    ],
  },
  {
    id: "routine",
    prompt: { en: "How predictable is your daily routine?", ar: "قد إيش يومك متوقّع؟" },
    options: [
      { id: "chaos", label: { en: "Chaos most days", ar: "فوضى أغلب الأيام" }, weight: { ascend: 2, consult: 2, guide: 1 } },
      { id: "variable", label: { en: "Variable but workable", ar: "متغيّر بس ممكن يشتغل" }, weight: { ascend: 3, consult: 1, guide: 1 } },
      { id: "stable", label: { en: "Stable and mine", ar: "ثابت وإلي" }, weight: { ascend: 2, consult: 1, guide: 0 } },
    ],
  },
  {
    id: "obstacle",
    prompt: { en: "Your biggest obstacle right now?", ar: "أكبر عائق إلك هسا؟" },
    options: [
      { id: "knowledge", label: { en: "Don't know what to do", ar: "لا أعرف شنو أعمل" }, weight: { ascend: 2, consult: 1, guide: 3 } },
      { id: "consistency", label: { en: "Can't stay consistent", ar: "ما أقدر أثبت" }, weight: { ascend: 3, consult: 1, guide: 1 } },
      { id: "plateau", label: { en: "Plateaued progress", ar: "تقدّم متوقف" }, weight: { ascend: 1, consult: 3, guide: 0 } },
      { id: "recovery", label: { en: "Recovery & energy", ar: "تعافٍ وطاقة" }, weight: { ascend: 2, consult: 2, guide: 1 } },
    ],
  },
];

export type PathId = "ascend" | "consult" | "guide";
export const assessmentPaths: Record<PathId, { label: Bi; desc: Bi; cta: Bi; href: string }> = {
  ascend: {
    label: { en: "The Ascend Path", ar: "مسار إرتقِ" },
    desc: {
      en: "Your answers point to a system, not more information. Ascend gives you the structure, weekly guidance, and a community walking the same path.",
      ar: "إجاباتك بتشير لنظام، مش لمعلومات أكثر. إرتقِ بيعطيك البنية، التوجيه الأسبوعي، ومجتمع ماشي بنفس الطريق.",
    },
    cta: { en: "Join Ascend", ar: "ابدأ رحلة ارتقِ" },
    href: "#ascend",
  },
  consult: {
    label: { en: "The Direction Path", ar: "مسار التوجيه" },
    desc: {
      en: "You have momentum but you're stuck at a specific edge. A focused 1:1 consultation can unblock it.",
      ar: "عندك زخم بس محظوظ بزاوية معيّنة. استشارة ١:١ مركّزة بتقدر تفتحها.",
    },
    cta: { en: "Book a Consultation", ar: "احجز استشارتك" },
    href: "#coaching",
  },
  guide: {
    label: { en: "The First Step Path", ar: "مسار الخطوة الأولى" },
    desc: {
      en: "Start with a free practical guide. Build one repeatable habit before you build a system.",
      ar: "ابدأ بدليل عملي مجاني. ابنِ عادة وحدة قابلة للتكرار قبل ما تبني نظام.",
    },
    cta: { en: "Get the Free Guide", ar: "احصل على الدليل المجاني" },
    href: "#contact",
  },
};

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export const faq: { q: Bi; a: Bi }[] = [
  {
    q: { en: "Is Ascend suitable for beginners?", ar: "هل إرتقِ مناسب للمبتدئين؟" },
    a: {
      en: "Yes. Ascend is built for people who want a system they can actually live with — whether you are starting today or restarting after years off.",
      ar: "نعم. إرتقِ مبني للأشخاص اللي بدن نظام يقدروا يعيشوا معه — سواء بدأت اليوم أو ترجع بعد سنين.",
    },
  },
  {
    q: { en: "Do I need to be in perfect shape to join?", ar: "هل لازم أكون بسياق مثالي عشان أنضم؟" },
    a: {
      en: "No. You are not asked to be perfect. You are asked to start, apply, and progress step by step.",
      ar: "لا. مش مطلوب منك تكون مثالي. مطلوب تبدأ، تطبّق، وتتقدّم خطوة بخطوة.",
    },
  },
  {
    q: { en: "What language is the community in?", ar: "بأي لغة المجتمع؟" },
    a: { en: "Arabic-first. All guidance, calls, and content are in Arabic.", ar: "عربي أولًا. كل التوجيه والمكالمات والمحتوى بالعربي." },
  },
  {
    q: { en: "How much does it cost?", ar: "كم التكلفة؟" },
    a: {
      en: "The current membership is $29/month for the first 50 members, then $39/month. Cancel anytime.",
      ar: "الاشتراك الحالي ٢٩ دولار/شهر لأول ٥٠ مشترك، ثم ٣٩ دولار/شهر. تقدر تلغي بأي وقت.",
    },
  },
  {
    q: { en: "Do you promise physical results?", ar: "هل تعد بنتائج جسدية؟" },
    a: {
      en: "No. Results depend on your starting point, consistency, sleep, stress, and genetics. What Ascend promises is a system, guidance, and a community that improves your odds.",
      ar: "لا. النتائج تعتمد على نقطة بدايتك، استمراريتك، نومك، ضغطك، وجيناتك. اللي بتعده إرتقِ هو نظام، توجيه، ومجتمع بيحسّن فرصك.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* HEALTH DISCLAIMER                                                   */
/* ------------------------------------------------------------------ */
export const healthDisclaimer: Bi = {
  en: "Information and guidance on this site is educational and lifestyle-focused. It is not medical advice. Always consult a qualified healthcare professional before making changes to training, nutrition, or lifestyle — especially if you have a medical condition.",
  ar: "المعلومات والتوجيه بهالموقع تعليمية وتركّز على أسلوب الحياة. مش نصيحة طبية. دائمًا استشر مختص صحي مؤهّل قبل أي تغيير بالتمرين، التغذية، أو أسلوب الحياة — خصوصًا عند وجود حالة طبية.",
};

/* ------------------------------------------------------------------ */
/* ONE-TO-ONE CONSULTATION                                             */
/* ------------------------------------------------------------------ */
export const consult = {
  whoFor: {
    en: "For the person who already has momentum and is stuck at one specific edge — training, nutrition, sleep, or the system that holds them together.",
    ar: "للشخص اللي عنده زخم ومحظوظ بزاوية وحدة محددة — تمرين، تغذية، نوم، أو النظام الجامع.",
  } as Bi,
  canHelp: [
    { en: "Diagnose what's actually stalling progress", ar: "شخّص شنو فعليًا يوقف التقدّم" },
    { en: "Rebuild a week that survives your real life", ar: "أعد بناء أسبوع يصمد بحياتك الحقيقية" },
    { en: "Set a 90-day direction you can repeat", ar: "ضبط اتجاه ٩٠ يوم تقدر تكرره" },
  ] as Bi[],
  howItWorks: [
    { en: "Book a focused 45-minute session.", ar: "احجز جلسة مركّزة ٤٥ دقيقة." },
    { en: "Share your current training, food, sleep, and obstacles beforehand.", ar: "شارك تمرينك، أكلك، نومك، وعوائقك مسبقًا." },
    { en: "We work the single highest-leverage edge together.", ar: "نشغل أعلى زاوية تأثير سوا." },
    { en: "You leave with a clear 90-day direction and the first repeatable action.", ar: "تطلع باتجاه ٩٠ يوم واضح وأول فعل قابل للتكرار." },
  ] as Bi[],
  prepare: [
    { en: "3 days of honest food and training log", ar: "٣ أيام من سجل صادق للأكل والتمرين" },
    { en: "Your current sleep rhythm", ar: "إيقاع نومك الحالي" },
    { en: "The one question you can't answer alone", ar: "السؤال الواحد اللي ما تقدر تجاوبه لوحدك" },
  ] as Bi[],
  after: {
    en: "You receive a written summary, the agreed direction, and the first repeatable action. No follow-up obligation — you can continue alone, in Ascend, or in a follow-up session.",
    ar: "تستلم ملخص مكتوب، الاتجاه المتفق عليه، وأول فعل قابل للتكرار. بدون التزام متابعة — تقدر تكمل لوحدك، بإرتقِ، أو بجلسة متابعة.",
  } as Bi,
};

/* ------------------------------------------------------------------ */
/* BRAND PARTNERSHIPS                                                  */
/* ------------------------------------------------------------------ */
export const partnerships = {
  intro: {
    en: "Raja partners selectively with brands that fit a sustainable, honest approach to training, food, and lifestyle. No brand is promoted for the fee alone.",
    ar: "راجا يشارك بانتقائية مع علامات تتلاءم مع نهج مستدام وصادق بالتمرين، الأكل، وأسلوب الحياة. ما يتم الترويج لأي علامة مقابل الرسوم وحدها.",
  } as Bi,
  criteria: [
    { en: "A product Raja actually uses", ar: "منتج يستخدمه راجا فعلًا" },
    { en: "A fit with sustainable, non-extreme values", ar: "يتلاءم مع قيم مستدامة، غير متطرفة" },
    { en: "A genuine benefit to the Arabic community", ar: "فائدة حقيقية للمجتمع العربي" },
  ] as Bi[],
  cta: { en: "Pitch a partnership", ar: "اقترح شراكة" } as Bi,
  email: brand.email,
};

/* ------------------------------------------------------------------ */
/* JOURNAL & VIDEOS (placeholder channel-level)                        */
/* ------------------------------------------------------------------ */
export const journal = {
  youtubeUrl: "https://www.youtube.com/channel/UCQirKQinz3P-6IBdCjD0Dig",
  note: {
    en: "Full journal entries and video index will be added here as Raja publishes them. Today the channel is the live source.",
    ar: "تفاصيل اليوميات وفهرس الفيديوهات رح تتضاف هون مع نشر راجا لها. هسا القناة هي المصدر الحي.",
  } as Bi,
};

/* ------------------------------------------------------------------ */
/* FINAL ASCENT                                                        */
/* ------------------------------------------------------------------ */
export const finalAscent = {
  headline: { en: "Your next version is not discovered.\nIt is built.", ar: "نسختك القادمة لا تنتظر أن تكتشفها.\nابنِها." } as Bi,
  cta: { en: "Start Your Ascent", ar: "ابدأ رحلة ارتقِ" } as Bi,
  href: "#ascend",
};

/* ------------------------------------------------------------------ */
/* STICKY NAV LINKS (single-route anchors)                            */
/* ------------------------------------------------------------------ */
export const navLinks: { id: string; label: Bi; href: string }[] = [
  { id: "method", label: { en: "The Method", ar: "المنهجية" }, href: "#method" },
  { id: "assessment", label: { en: "Assessment", ar: "تقييم" }, href: "#assessment" },
  { id: "ascend", label: { en: "Ascend", ar: "إرتقِ" }, href: "#ascend" },
  { id: "story", label: { en: "Raja's Story", ar: "قصة راجا" }, href: "#story" },
  { id: "journal", label: { en: "Journal & Videos", ar: "يوميات وفيديوهات" }, href: "#journal" },
  { id: "kit", label: { en: "Raja's Kit", ar: "عتاد راجا" }, href: "#kit" },
  { id: "coaching", label: { en: "1:1 Coaching", ar: "توجيه ١:١" }, href: "#coaching" },
  { id: "partnerships", label: { en: "Partnerships", ar: "شراكات" }, href: "#partnerships" },
  { id: "contact", label: { en: "Contact", ar: "تواصل" }, href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* PER-SECTION OG METADATA HELPER                                     */
/* Generates section-specific Open Graph metadata for richer social    */
/* sharing of individual chapters. Used by the layout + share buttons.  */
/* ------------------------------------------------------------------ */
export function getSectionOgMeta(sectionId: string, lang: "en" | "ar" = "en") {
  const link = navLinks.find((l) => l.id === sectionId);
  const idx = link ? navLinks.indexOf(link) : -1;
  const chapterNum = idx >= 0 ? String(idx + 1).padStart(2, "0") : "01";
  const title = link
    ? `${link.label[lang]} · ${brand.name[lang]}`
    : `${brand.name[lang]} — Build the Body. Direct the Life.`;
  const description = link
    ? `${lang === "ar" ? "الفصل" : "Chapter"} ${chapterNum} — ${link.label[lang]}. ${lang === "ar" ? "إرتقِ — نظام عربي للتغيير المستدام." : "Ascend — a sustainable Arabic transformation system."}`
    : ascend.tagline[lang];
  return {
    title,
    description,
    chapterNum,
    ogImage: `/api/og?section=${sectionId}&lang=${lang}`,
    url: `https://rajaidries.com/${link ? link.href.replace("#", "#") : ""}`,
  };
}

/* ------------------------------------------------------------------ */
/* PRIMARY CTAS                                                        */
/* ------------------------------------------------------------------ */
export const ctas = {
  joinAscend: { en: "Join Ascend", ar: "ابدأ رحلة ارتقِ" } as Bi,
  exploreMethod: { en: "Explore the Method", ar: "اكتشف منهجية ارتقِ" } as Bi,
  bookConsult: { en: "Book a Consultation", ar: "احجز استشارتك" } as Bi,
  watchStory: { en: "Watch Raja's Story", ar: "شاهد قصة راجا" } as Bi,
};

/* ------------------------------------------------------------------ */
/* SHORT COPY LINES (the brand's one-liners)                          */
/* ------------------------------------------------------------------ */
export const lines = {
  buildDirect: { en: "Build the body. Direct the life.", ar: "ابنِ جسمك. وجّه حياتك." } as Bi,
  consistencySkill: { en: "Consistency is a skill.", ar: "الاستمرارية مهارة." } as Bi,
  surviveLife: { en: "Your plan should survive real life.", ar: "خطتك لازم يصمد بالحقيقي." } as Bi,
  progressPunishment: { en: "Progress without punishment.", ar: "تقدّم بدون عقاب." } as Bi,
  buildRepeatable: { en: "Do not chase perfect. Build repeatable.", ar: "لا تطارد الكمال. ابنِ القابل للتكرار." } as Bi,
  knowledgeHabit: { en: "Knowledge changes nothing until it becomes a habit.", ar: "المعرفة ما بتغيّر شي لحد ما تصير عادة." } as Bi,
  directingIt: { en: "You are not waiting for your transformation story. You are directing it.", ar: "أنت مش مستني قصة تحوّلك. أنت بتوجّهها." } as Bi,
};
