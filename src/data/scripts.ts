/**
 * Script and treatment text, stored exactly as supplied in the original Arabic.
 * Never summarise, paraphrase, translate or fill gaps here.
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
  /**
   * "available" only when the complete original text is in `body`.
   * "text-pending" entries are never shown publicly, not even as a title.
   */
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
    blurb: "Football writing, in Arabic.",
    cue: "Explore",
  },
};

export const scripts: ScriptEntry[] = [
  // The three OPAL treatments. Only the titles and a short brief were supplied; the full
  // Arabic treatment text (old portfolio PDF, pages 22 to 31) is not in the project yet,
  // so they stay unpublished. Paste the text into `body` exactly and set status "available".
  {
    slug: "opal-shower-gel-where",
    group: "brand",
    kind: "treatment",
    status: "text-pending",
    title: "\u0647\u0648 \u0634\u0627\u0648\u0631 \u062c\u064a\u0644 OPAL \u0628\u0642\u0649 \u0641\u064a\u0646\u061f",
    titleLang: "ar",
    brand: "OPAL Shower Gel",
    category: "Brand Content",
  },
  {
    slug: "opal-alan-hoy-style",
    group: "brand",
    kind: "treatment",
    status: "text-pending",
    title: "OPAL Shower Gel | Alan Hoy Production Style",
    brand: "OPAL Shower Gel",
    category: "Brand Content",
  },
  {
    slug: "opal-meeting-room",
    group: "brand",
    kind: "treatment",
    status: "text-pending",
    title: "\u0645\u0639\u0637\u0631 OPAL | Meeting Room",
    titleLang: "ar",
    brand: "OPAL Air Freshener",
    category: "Brand Content",
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
    }),
  ),
];

/** The only scripts shown anywhere public: complete original text and a verified title. */
export const readableScripts = scripts.filter(
  (s) => s.status === "available" && s.title !== null && (s.body?.length ?? 0) > 0,
);
export const getScript = (slug: string) => readableScripts.find((s) => s.slug === slug);
export const scriptsIn = (g: ScriptGroup) => readableScripts.filter((s) => s.group === g);
/** Groups that have something to read. Empty groups, and an empty library, are hidden. */
export const shownScriptGroups = (["brand", "sports"] as const).filter((g) => scriptsIn(g).length > 0);
export const hasScripts = readableScripts.length > 0;

export const kindLabel: Record<ScriptEntry["kind"], string> = {
  treatment: "Treatment",
  "full-script": "Full script",
};

/** Arabic label shown next to the English one, so a treatment is never mistaken for a screenplay. */
export const kindLabelAr: Record<ScriptEntry["kind"], string> = {
  treatment: "\u0645\u0639\u0627\u0644\u062c\u0629 \u0625\u0628\u062f\u0627\u0639\u064a\u0629",
  "full-script": "\u0633\u064a\u0646\u0627\u0631\u064a\u0648 \u0643\u0627\u0645\u0644",
};
