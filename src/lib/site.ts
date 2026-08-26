// Central SEO/site config. Change `url` if the domain ever moves.
export const siteConfig = {
  name: "Banana Hacks 2026",
  shortName: "Banana Hacks",
  // The apex 307-redirects to www on Vercel, so the apex was never the URL
  // that actually serves. Pointing canonicals, og:url, the sitemap and the
  // JSON-LD @ids at a redirecting host is a self-inflicted SEO wound.
  // If you'd rather be canonical on the apex, change the Vercel redirect —
  // but the site and the DNS have to agree. See AUDIT.md T7.
  url: "https://www.bananahacks.tech",
  description:
    "Banana Hacks 2026 is a free, international virtual weekend hackathon on generative AI and image creation, running Oct 9–12, 2026. Hackers from every country are welcome — build creative AI tools, fine-tune diffusion models, and compete for prizes and compute credits.",
  startDate: "2026-10-09T20:00:00-04:00",
  endDate: "2026-10-12T19:00:00-04:00",
  dateRangeLabel: "October 9–12, 2026",
  organizer: "Banana Hacks",
  /**
   * Named human behind the event. A visitor — often a parent or a teacher —
   * asking "who runs this?" previously found nothing at all: `organizer` was
   * self-referential and the Organization schema had no founder.
   */
  organizerName: "Ishaan Cherukuri",
  organizerBlurb:
    "Banana Hacks is organised by Ishaan Cherukuri and a student-run team.",
  /** General participant contact. Distinct from the sponsorship inbox. */
  contactEmail: "team@bananahacks.tech",
  sponsorEmail: "sponsorships@bananahacks.tech",
  /**
   * Community. Left empty until a permanent invite exists — the UI renders
   * honest copy when this is falsy rather than a button that goes nowhere.
   */
  discordUrl: "",
  instagramUrl: "https://www.instagram.com/bananahacks26/",
  mlhCodeOfConductUrl: "https://mlh.io/code-of-conduct",
  /** Stated plainly because nothing on the site previously said either. */
  eligibility:
    "Open to everyone, everywhere, at any age. Banana Hacks is built for students and first-time hackers, but there is no age, country, or school requirement to enter.",
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
    title: "About Banana Hacks 2026 — Free International Generative AI Hackathon",
    description:
      "What Banana Hacks 2026 is, who can join, what you'll build, and how the free international virtual generative AI and image creation hackathon works. Open to hackers in every country. Oct 9–12, 2026.",
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
      "How Banana Hacks 2026 projects are judged, what the award categories are, and what the prize pool includes. Free to enter and open to participants in every country.",
    priority: 0.8,
  },
  {
    path: "/faq",
    label: "FAQ",
    title: "Banana Hacks 2026 FAQ — Eligibility, Teams, Tools & Submissions",
    description:
      "Answers to common questions about Banana Hacks 2026: who can participate worldwide, whether it's free, team size limits, allowed AI tools, judging, and what to submit.",
    priority: 0.9,
  },
  {
    path: "/sponsors",
    label: "Sponsors",
    title: "Banana Hacks 2026 Sponsors — Partner With a Generative AI Hackathon",
    description:
      "Meet the sponsors backing Banana Hacks 2026 and learn how your company can reach generative AI builders around the world through compute credits, tooling, or cash prizes.",
    priority: 0.7,
  },
  {
    path: "/code-of-conduct",
    label: "Conduct",
    title: "Banana Hacks 2026 Code of Conduct & Submission Rules",
    description:
      "The Code of Conduct and submission rules for Banana Hacks 2026, plus how to report a problem. Applies to every participant, mentor, judge and organiser, in Discord, on Zoom and in submitted work.",
    priority: 0.6,
  },
  {
    path: "/register",
    label: "Register",
    title: "Register for Banana Hacks 2026 — Free International AI Hackathon Sign-Up",
    description:
      "Registration for Banana Hacks 2026 is free and open to hackers in every country. Sign up to join the virtual generative AI and image creation hackathon on Oct 9–12, 2026.",
    priority: 0.9,
  },
];

export function getPage(path: string): SitePage {
  const page = sitePages.find((p) => p.path === path);
  if (!page) throw new Error(`No site page registered for "${path}"`);
  return page;
}
