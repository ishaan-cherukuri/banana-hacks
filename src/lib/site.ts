// Central SEO/site config. Change `url` if the domain ever moves.
export const siteConfig = {
  name: "Banana Hacks 2026",
  shortName: "Banana Hacks",
  url: "https://bananahacks.tech",
  description:
    "Banana Hacks 2026 is a free, virtual weekend hackathon on generative AI and image creation, running Oct 9–12, 2026. Build creative AI tools, fine-tune diffusion models, and compete for prizes and compute credits.",
  startDate: "2026-10-09T20:00:00-04:00",
  endDate: "2026-10-12T19:00:00-04:00",
  dateRangeLabel: "October 9–12, 2026",
  organizer: "Banana Hacks",
  contactEmail: "sponsorships@bananahacks.tech",
} as const;

/**
 * Analytics / verification. All optional — set them in `.env.local` and they
 * activate automatically. Left unset, no tags are emitted at all.
 *
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
 *   NEXT_PUBLIC_BING_SITE_VERIFICATION=...
 */
export const analytics = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
} as const;

/**
 * The crawlable page map. Drives the sitemap, the shared footer, and the
 * breadcrumb schema, so adding a page in one place wires up all three.
 */
export interface SitePage {
  path: string;
  label: string;
  title: string;
  description: string;
  priority: number;
}

export const sitePages: SitePage[] = [
  {
    path: "/about",
    label: "About",
    title: "About Banana Hacks 2026 — Free Virtual Generative AI Hackathon",
    description:
      "What Banana Hacks 2026 is, who can join, what you'll build, and how the free virtual generative AI and image creation hackathon works. Oct 9–12, 2026.",
    priority: 0.9,
  },
  {
    path: "/schedule",
    label: "Schedule",
    title: "Banana Hacks 2026 Schedule — Workshops, Deadlines & Ceremonies",
    description:
      "Full Banana Hacks 2026 schedule for Oct 9–12: opening ceremony, Stable Diffusion and LoRA fine-tuning workshops, office hours, submission deadline, and demo day.",
    priority: 0.8,
  },
  {
    path: "/prizes",
    label: "Prizes",
    title: "Banana Hacks 2026 Prizes & Judging Criteria",
    description:
      "How Banana Hacks 2026 projects are judged, what the award categories are, and what the prize pool includes. Free to enter, open worldwide.",
    priority: 0.8,
  },
  {
    path: "/faq",
    label: "FAQ",
    title: "Banana Hacks 2026 FAQ — Eligibility, Teams, Tools & Submissions",
    description:
      "Answers to common questions about Banana Hacks 2026: who can participate, whether it's free, team size limits, allowed AI tools, judging, and what to submit.",
    priority: 0.9,
  },
  {
    path: "/sponsors",
    label: "Sponsors",
    title: "Banana Hacks 2026 Sponsors — Partner With a Generative AI Hackathon",
    description:
      "Meet the sponsors backing Banana Hacks 2026 and learn how your company can reach generative AI builders through compute credits, tooling, or cash prizes.",
    priority: 0.7,
  },
  {
    path: "/register",
    label: "Register",
    title: "Register for Banana Hacks 2026 — Free AI Hackathon Sign-Up",
    description:
      "Registration for Banana Hacks 2026 is free and open worldwide. Sign up to join the virtual generative AI and image creation hackathon on Oct 9–12, 2026.",
    priority: 0.9,
  },
];

export function getPage(path: string): SitePage {
  const page = sitePages.find((p) => p.path === path);
  if (!page) throw new Error(`No site page registered for "${path}"`);
  return page;
}
