import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/**
 * The doorway. Frames Mohamed's real portrait like the gallery threshold it was taken in:
 * stone jamb, warm light from inside, a strip of wood floor. Renders nothing until the real
 * photo is in `profile.portrait`: no empty frame, no stand-in person.
 */
export function Threshold({
  className,
  doorClassName,
  caption = true,
  eager = false,
}: {
  className?: string;
  doorClassName?: string;
  caption?: boolean;
  eager?: boolean;
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const portrait = profile.portrait;

  // Gentle depth: the interior drifts a few pixels against the scroll.
  useEffect(() => {
    const el = imgRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translate3d(0, ${Math.max(-1, Math.min(1, progress)) * -18}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!portrait) return null;

  return (
    <figure className={cn("relative", className)}>
      <div className="threshold-jamb p-2 sm:p-3">
        <div
          className={cn(
            "relative aspect-[3/4] animate-door overflow-hidden bg-ink",
            doorClassName,
          )}
        >
          <div ref={imgRef} className="absolute -inset-y-6 inset-x-0 will-change-transform">
            <img
              src={portrait.src}
              alt={portrait.alt}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="size-full animate-settle object-cover [object-position:var(--focus-mobile)] sm:[object-position:var(--focus)]"
              style={
                {
                  "--focus": portrait.focus ?? "50% 35%",
                  "--focus-mobile": portrait.focusMobile ?? portrait.focus ?? "50% 35%",
                } as CSSProperties
              }
            />
          </div>
          {/* Warm light falling from inside the room, and a soft edge vignette. */}
          <div aria-hidden="true" className="gallery-light pointer-events-none absolute inset-0 mix-blend-soft-light" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_20px_var(--ink)]"
          />
        </div>
      </div>
      <div aria-hidden="true" className="floor-light mx-2 h-6 sm:mx-3 sm:h-10" />
      {caption && (
        <figcaption className="mt-1 flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <span className="eyebrow">{profile.name}</span>
          <span>{profile.title}</span>
        </figcaption>
      )}
    </figure>
  );
}
