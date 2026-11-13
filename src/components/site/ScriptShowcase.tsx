import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SCRIPT_GROUPS, scriptsIn, type ScriptGroup } from "@/data/scripts";
import { Reveal } from "./Reveal";
import { ScriptTitle } from "./ScriptTitle";

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

function summary(g: ScriptGroup) {
  const items = scriptsIn(g);
  const ready = items.filter((s) => s.status === "available");
  const pending = items.filter((s) => s.status === "text-pending");
  if (ready.length === 0) return `${plural(pending.length, "script", "scripts")}, text being added`;
  const parts = [`${plural(ready.length, "treatment", "treatments")} to read now`];
  const fullPending = pending.filter((s) => s.kind === "full-script").length;
  if (fullPending) parts.push(`${fullPending} full scripts being added`);
  return parts.join(", ");
}

function GroupCard({ g, index }: { g: ScriptGroup; index: number }) {
  const group = SCRIPT_GROUPS[g];
  const items = scriptsIn(g);
  const ready = items.filter((s) => s.status === "available" && s.title);
  const preview = ready.length > 0 ? ready.slice(0, 3) : items.slice(0, 3);

  return (
    <Link
      to="/scripts"
      hash={group.id}
      className="group relative flex h-full flex-col overflow-hidden border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-coral/60 hover:shadow-lift focus-visible:-translate-y-1.5 focus-visible:border-coral sm:p-10"
    >
      <span
        aria-hidden="true"
        className="gallery-light pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="eyebrow">Scripts &middot; 0{index + 1}</span>
        <span className="eyebrow text-right">{g === "sports" ? "Football" : "Brands"}</span>
      </div>

      <h3 className="relative mt-10 font-display-tight text-[clamp(3rem,9vw,6.5rem)]">
        <span className="block">{group.label[0]}</span>
        <span className="block text-coral">{group.label[1]}</span>
      </h3>

      <p className="relative mt-6 max-w-md text-lg leading-relaxed text-foreground/80">{group.blurb}</p>

      <ul className="relative mt-8 divide-y divide-border border-y border-border">
        {preview.map((s, i) => (
          <li key={s.slug} className="flex items-baseline gap-4 py-3">
            <span className="w-6 shrink-0 text-sm font-semibold text-coral">0{i + 1}</span>
            {s.title ? (
              <ScriptTitle
                as="span"
                title={s.title}
                className="min-w-0 flex-1 text-base font-semibold leading-snug"
                arClassName="text-left text-lg"
                secondaryClassName="text-sm font-normal text-muted-foreground"
              />
            ) : (
              <span className="flex-1 text-sm italic text-muted-foreground">Original Arabic title pending</span>
            )}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
        <span className="text-sm text-muted-foreground">{summary(g)}</span>
        <span className="inline-flex items-center gap-3 font-semibold">
          <span className="link-underline group-hover:bg-[length:100%_1px]">{group.cue}</span>
          <span className="flex size-11 items-center justify-center rounded-full border border-foreground/25 transition-colors duration-300 group-hover:border-coral group-hover:bg-coral group-hover:text-primary-foreground">
            <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Homepage feature: Brand Scripts and Sports Scripts at equal weight. */
export function ScriptShowcase() {
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
          Half of the work is on the page. Treatments and full scripts, with Arabic kept as written.
        </p>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {(["brand", "sports"] as const).map((g, i) => (
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
