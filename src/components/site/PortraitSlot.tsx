import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/** Shows the real portrait once supplied. Until then, a typographic monogram, never a stand-in face. */
export function PortraitSlot({ className }: { className?: string }) {
  if (profile.portrait) {
    return (
      <figure className={cn("overflow-hidden bg-card", className)}>
        <img
          src={profile.portrait.src}
          alt={profile.portrait.alt}
          className="aspect-[4/5] w-full object-cover"
          loading="lazy"
        />
      </figure>
    );
  }
  return (
    <figure className={cn("grain relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-border bg-card p-5", className)}>
      <div className="flex justify-between">
        <span className="eyebrow">Portrait</span>
        <span className="eyebrow">MR</span>
      </div>
      <div aria-hidden="true" className="font-display-tight select-none text-[min(38vw,13rem)] leading-[0.8] text-coral">
        M<span className="text-foreground/15">R</span>
      </div>
      <figcaption className="text-sm text-muted-foreground">Photo to come</figcaption>
    </figure>
  );
}
