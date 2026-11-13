import { describe, expect, it } from "vitest";
import { areaCount, featuredProjects, getArea, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { scripts } from "@/data/scripts";

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

  it("labels the three OPAL treatments as treatments, never full scripts", () => {
    const slugs = ["opal-shower-gel-where", "opal-alan-hoy-style", "opal-meeting-room"];
    for (const slug of slugs) {
      const s = scripts.find((x) => x.slug === slug)!;
      expect(s.kind).toBe("treatment");
      expect(s.status).toBe("available");
    }
  });

  it("only opens a full script when its supplied text is present", () => {
    for (const s of scripts.filter((x) => x.kind === "full-script" && x.status === "available")) {
      expect(s.body?.length ?? 0).toBeGreaterThan(0);
      expect(s.title).not.toBeNull();
    }
  });

  it("shows the three verified Arabic football titles, with text still pending", () => {
    const sports = scripts.filter((s) => s.group === "sports");
    expect(sports.map((s) => s.title)).toEqual([
      "ماذا يدخنون في ملعب الإمارات؟",
      "هل دوري أبطال أوروبا هو اللي بيصنع الأساطير؟",
      "الدوري السعودي نجح… لكن هل ده كان الهدف أصلًا؟",
    ]);
    for (const s of sports) {
      expect(s.status).toBe("text-pending");
      expect(s.body).toBeUndefined();
    }
  });

  it("lists no restaurant, cafe or creator projects until real examples are supplied", () => {
    expect(areaCount(getArea("restaurants-cafes"))).toBe(0);
    expect(areaCount(getArea("creators"))).toBe(0);
  });

  it("files all four Wedding Show reels under weddings inside event coverage", () => {
    const weddings = projects.filter((p) => p.client === "Wedding Show");
    expect(weddings).toHaveLength(4);
    expect(weddings.every((p) => p.categories.includes("Events") && p.subcategory === "Weddings")).toBe(true);
  });

  it("keeps the four earlier full brand scripts pending until their text is supplied", () => {
    const full = scripts.filter((s) => s.group === "brand" && s.kind === "full-script");
    expect(full).toHaveLength(4);
    expect(full.every((s) => s.status === "text-pending" && s.title === null)).toBe(true);
  });

  it("does not use a stand-in portrait", () => {
    expect(profile.portrait).toBeNull();
  });
});
