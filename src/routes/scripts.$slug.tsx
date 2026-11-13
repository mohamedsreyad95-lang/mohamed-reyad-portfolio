import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getScript, kindLabel, readableScripts, type Beat, type ScriptBlock, type ScriptEntry } from "@/data/scripts";
import { ScriptTitle } from "@/components/site/ScriptTitle";

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
    const name = script.title ?? script.workingLabel ?? "Script";
    const title = `${name} | ${kindLabel[script.kind]} by Mohamed Reyad`;
    const description = script.logline ?? `${kindLabel[script.kind]} by Mohamed Reyad, in the original Arabic.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
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
          <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-60">Super</p>
          <p
            lang={beat.lang}
            dir={beat.lang === "ar" ? "rtl" : undefined}
            className="mx-auto mt-3 max-w-md border-y-2 border-paper-foreground py-4 text-xl font-semibold leading-relaxed sm:text-2xl"
          >
            {beat.text}
          </p>
        </div>
      );
    case "note":
      return <p className="mt-8 text-sm italic opacity-70">({beat.text})</p>;
  }
}

/** Arabic screenplay block. Text is rendered exactly as supplied. */
function Block({ block }: { block: ScriptBlock }) {
  switch (block.type) {
    case "scene":
      return <p className="mt-10 font-bold first:mt-0">{block.text}</p>;
    case "action":
      return <p className="mt-4">{block.text}</p>;
    case "character":
      return <p className="mt-8 text-center font-bold">{block.text}</p>;
    case "parenthetical":
      return <p className="text-center text-sm opacity-70">({block.text})</p>;
    case "dialogue":
      return <p className="mx-auto max-w-[34ch] text-center">{block.text}</p>;
    case "transition":
      return <p className="mt-6 text-left font-bold">{block.text}</p>;
    case "super":
      return (
        <p className="mx-auto my-10 max-w-md border-y-2 border-paper-foreground py-4 text-center text-xl font-semibold">
          {block.text}
        </p>
      );
  }
}

function TreatmentPage({ script }: { script: ScriptEntry }) {
  return (
    <div className="screenplay grain px-6 py-12 shadow-2xl sm:px-16 sm:py-20">
      <header className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-60">Treatment, not the full script</p>
        {script.title && (
          <ScriptTitle
            as="h1"
            title={script.title}
            className="mx-auto mt-6 max-w-xl text-2xl font-bold sm:text-3xl"
            arClassName="text-center leading-snug"
            latinClassName="uppercase"
            secondaryClassName="mt-2 text-xl sm:text-2xl"
          />
        )}
        {script.gloss && <p className="mt-3 text-sm italic opacity-70">{script.gloss}</p>}
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
  );
}

function FullScriptPage({ script }: { script: ScriptEntry }) {
  return (
    <div className="shadow-2xl">
      <p className="bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:px-14">
        Full script, original Arabic
      </p>
      <div lang="ar" dir="rtl" className="screenplay-ar grain px-6 py-12 sm:px-14 sm:py-16">
        <header className="text-center">
          {script.title && <h1 className="text-2xl font-bold leading-snug sm:text-3xl">{script.title}</h1>}
        </header>
        <hr className="my-10 border-paper-foreground/20" />
        <div>
          {script.body?.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
      </div>
    </div>
  );
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
        hash={script.group}
        className="group eyebrow inline-flex items-center gap-2 transition-colors hover:text-coral"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
        {script.group === "sports" ? "Sports Scripts" : "Brand Scripts"}
      </Link>

      <div className="mx-auto mt-10 max-w-3xl animate-reveal">
        {script.kind === "full-script" ? <FullScriptPage script={script} /> : <TreatmentPage script={script} />}

        <nav aria-label="More from the library" className="mt-10 grid grid-cols-2 gap-4 text-sm">
          {prev ? (
            <Link to="/scripts/$slug" params={{ slug: prev.slug }} className="group flex min-w-0 items-center gap-2">
              <ArrowLeft className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-coral" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">Previous</span>
                <span lang={prev.titleLang} className="link-underline block truncate font-semibold">
                  {prev.title}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to="/scripts/$slug"
              params={{ slug: next.slug }}
              className="group flex min-w-0 items-center justify-end gap-2 text-right"
            >
              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">Next</span>
                <span lang={next.titleLang} className="link-underline block truncate font-semibold">
                  {next.title}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-coral" aria-hidden="true" />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
