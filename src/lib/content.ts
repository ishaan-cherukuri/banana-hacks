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
    a: "Anyone, at any age, in any country. We don't check your age, where you live, or whether you're enrolled at a school. Banana Hacks is aimed at students and first-time hackers, so the workshops and mentoring assume you have never done this before, but professionals and hobbyists are welcome too. All you need is an internet connection. If you're under 18, read the Code of Conduct with a parent or guardian first.",
  },
  {
    q: "Is it free to enter?",
    a: "Yes. It costs nothing to enter. We're also lining up free compute credits so you can train and run models without paying for GPU time.",
  },
  {
    q: "Do I need a team?",
    a: "No. Hack alone or bring up to three other people. If you want teammates and don't have any yet, come to the team formation hour on opening night. Solo hackers and full teams are judged in the same pool.",
  },
  {
    q: "What tech stack can I use?",
    a: "Whatever you want. Stable Diffusion, DALL-E, the Midjourney API, Flux, ControlNet, ComfyUI, A1111, Hugging Face Diffusers, or a model you trained yourself. If it helps you build the thing, use it. Open source is very welcome.",
  },
  {
    q: "How are projects judged?",
    a: "Judges score five things equally, 1 to 5 each: technical execution and difficulty, innovation and creativity, use of the image AI theme, impact and usefulness, and design, presentation, and demo. The full rubric is on the Prizes page.",
  },
  {
    q: "Can I use pre-trained models?",
    a: "Yes, and most projects do. What you build on top is the part that gets judged: the app around the model, how you fine-tuned it, your prompting, or the way you wired several tools together.",
  },
  {
    q: "What should I submit?",
    a: "A working demo, either a live URL or a recorded video, a link to your GitHub repo, and a write-up of 500 words or less covering what you built and why. Judges will poke at live demos where they can.",
  },
  {
    q: "Will there be prizes?",
    a: "There is $500 in cash for the top project, plus licenses and domains from our sponsors: CodeCrafters VIP memberships for the winning teams, 50 Interview Cake licenses, and free .xyz domains. See the Prizes page for the full list.",
  },
  {
    q: "Where does hacking happen?",
    a: "Wherever you are. Banana Hacks runs entirely online. Discord is the community hub, workshops and ceremonies run on Zoom, and we record every session so people outside North American hours can catch up on their own schedule.",
  },
  {
    q: "I've never done a hackathon before. Is this beginner-friendly?",
    a: "Yes, that's who we built it for. There are beginner workshops, mentors on call all weekend, and we go out of our way to celebrate people shipping their first project. You need curiosity and an internet connection.",
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
  // Friday, Opening night
  { day: "Fri Oct 9",  time: "8:00 PM EDT",  title: "Opening Ceremony & Theme Reveal",           type: "kickoff",       virtual: true  },
  { day: "Fri Oct 9",  time: "9:30 PM EDT",  title: "Team Formation Social Hour",                type: "social",        virtual: true  },
  // Saturday, Build day 1
  { day: "Sat Oct 10", time: "2:00 PM EDT",  title: "Office Hours: APIs & Model Hosting",        type: "office-hours",  virtual: true  },
  { day: "Sat Oct 10", time: "9:00 PM EDT",  title: "Mid-point Check-in & Progress Showcase",    type: "social",        virtual: true  },
  // Sunday, Build day 2 + deadline
  { day: "Sun Oct 11", time: "11:00 AM EDT", title: "Office Hours: UX & Prompt Engineering",     type: "office-hours",  virtual: true  },
  { day: "Sun Oct 11", time: "11:59 PM AoE", title: "Submissions Close",                         type: "deadline",      virtual: false },
  // Monday, Closing
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

export interface Prize {
  title: string;
  from: string;
  desc: string;
}

/** Everything on the table. Only prizes from sponsors listed in SPONSORS. */
export const PRIZES: Prize[] = [
  {
    title: "$500 cash",
    from: "Banana Hacks",
    desc: "Cash prize for the top project of the weekend.",
  },
  {
    title: "CodeCrafters VIP memberships",
    from: "CodeCrafters",
    desc: "Every member of the winning teams gets VIP access: 2 years for 1st place, 1 year for 2nd, and 6 months for 3rd.",
  },
  {
    title: "50 Interview Cake licenses",
    from: "Interview Cake",
    desc: "Full-access licenses to Interview Cake's coding interview course.",
  },
  {
    title: "Free .xyz domains",
    from: "XYZ",
    desc: "A .xyz domain, free for the first year, to put your project on the web.",
  },
];

export interface Track {
  title: string;
  desc: string;
}

export const TRACKS: Track[] = [
  { title: "Image generators", desc: "Text-to-image tools, style transfer, and inpainting" },
  { title: "Model workflows",  desc: "Fine-tuned models, LoRA adapters, and ControlNet setups" },
  { title: "Creative tools",   desc: "Drawing apps, prompt interfaces, and editing tools" },
  { title: "Mixed media",      desc: "Projects that bring images, text, and audio together" },
];

/** Equal weight, scored 1 to 5 on Devpost. */
export const JUDGING_CRITERIA = [
  {
    label: "Technical Execution and Difficulty",
    desc: "How technically impressive is the build? Did the team tackle real engineering challenges with image AI, computer vision, or generative models, with thoughtful model choice and non-trivial integration? Thin API wrappers should score lower.",
  },
  {
    label: "Innovation and Creativity",
    desc: "How original is the idea? Does the project take a fresh angle, combine tools unexpectedly, or explore a use case that feels genuinely new? Generic clones of well-known apps score lower than projects that surprise the judge.",
  },
  {
    label: "Use of the Image AI Theme",
    desc: "Is image AI, computer vision, or a generative visual model a core part of the project, not a cosmetic add-on? How fully does it embrace the \"image everything\" theme? If the image AI could be removed without breaking the core experience, score lower.",
  },
  {
    label: "Impact and Usefulness",
    desc: "Does the project address a real problem or serve a real need? Is there a clear user, a clear benefit, and a plausible path to someone actually using this beyond the hackathon weekend? Score higher for projects that make \"who cares\" easy to answer.",
  },
  {
    label: "Design, Presentation, and Demo",
    desc: "Is the interface clean and the visual output polished? Does the demo video (3 min or less) and Devpost write-up clearly communicate what the project is, what problem it solves, and how it works? A great project buried under a confusing demo scores lower.",
  },
];

export const ELIGIBILITY = [
  "Open to everyone, everywhere, with no age limit and no country restriction",
  "Built for students and first-timers; professionals and hobbyists welcome too",
  "Teams of 1 to 4 people",
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
    title: "Online hackathon standards",
    body: [
      "Banana Hacks happens online, and we hold your conduct here to the same standard as an in-person event. That covers screen shares, Discord messages, project demos, video calls, and anything you submit.",
      "Do not record, screenshot, or share another participant's video feed or private messages without asking them first.",
      "Do not try to disrupt the event infrastructure. That includes the submission platform, the judging portal, our Discord bots, and organizer tooling.",
    ],
  },
  {
    title: "Be excellent to each other",
    body: [
      "Everyone gets a harassment-free experience here, whatever their gender, gender identity, age, sexual orientation, disability, appearance, race, ethnicity, nationality, or religion.",
      "Harassment covers offensive comments, deliberate intimidation, unwanted attention, following someone around the event, and repeatedly interrupting other people's work.",
      "Keep sexualised language, imagery, and jokes out of every channel, DM, and submission.",
    ],
  },
  {
    title: "Privacy and safety online",
    body: [
      "Do not post another participant's personal information anywhere, in any form.",
      "Phishing, social engineering, malware, or any attack aimed at participants or organizers gets you removed immediately.",
      "Found a security hole in our infrastructure? Tell the organizers privately. Do not exploit it and do not post about it.",
    ],
  },
  {
    title: "Academic integrity",
    body: [
      "Everything you submit has to be your team's own work, made during the hacking window.",
      "Credit the open-source libraries, datasets, and pre-trained models your project depends on.",
      "Generative AI tools are allowed and encouraged. Just say which ones you used when you submit.",
    ],
  },
  {
    title: "Enforcement",
    body: [
      "Depending on what happened, organizers may give you a warning, remove you from the event, or disqualify you from prizes.",
      "Report anything that worries you in the #help channel on Discord, or email team@bananahacks.tech. Only the organizing team reads those reports.",
      "We also follow the MLH Code of Conduct (mlh.io/code-of-conduct). Banana Hacks is not an MLH member event.",
    ],
  },
];

