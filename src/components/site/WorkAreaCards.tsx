import { getArea, type WorkAreaId } from "@/data/projects";
import { Reveal } from "./Reveal";

/**
 * Homepage: creator shoots and beverage videos, kept as their own kinds of work.
 * No reels are filed under them yet, so these are descriptions, not links:
 * nothing here looks clickable without something to open.
 */
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
                <div className="relative flex h-full flex-col overflow-hidden border border-border bg-card p-6 sm:p-8">
                  <span aria-hidden="true" className="gallery-light pointer-events-none absolute inset-0 opacity-60" />
                  <span className="relative eyebrow">0{i + 1}</span>
                  <h3 className="relative mt-8 font-display-tight text-4xl">{a.label}</h3>
                  {a.labelAr && (
                    <p lang="ar" dir="rtl" className="relative mt-3 text-left text-xl font-semibold leading-snug text-coral">
                      {a.labelAr}
                    </p>
                  )}
                  <p className="relative mt-5 max-w-md leading-relaxed text-foreground/80">{a.blurb}</p>
                  {a.stat && (
                    <p className="relative mt-auto flex items-center gap-2 pt-8 text-sm text-muted-foreground">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-coral" />
                      {a.stat}
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
