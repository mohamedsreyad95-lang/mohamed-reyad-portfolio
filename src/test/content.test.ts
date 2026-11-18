import { describe, expect, it } from "vitest";
import { areaCount, featuredProjects, getArea, hasReels, projects, SERVICES, shownWorkAreas, WORK_AREAS } from "@/data/projects";
import { profile } from "@/data/profile";
import { hasScripts, readableScripts, SCRIPT_GROUPS, scripts, shownScriptGroups } from "@/data/scripts";
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

  it("publishes all seven complete scripts with full text", () => {
    expect(readableScripts).toHaveLength(7);
    expect(hasScripts).toBe(true);
    expect(scripts.filter((x) => x.status === "available")).toHaveLength(7);
    for (const script of readableScripts) {
      expect(script.title).toBeTruthy();
      expect(script.body?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps the seven verified titles in the library", () => {
    expect(readableScripts.map((s) => s.title)).toEqual([
      "هات شاور جيل",
      "ماذا يدخنون في ملعب الإمارات؟",
      "هل دوري أبطال أوروبا هو اللي بيصنع الأساطير؟",
      "الدوري السعودي نجح… لكن هل ده كان الهدف أصلًا؟",
      "بقى فين؟ OPAL هو شاور جيل",
      "ريحة توديك الساحل",
      "معطر OPAL | Meeting Room",
    ]);
  });

  it("shows the Scripts menu and both populated groups", () => {
    expect(shownScriptGroups).toEqual(["brand", "sports"]);
    expect(NAV.map((n) => n.label)).toContain("Scripts");
  });

  it("shows no 'coming soon' style wording in public copy", () => {
    const copy = [
      ...WORK_AREAS.flatMap((a) => [a.label, a.blurb, a.stat ?? ""]),
      ...SERVICES.flatMap((s) => [s.label, s.note ?? ""]),
      ...Object.values(SCRIPT_GROUPS).map((g) => g.blurb),
    ].join(" ");
    expect(copy).not.toMatch(/being added|soon|pending|placeholder|to be added|to come|recovered|draft/i);
  });

  it("keeps only restaurants and general event coverage as service headings", () => {
    expect(WORK_AREAS.map((a) => a.id)).toEqual(["brand", "creators", "weddings", "beverage-videos", "sports"]);
    expect(SERVICES.map((s) => s.label)).toEqual([
      "Restaurants & cafés",
      "Event coverage",
    ]);
    for (const s of SERVICES) {
      expect(s).not.toHaveProperty("blurb");
      expect(s).not.toHaveProperty("pending");
      expect(s.label.split(" ").length).toBeLessThanOrEqual(3);
    }
  });

  it("retains the creators category as its own work area, with no reels linked yet", () => {
    const a = getArea("creators");
    expect(a).toMatchObject({ category: "Creators", label: "Creators & bloggers", blurb: "Short-form videos with bloggers and creators, built around the person on camera." });
    expect(hasReels(a)).toBe(false);
  });

  it("retains beverage videos as a separate freelance body of work", () => {
    expect(getArea("beverage-videos")).toMatchObject({ category: "Beverage Videos", label: "40+ beverage videos", blurb: "A separate freelance body of work: more than 40 beverage videos made for businesses.", stat: "40+ videos, freelance" });
  });

  it("splits the nine reels between brand content and weddings", () => {
    expect(areaCount(getArea("brand"))).toBe(5);
    expect(areaCount(getArea("weddings"))).toBe(4);
  });

  it("files all four Wedding Show reels under the weddings section", () => {
    const weddings = projects.filter((p) => p.client === "Wedding Show");
    expect(weddings).toHaveLength(4);
    expect(weddings.every((p) => p.categories.includes("Events") && p.subcategory === "Weddings")).toBe(true);
  });

  it("does not use a stand-in portrait", () => {
    expect(profile.portrait).toBeNull();
  });
});
