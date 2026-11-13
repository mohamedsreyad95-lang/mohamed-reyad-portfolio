export const CATEGORIES = ["Brand Content", "Events", "Sports & Editorial"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Metric = {
  value: string;
  label: string;
  /** Where the number comes from, when it is not the reel itself. */
  scope?: string;
};

export type CoverTone = "coral" | "ink" | "paper" | "charcoal";

export type Project = {
  slug: string;
  /** Original Arabic title of the reel. Only set when supplied; never translated or guessed. */
  titleAr?: string;
  /** Working label in English, shown until the original Arabic title is supplied. */
  title: string;
  subtitle?: string;
  client?: string;
  categories: Category[];
  url: string;
  platform: string;
  synopsis: string;
  role: string;
  roleNote?: string;
  metrics: Metric[];
  notes?: string[];
  cover: { lines: string[]; tone: CoverTone; mark?: string };
  featured?: boolean;
};

const WEDDING_ROLE = "Mobile Content & Social Media Creator, Wedding Show";
const WEDDING_NOTE =
  "Collaborative post. Camera and edit credits are shared across the team and are not listed individually here.";

export const projects: Project[] = [
  {
    slug: "opal-shower-gel-rebranding",
    title: "OPAL Shower Gel Rebranding",
    client: "OPAL Cosmetics",
    categories: ["Brand Content"],
    url: "https://www.instagram.com/reel/DWy9AGFo1N5/",
    platform: "Instagram Reel",
    synopsis: "A reel introducing the new look of OPAL shower gel as part of the brand\u2019s rebranding.",
    role: "Reels Creator, OPAL Cosmetics",
    metrics: [
      { value: "15,389", label: "likes", scope: "This Instagram post" },
      { value: "333", label: "comments", scope: "This Instagram post" },
      {
        value: "2M+",
        label: "combined views",
        scope: "Campaign level, across Facebook, TikTok and Instagram",
      },
    ],
    notes: [
      "The Instagram figures are likes and comments on this post. The 2M+ views figure is the wider campaign result, counted separately.",
    ],
    cover: { lines: ["OPAL", "Rebranding"], tone: "coral", mark: "01" },
    featured: true,
  },
  {
    slug: "wedding-show-246k",
    title: "Wedding Show",
    subtitle: "Reel, 246K plays",
    client: "Wedding Show",
    categories: ["Events"],
    url: "https://www.instagram.com/reel/DeOlKbeJyS6/",
    platform: "Instagram Reel",
    synopsis: "A wedding reel published on the Wedding Show account.",
    role: WEDDING_ROLE,
    roleNote: WEDDING_NOTE,
    metrics: [
      { value: "246,177", label: "plays" },
      { value: "5,358", label: "likes" },
    ],
    cover: { lines: ["Wedding", "Show"], tone: "paper", mark: "02" },
    featured: true,
  },
  {
    slug: "sandra-vs-radwa",
    title: "Sandra vs. Radwa",
    subtitle: "Home Bundle vs Personal Bundle",
    categories: ["Brand Content"],
    url: "https://www.instagram.com/reel/DZAsAoosWrY/",
    platform: "Instagram Reel",
    synopsis: "Two characters, two bundles. Sandra and Radwa set the Home Bundle against the Personal Bundle.",
    role: "Reels Creator",
    metrics: [
      { value: "81.6K", label: "plays" },
      { value: "758", label: "likes" },
    ],
    cover: { lines: ["Sandra", "vs.", "Radwa"], tone: "ink", mark: "03" },
    featured: true,
  },
  {
    slug: "inside-the-brainstorming",
    title: "Inside the Brainstorming",
    categories: ["Brand Content"],
    url: "https://www.instagram.com/reel/DalFz5NsQy6/",
    platform: "Instagram Reel",
    synopsis: "A reel set inside a brainstorming session.",
    role: "Reels Creator",
    metrics: [
      { value: "47K", label: "plays" },
      { value: "685", label: "likes" },
    ],
    cover: { lines: ["Inside the", "Brainstorming"], tone: "charcoal", mark: "04" },
    featured: true,
  },
  {
    slug: "home-bundle-peace-of-mind",
    title: "Home Bundle",
    subtitle: "Peace of Mind",
    categories: ["Brand Content"],
    url: "https://www.instagram.com/reel/DbJLdO9Ie__/",
    platform: "Instagram Reel",
    synopsis: "A reel built around the Home Bundle and the idea of peace of mind.",
    role: "Reels Creator",
    metrics: [{ value: "2,123", label: "plays" }],
    notes: [
      "A separate treatment was written around the same idea. The finished video is not necessarily that treatment.",
    ],
    cover: { lines: ["Peace", "of", "Mind"], tone: "paper", mark: "05" },
  },
  {
    slug: "opal-marketing-sketch",
    title: "OPAL Marketing Sketch",
    client: "OPAL Cosmetics",
    categories: ["Brand Content"],
    url: "https://www.instagram.com/reel/DezHk4DM75_/",
    platform: "Instagram Reel",
    synopsis: "A sketch-format reel for OPAL.",
    role: "Reels Creator, OPAL Cosmetics",
    metrics: [{ value: "4,826", label: "plays" }],
    cover: { lines: ["OPAL", "Sketch"], tone: "coral", mark: "06" },
  },
  {
    slug: "wedding-show-20k",
    title: "Wedding Show",
    subtitle: "Reel, 20.8K plays",
    client: "Wedding Show",
    categories: ["Events"],
    url: "https://www.instagram.com/reel/DasQIxaIDHe/",
    platform: "Instagram Reel",
    synopsis: "A wedding reel published on the Wedding Show account.",
    role: WEDDING_ROLE,
    roleNote: WEDDING_NOTE,
    metrics: [
      { value: "20,875", label: "plays" },
      { value: "326", label: "likes" },
    ],
    cover: { lines: ["Wedding", "Show"], tone: "ink", mark: "07" },
  },
  {
    slug: "wedding-show-9k",
    title: "Wedding Show",
    subtitle: "Reel, 9.4K plays",
    client: "Wedding Show",
    categories: ["Events"],
    url: "https://www.instagram.com/reel/Det2eQ2oC_o/",
    platform: "Instagram Reel",
    synopsis: "A wedding reel published on the Wedding Show account.",
    role: WEDDING_ROLE,
    roleNote: WEDDING_NOTE,
    metrics: [
      { value: "9,417", label: "plays" },
      { value: "307", label: "likes" },
    ],
    cover: { lines: ["Wedding", "Show"], tone: "charcoal", mark: "08" },
  },
  {
    slug: "wedding-show-7k",
    title: "Wedding Show",
    subtitle: "Reel, 7.9K plays",
    client: "Wedding Show",
    categories: ["Events"],
    url: "https://www.instagram.com/reel/Dde3-ADglEL/",
    platform: "Instagram Reel",
    synopsis: "A wedding reel published on the Wedding Show account.",
    role: WEDDING_ROLE,
    roleNote: WEDDING_NOTE,
    metrics: [
      { value: "7,948", label: "plays" },
      { value: "268", label: "likes" },
    ],
    cover: { lines: ["Wedding", "Show"], tone: "paper", mark: "09" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const railProjects = projects.filter((p) => !p.featured);
