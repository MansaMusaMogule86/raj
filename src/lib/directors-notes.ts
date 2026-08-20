import type { Bi } from "@/lib/content";

/**
 * Director's Notes — film-language meta-commentary on the creative intent
 * of each section. These are creative-direction notes (like a director's
 * treatment), NOT invented biographical claims about Raja. Honest meta-layer
 * that reinforces the documentary-film aesthetic.
 */
export type DirectorNote = {
  sectionId: string;
  chapter: string;
  note: Bi;
};

export const directorNotes: DirectorNote[] = [
  {
    sectionId: "problem",
    chapter: "02",
    note: {
      en: "We open on the loop, not the body. The body is the symptom; the loop is the story. Breaking it is the first frame of change.",
      ar: "نفتتح على الدائرة، مش على الجسم. الجسم عرض؛ الدائرة هي القصة. كسرها هو أول لقطة تغيير.",
    },
  },
  {
    sectionId: "method",
    chapter: "03",
    note: {
      en: "Four pillars, one system. Shot like a contact sheet — equal weight, no hero. The system is the protagonist, not any single pillar.",
      ar: "أربعة أعمدة، نظام واحد. مُصوّر كورقة اتصال — وزن متساوي، بلا بطل. النظام هو البطل، مش أي عمود.",
    },
  },
  {
    sectionId: "assessment",
    chapter: "04",
    note: {
      en: "Six questions, one cut. We earn the email by giving the path first. Value before capture — always.",
      ar: "ست أسئلة، لقطة وحدة. نكسب البريد بإعطاء المسار أولاً. قيمة قبل التقاط — دائمًا.",
    },
  },
  {
    sectionId: "ascend",
    chapter: "05",
    note: {
      en: "The community is the third act. Not a product page — a place. The interface preview is shot like a behind-the-scenes frame.",
      ar: "المجتمع هو الفصل الثالث. مش صفحة منتج — مكان. معاينة الواجهة مُصوّرة كلقطة خلف الكواليس.",
    },
  },
  {
    sectionId: "story",
    chapter: "06",
    note: {
      en: "Four frames, not a timeline. The camera, the body, the system, the mission — each is a lens, not a year.",
      ar: "أربع لقطات، مش خط زمني. الكاميرا، الجسم، النظام، المهمة — كل واحدة عدسة، مش سنة.",
    },
  },
  {
    sectionId: "journal",
    chapter: "08",
    note: {
      en: "The Cut is edited like a contact sheet. You see the frames before the final selection. Thinking out loud, in public.",
      ar: "الكَت مُونتاج كورقة اتصال. تشوف اللقطات قبل الاختيار النهائي. تفكير بصوت عالي، بالعلن.",
    },
  },
  {
    sectionId: "kit",
    chapter: "09",
    note: {
      en: "Tools, not trophies. Every item earns its frame by being used, not by being paid for. The kit serves the system.",
      ar: "أدوات، مش كؤوس. كل عنصر يكسب لقطته بالاستخدام، مش بالدفع. العتاد يخدم النظام.",
    },
  },
  {
    sectionId: "coaching",
    chapter: "10",
    note: {
      en: "One session, one edge. We don't sell a transformation; we sell a direction. The 90-day horizon is the frame.",
      ar: "جلسة وحدة، زاوية وحدة. ما نبيع تحوّل؛ نبيع اتجاه. أفق الـ ٩٠ يوم هو الإطار.",
    },
  },
  {
    sectionId: "final-ascent",
    chapter: "13",
    note: {
      en: "The final frame is a horizon, not a finish line. Built, not discovered. The film ends; the work continues.",
      ar: "اللقطة الأخيرة أفق، مش خط نهاية. مُبنى، مش مُكتشف. الفيلم ينتهي؛ الشغل يكمل.",
    },
  },
];
