import { Link } from "@tanstack/react-router";
import { ChapterHead } from "./ChapterHead";
import { getArea, areaProjects, type Project } from "@/data/projects";
import { readableScripts } from "@/data/scripts";

const SHORT_LABELS: Record<string, string> = {
  "opal-shower-gel-rebranding": "The rebranding reel",
  "sandra-vs-radwa": "Sandra vs. Radwa",
  "inside-the-brainstorming": "Inside the Brainstorming",
  "home-bundle-peace-of-mind": "Peace of Mind",
  "opal-marketing-sketch": "OPAL Sketch",
  "wedding-show-246k": "The 246K reel",
};

const Arrow = () => (
  <svg
    className="arr"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
);

function ReelLinks({ projects }: { projects: Project[] }) {
  return (
    <span className="prels">
      {projects.map((p) => (
        <a className="reel-link" href={p.url} target="_blank" rel="noopener" key={p.slug}>
          {SHORT_LABELS[p.slug] ?? p.subtitle ?? p.title} <Arrow />
        </a>
      ))}
    </span>
  );
}

/** CH 04 — The work: real projects, real numbers, data-driven from src/data. */
export function Work() {
  const brand = areaProjects(getArea("brand"));
  const weddings = areaProjects(getArea("weddings"));
  const scriptCount = readableScripts.length;

  return (
    <section className="st-ch work" id="c4" aria-label="Chapter 04 — The work">
      <ChapterHead n="04" name="The work" />
      <h2 className="ch-title" data-rv>
        Real projects,
        <br />
        <em>real numbers.</em>
      </h2>

      <div className="proj" data-rv>
        <span className="pn">01</span>
        <div className="pb">
          <h3>
            <a className="pt" href={brand[0]?.url} target="_blank" rel="noopener">
              OPAL <em>Cosmetics</em> <Arrow />
            </a>
          </h3>
          <p className="pd">
            Brand reels, including the shower gel rebranding. Everyday situations, with the product
            inside the story.
          </p>
          <ReelLinks projects={brand} />
        </div>
        <span className="pstat">
          <b>2M+</b>
          <span>combined views on the rebranding</span>
        </span>
      </div>

      <div className="proj" data-rv>
        <span className="pn">02</span>
        <div className="pb">
          <h3>
            <a className="pt" href={weddings[0]?.url} target="_blank" rel="noopener">
              Wedding <em>Show</em> <Arrow />
            </a>
          </h3>
          <p className="pd">
            Mobile content and social media across more than 150 weddings, since April 2023.
          </p>
          <ReelLinks projects={weddings} />
        </div>
        <span className="pstat">
          <b>246K</b>
          <span>plays on a single reel</span>
        </span>
      </div>

      <div className="proj" data-rv>
        <span className="pn">03</span>
        <div className="pb">
          <h3>
            Commercial <em>reels</em>
          </h3>
          <p className="pd">
            A freelance body of work: more than 40 beverage videos made for businesses. Samples on
            request.
          </p>
        </div>
        <span className="pstat">
          <b>40+</b>
          <span>beverage videos</span>
        </span>
      </div>

      <div className="proj" data-rv>
        <span className="pn">04</span>
        <div className="pb">
          <h3>
            <Link className="pt" to="/scripts">
              Script<em>writing</em> <Arrow />
            </Link>
          </h3>
          <p className="pd">
            Brand scripts and sports storytelling, in Arabic. Written to be read, then filmed.
          </p>
        </div>
        <span className="pstat">
          <b>{scriptCount}</b>
          <span>scripts to read</span>
        </span>
      </div>
    </section>
  );
}
