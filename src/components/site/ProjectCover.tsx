import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

const toneClass: Record<Project["cover"]["tone"], string> = {
  coral: "bg-coral text-primary-foreground",
  ink: "bg-ink text-coral",
  paper: "bg-paper text-paper-foreground",
  charcoal: "bg-card text-foreground",
};

/**
 * Typographic cover. Stands in until real stills from the reels are supplied.
 * Type scales to the cover width so whole words always fit on one line.
 */
export function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string | undefined;
  size?: "sm" | "md" | "lg" | undefined;
}) {
  const { cover } = project;
  const longest = Math.max(...cover.lines.map((l) => l.length));
  const fontSize = `min(26cqw, ${(180 / longest).toFixed(2)}cqw)`;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "@container grain relative flex flex-col justify-between overflow-hidden p-5 sm:p-6",
        toneClass[cover.tone],
        className,
      )}
    >
      <span aria-hidden="true" className="art-mat" />
      <div className="flex items-start justify-between gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-70">
        <span>{project.categories[0]}</span>
        <span>{cover.mark}</span>
      </div>
      <div className="font-display-tight whitespace-nowrap" style={{ fontSize }}>
        {cover.lines.map((line, i) => (
          <span key={i} className={cn("block", i % 2 === 1 && cover.tone !== "coral" && "opacity-60")}>
            {line}
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-70">
        <span>{project.platform}</span>
        <span>{project.metrics[0]?.value}</span>
      </div>
    </div>
  );
}
