/**
 * Story copy for the seven-chapter home experience ("reyad-storytelling-rebuild").
 * Narrative copy lives here so the chapters stay data-driven and reviewable.
 * Verified figures mirror src/data/projects.ts and src/data/profile.ts — never
 * introduce a number here that those files do not already back.
 */

export const STORY_ASSETS = {
  cutout: "/assets/reyad-cutout.png",
  photo: "/assets/reyad.jpg",
  lineArt: "/assets/reyad-line-art.svg",
} as const;

export type StoryChapter = { n: string; id: string; name: string };

export const CHAPTERS: StoryChapter[] = [
  { n: "01", id: "c1", name: "The opening" },
  { n: "02", id: "c2", name: "Who am I?" },
  { n: "03", id: "c3", name: "How I see the world" },
  { n: "04", id: "c4", name: "The work" },
  { n: "05", id: "c5", name: "Behind the frame" },
  { n: "06", id: "c6", name: "The numbers" },
  { n: "07", id: "c7", name: "What’s next?" },
];

/* CH 01 — The opening */
export const OPENING = {
  roles: ["Reels Creator", "Scriptwriter", "Visual Storyteller"],
  headlineA: "I don’t just create content.",
  headlineB: "I create moments people remember.",
  cue: "Scroll — the story starts",
} as const;

/* CH 02 — Who am I? */
export const WHO_LINES = [
  { pre: "A", main: "reels creator." },
  { pre: "A", main: "scriptwriter.", outline: true },
  { pre: "A", main: "visual", accent: "storyteller." },
] as const;

export const WHO_NOTE = [
  "I’m Mohamed Reyad. I make short-form videos, and I usually look for the story before I think about the shot.",
  "I enjoy turning ordinary ideas into engaging visual experiences — sometimes it’s a small everyday situation, sometimes it’s a product that needs a better way to be introduced.",
] as const;

/* CH 03 — How I see the world */
export const MIND_CHAIN: { word: string; style: "outline" | "serif" | "solid" | "outlineSerif" | "block"; conn?: string }[] = [
  { word: "Ideas", style: "outline", conn: "become" },
  { word: "imagination", style: "serif", conn: "shaped by" },
  { word: "Storytelling", style: "solid", conn: "turned into" },
  { word: "visual concepts", style: "outlineSerif", conn: "delivered through" },
  { word: "CINEMATIC EXECUTION", style: "block" },
];

export const MIND_NOTES = [
  "It always starts with the problem — the thing people already complain about. That’s where the audience is.",
  "Then it becomes a scene: characters, a situation, a reason to keep watching until the end.",
] as const;

/* CH 05 — Behind the frame */
export const PROCESS_STEPS = [
  { n: "01", name: "Idea", text: "Start with the problem — the thing people already complain about." },
  { n: "02", name: "Script", text: "Turn it into a scene: characters, a situation, a reason to keep watching." },
  { n: "03", name: "Shoot", text: "The scene goes in front of the camera, simple and real." },
  { n: "04", name: "Edit", text: "Cut, caption and pace it to the moment it lands." },
  { n: "05", name: "Final", text: "The product arrives where it would actually help — never pasted in." },
] as const;

/* CH 06 — The numbers. Display forms of the verified figures in projects.ts / profile.ts. */
export const STORY_NUMBERS = [
  { value: 2, suffix: "M+", label: "combined views on the OPAL rebranding campaign", big: true },
  { value: 246, suffix: "K", label: "plays on a single Wedding Show reel" },
  { value: 150, suffix: "+", label: "weddings covered for Wedding Show" },
  { value: 40, suffix: "+", label: "beverage videos as a freelancer" },
  { value: 25, suffix: "K+", label: "Wedding Show followers and counting" },
] as const;

/* CH 07 — What’s next? */
export const CLOSING = {
  photoAlt: "Mohamed Reyad, standing in a museum doorway",
  titleA: "Every story starts somewhere.",
  titleB: "Maybe ours starts here.",
  fin: "© 2026 Mohamed Reyad — told as a story",
} as const;
