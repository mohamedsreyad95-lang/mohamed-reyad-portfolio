import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { profile, timeline } from "@/data/profile";
import { Reveal } from "@/components/site/Reveal";
import { Threshold } from "@/components/site/Threshold";

const TITLE = "About | Mohamed Reyad";
const DESC =
  "Mohamed Reyad makes short-form video from the idea and script through to the visual story. Brand reels for OPAL, 150+ weddings for Wedding Show, food and caf\u00e9 videos, creators and football scripts.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

type Dest =
  | { to: "/work"; hash: "brand" | "restaurants-cafes" | "creators" | "events" | "weddings" }
  | { to: "/scripts"; hash: "brand" | "sports" };

/** Inline link inside the About copy. Underlined with a small arrow so it reads as clickable. */
function Go({ dest, children }: { dest: Dest; children: ReactNode }) {
  return (
    <Link
      to={dest.to}
      hash={dest.hash}
      className="group/go whitespace-nowrap border-b border-coral/50 font-semibold text-foreground transition-colors hover:border-coral hover:text-coral focus-visible:text-coral active:text-coral"
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="ml-0.5 inline size-[0.8em] -translate-y-px text-coral transition-transform duration-300 group-hover/go:translate-x-0.5"
      />
    </Link>
  );
}

const HUB: { dest: Dest; k: string; title: string; ar?: string; line: string }[] = [
  { dest: { to: "/work", hash: "brand" }, k: "Visual work", title: "Brand reels", line: "Including OPAL Cosmetics" },
  { dest: { to: "/scripts", hash: "brand" }, k: "Scripts", title: "Brand Scripts", line: "Treatments to read, full scripts being added" },
  { dest: { to: "/scripts", hash: "sports" }, k: "Scripts", title: "Sports Scripts", line: "Football writing in Arabic" },
  {
    dest: { to: "/work", hash: "restaurants-cafes" },
    k: "Visual work",
    title: "Restaurants & caf\u00e9s",
    ar: "\u062a\u0635\u0648\u064a\u0631 \u0645\u0637\u0627\u0639\u0645 \u0648\u0643\u0627\u0641\u064a\u0647\u0627\u062a",
    line: "Food, drinks and atmosphere",
  },
  {
    dest: { to: "/work", hash: "creators" },
    k: "Visual work",
    title: "Creators",
    ar: "\u062a\u0635\u0648\u064a\u0631 \u0628\u0644\u0648\u062c\u0631\u0632",
    line: "Creator-led short-form videos",
  },
  {
    dest: { to: "/work", hash: "events" },
    k: "Visual work",
    title: "Events & weddings",
    ar: "\u062a\u063a\u0637\u064a\u0629 \u0625\u064a\u0641\u0646\u062a\u0633",
    line: "Wedding Show reels and event coverage",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      <header className="grid items-end gap-10 border-b border-border pb-12 pt-12 sm:pt-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-display-tight text-mega">
            <span className="block">Mohamed</span>
            <span className="block text-coral">Reyad</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{profile.title}</p>
        </div>
        <Threshold eager className="w-[84%] justify-self-end sm:w-[60%] md:col-span-4 md:w-full" doorClassName="aspect-[3/4]" />
      </header>

      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85 lg:col-span-7">
          <p className="max-w-[26ch] font-serif text-3xl leading-snug text-foreground sm:text-4xl">
            I make short-form videos, but I&rsquo;m usually thinking about the story before the shot.
          </p>
          <p className="max-w-[62ch]">
            I&rsquo;m Mohamed. I work on a video from the idea and the{" "}
            <Go dest={{ to: "/scripts", hash: "brand" }}>script</Go> through to shaping how the story
            looks on screen.
          </p>
          <p className="max-w-[62ch]">
            I like starting with a situation people recognise, finding the funny or human detail in it,
            then building the video around that. For brand work, I want the product to belong in the
            story, not interrupt it. Nobody should feel like they just sat through an ad.
          </p>
          <p className="max-w-[62ch]">
            Right now I make brand reels{" "}
            <Go dest={{ to: "/work", hash: "brand" }}>for OPAL</Go>. I&rsquo;ve covered{" "}
            <Go dest={{ to: "/work", hash: "weddings" }}>more than 150 weddings</Go> for Wedding Show,
            and as a freelancer I&rsquo;ve made around 40{" "}
            <Go dest={{ to: "/work", hash: "restaurants-cafes" }}>beverage and food videos</Go> for
            businesses. I also shoot <Go dest={{ to: "/work", hash: "creators" }}>with creators</Go>,
            cover <Go dest={{ to: "/work", hash: "events" }}>events</Go>, and write{" "}
            <Go dest={{ to: "/scripts", hash: "sports" }}>about football</Go>.
          </p>
          <p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 border-b border-coral/50 pb-1 font-semibold text-coral transition-colors hover:border-coral"
            >
              {profile.closing}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </p>
        </div>

        <aside aria-label="Summary" className="lg:col-span-4 lg:col-start-9">
          <dl className="divide-y divide-border border-y border-border">
            {[
              { k: "Now", v: "Reels Creator at OPAL Cosmetics" },
              { k: "Also", v: "Mobile Content & Social Media Creator at Wedding Show" },
              { k: "Weddings", v: "150+" },
              { k: "Freelance", v: "Since 2023" },
            ].map((s) => (
              <div key={s.k} className="flex justify-between gap-6 py-4">
                <dt className="eyebrow pt-1">{s.k}</dt>
                <dd className="text-right">{s.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section aria-labelledby="hub-title" className="border-t border-border py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="hub-title" className="font-display-tight text-big">
            Where to look
          </h2>
          <p className="max-w-sm text-muted-foreground">Everything above, one click away.</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HUB.map((h, i) => (
            <li key={h.title}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <Link
                  to={h.dest.to}
                  hash={h.dest.hash}
                  className="group flex h-full items-start justify-between gap-4 border border-border bg-card p-5 transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-coral/60 hover:shadow-lift focus-visible:border-coral active:translate-y-0 sm:p-6"
                >
                  <span className="min-w-0">
                    <span className="eyebrow block">{h.k}</span>
                    <span className="mt-3 block font-display-tight text-3xl transition-colors group-hover:text-coral">
                      {h.title}
                    </span>
                    {h.ar && (
                      <span lang="ar" dir="rtl" className="mt-2 block text-left text-base font-semibold text-coral">
                        {h.ar}
                      </span>
                    )}
                    <span className="mt-2 block text-sm text-muted-foreground">{h.line}</span>
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-foreground/25 transition-colors duration-300 group-hover:border-coral group-hover:bg-coral group-hover:text-primary-foreground">
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="timeline-title" className="border-t border-border py-16 lg:py-20">
        <h2 id="timeline-title" className="font-display-tight text-big">
          So far
        </h2>
        <ol className="mt-10">
          {timeline.map((t, i) => (
            <li key={t.org} className="border-t border-border">
              <Reveal delay={i * 80} className="grid gap-3 py-6 md:grid-cols-12">
                <p className="eyebrow md:col-span-3 md:pt-2">{t.period}</p>
                <div className="md:col-span-5">
                  <h3 className="font-display-tight text-3xl leading-[0.95] sm:text-4xl">{t.org}</h3>
                  <p className="mt-1 font-serif text-lg italic text-muted-foreground">{t.role}</p>
                </div>
                <ul className="space-y-2 text-foreground/85 md:col-span-4 md:pt-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-coral" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
