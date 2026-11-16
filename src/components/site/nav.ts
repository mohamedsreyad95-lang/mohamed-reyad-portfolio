import { hasScripts } from "@/data/scripts";

const ALL_NAV = [
  { to: "/work", label: "Visual work" },
  { to: "/scripts", label: "Scripts" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/** Scripts only appears once there is a complete script or treatment to read. */
export const NAV = ALL_NAV.filter((n) => n.to !== "/scripts" || hasScripts);
