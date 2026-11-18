import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  hasScripts,
  SCRIPT_GROUPS,
  scriptsIn,
  shownScriptGroups,
  type ScriptEntry,
  type ScriptGroup,
} from "@/data/scripts";
import { Reveal } from "./Reveal";
import { ScriptTitle } from "./ScriptTitle";

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

function summary(g: ScriptGroup) {
  const count = scriptsIn(g).length;
  return `${plural(count, "full script", "full scripts")} to read`;
}

const rowClass =
  "group/row relative z-10 flex items-baseline gap-4 py-3.5 transition-colors duration-300 hover:text-coral focus-visible:text-coral";

function RowBody({ s, i }: { s: ScriptEntry; i: number }) {
  return (
    <>
      <span className="w-6 shrink-0 text-sm font-semibold text-coral">0{i + 1}</span>
      <span className="min-w-0 flex-1">
        {s.title && (
          <ScriptTitle
            as="span"
            title={s.title}
            className="block text-base font-semibold leading-snug"
            arClassName="text-left text-lg"
            secondaryClassName="text-sm font-normal text-muted-foreground"
          />
        )}
        <span className="mt-1 flex flex-wrap items-center gap-x-2 text-xs font-semibold text-muted-foreground">
          <span className="uppercase tracking-[0.12em] text-coral">Full script</span>
          <span lang="ar" dir="rtl">
            {"\u0633\u064a\u0646\u0627\u0631\u064a\u0648 \u0643\u0627\u0645\u0644"}
          </span>
        </span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 self-center text-muted-foreground transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:text-coral"
      />
    </>
  );
}

function GroupCard({ g, index }: { g: ScriptGroup; index: number }) {
  const group = SCRIPT_GROUPS[g];
  const preview = scriptsIn(g).slice(0, 3);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-coral/60 hover:shadow-lift has-[:focus-visible]:border-coral sm:p-10">
      <span
        aria-hidden="true"
        className="gallery-light pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="eyebrow">Scripts &middot; 0{index + 1}</span>
        <span className="eyebrow text-right">{g === "sports" ? "Football" : "Brands"}</span>
      </div>

      <h3 className="relative mt-10 font-display-tight text-[clamp(3rem,9vw,6.5rem)]">
        <span className="block">{group.label[0]}</span>
        <span className="block text-coral">{group.label[1]}</span>
      </h3>

      <p className="relative mt-6 max-w-md text-lg leading-relaxed text-foreground/80">
        {group.blurb}
      </p>

      <ul className="relative mt-8 divide-y divide-border border-y border-border">
        {preview.map((s, i) => (
          <li key={s.slug}>
            <Link to="/scripts/$slug" params={{ slug: s.slug }} className={rowClass}>
              <RowBody s={s} i={i} />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
        <span className="text-sm text-muted-foreground">{summary(g)}</span>
        {/* Stretched link: the whole card opens the group; the rows above sit on top and open their own reader. */}
        <Link
          to="/scripts"
          hash={group.id}
          className="group/cta inline-flex items-center gap-3 font-semibold after:absolute after:inset-0 after:content-['']"
        >
          <span className="border-b border-foreground/25 pb-0.5 transition-colors duration-300 group-hover:border-coral group-hover:text-coral">
            {group.cue}
          </span>
          <span className="flex size-11 items-center justify-center rounded-full border border-foreground/25 transition-colors duration-300 group-hover:border-coral group-hover:bg-coral group-hover:text-primary-foreground">
            <ArrowRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
          <span className="sr-only">: all {group.label.join(" ")}</span>
        </Link>
      </div>
    </div>
  );
}

/** Homepage feature: Brand Scripts and Sports Scripts at equal weight, once complete scripts exist. */
export function ScriptShowcase() {
  if (!hasScripts) return null;
  return (
    <section
      aria-labelledby="scripts-feature-title"
      className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 sm:pt-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">The writing</p>
          <h2 id="scripts-feature-title" className="mt-3 font-display-tight text-huge">
            Scripts
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Half of the work is on the page. Complete original scripts only, with Arabic kept as
          written.
        </p>
      </div>
      <ul className={`mt-10 grid gap-6 ${shownScriptGroups.length > 1 ? "md:grid-cols-2" : ""}`}>
        {shownScriptGroups.map((g, i) => (
          <li key={g}>
            <Reveal delay={i * 120} className="h-full">
              <GroupCard g={g} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
