import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getScript, readableScripts, type Beat } from "@/data/scripts";

export const Route = createFileRoute("/scripts/$slug")({
  loader: ({ params }) => {
    const script = getScript(params.slug);
    if (!script) throw notFound();
    return { script };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Script not found | Mohamed Reyad" }, { name: "robots", content: "noindex" }] };
    }
    const { script } = loaderData;
    const title = `${script.title} | Treatment by Mohamed Reyad`;
    return {
      meta: [
        { title },
        { name: "description", content: script.logline },
        { property: "og:title", content: title },
        { property: "og:description", content: script.logline },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-display-tight text-huge">Not in the library</h1>
      <Link to="/scripts" className="link-underline mt-6 inline-block text-coral">
        Back to scripts
      </Link>
    </div>
  ),
  component: Reader,
});

function BeatLine({ beat }: { beat: Beat }) {
  switch (beat.type) {
    case "scene":
      return <p className="mt-10 font-bold uppercase first:mt-0">{beat.text}</p>;
    case "action":
      return <p className="mt-5 leading-relaxed">{beat.text}</p>;
    case "super":
      return (
        <div className="my-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Super</p>
          <p
            lang={beat.lang}
            dir={beat.lang === "ar" ? "rtl" : undefined}
            className="mx-auto mt-3 max-w-md border-y-2 border-paper-foreground py-4 text-xl font-semibold sm:text-2xl"
          >
            {beat.text}
          </p>
        </div>
      );
    case "note":
      return <p className="mt-8 text-sm italic opacity-70">({beat.text})</p>;
  }
}

function Reader() {
  const { script } = Route.useLoaderData();
  const idx = readableScripts.findIndex((s) => s.slug === script.slug);
  const prev = readableScripts[idx - 1];
  const next = readableScripts[idx + 1];

  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
      <Link
        to="/scripts"
        className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-coral"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Script library
      </Link>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="screenplay grain px-6 py-12 shadow-2xl sm:px-16 sm:py-20">
          <header className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-60">
              Treatment &middot; not the full script
            </p>
            <h1
              lang={script.titleLang}
              dir={script.titleLang === "ar" ? "rtl" : undefined}
              className="mt-6 text-2xl font-bold uppercase sm:text-3xl"
            >
              {script.title}
            </h1>
            {script.gloss && <p className="mt-2 text-sm italic opacity-70">{script.gloss}</p>}
            <p className="mt-6 text-sm">by Mohamed Reyad</p>
            {script.brand && <p className="mt-1 text-sm opacity-70">for {script.brand}</p>}
          </header>

          <hr className="my-12 border-paper-foreground/20" />

          <p className="mb-10 text-sm leading-relaxed opacity-80">
            <span className="font-bold uppercase">Logline.</span> {script.logline}
          </p>

          <div>
            {script.beats?.map((b, i) => (
              <BeatLine key={i} beat={b} />
            ))}
          </div>

          <p className="mt-14 text-center text-sm font-bold uppercase">End of treatment</p>
        </div>

        <nav aria-label="More treatments" className="mt-10 flex justify-between gap-4 text-sm">
          {prev ? (
            <Link
              to="/scripts/$slug"
              params={{ slug: prev.slug }}
              className="group flex max-w-[45%] items-center gap-2"
            >
              <ArrowLeft className="size-4 shrink-0 group-hover:text-coral" aria-hidden="true" />
              <span lang={prev.titleLang} className="link-underline truncate">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to="/scripts/$slug"
              params={{ slug: next.slug }}
              className="group flex max-w-[45%] items-center gap-2 text-right"
            >
              <span lang={next.titleLang} className="link-underline truncate">
                {next.title}
              </span>
              <ArrowRight className="size-4 shrink-0 group-hover:text-coral" aria-hidden="true" />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
