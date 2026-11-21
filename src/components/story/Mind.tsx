import { Fragment } from "react";
import { ChapterHead } from "./ChapterHead";
import { MIND_CHAIN, MIND_NOTES, STORY_ASSETS } from "@/data/story";

/** CH 03 — How I see the world: the word-chain and the observant face. */
export function Mind() {
  return (
    <section className="st-ch mind" id="c3" aria-label="Chapter 03 — How I see the world">
      <ChapterHead n="03" name="How I see the world" />
      <div className="mind-map">
        {MIND_CHAIN.map((w) => (
          <Fragment key={w.word}>
            <p className={`mw ${w.style}`} data-rv>
              {w.style === "serif" ? <em>{w.word}</em> : null}
              {w.style === "outlineSerif" ? (
                <>
                  visual <i>concepts</i>
                </>
              ) : null}
              {w.style !== "serif" && w.style !== "outlineSerif" ? w.word : null}
            </p>
            {w.conn ? (
              <span className="conn" data-rv>
                {w.conn}
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
      <div className="mind-side" data-rv>
        <div className="face">
          <img src={STORY_ASSETS.cutout} alt="Mohamed Reyad, observant" />
        </div>
        {MIND_NOTES.map((p) => (
          <p className="annot" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
