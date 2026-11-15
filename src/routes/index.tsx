import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { featuredProjects, railProjects, type Project } from "@/data/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectModal } from "@/components/site/ProjectModal";
import { WorkRail } from "@/components/site/WorkRail";
import { Reveal } from "@/components/site/Reveal";
import { ScriptShowcase } from "@/components/site/ScriptShowcase";
import { Threshold } from "@/components/site/Threshold";
import { ServicesList } from "@/components/site/ServicesList";

const TITLE = "Mohamed Reyad, Reels Creator & Scriptwriter";
const DESC =
  "Good ideas deserve better stories. Reels and scripts that turn everyday problems into scenes worth watching.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

const HERO_FACTS = [
  { value: "2M+", label: "combined views on the OPAL rebranding campaign" },
  { value: "246K", label: "plays on a single Wedding Show reel" },
  { value: "150+", label: "weddings covered for Wedding Show" },
];

function Home() {
  const [active, setActive] = useState<Project | null>(null);
  const headline = ["Good ideas", "deserve better", "stories."];

  return (
    <>
      {/* Hero: editorial grid, anchored by the doorway portrait */}
      <section aria-labelledby="hero-title" className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-y-10 border-b border-border pb-14 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-x-8 lg:pb-16">
          <div className="flex items-center justify-between lg:col-span-12">
            <p className="eyebrow">{profile.title}</p>
            <p className="eyebrow hidden sm:block">Portfolio, first edition</p>
          </div>

          <h1
            id="hero-title"
            className="font-display-tight text-mega lg:col-span-7 lg:row-start-2 lg:text-[clamp(5rem,9.4vw,9.5rem)]"
          >
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <span
                  className={`block animate-rise ${i === 2 ? "text-coral" : ""}`}
                  style={{ animationDelay: `${120 + i * 110}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="w-[84%] justify-self-end sm:w-[62%] lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-2 lg:w-full lg:max-w-[460px] lg:pt-4">
            <Threshold eager doorClassName="aspect-[4/5] lg:aspect-[3/4] [animation-delay:250ms]" />
          </div>

          <div
            className="animate-reveal lg:col-span-7 lg:row-start-3"
            style={{ animationDelay: "520ms" }}
          >
            <p className="max-w-[34ch] font-serif text-2xl leading-snug sm:text-[1.9rem]">{profile.positioning}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="coral" size="xl" className="group/cta">
                <Link to="/work">
                  See the visual work
                  <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="line" size="xl">
                <Link to="/scripts" hash="brand">Brand scripts</Link>
              </Button>
              <Button asChild variant="line" size="xl">
                <Link to="/scripts" hash="sports">Sports scripts</Link>
              </Button>
            </div>
          </div>

          <dl
            className="animate-reveal grid grid-cols-3 gap-4 self-end border-t border-border pt-6 lg:col-span-7 lg:row-start-4"
            style={{ animationDelay: "640ms" }}
          >
            {HERO_FACTS.map((f) => (
              <div key={f.value} className="sm:border-l sm:border-border sm:pl-5 first:sm:border-l-0 first:sm:pl-0">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="font-display-tight block text-4xl text-coral sm:text-6xl">
                    {f.value}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-muted-foreground sm:text-sm">
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Scripts sit right under the hero, at equal weight with the visual work */}
      <ScriptShowcase />

      {/* Featured: exactly four */}
      <section aria-labelledby="featured-title" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Visual work, selected</p>
            <h2 id="featured-title" className="mt-3 font-display-tight text-huge">
              Four to start with
            </h2>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-semibold transition-colors hover:border-coral hover:text-coral"
          >
            Every project
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((p, i) => (
            <li key={p.slug} className={i % 2 === 1 ? "lg:mt-16" : undefined}>
              <Reveal delay={i * 80}>
                <ProjectCard project={p} onOpen={setActive} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Short headings for the other services offered */}
      <ServicesList />

      {/* Approach strip */}
      <section aria-label="How the work starts" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-3 md:py-20">
          {[
            ["Start with the problem", "The thing people already complain about. That\u2019s where the audience is."],
            ["Turn it into a scene", "Characters, a situation, a reason to keep watching until the end."],
            ["Let the product arrive", "It shows up where it would actually help, so it never feels pasted in."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 90}>
              <p className="font-display-tight text-5xl text-coral">0{i + 1}</p>
              <h3 className="mt-4 font-display-tight text-3xl leading-[0.95]">{t}</h3>
              <p className="mt-3 max-w-xs text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Rail */}
      <section aria-label="More work" className="py-20 sm:py-28">
        <WorkRail items={railProjects} onOpen={setActive} />
      </section>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
