import type { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { scripts } from "@/data/scripts";

vi.mock("@tanstack/react-router", async () => {
  const actual =
    await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ children, to, ...rest }: { children: ReactNode; to?: string; className?: string }) => (
      <a href={typeof to === "string" ? to : "#"} className={rest.className}>
        {children}
      </a>
    ),
  };
});

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches /scripts route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/scripts");

    expect(matches.at(-1)?.routeId).toBe("/scripts/");
  });
});

describe("Scripts empty state", () => {
  it("renders the editorial empty state without exposing pending titles or treatment wording", async () => {
    const { ScriptsPage } = await import("@/routes/scripts.index");
    const { container } = render(<ScriptsPage />);

    expect(screen.getByRole("heading", { name: "Scripts", level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /No complete scripts\s*published yet\./i, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /See the visual work/i })).toHaveAttribute(
      "href",
      "/work",
    );
    expect(screen.getByRole("link", { name: /Get in touch/i })).toHaveAttribute("href", "/contact");

    const text = container.textContent ?? "";
    expect(text).not.toMatch(/treatment|معالجة/i);
    for (const s of scripts) {
      if (s.title) expect(text).not.toContain(s.title);
    }
  });
});
