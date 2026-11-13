import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { ProjectCover } from "./ProjectCover";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      {project && (
        <DialogContent className="max-h-[92vh] max-w-4xl gap-0 overflow-y-auto rounded-none border-border bg-background p-0 sm:rounded-none">
          <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <ProjectCover project={project} className="aspect-[4/3] md:aspect-auto md:min-h-full" />
            <div className="p-6 sm:p-8">
              <ul className="flex flex-wrap gap-2" aria-label="Categories">
                {project.categories.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-coral/50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-coral"
                  >
                    {c}
                  </li>
                ))}
              </ul>

              {project.titleAr ? (
                <>
                  <DialogTitle lang="ar" dir="rtl" className="mt-5 text-left text-3xl font-bold leading-snug sm:text-4xl">
                    {project.titleAr}
                  </DialogTitle>
                  <p className="mt-2 font-serif text-xl italic text-muted-foreground">{project.title}</p>
                </>
              ) : (
                <>
                  <DialogTitle className="mt-5 font-display-tight text-4xl leading-[0.95] sm:text-5xl">
                    {project.title}
                  </DialogTitle>
                  {project.subtitle && (
                    <p className="mt-2 font-serif text-xl italic text-muted-foreground">{project.subtitle}</p>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">
                    Working title in English. The original Arabic title will replace it once supplied.
                  </p>
                </>
              )}

              <DialogDescription className="mt-5 text-base leading-relaxed text-foreground/85">
                {project.synopsis}
              </DialogDescription>

              <dl className="mt-6 grid gap-5 border-t border-border pt-5 text-sm">
                {project.client && (
                  <div>
                    <dt className="eyebrow">Client</dt>
                    <dd className="mt-1">{project.client}</dd>
                  </div>
                )}
                <div>
                  <dt className="eyebrow">Role</dt>
                  <dd className="mt-1">{project.role}</dd>
                  {project.roleNote && (
                    <dd className="mt-1 text-muted-foreground">{project.roleNote}</dd>
                  )}
                </div>
              </dl>

              {project.metrics.length > 0 && (
                <div className="mt-6 border-t border-border pt-5">
                  <h3 className="eyebrow">Verified numbers</h3>
                  <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4">
                    {project.metrics.map((m) => (
                      <li key={`${m.value}-${m.label}`}>
                        <p className="font-display-tight text-4xl text-coral">{m.value}</p>
                        <p className="mt-1 text-sm">{m.label}</p>
                        {m.scope && (
                          <p className="mt-0.5 text-xs text-muted-foreground">{m.scope}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.notes?.map((n) => (
                <p key={n} className="mt-5 border-l-2 border-coral pl-3 text-sm text-muted-foreground">
                  {n}
                </p>
              ))}

              <div className="mt-8">
                <Button asChild variant="coral" size="xl">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="group/cta">
                    View reel on Instagram
                    <ArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                    <span className="sr-only">(opens Instagram in a new tab)</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
