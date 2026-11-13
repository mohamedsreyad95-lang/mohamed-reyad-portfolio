import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { NAV } from "./nav";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 sm:pt-24">
        <p className="font-serif text-big italic leading-[1.02]">
          Have a brief?{" "}
          <Link to="/contact" className="text-coral link-underline">
            Let&rsquo;s tell its story.
          </Link>
        </p>

        <div className="mt-12 grid gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="eyebrow">Write</p>
            <a href={`mailto:${profile.email}`} className="link-underline mt-2 inline-block break-all">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="eyebrow">Message</p>
            <a
              href={profile.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-2 inline-block"
            >
              WhatsApp {profile.whatsapp.display}
            </a>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow">Pages</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] overflow-hidden px-5 sm:px-8" aria-hidden="true">
        <p className="font-display-tight select-none whitespace-nowrap text-[13.6vw] leading-[0.8] text-foreground/[0.07] min-[1440px]:text-[194px]">
          {profile.wordmark}
        </p>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-2 border-t border-border px-5 py-5 text-xs text-muted-foreground sm:px-8">
        <span>
          &copy; {new Date().getFullYear()} {profile.name}
        </span>
        <span>{profile.title}</span>
      </div>
    </footer>
  );
}
