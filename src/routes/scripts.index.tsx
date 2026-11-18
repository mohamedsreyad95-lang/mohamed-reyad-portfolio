import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  hasScripts,
  SCRIPT_GROUPS,
  scriptsIn,
  shownScriptGroups,
  type ScriptEntry,
  type ScriptGroup,
} from "@/data/scripts";
import { Reveal } from "@/components/site/Reveal";
import { ScriptTitle } from "@/components/site/ScriptTitle";

const TITLE = "Scripts | Mohamed Reyad";
const DESC =
  "Brand Scripts and Sports Scripts by Mohamed Reyad. Complete original scripts in Arabic, kept exactly as written.";

export const Route = createFileRoute("/scripts/")({
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
  component: ScriptsPage,
});

function ReadableRow({ s, n }: { s: ScriptEntry; n: number }) {
  return (
    <Link
      to="/scripts/$slug"
      params={{ slug: s.slug }}
      className="group grid gap-4 px-1 py-8 transition-colors duration-300 hover:bg-card focus-visible:bg-card sm:grid-cols-12 sm:items-start sm:gap-6 sm:px-4"
    >
      <span className="font-display-tight text-3xl text-coral sm:col-span-1">
        {String(n).padStart(2, "0")}
      </span>
      <div className="min-w-0 sm:col-span-7">
        {s.title && (
          <ScriptTitle
            title={s.title}
            className="transition-colors duration-300 group-hover:text-coral"
            arClassName="text-left text-3xl font-bold leading-snug sm:text-4xl"
            latinClassName="font-display-tight text-4xl leading-[0.95] sm:text-5xl"
            secondaryClassName="mt-2 text-xl font-semibold leading-snug text-muted-foreground sm:text-2xl"
          />
        )}
        {s.gloss && (
          <p className="mt-2 font-serif text-lg italic text-muted-foreground">{s.gloss}</p>
        )}
        {s.logline && <p className="mt-3 max-w-xl text-foreground/80">{s.logline}</p>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-4 sm:flex-col sm:items-end sm:justify-start">
        <span className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/50 px-3 py-1 text-coral">
            Full script
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[0.8rem] normal-case tracking-normal"
            >
              {"\u0633\u064a\u0646\u0627\u0631\u064a\u0648 \u0643\u0627\u0645\u0644"}
            </span>
          </span>
          {s.brand && <span className="py-1">{s.brand}</span>}
        </span>
        <span className="inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-semibold transition-colors group-hover:border-coral group-hover:text-coral">
          Read script
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

function GroupSection({ g }: { g: ScriptGroup }) {
  const group = SCRIPT_GROUPS[g];
  const items = scriptsIn(g);
  const titleId = `${g}-title`;

  return (
    <section
      id={group.id}
      aria-labelledby={titleId}
      className="scroll-mt-24 border-t border-border py-14 sm:py-20"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <h2 id={titleId} className="font-display-tight text-huge lg:col-span-7">
          {group.label[0]} <span className="text-coral">{group.label[1]}</span>
        </h2>
        <p className="max-w-md self-end text-lg text-muted-foreground lg:col-span-5">
          {group.blurb}
        </p>
      </div>

      <ol className="mt-12 divide-y divide-border border-y border-border">
        {items.map((s, i) => (
          <li key={s.slug}>
            <Reveal delay={i * 70}>
              <ReadableRow s={s} n={i + 1} />
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ScriptsEmptyState() {
  return (
    <section
      aria-labelledby="scripts-empty-title"
      className="border-t border-border py-14 sm:py-20"
    >
      <Reveal>
        <div className="relative overflow-hidden border border-border bg-card p-8 sm:p-12 lg:p-16">
          <span
            aria-hidden="true"
            className="gallery-light pointer-events-none absolute inset-0 opacity-70"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Full scripts only</p>
              <h2 id="scripts-empty-title" className="mt-4 font-display-tight text-big">
                No complete scripts
                <span className="block text-coral">published yet.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-md font-serif text-2xl leading-snug text-foreground/90 sm:text-[1.75rem]">
                This library publishes complete original Arabic scripts only, kept word for word as
                written.
              </p>
              <p className="mt-4 max-w-md text-muted-foreground">
                While the full-script selection is being prepared, you can watch the produced reels
                or reach out directly with a brief.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="coral" size="xl" className="group/cta">
                  <Link to="/work">
                    See the visual work
                    <ArrowRight
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/cta:translate-x-1"
                    />
                  </Link>
                </Button>
                <Button asChild variant="line" size="xl">
                  <Link to="/contact">Get in touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ScriptsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      <header className="grid gap-8 pb-12 pt-12 sm:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Library</p>
          <h1 className="mt-4 font-display-tight text-mega">Scripts</h1>
        </div>
        <div className="self-end lg:col-span-5">
          <p className="max-w-md text-lg text-muted-foreground">
            Complete original scripts, separate from the videos. Every title, dialogue line, and
            scene direction stays in the original Arabic as written.
          </p>
          {shownScriptGroups.length > 0 && (
            <nav aria-label="Script groups" className="mt-8 flex flex-wrap gap-3">
              {shownScriptGroups.map((g) => (
                <Link
                  key={g}
                  to="/scripts"
                  hash={g}
                  className="group inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-coral hover:text-coral"
                >
                  {SCRIPT_GROUPS[g].label.join(" ")}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {hasScripts ? (
        shownScriptGroups.map((g) => <GroupSection key={g} g={g} />)
      ) : (
        <ScriptsEmptyState />
      )}
    </div>
  );
}
