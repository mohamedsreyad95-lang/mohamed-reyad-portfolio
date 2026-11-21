import { Link } from "@tanstack/react-router";
import { ChapterHead } from "./ChapterHead";
import { profile } from "@/data/profile";
import { CLOSING, STORY_ASSETS } from "@/data/story";

/** CH 07 — What's next?: the original photo returns in the arch, then contact. */
export function Closing() {
  return (
    <section className="st-ch next" id="c7" aria-label="Chapter 07 — What's next?">
      <ChapterHead n="07" name="What’s next?" centered />
      <div className="arch" data-rv>
        <img src={STORY_ASSETS.photo} alt={CLOSING.photoAlt} />
      </div>
      <h2 className="c7-title" data-rv>
        {CLOSING.titleA}
        <br />
        <em>{CLOSING.titleB}</em>
      </h2>
      <div className="links" data-rv>
        <a href={`mailto:${profile.email}`}>
          <span>Email</span>
          <b>{profile.email}</b>
        </a>
        <a href={profile.whatsapp.href} target="_blank" rel="noopener">
          <span>WhatsApp</span>
          <b>{profile.whatsapp.display}</b>
        </a>
        <Link to="/scripts">
          <span>The writing</span>
          <b>Brand &amp; sports scripts</b>
        </Link>
        <a href="#c4">
          <span>The work</span>
          <b>Reels, campaigns, coverage</b>
        </a>
      </div>
      <p className="fin">{CLOSING.fin}</p>
    </section>
  );
}
