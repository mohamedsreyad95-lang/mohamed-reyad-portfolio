import { describe, expect, it } from "vitest";
import {
  areaCount,
  featuredProjects,
  getArea,
  hasReels,
  projects,
  SERVICES,
  shownWorkAreas,
  WORK_AREAS,
} from "@/data/projects";
import { profile } from "@/data/profile";
import {
  getScript,
  hasScripts,
  readableScripts,
  SCRIPT_GROUPS,
  scripts,
  shownScriptGroups,
} from "@/data/scripts";
import { NAV } from "@/components/site/nav";

const bySlug = (s: string) => projects.find((p) => p.slug === s)!;

describe("portfolio content rules", () => {
  it("features exactly four projects on the homepage", () => {
    expect(featuredProjects).toHaveLength(4);
  });

  it("reports OPAL rebranding Instagram numbers as likes and comments, not views", () => {
    const opal = bySlug("opal-shower-gel-rebranding");
    const post = opal.metrics.filter((m) => m.scope === "This Instagram post");
    expect(post.map((m) => [m.value, m.label])).toEqual([
      ["15,389", "likes"],
      ["333", "comments"],
    ]);
  });

  it("keeps the 2M+ figure as a separate campaign-level result", () => {
    const m = bySlug("opal-shower-gel-rebranding").metrics.find((x) => x.value === "2M+")!;
    expect(m.label).toBe("combined views");
    expect(m.scope).toMatch(/Campaign level/);
  });

  it("uses the verified plays for the top Wedding Show reel", () => {
    expect(bySlug("wedding-show-246k").metrics[0]).toEqual({ value: "246,177", label: "plays" });
  });

  it("never credits camera or edit on collaborative Wedding Show posts", () => {
    for (const p of projects.filter((x) => x.client === "Wedding Show")) {
      expect(p.role).not.toMatch(/camera|edit|director/i);
    }
  });

  it("has no LinkedIn or CV link until one is supplied", () => {
    expect(profile.linkedin).toBeNull();
    expect(profile.cvUrl).toBeNull();
  });

  it("excludes OPAL treatments and all treatment entries from the scripts library", () => {
    const excludedSlugs = [
      "opal-shower-gel-where",
      "opal-alan-hoy-style",
      "opal-meeting-room",
      "home-bundle-peace-of-mind-treatment",
    ];
    for (const slug of excludedSlugs) {
      expect(scripts.find((x) => x.slug === slug)).toBeUndefined();
      expect(getScript(slug)).toBeUndefined();
    }
    for (const s of scripts) {
      expect(s).not.toHaveProperty("kind");
    }
  });

  it("only publishes complete scripts with a verified title and non-empty body", () => {
    for (const s of readableScripts) {
      expect(s.status).toBe("available");
      expect(s.title).not.toBeNull();
      expect(s.body?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps the three verified Arabic football titles unpublished until their full text is supplied", () => {
    const sports = scripts.filter((s) => s.group === "sports");
    expect(sports.map((s) => s.title)).toEqual([
      "ماذا يدخنون في ملعب الإمارات؟",
      "هل دوري أبطال أوروبا هو اللي بيصنع الأساطير؟",
      "الدوري السعودي نجح… لكن هل ده كان الهدف أصلًا؟",
    ]);
    for (const s of sports) {
      expect(s.status).toBe("text-pending");
      expect(s.body).toBeUndefined();
      expect(readableScripts).not.toContain(s);
      expect(getScript(s.slug)).toBeUndefined();
    }
  });

  it("keeps Scripts reachable in NAV for the editorial empty state while hiding the empty sports work area", () => {
    expect(hasScripts).toBe(false);
    expect(shownScriptGroups).toEqual([]);
    expect(NAV.map((n) => n.label)).toEqual(["Visual work", "Scripts", "About", "Contact"]);
    expect(shownWorkAreas.map((a) => a.id)).toEqual([
      "brand",
      "creators",
      "weddings",
      "beverage-videos",
    ]);
  });

  it("shows no 'coming soon' or treatment wording in public copy", () => {
    const copy = [
      ...WORK_AREAS.flatMap((a) => [a.label, a.blurb, a.stat ?? ""]),
      ...SERVICES.flatMap((s) => [s.label, s.note ?? ""]),
      ...Object.values(SCRIPT_GROUPS).map((g) => g.blurb),
      ...projects.flatMap((p) => [p.synopsis, ...(p.notes ?? [])]),
    ].join(" ");
    expect(copy).not.toMatch(
      /being added|soon|pending|placeholder|to be added|to come|recovered|draft|treatment/i,
    );
  });

  it("keeps only restaurants and general event coverage as service headings", () => {
    expect(WORK_AREAS.map((a) => a.id)).toEqual([
      "brand",
      "creators",
      "weddings",
      "beverage-videos",
      "sports",
    ]);
    expect(SERVICES.map((s) => s.label)).toEqual(["Restaurants & cafés", "Event coverage"]);
    for (const s of SERVICES) {
      expect(s).not.toHaveProperty("blurb");
      expect(s).not.toHaveProperty("pending");
      expect(s.label.split(" ").length).toBeLessThanOrEqual(3);
    }
  });

  it("retains the creators category as its own work area, with no reels linked yet", () => {
    const a = getArea("creators");
    expect(a).toMatchObject({
      category: "Creators",
      label: "Creators & bloggers",
      blurb: "Short-form videos with bloggers and creators, built around the person on camera.",
    });
    expect(hasReels(a)).toBe(false);
  });

  it("retains beverage videos as a separate freelance body of work", () => {
    expect(getArea("beverage-videos")).toMatchObject({
      category: "Beverage Videos",
      label: "40+ beverage videos",
      blurb: "A separate freelance body of work: more than 40 beverage videos made for businesses.",
      stat: "40+ videos, freelance",
    });
  });

  it("splits the nine reels between brand content and weddings", () => {
    expect(areaCount(getArea("brand"))).toBe(5);
    expect(areaCount(getArea("weddings"))).toBe(4);
  });

  it("files all four Wedding Show reels under the weddings section", () => {
    const weddings = projects.filter((p) => p.client === "Wedding Show");
    expect(weddings).toHaveLength(4);
    expect(
      weddings.every((p) => p.categories.includes("Events") && p.subcategory === "Weddings"),
    ).toBe(true);
  });

  it("does not use a stand-in portrait", () => {
    expect(profile.portrait).toBeNull();
  });
});
