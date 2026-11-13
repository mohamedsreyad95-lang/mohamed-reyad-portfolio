import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { scripts, type ScriptEntry } from "@/data/scripts";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "Scripts | Mohamed Reyad";
const DESC =
  "A library of treatments and scripts by Mohamed Reyad. Arabic titles and dialogue stay in the original Arabic.";

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

const kindLabel: Record<ScriptEntry["kind"], string> = {
  treatment: "Treatment",
  script: "Full script",
  collection: "Collection",
};

function ScriptsPage() {
  const ready = scripts.filter((s) => s.status === "available");
  const coming = scripts.filter((s) => s.status === "coming");

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      <header className="grid gap-8 border-b border-border pb-12 pt-12 sm:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow">Library</p>
          <h1 className="mt-4 font-display-tight text-mega">Scripts</h1>
        </div>
        <p className="self-end text-lg text-muted-foreground lg:col-span-4">
          The writing, separate from the videos. Treatments are the idea and its beats, not the full
          script. Arabic titles and lines are kept as written.
        </p>
      </header>

      <section aria-labelledby="ready-title" className="py-14">
        <h2 id="ready-title" className="eyebrow">
          Read now
        </h2>
        <ol className="mt-6 divide-y divide-border border-y border-border">
          {ready.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 60}>
                <Link
                  to="/scripts/$slug"
                  params={{ slug: s.slug }}
                  className="group grid gap-4 py-8 sm:grid-cols-12 sm:items-baseline"
                >
                  <span className="font-display-tight text-3xl text-coral sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-7">
                    <h3
                      lang={s.titleLang}
                      dir={s.titleLang === "ar" ? "rtl" : undefined}
                      className={
                        s.titleLang === "ar"
                          ? "text-3xl font-bold leading-tight transition-colors group-hover:text-coral sm:text-4xl"
                          : "font-display-tight text-4xl transition-colors group-hover:text-coral sm:text-5xl"
                      }
                    >
                      {s.title}
                    </h3>
                    {s.gloss && <p className="mt-2 font-serif text-lg italic text-muted-foreground">{s.gloss}</p>}
                    <p className="mt-3 max-w-xl text-foreground/80">{s.logline}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:col-span-4 sm:justify-end">
                    <span className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="rounded-full border border-coral/50 px-3 py-1 text-coral">
                        {kindLabel[s.kind]}
                      </span>
                      {s.brand && <span className="px-1 py-1">{s.brand}</span>}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-coral"
                    />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="coming-title" className="pb-8">
        <h2 id="coming-title" className="eyebrow">
          Coming to the library
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {coming.map((s) => (
            <li key={s.slug} className="flex flex-col border border-dashed border-border p-6">
              <span className="eyebrow">
                {kindLabel[s.kind]} &middot; {s.category}
              </span>
              <h3 className="mt-4 font-display-tight text-3xl">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.logline}</p>
              {s.note && <p className="mt-3 text-sm text-muted-foreground">{s.note}</p>}
              {s.relatedUrl && (
                <a
                  href={s.relatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-5 inline-flex items-center gap-1 self-start text-sm font-medium text-coral"
                >
                  Watch the finished reel <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens Instagram in a new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
