export type Beat =
  | { type: "scene"; text: string }
  | { type: "action"; text: string }
  | { type: "super"; text: string; lang?: "ar" }
  | { type: "note"; text: string };

export type ScriptEntry = {
  slug: string;
  kind: "treatment" | "script" | "collection";
  status: "available" | "coming";
  title: string;
  titleLang?: "ar";
  gloss?: string;
  brand?: string;
  category: string;
  logline: string;
  beats?: Beat[];
  note?: string;
  relatedUrl?: string;
};

export const scripts: ScriptEntry[] = [
  {
    slug: "opal-shower-gel-where",
    kind: "treatment",
    status: "available",
    title: "\u0647\u0648 \u0634\u0627\u0648\u0631 \u062c\u064a\u0644 OPAL \u0628\u0642\u0649 \u0641\u064a\u0646\u061f",
    titleLang: "ar",
    gloss: "So where did OPAL shower gel go?",
    brand: "OPAL Shower Gel",
    category: "Brand Content",
    logline:
      "Customers can\u2019t find their shower gel because the packaging changed. The shopkeeper has to explain, again and again.",
    beats: [
      { type: "scene", text: "INT. SHOP" },
      {
        type: "action",
        text: "Customers come in asking for OPAL shower gel. None of them recognise the redesigned packaging sitting right in front of them.",
      },
      {
        type: "action",
        text: "The shopkeeper walks them through it. The new pump. Three sizes. The colors. The improved texture and fragrances.",
      },
      {
        type: "action",
        text: "Every customer gets it wrong in a new way, and the comedy escalates with each one.",
      },
    ],
  },
  {
    slug: "opal-alan-hoy-style",
    kind: "treatment",
    status: "available",
    title: "OPAL Shower Gel | Alan Hoy Production Style",
    brand: "OPAL Shower Gel",
    category: "Brand Content",
    logline: "The fragrance is so strong Sandra walks out of the bathroom and into the beach.",
    beats: [
      { type: "scene", text: "INT. HOME" },
      {
        type: "action",
        text: "Sandra steps out of the bathroom. Because of the fragrance, her home has turned into something that feels like the beach.",
      },
      { type: "action", text: "Reveal: a frisca seller." },
      {
        type: "super",
        lang: "ar",
        text: "\u0631\u064a\u062d\u0629 \u062a\u0648\u062f\u064a\u0643 \u0627\u0644\u0633\u0627\u062d\u0644\u2026 \u062d\u062a\u0649 \u0644\u0648 \u0625\u0646\u062a \u0641\u064a \u0627\u0644\u0628\u064a\u062a.",
      },
      { type: "note", text: "Written in the production style of Alan Hoy." },
    ],
  },
  {
    slug: "opal-meeting-room",
    kind: "treatment",
    status: "available",
    title: "\u0645\u0639\u0637\u0631 OPAL | Meeting Room",
    titleLang: "ar",
    gloss: "OPAL air freshener | Meeting Room",
    brand: "OPAL Air Freshener",
    category: "Brand Content",
    logline: "An office breakfast gets mistaken for a meeting. Cleanup happens in slow motion.",
    beats: [
      { type: "scene", text: "INT. OFFICE MEETING ROOM" },
      { type: "action", text: "An office breakfast is mistaken for a meeting." },
      { type: "action", text: "A frantic cleanup, played in slow motion." },
      { type: "action", text: "OPAL air freshener saves the scene." },
      { type: "action", text: "The manager walks in and joins the breakfast." },
    ],
  },
  {
    slug: "complete-arabic-scripts",
    kind: "collection",
    status: "coming",
    title: "Complete scripts, in Arabic",
    category: "Brand Content",
    logline:
      "Four complete scripts from the earlier portfolio. They will be published here in their original Arabic once the full text is in.",
  },
  {
    slug: "football-scripts",
    kind: "collection",
    status: "coming",
    title: "Football scripts",
    category: "Sports & Editorial",
    logline: "Scripts written around football. Titles and dialogue will appear in the original Arabic when they are added.",
  },
  {
    slug: "home-bundle-peace-of-mind-treatment",
    kind: "treatment",
    status: "coming",
    title: "Home Bundle | Peace of Mind",
    category: "Brand Content",
    logline: "The original treatment for the Home Bundle idea.",
    note: "This treatment is separate from the finished reel, which is not necessarily the same story.",
    relatedUrl: "https://www.instagram.com/reel/DbJLdO9Ie__/",
  },
];

export const readableScripts = scripts.filter((s) => s.status === "available");
export const getScript = (slug: string) => readableScripts.find((s) => s.slug === slug);
