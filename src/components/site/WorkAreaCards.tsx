import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getArea, type WorkAreaId } from "@/data/projects";
import { Reveal } from "./Reveal";

export function WorkAreaCards() {
  const ids: WorkAreaId[] = ["creators", "beverage-videos"];
  return (
    <section aria-label="Also behind the camera" className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28">
      <p className="eyebrow">Also behind the camera</p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {ids.map((id, i) => {
          const a = getArea(id);
          return (
            <li key={id}>
              <Reveal delay={i * 100} className="h-full">
                <Link to="/work" hash={a.id} className="group relative flex h-full flex-col overflow-hidden border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-coral/60 hover:shadow-lift focus-visible:-translate-y-1.5 focus-visible:border-coral active:translate-y-0 sm:p-8">
                  <span aria-hidden="true" className="gallery-light pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="relative eyebrow">0{i + 1}</span>
                  <h3 className="relative mt-8 font-display-tight text-4xl">{a.label}</h3>
                  {a.labelAr && <p lang="ar" dir="rtl" className="relative mt-3 text-left text-xl font-semibold leading-snug text-coral">{a.labelAr}</p>}
                  <p className="relative mt-5 max-w-sm leading-relaxed text-foreground/80">{a.blurb}</p>
                  <div className="relative mt-auto pt-8">
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-coral" />
                      {a.stat ? `${a.stat}, examples being added` : "Examples being added"}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-3 font-semibold">
                      <span className="border-b border-foreground/25 pb-0.5 transition-colors duration-300 group-hover:border-coral group-hover:text-coral group-focus-visible:border-coral group-focus-visible:text-coral">Explore</span>
                      <span className="flex size-10 items-center justify-center rounded-full border border-foreground/25 transition-colors duration-300 group-hover:border-coral group-hover:bg-coral group-hover:text-primary-foreground">
                        <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}