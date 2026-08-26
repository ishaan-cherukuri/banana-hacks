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
    a: "Anyone, at any age, in any country. There is no age limit, no regional or national restriction, and no school affiliation required. Banana Hacks is built for students and first-time hackers in particular — the workshops and mentoring assume no prior experience — but professionals and hobbyists are welcome too. All you need is an internet connection. Participants under 18 should have a parent or guardian read the Code of Conduct with them.",
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
    a: "Yes — the prize pool is over $10,000, made up of cash, compute credits, and tooling subscriptions from our sponsors, plus category awards for standout projects. The exact split between categories is confirmed closer to the event.",
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
  // Registration deadline. This date used to appear only inside the apply
  // form ("Registration closes Oct 8") and nowhere else on the site.
  { day: "Thu Oct 8",  time: "11:59 PM AoE", title: "Registration Closes",                       type: "deadline",      virtual: false },
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
  "Open to everyone, everywhere — no age limit and no country restriction",
  "Built for students and first-timers; professionals and hobbyists welcome too",
  "Teams of 1–4 people",
  "Under 18? Read the Code of Conduct with a parent or guardian",
  "Must submit by Oct 11, 2026 at 11:59 PM AoE",
];

/**
 * Event policies. Shared by the in-desktop PolicyModal and the crawlable
 * /code-of-conduct page, so a participant, a parent and a search engine all
 * read the same words. The CoC previously existed only inside the
 * registration form, which made it both hard to find and uncrawlable.
 */
export interface PolicySection {
  title: string;
  body: string[];
}

export const COC_SECTIONS: PolicySection[] = [
  {
    title: "Online Hackathon Standards",
    body: [
      "Banana Hacks is a virtual event — your conduct online is held to the same standard as an in-person event. Screen-share content, Discord messages, project demos, video calls, and submitted work are all covered.",
      "Do not record, screenshot, or share other participants' video feeds or private messages without explicit consent.",
      "Do not attempt to disrupt the event infrastructure — submission platforms, judging portals, Discord bots, or organizer tooling.",
    ],
  },
  {
    title: "Be Excellent to Each Other",
    body: [
      "We are committed to providing a harassment-free experience regardless of gender, gender identity, age, sexual orientation, disability, physical appearance, race, ethnicity, nationality, or religion.",
      "Harassment includes offensive verbal comments, deliberate intimidation, unwanted attention, sustained disruption of others' work, and inappropriate online contact.",
      "Sexualised language, imagery, or jokes are not acceptable in any event channel, DM, or submission.",
    ],
  },
  {
    title: "Privacy & Safety Online",
    body: [
      "Do not share personal information about other participants (doxxing) in any form.",
      "Phishing, social engineering, malware distribution, or any attack targeting participants or organizers is grounds for immediate removal.",
      "If you discover a security vulnerability in event infrastructure, disclose it privately to the organizers — do not exploit or publicise it.",
    ],
  },
  {
    title: "Academic Integrity",
    body: [
      "All code, designs, and content submitted must be your team's original work created during the hackathon window.",
      "Properly attribute open-source libraries, datasets, and pre-trained models used in your project.",
      "Using generative AI tools is permitted and encouraged — disclose which tools you used in your submission.",
    ],
  },
  {
    title: "Enforcement",
    body: [
      "Violations may result in a warning, removal from the event, or disqualification from prizes at organizer discretion.",
      "Report concerns to an organiser via the #help channel on Discord, or by emailing team@bananahacks.tech. Reports are read only by the organising team.",
      "Banana Hacks also follows the MLH Code of Conduct (mlh.io/code-of-conduct). Banana Hacks is not an MLH member event.",
    ],
  },
];

export const RULES_SECTIONS: PolicySection[] = [
  {
    title: "Teams",
    body: [
      "Teams of 1–4 people. You may form a team with anyone — no school affiliation required.",
      "Each person may only be on one team.",
      "Team changes must be reported to organizers before hacking begins.",
    ],
  },
  {
    title: "Hacking Window",
    body: [
      "Hacking begins at the opening ceremony and ends at the announced deadline (Sun Oct 11, 11:59 PM AoE).",
      "Any work started before the opening ceremony is not eligible for judging.",
      "Code must be in a public GitHub repository committed within the hacking window — commit timestamps are verified.",
    ],
  },
  {
    title: "What You Can Build On",
    body: [
      "Open-source libraries, public APIs, and pre-trained models are all fair game — cite them in your README.",
      "Theme and challenge details are revealed at the opening ceremony. Projects must address the theme.",
      "Hardware is not required; all projects should be demonstrable via screen-share or a hosted link.",
    ],
  },
  {
    title: "Submissions",
    body: [
      "Submit via the official submission portal before the deadline. Late submissions will not be considered.",
      "Required: project name, 1-paragraph description, GitHub link, and a short demo video (≤3 min).",
      "Judges score on Creativity & Originality (30%), Technical Implementation (30%), Visual Quality / User Experience (20%), and Potential Impact (20%) — the same criteria listed on the Prizes page.",
    ],
  },
  {
    title: "Prizes & Eligibility",
    body: [
      "Prize winners must be available for a short post-event demo call with sponsors.",
      "Organizers and judges are not eligible to win prizes.",
      "By submitting, you grant Banana Hacks permission to feature your project in promotional materials.",
    ],
  },
];
