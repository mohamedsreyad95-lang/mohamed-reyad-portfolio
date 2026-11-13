import type { ElementType } from "react";
import { cn } from "@/lib/utils";

const AR = /[\u0600-\u06FF]/;

/**
 * Renders a title exactly as supplied. Titles with a " | " separator are shown on
 * two lines so mixed Arabic and English never wrap into each other.
 */
export function ScriptTitle({
  title,
  as: Tag = "h3",
  className,
  arClassName,
  latinClassName,
  secondaryClassName,
}: {
  title: string;
  as?: ElementType;
  className?: string;
  arClassName?: string;
  latinClassName?: string;
  secondaryClassName?: string;
}) {
  const parts = title.split(" | ");
  return (
    <Tag className={className}>
      {parts.map((part, i) => {
        const ar = AR.test(part);
        return (
          <span
            key={i}
            lang={ar ? "ar" : undefined}
            dir={ar ? "rtl" : "ltr"}
            className={cn(
              "block",
              ar ? arClassName : latinClassName,
              i > 0 && secondaryClassName,
            )}
          >
            {i > 0 && <span className="sr-only">, </span>}
            {part}
          </span>
        );
      })}
    </Tag>
  );
}
