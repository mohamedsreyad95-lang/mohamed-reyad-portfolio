import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function WorkRail({ items, onOpen }: { items: Project[]; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-6 px-5 sm:px-8">
        <div>
          <p className="eyebrow">More from the reel</p>
          <h2 className="mt-3 font-display-tight text-huge">The rest of the work</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <Button variant="line" size="round" onClick={() => scroll(-1)} aria-label="Scroll work left">
            <ArrowLeft aria-hidden="true" />
          </Button>
          <Button variant="line" size="round" onClick={() => scroll(1)} aria-label="Scroll work right">
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      <ul
        ref={ref}
        className="rail-scroll mt-10 flex gap-5 overflow-x-auto px-5 pb-4 sm:px-8 xl:px-[max(2rem,calc((100vw-1440px)/2+2rem))]"
        aria-label="More work, scrolls horizontally"
      >
        {items.map((p) => (
          <li key={p.slug} className="w-[68vw] shrink-0 snap-start sm:w-[300px]">
            <ProjectCard project={p} onOpen={onOpen} size="sm" />
          </li>
        ))}
        <li className="w-[68vw] shrink-0 snap-start sm:w-[300px]">
          <Link
            to="/work"
            className="group flex aspect-[4/5] flex-col justify-between border border-border bg-card p-5 transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-coral hover:shadow-lift focus-visible:-translate-y-1.5"
          >
            <span className="eyebrow">Index</span>
            <span className="font-display-tight text-5xl transition-colors group-hover:text-coral">
              All visual work
            </span>
            <span className="inline-flex items-center gap-2 self-start border-b border-foreground/25 pb-1 text-sm font-semibold transition-colors group-hover:border-coral group-hover:text-coral">
              See every project
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
