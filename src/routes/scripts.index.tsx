import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { kindLabel, SCRIPT_GROUPS, scriptsIn, type ScriptEntry, type ScriptGroup } from "@/data/scripts";
import { Reveal } from "@/components/site/Reveal";
import { ScriptTitle } from "@/components/site/ScriptTitle";

const TITLE = "Scripts | Mohamed Reyad";
const DESC =
  "Brand Scripts and Sports Scripts by Mohamed Reyad. Treatments and full scripts, with Arabic titles and dialogue kept in the original Arabic.";

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
      <span className="font-display-tight text-3xl text-coral sm:col-span-1">{String(n).padStart(2, "0")}</span>
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
        {s.gloss && <p className="mt-2 font-serif text-lg italic text-muted-foreground">{s.gloss}</p>}
        {s.logline && <p className="mt-3 max-w-xl text-foreground/80">{s.logline}</p>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-4 sm:flex-col sm:items-end sm:justify-start">
        <span className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <span className="rounded-full border border-coral/50 px-3 py-1 text-coral">{kindLabel[s.kind]}</span>
          {s.brand && <span className="py-1">{s.brand}</span>}
        </span>
        <span className="inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-semibold transition-colors group-hover:border-coral group-hover:text-coral">
          {s.kind === "treatment" ? "Read treatment" : "Read script"}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function PendingCard({ s, n }: { s: ScriptEntry; n: number }) {
  return (
    <div className="flex h-full flex-col border border-dashed border-border p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="eyebrow">
          {kindLabel[s.kind]} {String(n).padStart(2, "0")}
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-coral" />
          Text being added
        </span>
      </div>
      {s.title ? (
        <ScriptTitle title={s.title} className="mt-5 text-2xl font-bold" />
      ) : (
        <h4 className="mt-5 font-serif text-2xl italic text-muted-foreground">Original Arabic title pending</h4>
      )}
      {s.workingLabel && (
        <p className="mt-2 text-sm text-muted-foreground">Working label: {s.workingLabel}</p>
      )}
      {s.note && <p className="mt-3 text-sm text-foreground/75">{s.note}</p>}
      {s.relatedUrl && (
        <a
          href={s.relatedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-auto inline-flex items-center gap-1.5 self-start border-b border-coral/50 pb-0.5 pt-5 text-sm font-semibold text-coral transition-colors hover:border-coral"
        >
          View the finished reel
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only">(opens Instagram in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function GroupSection({ g }: { g: ScriptGroup }) {
  const group = SCRIPT_GROUPS[g];
  const items = scriptsIn(g);
  const ready = items.filter((s) => s.status === "available");
  const pending = items.filter((s) => s.status === "text-pending");
  const titleId = `${g}-title`;

  return (
    <section id={group.id} aria-labelledby={titleId} className="scroll-mt-24 border-t border-border py-14 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-12">
        <h2 id={titleId} className="font-display-tight text-huge lg:col-span-7">
          {group.label[0]} <span className="text-coral">{group.label[1]}</span>
        </h2>
        <p className="max-w-md self-end text-lg text-muted-foreground lg:col-span-5">{group.blurb}</p>
      </div>

      {ready.length > 0 && (
        <>
          <h3 className="eyebrow mt-12">Read now</h3>
          <ol className="mt-4 divide-y divide-border border-y border-border">
            {ready.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={i * 70}>
                  <ReadableRow s={s} n={i + 1} />
                </Reveal>
              </li>
            ))}
          </ol>
        </>
      )}

      {pending.length > 0 && (
        <>
          <h3 className="eyebrow mt-12">Being added</h3>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <PendingCard s={s} n={i + 1} />
                </Reveal>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function ScriptsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      <header className="grid gap-8 pb-12 pt-12 sm:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Library</p>
          <h1 className="mt-4 font-display-tight text-mega">Scripts</h1>
        </div>
        <div className="self-end lg:col-span-5">
          <p className="max-w-md text-lg text-muted-foreground">
            The writing, separate from the videos. Arabic titles and lines are kept exactly as
            written, nothing is translated or filled in.
          </p>
          <dl className="mt-6 grid max-w-md gap-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-semibold text-coral">Treatment</dt>
              <dd className="text-foreground/80">The idea and its beats. Not the full script.</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-semibold text-coral">Full script</dt>
              <dd className="text-foreground/80">The complete text, in the original Arabic.</dd>
            </div>
          </dl>
          <nav aria-label="Script groups" className="mt-8 flex flex-wrap gap-3">
            {(["brand", "sports"] as const).map((g) => (
              <Link
                key={g}
                to="/scripts"
                hash={g}
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-coral hover:text-coral"
              >
                {SCRIPT_GROUPS[g].label.join(" ")}
                <ArrowRight aria-hidden="true" className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <GroupSection g="brand" />
      <GroupSection g="sports" />
    </div>
  );
}
