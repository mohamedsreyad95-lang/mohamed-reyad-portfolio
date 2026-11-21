import { profile } from "@/data/profile";
import { OPENING, STORY_ASSETS } from "@/data/story";

/** CH 01 — The opening: the cutout walking through the giant outlined REYAD. */
export function Opening() {
  return (
    <section className="st-ch intro" id="c1" aria-label="Chapter 01 — The opening">
      <div className="c1-stage">
        <div className="ghost" data-px="0.12" aria-hidden="true">
          REYAD
        </div>
        <img className="cut c1-cut" src={STORY_ASSETS.cutout} alt="Mohamed Reyad" data-px="-0.05" />
      </div>
      <div className="c1-txt">
        <p className="label" data-rv>
          Chapter 01 · The opening
        </p>
        <p className="kick" data-rv>
          {profile.name}
          <span>· {OPENING.roles.join(" · ")}</span>
        </p>
        <h1 data-rv>
          {OPENING.headlineA}
          <br />
          <em>{OPENING.headlineB}</em>
        </h1>
      </div>
      <p className="cue" data-rv>
        {OPENING.cue}
        <span className="line" />
      </p>
    </section>
  );
}
