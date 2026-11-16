import { SERVICES } from "@/data/projects";
import { Reveal } from "./Reveal";

/**
 * Homepage: short headings for the services Mohamed can be asked to shoot.
 * These are capabilities, not portfolio sections, so they carry no examples,
 * no descriptions and no links.
 */
export function ServicesList() {
  return (
    <section aria-labelledby="services-title" className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-16 sm:pt-20">
        <div>
          <p className="eyebrow">Also available</p>
          <h2 id="services-title" className="mt-3 font-display-tight text-big">
            What else I can shoot
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">Shoots I take on as a service.</p>
      </div>
      <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <li key={s.label}>
            <Reveal delay={i * 80}>
              <p className="border-t border-border pt-4 font-display-tight text-3xl leading-[0.95] sm:text-4xl">
                {s.label}
              </p>
              {s.labelAr && (
                <p lang="ar" dir="rtl" className="mt-2 text-left text-lg font-semibold leading-snug text-coral">
                  {s.labelAr}
                </p>
              )}
              {s.note && <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>}
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
