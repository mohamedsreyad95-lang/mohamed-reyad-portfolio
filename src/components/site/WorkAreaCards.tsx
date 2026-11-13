import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { areaCount, getArea, subProjects, type WorkAreaId } from "@/data/projects";
import { Reveal } from "./Reveal";

function status(id: WorkAreaId) {
  const a = getArea(id);
  const n = areaCount(a);
  if (n === 0) return null;
  return `${n} ${n === 1 ? "reel" : "reels"}`;
}

function AreaCard({ id, index }: { id: WorkAreaId; index: number }) {
  const a = getArea(id);
  const st = status(id);
  const weddings = subProjects(a).length;

  return (
    <Link
      to="/work"
      hash={a.id}
      className="group relative flex h-full flex-col overflow-hidden border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-coral/60 hover:shadow-lift focus-visible:-translate-y-1.5 focus-visible:border-coral active:translate-y-0 sm:p-8"
    >
      <span
        aria-hidden="true"
        className="gallery-light pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span className="relative eyebrow">0{index + 1}</span>
      <h3 className="relative mt-8 font-display-tight text-[clamp(2.4rem,5vw,3.6rem)]">{a.label}</h3>
      {a.labelAr && (
        <p lang="ar" dir="rtl" className="relative mt-3 text-left text-xl font-semibold leading-snug text-coral">
          {a.labelAr}
        </p>
      )}
      <p className="relative mt-5 max-w-sm leading-relaxed text-foreground/80">{a.blurb}</p>

      <div className="relative mt-auto pt-8">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-coral" />
          {st ? (weddings ? `Weddings, ${st}` : st) : "Examples being added"}
        </p>
        <span className="mt-5 inline-flex items-center gap-3 font-semibold">
          <span className="border-b border-foreground/25 pb-0.5 transition-colors duration-300 group-hover:border-coral group-hover:text-coral group-focus-visible:border-coral group-focus-visible:text-coral">
            Explore
          </span>
          <span className="flex size-10 items-center justify-center rounded-full border border-foreground/25 transition-colors duration-300 group-hover:border-coral group-hover:bg-coral group-hover:text-primary-foreground">
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Homepage: the kinds of shoots beyond brand reels, each linking to its section on /work. */
export function WorkAreaCards() {
  const ids: WorkAreaId[] = ["restaurants-cafes", "creators", "events"];
  return (
    <section aria-labelledby="areas-title" className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-16 sm:pt-20">
        <div>
          <p className="eyebrow">Also behind the camera</p>
          <h2 id="areas-title" className="mt-3 font-display-tight text-huge">
            Food, creators, events
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Next to the brand work, these are the shoots I do most. Pick one to see what&rsquo;s there.
        </p>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {ids.map((id, i) => (
          <li key={id}>
            <Reveal delay={i * 100} className="h-full">
              <AreaCard id={id} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
