import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { CATEGORIES, projects, type Category, type Project } from "@/data/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectModal } from "@/components/site/ProjectModal";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "Visual work | Mohamed Reyad";
const DESC =
  "Brand reels for OPAL Cosmetics and event reels for Wedding Show, with verified plays, likes and links to every original.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

type Filter = "All" | Category;

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const count = (f: Filter) =>
    f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      <header className="border-b border-border pb-12 pt-12 sm:pt-20">
        <p className="eyebrow">Index</p>
        <h1 className="mt-4 font-display-tight text-mega">Visual work</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Every number here comes from the original post. Open a project for the synopsis, the role,
          and a link to watch it where it was published.
        </p>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Reel names are English working labels for now. The original Arabic titles replace them as
          they come in.
        </p>
      </header>

      <div
        role="group"
        aria-label="Filter by category"
        className="sticky top-16 z-30 -mx-5 flex gap-2 overflow-x-auto bg-background/90 px-5 py-4 backdrop-blur-md rail-scroll sm:mx-0 sm:px-0"
      >
        {(["All", ...CATEGORIES] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === f
                ? "border-coral bg-coral text-primary-foreground"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {f} <span className="ml-1 opacity-60">{count(f)}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>

      {visible.length > 0 ? (
        <ul className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 4) * 70}>
                <ProjectCard project={p} onOpen={setActive} />
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 border border-dashed border-border p-8 sm:p-14">
          <p className="font-display-tight text-big">Nothing published here yet</p>
          <p className="mt-4 max-w-lg text-muted-foreground">
            The sports and editorial work is in script form for now.
          </p>
          <Link to="/scripts" className="link-underline mt-6 inline-block font-medium text-coral">
            Go to the script library
          </Link>
        </div>
      )}

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
