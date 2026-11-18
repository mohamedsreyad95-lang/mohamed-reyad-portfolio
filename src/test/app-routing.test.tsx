import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("serves a page for every main section", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const ids = ["/", "/work", "/scripts", "/about", "/contact"].map((p) => router.matchRoutes(p).at(-1)?.routeId);
    expect(ids).toEqual(["/", "/work", "/scripts/", "/about", "/contact"]);
  });

  it("keeps the Scripts library page open even while no script is published", async () => {
    const { Route } = await import("@/routes/scripts.index");
    expect(Route.options.loader).toBeUndefined();
  });
});
