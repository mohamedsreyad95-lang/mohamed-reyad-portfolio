import { ChapterHead } from "./ChapterHead";
import { PROCESS_STEPS, STORY_ASSETS } from "@/data/story";

/** CH 05 — Behind the frame: the process, filmstrip on desktop, timeline on mobile. */
export function Frame() {
  return (
    <section className="st-ch frame" id="c5" aria-label="Chapter 05 — Behind the frame">
      <img className="frame-art" src={STORY_ASSETS.lineArt} alt="" aria-hidden="true" />
      <ChapterHead n="05" name="Behind the frame" />
      <h2 className="ch-title" data-rv>
        From an idea
        <br />
        <em>to a finished reel.</em>
      </h2>
      <p className="strip-hint" data-rv>
        Scroll sideways →
      </p>
      <div className="strip">
        <div className="strip-line" aria-hidden="true" />
        {PROCESS_STEPS.map((s) => (
          <div className="st-cell" data-rv key={s.n}>
            <span className="stn">{s.n}</span>
            <h4>{s.name}</h4>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
