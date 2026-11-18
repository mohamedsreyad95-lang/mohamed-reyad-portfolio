/**
 * Complete original scripts, stored exactly as supplied in the original Arabic.
 * Never summarise, paraphrase, translate, reconstruct, or fill gaps here.
 * Treatments, outlines, beat sheets, and incomplete scripts are never published.
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
  /**
   * "available" only when the complete original Arabic script is in `body`.
   * "text-pending" entries are never shown publicly, not even as a title.
   */
  status: "available" | "text-pending";
  /** Verified original title. null until supplied. */
  title: string | null;
  titleLang?: "ar";
  /** Small English helper under an Arabic title. */
  gloss?: string;
  brand?: string;
  category: string;
  logline?: string;
  body?: ScriptBlock[];
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
  // Owner policy: FULL SCRIPTS ONLY.
  // OPAL treatments are excluded from the public portfolio.
  // Complete brand scripts and the three football scripts below remain unpublished until
  // their complete original Arabic text is supplied in `body` and status is set to "available".
  ...[
    "\u0645\u0627\u0630\u0627 \u064a\u062f\u062e\u0646\u0648\u0646 \u0641\u064a \u0645\u0644\u0639\u0628 \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a\u061f",
    "\u0647\u0644 \u062f\u0648\u0631\u064a \u0623\u0628\u0637\u0627\u0644 \u0623\u0648\u0631\u0648\u0628\u0627 \u0647\u0648 \u0627\u0644\u0644\u064a \u0628\u064a\u0635\u0646\u0639 \u0627\u0644\u0623\u0633\u0627\u0637\u064a\u0631\u061f",
    "\u0627\u0644\u062f\u0648\u0631\u064a \u0627\u0644\u0633\u0639\u0648\u062f\u064a \u0646\u062c\u062d\u2026 \u0644\u0643\u0646 \u0647\u0644 \u062f\u0647 \u0643\u0627\u0646 \u0627\u0644\u0647\u062f\u0641 \u0623\u0635\u0644\u064b\u0627\u061f",
  ].map((title, i): ScriptEntry => ({
    slug: `sports-script-0${i + 1}`,
    group: "sports",
    status: "text-pending",
    title,
    titleLang: "ar",
    category: "Sports & Editorial",
  })),
];

/** The only scripts shown anywhere public: complete original text and a verified title. */
export const readableScripts = scripts.filter(
  (s) => s.status === "available" && s.title !== null && (s.body?.length ?? 0) > 0,
);
export const getScript = (slug: string) => readableScripts.find((s) => s.slug === slug);
export const scriptsIn = (g: ScriptGroup) => readableScripts.filter((s) => s.group === g);
/** Groups that have complete scripts to read. Empty groups are hidden. */
export const shownScriptGroups = (["brand", "sports"] as const).filter(
  (g) => scriptsIn(g).length > 0,
);
export const hasScripts = readableScripts.length > 0;
