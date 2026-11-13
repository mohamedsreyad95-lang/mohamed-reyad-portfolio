import { ArrowUpRight } from "lucide-react";
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
  return (
    <article className={cn("group", className)}>
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full text-left"
        aria-haspopup="dialog"
        aria-label={`Preview ${project.title}${project.subtitle ? `, ${project.subtitle}` : ""}`}
      >
        <div className="overflow-hidden">
          <ProjectCover
            project={project}
            size={size}
            className={cn(
              "aspect-[4/5] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.025] group-focus-within:scale-[1.025]",
              coverClassName,
            )}
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display-tight text-2xl sm:text-[1.7rem]">{project.title}</h3>
            {project.subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
            )}
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral"
          />
        </div>
        {lead && (
          <p className="mt-3 text-sm">
            <span className="font-semibold text-coral">{lead.value}</span>{" "}
            <span className="text-muted-foreground">{lead.label}</span>
          </p>
        )}
      </button>
    </article>
  );
}
