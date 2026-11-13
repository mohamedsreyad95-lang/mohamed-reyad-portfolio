import { describe, expect, it } from "vitest";
import { featuredProjects, projects } from "@/data/projects";
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

  it("keeps the three sports scripts pending, with no invented title or text", () => {
    const sports = scripts.filter((s) => s.group === "sports");
    expect(sports).toHaveLength(3);
    for (const s of sports) {
      expect(s.status).toBe("text-pending");
      expect(s.title).toBeNull();
      expect(s.body).toBeUndefined();
    }
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
