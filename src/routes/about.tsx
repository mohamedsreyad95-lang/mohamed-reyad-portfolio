import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, timeline } from "@/data/profile";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "About | Mohamed Reyad";
const DESC =
  "Reels Creator at OPAL Cosmetics and Mobile Content & Social Media Creator at Wedding Show. 150+ weddings, brand reels and scripts.";

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

const SUMMARY = [
  { k: "Now", v: "Reels Creator at OPAL Cosmetics" },
  { k: "Also", v: "Mobile Content & Social Media Creator at Wedding Show" },
  { k: "Weddings", v: "150+" },
  { k: "Writes in", v: "Arabic, for Arabic-speaking audiences" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      <header className="border-b border-border pb-12 pt-12 sm:pt-20">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 font-display-tight text-mega">
          Mohamed <span className="text-coral">Reyad</span>
        </h1>
      </header>

      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85 lg:col-span-7">
          <p className="font-serif text-3xl leading-snug text-foreground sm:text-4xl">
            I write and make reels. Most of them start with something people already know too well.
          </p>
          <p>
            Packaging that changed overnight and nobody can find it. A breakfast that looks like a
            meeting the second the manager walks past. I take that moment, build a scene around it,
            and let the product turn up where it would actually help.
          </p>
          <p>
            Since April 2023 I&rsquo;ve been creating mobile content for Wedding Show, across more
            than 150 weddings. That work taught me to find the story fast, with whatever the night
            gives you.
          </p>
          <p>
            Since October 2024 I&rsquo;ve been the Reels Creator at OPAL Cosmetics, where the shower
            gel rebranding campaign went past 2M combined views on Facebook, TikTok and Instagram.
            Alongside both, I&rsquo;ve freelanced since 2023, including around 40 beverage recipe
            videos.
          </p>
          <p>
            <Link to="/contact" className="link-underline font-medium text-coral">
              {profile.closing}
            </Link>
          </p>
        </div>

        <aside aria-label="Summary" className="lg:col-span-4 lg:col-start-9">
          <dl className="divide-y divide-border border-y border-border">
            {SUMMARY.map((s) => (
              <div key={s.k} className="flex justify-between gap-6 py-4">
                <dt className="eyebrow pt-1">{s.k}</dt>
                <dd className="text-right">{s.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section aria-labelledby="timeline-title" className="border-t border-border py-16 lg:py-24">
        <h2 id="timeline-title" className="font-display-tight text-huge">
          Timeline
        </h2>
        <ol className="mt-12">
          {timeline.map((t, i) => (
            <li key={t.org} className="border-t border-border">
              <Reveal delay={i * 80} className="grid gap-4 py-8 md:grid-cols-12">
                <p className="eyebrow md:col-span-3 md:pt-2">{t.period}</p>
                <div className="md:col-span-5">
                  <h3 className="font-display-tight text-4xl sm:text-5xl">{t.org}</h3>
                  <p className="mt-2 font-serif text-xl italic text-muted-foreground">{t.role}</p>
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
