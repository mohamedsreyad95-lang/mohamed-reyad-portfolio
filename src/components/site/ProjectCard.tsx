import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { ProjectCover } from "./ProjectCover";

export function ProjectCard({
  project,
  onOpen,
  className,
  coverClassName,
  size,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  className?: string | undefined;
  coverClassName?: string | undefined;
  size?: "sm" | "md" | "lg" | undefined;
}) {
  const lead = project.metrics[0];
  const name = project.titleAr ?? project.title;
  return (
    <article className={cn("group", className)}>
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full text-left"
        aria-haspopup="dialog"
        aria-label={`Open project: ${name}${project.subtitle ? `, ${project.subtitle}` : ""}`}
      >
        <div className="overflow-hidden transition-[transform,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1.5 group-hover:shadow-lift group-focus-visible:-translate-y-1.5 group-focus-visible:shadow-lift">
          <ProjectCover
            project={project}
            size={size}
            className={cn(
              "aspect-[4/5] transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] group-focus-visible:scale-[1.03]",
              coverClassName,
            )}
          />
        </div>
        <div className="mt-4">
          {project.titleAr ? (
            <>
              <h3 lang="ar" dir="rtl" className="text-left text-2xl font-bold leading-snug">
                {project.titleAr}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{project.title}</p>
            </>
          ) : (
            <>
              <h3 className="font-display-tight text-2xl leading-[0.95] sm:text-[1.7rem]">{project.title}</h3>
              {project.subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{project.subtitle}</p>}
            </>
          )}
        </div>
        {lead && (
          <p className="mt-3 text-sm">
            <span className="font-semibold text-coral">{lead.value}</span>{" "}
            <span className="text-muted-foreground">{lead.label}</span>
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-semibold transition-colors duration-300 group-hover:border-coral group-hover:text-coral group-focus-visible:border-coral group-focus-visible:text-coral">
          Open project
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
          />
        </span>
      </button>
    </article>
  );
}
