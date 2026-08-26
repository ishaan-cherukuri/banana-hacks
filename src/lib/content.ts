/**
 * Single source of truth for event content.
 *
 * Both the OS-simulation panels (client-side, not crawlable) and the
 * server-rendered SEO pages read from here, so the two can never drift apart
 * and say different things to users vs. search engines.
 */

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: "Who can participate?",
    a: "Anyone, in any country. Banana Hacks is an international hackathon — there is no regional, national, or school-based eligibility restriction. Students, professionals, hobbyists, and first-timers are all welcome; you just need an internet connection and a passion for generative AI and image creation.",
  },
  {
    q: "Is it free to enter?",
    a: "Yes! Banana Hacks is completely free to participate in. We also plan to provide free compute credits so you can train models and run inference without worrying about costs.",
  },
  {
    q: "Do I need a team?",
    a: "Nope! You can hack solo or form a team of up to 4 people. We run a team formation event on Opening Night if you'd like to find teammates. Teams of all sizes compete in the same pool.",
  },
  {
    q: "What tech stack can I use?",
    a: "Anything goes! Stable Diffusion, DALL-E, Midjourney API, Flux, custom models, ControlNet, ComfyUI, A1111, Hugging Face Diffusers — use whatever tools help you build the best project. Open source is celebrated.",
  },
  {
    q: "How are projects judged?",
    a: "Projects are evaluated on: Creativity & Originality (30%), Technical Implementation (30%), Visual Quality / User Experience (20%), and Potential Impact (20%). Judges include working AI researchers, artists, and startup founders.",
  },
  {
    q: "Can I use pre-trained models?",
    a: "Yes! You're encouraged to build on top of existing models. The innovation can be in your application layer, fine-tuning approach, prompt engineering, workflow design, or novel combination of tools.",
  },
  {
    q: "What should I submit?",
    a: "A working demo (live URL or recorded video), GitHub repository, and a short write-up (max 500 words) explaining what you built and why. Judges will interact with live demos when possible.",
  },
  {
    q: "Will there be prizes?",
    a: "Yes — the prize pool is being finalized and will be announced closer to the event. Expect a mix of cash, compute credits, and tooling subscriptions from our sponsors, plus category awards for standout projects.",
  },
  {
    q: "Where does hacking happen?",
    a: "Banana Hacks is fully online and international. Our community hub is on Discord and workshops and ceremonies are on Zoom, with every session recorded so participants outside North American hours can watch on their own schedule. You hack wherever you're most creative.",
  },
  {
    q: "I've never done a hackathon before. Is this beginner-friendly?",
    a: "Absolutely. We run dedicated beginner workshops, have mentors available throughout the weekend, and specifically celebrate first-time hackers. The only requirement is curiosity. We've seen incredible projects from people on their very first hackathon.",
  },
];

export type EventType =
  | "kickoff"
  | "workshop"
  | "office-hours"
  | "social"
  | "deadline"
  | "ceremony";

export interface ScheduleEvent {
  time: string;
  title: string;
  type: EventType;
  day: string;
  virtual?: boolean;
}

export const SCHEDULE: ScheduleEvent[] = [
  // Friday — Opening night
  { day: "Fri Oct 9",  time: "8:00 PM EDT",  title: "Opening Ceremony & Theme Reveal",           type: "kickoff",       virtual: true  },
  { day: "Fri Oct 9",  time: "9:30 PM EDT",  title: "Team Formation Social Hour",                type: "social",        virtual: true  },
  // Saturday — Build day 1
  { day: "Sat Oct 10", time: "11:00 AM EDT", title: "Workshop: Stable Diffusion from Scratch",   type: "workshop",      virtual: true  },
  { day: "Sat Oct 10", time: "2:00 PM EDT",  title: "Office Hours: APIs & Model Hosting",        type: "office-hours",  virtual: true  },
  { day: "Sat Oct 10", time: "5:00 PM EDT",  title: "Workshop: LoRA Fine-tuning Deep Dive",      type: "workshop",      virtual: true  },
  { day: "Sat Oct 10", time: "9:00 PM EDT",  title: "Mid-point Check-in & Progress Showcase",    type: "social",        virtual: true  },
  // Sunday — Build day 2 + deadline
  { day: "Sun Oct 11", time: "11:00 AM EDT", title: "Office Hours: UX & Prompt Engineering",     type: "office-hours",  virtual: true  },
  { day: "Sun Oct 11", time: "3:00 PM EDT",  title: "Workshop: ControlNet & Image Conditioning", type: "workshop",      virtual: true  },
  { day: "Sun Oct 11", time: "11:59 PM AoE", title: "Submissions Close",                         type: "deadline",      virtual: false },
  // Monday — Closing
  { day: "Mon Oct 12", time: "3:00 PM EDT",  title: "Judging & Demo Day (live streams)",         type: "ceremony",      virtual: true  },
  { day: "Mon Oct 12", time: "6:00 PM EDT",  title: "Award Ceremony & Closing",                  type: "ceremony",      virtual: true  },
];

export interface Sponsor {
  name: string;
  url: string;
  logo: string;
  tagline: string;
  bg: string;
  light?: boolean;
}

export const SPONSORS: Sponsor[] = [
  {
    name: "CodeCrafters",
    url: "https://codecrafters.io",
    logo: "/sponsors/codecrafters.png",
    tagline: "Build your own Redis, Git, SQLite & more",
    bg: "#070C0F",
  },
  {
    name: "Interview Cake",
    url: "https://www.interviewcake.com",
    logo: "/sponsors/interviewcake.png",
    tagline: "Ace your coding interview",
    bg: "#76BEDB",
  },
  {
    name: "Rosebud AI",
    url: "https://rosebud.ai",
    logo: "/sponsors/rosebud.png",
    tagline: "Build & ship games with AI",
    bg: "#FFFFFF",
    light: true,
  },
  {
    name: "XYZ",
    url: "https://gen.xyz",
    logo: "/sponsors/xyz.png",
    tagline: "Domains for every website, everywhere",
    bg: "#B1CF5B",
    light: true,
  },
];

export interface Track {
  title: string;
  desc: string;
}

export const TRACKS: Track[] = [
  { title: "Image Generators", desc: "Text-to-image tools, style transfer, inpainting systems" },
  { title: "AI Pipelines",     desc: "Fine-tuned diffusion models, LoRA adapters, ControlNet workflows" },
  { title: "Creative Tools",   desc: "AI-assisted drawing apps, prompt engineering interfaces" },
  { title: "Multi-modal Apps", desc: "Combine image + text + audio generation in novel ways" },
];

export const JUDGING_CRITERIA = [
  { label: "Creativity & Originality",          weight: "30%" },
  { label: "Technical Implementation",          weight: "30%" },
  { label: "Visual Quality / User Experience",  weight: "20%" },
  { label: "Potential Impact",                  weight: "20%" },
];

export const ELIGIBILITY = [
  "Open to everyone in every country — students, professionals, hobbyists",
  "Teams of 1–4 people",
  "All skill levels welcome — first-timers encouraged",
  "Must submit by Oct 11, 2026 at 11:59 PM AoE",
];
