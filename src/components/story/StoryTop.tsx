import { Link } from "@tanstack/react-router";

/** Fixed chrome for the story home. Flips to light over dark chapters via .on-dark. */
export function StoryTop() {
  return (
    <header className="st-top">
      <Link to="/" className="st-mono" aria-label="Mohamed Reyad — home">
        M.<i>R</i>
      </Link>
      <nav>
        <a href="#c4">Work</a>
        <Link to="/scripts">Scripts</Link>
        <a href="#c7">Contact</a>
      </nav>
    </header>
  );
}
