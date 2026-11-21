import { ChapterHead } from "./ChapterHead";
import { STORY_ASSETS, STORY_NUMBERS } from "@/data/story";

/** CH 06 — The numbers: verified figures only, count-up on scroll. */
export function Numbers() {
  return (
    <section className="st-ch nums" id="c6" aria-label="Chapter 06 — The numbers">
      <ChapterHead n="06" name="The numbers" />
      <div className="nums-grid">
        {STORY_NUMBERS.map((n, i) => (
          <div className={n.big ? "nb big" : "nb"} data-rv key={n.label}>
            <b>
              <span data-count={n.value} data-suffix={n.suffix}>
                {n.value}
                {n.suffix}
              </span>
            </b>
            <p>{n.label}</p>
            {i === 0 ? (
              <img
                className="cut c6-cut"
                src={STORY_ASSETS.cutout}
                alt=""
                data-px="0.06"
                aria-hidden="true"
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
