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

  it("publishes only treatments, no full scripts, until the script text is supplied", () => {
    const readable = scripts.filter((s) => s.status === "available");
    expect(readable.every((s) => s.kind === "treatment")).toBe(true);
  });
});
