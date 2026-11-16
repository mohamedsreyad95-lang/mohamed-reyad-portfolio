export const profile = {
  name: "Mohamed Reyad",
  wordmark: "MOHAMED REYAD",
  title: "Reels Creator & Scriptwriter",
  headline: "Good ideas deserve better stories.",
  positioning:
    "I look for the story before I think about the shot. A situation people already know becomes a scene worth watching, and the product fits inside it the way it would in real life.",
  closing: "Have a brief? Let\u2019s tell its story.",
  email: "mohamedsreyad95@gmail.com",
  whatsapp: {
    display: "+20 127 660 0722",
    href: "https://wa.me/201276600722",
  },
  // Omitted until supplied. Never fill these with a guess.
  linkedin: null as string | null,
  cvUrl: null as string | null,
  // Real portrait only. While null, no portrait or frame is shown anywhere.
  // `focus` sets the crop (CSS object-position) so the doorway and face stay in frame.
  portrait: null as { src: string; alt: string; focus?: string; focusMobile?: string } | null,
} as const;

export type TimelineEntry = {
  period: string;
  org: string;
  role: string;
  points: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: "Oct 2024 \u2013 Present",
    org: "OPAL Cosmetics",
    role: "Reels Creator",
    points: [
      "Reels for the brand, including the shower gel rebranding.",
      "The rebranding campaign passed 2M combined views across Facebook, TikTok and Instagram.",
    ],
  },
  {
    period: "Apr 2023 \u2013 Present",
    org: "Wedding Show",
    role: "Mobile Content & Social Media Creator",
    points: [
      "More than 150 weddings covered.",
      "The account has grown past 25K followers.",
    ],
  },
  {
    period: "2023 \u2013 Present",
    org: "Freelance",
    role: "Short-form videos for businesses",
    points: ["40+ beverage videos.", "Restaurant, caf\u00e9, creator and event shoots."],
  },
];
