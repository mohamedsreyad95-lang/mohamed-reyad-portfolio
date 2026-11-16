import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getScript, kindLabel, kindLabelAr, readableScripts, type ScriptBlock, type ScriptEntry } from "@/data/scripts";
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
    const name = script.title ?? "Script";
    const title = `${name} | ${kindLabel[script.kind]} by Mohamed Reyad`;
    const description = `${kindLabel[script.kind]} by Mohamed Reyad, in the original Arabic.`;
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

/** One reader for both kinds: original Arabic, right to left, labelled for what it is. */
function ArabicPage({ script }: { script: ScriptEntry }) {
  const isTreatment = script.kind === "treatment";
  return (
    <div className="shadow-lift">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-coral sm:px-14">
        <span>{kindLabel[script.kind]}</span>
        <span aria-hidden="true">&middot;</span>
        <span lang="ar" dir="rtl" className="text-sm normal-case">
          {kindLabelAr[script.kind]}
        </span>
        {isTreatment && <span className="ml-auto normal-case tracking-normal text-muted-foreground">Not the full script</span>}
      </p>
      <div lang="ar" dir="rtl" className="screenplay-ar grain px-6 py-12 sm:px-14 sm:py-16">
        <header className="text-center">
          {script.title && (
            <ScriptTitle
              as="h1"
              title={script.title}
              className="text-2xl font-bold sm:text-3xl"
              arClassName="text-center leading-snug"
              latinClassName="text-center uppercase"
              secondaryClassName="mt-2 text-xl sm:text-2xl"
            />
          )}
          {script.brand && (
            <p dir="ltr" lang="en" className="mt-4 font-sans text-sm opacity-70">
              {script.brand}
            </p>
          )}
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
        <ArabicPage script={script} />

        <nav aria-label="More from the library" className="mt-10 grid grid-cols-2 gap-4 text-sm">
          {prev ? (
            <Link to="/scripts/$slug" params={{ slug: prev.slug }} className="group flex min-w-0 items-center gap-2">
              <ArrowLeft className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-coral" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">Previous</span>
                <span lang={prev.titleLang} dir="auto" className="link-underline block truncate font-semibold">
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
                <span lang={next.titleLang} dir="auto" className="link-underline block truncate font-semibold">
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
