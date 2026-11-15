import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { areaCount, areaProjects, WORK_AREAS, type Project, type WorkArea } from "@/data/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectModal } from "@/components/site/ProjectModal";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "Visual work | Mohamed Reyad";
const DESC =
  "Brand reels and Wedding Show wedding reels, with verified numbers and links to every original. Football writing sits in the script library.";

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

const JUMPS: { id: string; label: string }[] = WORK_AREAS.map((a) => ({ id: a.id, label: a.label }));

function Grid({ items, onOpen }: { items: Project[]; onOpen: (p: Project) => void }) {
  return (
    <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p, i) => (
        <li key={p.slug}>
          <Reveal delay={(i % 4) * 70}>
            <ProjectCard project={p} onOpen={onOpen} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function AreaSection({ area, n, onOpen }: { area: WorkArea; n: number; onOpen: (p: Project) => void }) {
  const direct = areaProjects(area);
  const total = areaCount(area);
  const titleId = `${area.id}-title`;

  return (
    <section id={area.id} aria-labelledby={titleId} className="scroll-mt-36 border-t border-border py-14 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">
            0{n} &middot; {total > 0 ? `${total} ${total === 1 ? "reel" : "reels"}` : area.id === "sports" ? "Scripts" : "Being added"}
          </p>
          <h2 id={titleId} className="mt-3 font-display-tight text-big">
            {area.label}
          </h2>
          {area.labelAr && (
            <p lang="ar" dir="rtl" className="mt-3 text-left text-2xl font-semibold leading-snug text-coral">
              {area.labelAr}
            </p>
          )}
        </div>
        <p className="max-w-md text-lg text-muted-foreground lg:col-span-5">{area.blurb}</p>
      </div>

      {direct.length > 0 && <Grid items={direct} onOpen={onOpen} />}

      {direct.length === 0 && area.pending && (
        <div className="mt-10 flex flex-col gap-4 border border-dashed border-border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="flex items-center gap-3 font-semibold">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-coral" />
            Examples being added
          </p>
          <p className="max-w-xl text-muted-foreground">{area.pending}</p>
        </div>
      )}

      {area.id === "sports" && (
        <Link
          to="/scripts"
          hash="sports"
          className="group mt-10 flex items-center justify-between gap-6 border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-coral/60 hover:shadow-lift focus-visible:border-coral sm:p-8"
        >
          <span>
            <span className="block font-display-tight text-3xl sm:text-4xl">Sports Scripts</span>
            <span className="mt-2 block text-muted-foreground">Three football scripts, in Arabic.</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-3 font-semibold">
            <span className="hidden border-b border-foreground/25 pb-0.5 transition-colors group-hover:border-coral group-hover:text-coral sm:inline">
              Go to the scripts
            </span>
            <span className="flex size-11 items-center justify-center rounded-full border border-foreground/25 transition-colors duration-300 group-hover:border-coral group-hover:bg-coral group-hover:text-primary-foreground">
              <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </span>
        </Link>
      )}
    </section>
  );
}

function WorkPage() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      <header className="pb-10 pt-12 sm:pt-20">
        <p className="eyebrow">Index</p>
        <h1 className="mt-4 font-display-tight text-mega">Visual work</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Every number here comes from the original post. Open a project for the synopsis, the role,
          and a link to watch it where it was published.
        </p>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Reel names are English working labels until the original Arabic titles come in.
        </p>
      </header>

      <nav
        aria-label="Jump to a kind of work"
        className="sticky top-16 z-30 -mx-5 flex gap-2 overflow-x-auto bg-background/90 px-5 py-4 backdrop-blur-md rail-scroll sm:mx-0 sm:px-0"
      >
        {JUMPS.map((j) => (
          <Link
            key={j.id}
            to="/work"
            hash={j.id}
            className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-coral hover:text-coral focus-visible:border-coral focus-visible:text-coral active:bg-coral-soft"
          >
            {j.label}
          </Link>
        ))}
      </nav>

      {WORK_AREAS.map((a, i) => (
        <AreaSection key={a.id} area={a} n={i + 1} onOpen={setActive} />
      ))}

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
