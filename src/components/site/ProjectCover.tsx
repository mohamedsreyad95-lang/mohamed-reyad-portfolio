import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

const toneClass: Record<Project["cover"]["tone"], string> = {
  coral: "bg-coral text-primary-foreground",
  ink: "bg-ink text-coral",
  paper: "bg-paper text-paper-foreground",
  charcoal: "bg-card text-foreground",
};

/** Typographic cover. Stands in until real stills from the reels are supplied. */
export function ProjectCover({
  project,
  className,
  size,
}: {
  project: Project;
  className?: string | undefined;
  size?: "sm" | "md" | "lg" | undefined;
}) {
  const { cover } = project;
  const scale = size ?? "md";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grain relative flex flex-col justify-between overflow-hidden p-4 sm:p-5",
        toneClass[cover.tone],
        className,
      )}
    >
      <div className="flex items-start justify-between text-[0.65rem] font-semibold uppercase tracking-[0.2em] opacity-70">
        <span>{project.categories[0]}</span>
        <span>{cover.mark}</span>
      </div>
      <div
        className={cn(
          "font-display-tight",
          scale === "sm" && "text-[2.6rem] sm:text-5xl",
          scale === "md" && "text-[3.4rem] sm:text-6xl lg:text-[4.5rem]",
          scale === "lg" && "text-7xl sm:text-8xl",
        )}
      >
        {cover.lines.map((line, i) => (
          <span key={i} className={cn("block", i % 2 === 1 && cover.tone !== "coral" && "opacity-60")}>
            {line}
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between text-[0.65rem] font-semibold uppercase tracking-[0.2em] opacity-70">
        <span>{project.platform}</span>
        <span>{project.metrics[0]?.value}</span>
      </div>
    </div>
  );
}
