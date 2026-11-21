import { ChapterHead } from "./ChapterHead";
import { STORY_ASSETS, WHO_LINES, WHO_NOTE } from "@/data/story";

/** CH 02 — Who am I?: the dark chapter, B&W figure, three identity lines. */
export function Who() {
  return (
    <section className="st-ch who" id="c2" aria-label="Chapter 02 — Who am I?">
      <ChapterHead n="02" name="Who am I?" />
      <div className="who-lines">
        {WHO_LINES.map((l) => (
          <p className={l.outline ? "wl ol" : "wl"} data-rv key={l.main}>
            {l.pre} <b>{l.main}</b>
            {l.accent ? (
              <>
                {" "}
                <i>{l.accent}</i>
              </>
            ) : null}
          </p>
        ))}
      </div>
      <img className="cut c2-cut" src={STORY_ASSETS.cutout} alt="" data-px="0.08" />
      <div className="who-note" data-rv>
        {WHO_NOTE.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </section>
  );
}
