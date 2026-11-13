import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const TITLE = "Contact | Mohamed Reyad";
const DESC = "Have a brief? Let\u2019s tell its story. Email or WhatsApp Mohamed Reyad.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; the mailto link still works */
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
      <header className="pb-12 pt-12 sm:pt-20">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 font-display-tight text-mega">
          Have a brief?
          <span className="block text-coral">Let&rsquo;s tell its story.</span>
        </h1>
      </header>

      <div className="grid gap-12 border-t border-border py-14 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-10 lg:col-span-7">
          <div>
            <p className="eyebrow">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-3 inline-block break-all font-serif text-3xl sm:text-5xl"
            >
              {profile.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="coral" size="xl">
                <a href={`mailto:${profile.email}`}>Write an email</a>
              </Button>
              <Button variant="line" size="xl" onClick={copy} aria-live="polite">
                {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copied ? "Copied" : "Copy address"}
              </Button>
            </div>
          </div>

          <div>
            <p className="eyebrow">WhatsApp</p>
            <a
              href={profile.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-3 inline-flex items-center gap-2 font-serif text-3xl sm:text-5xl"
            >
              {profile.whatsapp.display}
              <ArrowUpRight className="size-6" aria-hidden="true" />
              <span className="sr-only">(opens WhatsApp in a new tab)</span>
            </a>
          </div>

          {profile.cvUrl && (
            <Button asChild variant="line" size="xl">
              <a href={profile.cvUrl} download>
                Download CV
              </a>
            </Button>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="eyebrow">What helps in a first message</h2>
          <ol className="mt-5 space-y-4 text-foreground/85">
            {[
              "The brand and the product.",
              "The problem people have with it, in their words if you can.",
              "Where it will run and roughly when.",
            ].map((t, i) => (
              <li key={t} className="flex gap-4">
                <span className="font-display-tight text-2xl text-coral">{i + 1}</span>
                <span className="pt-1">{t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted-foreground">
            No brief yet? A rough idea is a fine place to start.
          </p>
        </aside>
      </div>
    </div>
  );
}