export const RULES_SECTIONS: PolicySection[] = [
  {
    title: "Teams",
    body: [
      "Teams are 1 to 4 people. Team up with anyone you like; you don't need to go to the same school or live in the same country.",
      "You can only be on one team.",
      "Tell the organizers about any team changes before hacking starts.",
    ],
  },
  {
    title: "Hacking window",
    body: [
      "Hacking starts at the opening ceremony and stops at the deadline, Sun Oct 11 at 11:59 PM AoE.",
      "Anything you started before the opening ceremony is not eligible for judging.",
      "Your code goes in a public GitHub repo, committed inside the hacking window. We check commit timestamps.",
    ],
  },
  {
    title: "What you can build on",
    body: [
      "Open-source libraries, public APIs, and pre-trained models are all fair game. Cite them in your README.",
      "We reveal the theme and the challenge details at the opening ceremony, and your project has to address the theme.",
      "You don't need hardware. Every project should be demoable over a screen share or at a hosted link.",
    ],
  },
  {
    title: "Submissions",
    body: [
      "Submit through the official portal before the deadline. We don't accept late entries.",
      "You'll need a project name, a one-paragraph description, a GitHub link, and a demo video of three minutes or less.",
      "Judges score five equally weighted criteria: technical execution and difficulty, innovation and creativity, use of the image AI theme, impact and usefulness, and design, presentation, and demo. The full rubric is on the Prizes page.",
    ],
  },
  {
    title: "Prizes and eligibility",
    body: [
      "If you win, be available for a short demo call with sponsors after the event.",
      "Organizers and judges cannot win prizes.",
      "Submitting gives Banana Hacks permission to feature your project in promotional material.",
    ],
  },
];
