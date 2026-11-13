/** Treatment beats are short English stage notes around Arabic lines. */
export type Beat =
  | { type: "scene"; text: string }
  | { type: "action"; text: string }
  | { type: "super"; text: string; lang?: "ar" }
  | { type: "note"; text: string };

/**
 * Full scripts are stored exactly as supplied, in the original Arabic.
 * Never summarise, translate or fill gaps here.
 */
export type ScriptBlock =
  | { type: "scene"; text: string }
  | { type: "action"; text: string }
  | { type: "character"; text: string }
  | { type: "parenthetical"; text: string }
  | { type: "dialogue"; text: string }
  | { type: "transition"; text: string }
  | { type: "super"; text: string };

export type ScriptGroup = "brand" | "sports";

export type ScriptEntry = {
  slug: string;
  group: ScriptGroup;
  kind: "treatment" | "full-script";
  /** "text-pending" means the source text is not in hand yet. Nothing is shown in its place. */
  status: "available" | "text-pending";
  /** Original title. null until the verified original is supplied. */
  title: string | null;
  titleLang?: "ar";
  /** Small English helper under an Arabic title. */
  gloss?: string;
  /** English working label for an entry whose original title is still pending. */
  workingLabel?: string;
  brand?: string;
  category: string;
  logline?: string;
  beats?: Beat[];
  body?: ScriptBlock[];
  note?: string;
  relatedUrl?: string;
};

export const SCRIPT_GROUPS: Record<
  ScriptGroup,
  { id: ScriptGroup; label: [string, string]; blurb: string; cue: string }
> = {
  brand: {
    id: "brand",
    label: ["Brand", "Scripts"],
    blurb:
      "Ideas for brands, written as scenes. Each one starts with an everyday situation and lets the product fit in where it actually helps.",
    cue: "Read scripts",
  },
  sports: {
    id: "sports",
    label: ["Sports", "Scripts"],
    blurb:
      "Football writing in Arabic. The three titles are here, and each full script goes up as soon as its text is recovered.",
    cue: "Explore",
  },
};

export const scripts: ScriptEntry[] = [
  {
    slug: "opal-shower-gel-where",
    group: "brand",
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
    group: "brand",
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
      { type: "note", text: "Style reference: Alan Hoy production style." },
    ],
  },
  {
    slug: "opal-meeting-room",
    group: "brand",
    kind: "treatment",
    status: "available",
    title: "\u0645\u0639\u0637\u0631 OPAL | Meeting Room",
    titleLang: "ar",
    gloss: "OPAL air freshener, Meeting Room",
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
  // The four complete scripts from the earlier portfolio are not listed until their
  // exact titles and full text are supplied. Never add placeholder entries for them.
  {
    slug: "home-bundle-peace-of-mind-treatment",
    group: "brand",
    kind: "treatment",
    status: "text-pending",
    title: null,
    workingLabel: "Home Bundle | Peace of Mind",
    category: "Brand Content",
    note: "The original treatment for this idea. The finished reel is not necessarily the same story.",
    relatedUrl: "https://www.instagram.com/reel/DbJLdO9Ie__/",
  },
  // Three football scripts. Titles verified by Mohamed; full text not recovered yet.
  ...[
    "\u0645\u0627\u0630\u0627 \u064a\u062f\u062e\u0646\u0648\u0646 \u0641\u064a \u0645\u0644\u0639\u0628 \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a\u061f",
    "\u0647\u0644 \u062f\u0648\u0631\u064a \u0623\u0628\u0637\u0627\u0644 \u0623\u0648\u0631\u0648\u0628\u0627 \u0647\u0648 \u0627\u0644\u0644\u064a \u0628\u064a\u0635\u0646\u0639 \u0627\u0644\u0623\u0633\u0627\u0637\u064a\u0631\u061f",
    "\u0627\u0644\u062f\u0648\u0631\u064a \u0627\u0644\u0633\u0639\u0648\u062f\u064a \u0646\u062c\u062d\u2026 \u0644\u0643\u0646 \u0647\u0644 \u062f\u0647 \u0643\u0627\u0646 \u0627\u0644\u0647\u062f\u0641 \u0623\u0635\u0644\u064b\u0627\u061f",
  ].map(
    (title, i): ScriptEntry => ({
      slug: `sports-script-0${i + 1}`,
      group: "sports",
      kind: "full-script",
      status: "text-pending",
      title,
      titleLang: "ar",
      category: "Sports & Editorial",
      note: "Football. The full Arabic text is being recovered.",
    }),
  ),
];

export const readableScripts = scripts.filter((s) => s.status === "available");
export const getScript = (slug: string) => readableScripts.find((s) => s.slug === slug);
/** Only entries with a verified original title are shown publicly. */
export const listedScripts = scripts.filter((s) => s.title !== null);
export const scriptsIn = (g: ScriptGroup) => listedScripts.filter((s) => s.group === g);

export const kindLabel: Record<ScriptEntry["kind"], string> = {
  treatment: "Treatment",
  "full-script": "Full script",
};

/** Arabic label shown next to the English one, so a treatment is never mistaken for a screenplay. */
export const kindLabelAr: Record<ScriptEntry["kind"], string> = {
  treatment: "\u0645\u0639\u0627\u0644\u062c\u0629 \u0625\u0628\u062f\u0627\u0639\u064a\u0629",
  "full-script": "\u0633\u064a\u0646\u0627\u0631\u064a\u0648 \u0643\u0627\u0645\u0644",
};
