import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useStoryMotion } from "@/hooks/useStoryMotion";
import { StoryTop } from "@/components/story/StoryTop";
import { Opening } from "@/components/story/Opening";

const TITLE = "Mohamed Reyad — An interactive personal story";
const DESC =
  "Reels Creator, Scriptwriter, Visual Storyteller. A portfolio that tells a story in seven chapters.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryHome,
});

function StoryHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  useStoryMotion(rootRef);

  return (
    <div className="story" ref={rootRef}>
      <div className="grain" aria-hidden="true" />
      <StoryTop />
      <p className="st-chc" id="st-chc" aria-hidden="true">
        01 / 07
      </p>
      <Opening />
      {/* M2: chapters 02-03 (Who am I? / How I see the world) */}
      {/* M3: chapters 04-05 (The work / Behind the frame) */}
      {/* M4: chapters 06-07 (The numbers / What's next?) */}
    </div>
  );
}
