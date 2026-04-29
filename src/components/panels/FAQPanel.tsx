"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Who can participate?",
    a: "Anyone, anywhere in the world! Students, professionals, hobbyists, and first-timers are all welcome. You just need an internet connection and a passion for generative AI and image creation.",
  },
  {
    q: "Is it free to enter?",
    a: "Yes! Banana Hacks is completely free to participate in. We also provide free compute credits from our sponsors so you can train models and run inference without worrying about costs.",
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
    a: "Yes! Over $10,000 in prizes including cash, GPU credits (AWS, Replicate, Modal), and tooling subscriptions. There are category prizes for Best Creative Tool, Best Fine-tune, Most Surprising Output, and People's Choice.",
  },
  {
    q: "Where does hacking happen?",
    a: "Banana Hacks is 100% virtual. Our community hub is on Discord. Workshops and ceremonies are on Zoom. You hack wherever you're most creative — bedroom, café, library, co-working space.",
  },
  {
    q: "I've never done a hackathon before. Is this beginner-friendly?",
    a: "Absolutely. We run dedicated beginner workshops, have mentors available throughout the weekend, and specifically celebrate first-time hackers. The only requirement is curiosity. We've seen incredible projects from people on their very first hackathon.",
  },
];

export default function FAQPanel() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {/* Header */}
      <div className="px-6 pt-6 pb-4" style={{ background: "linear-gradient(135deg, rgba(253,216,53,0.30) 0%, rgba(76,110,245,0.15) 100%)" }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🍌</span>
          <h2 className="font-display font-bold text-xl text-studio-ink">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xs font-body text-studio-ink/50 ml-7">
          Can't find your answer?{" "}
          <span className="text-peri-500 cursor-pointer hover:underline">
            Ask on Discord
          </span>
        </p>
      </div>

      {/* FAQ list */}
      <div className="px-6 pb-8 space-y-2">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              open === i
                ? "border-banana-400/70 bg-banana-50 shadow-icon"
                : "border-studio-ink/07 bg-white/60 hover:bg-white/90 hover:border-banana-400/40"
            }`}
          >
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {/* Number badge */}
              <span
                className={`shrink-0 w-5 h-5 rounded-md text-[10px] font-mono font-bold flex items-center justify-center transition-colors ${
                  open === i
                    ? "bg-banana-400 text-studio-ink"
                    : "bg-studio-ink/08 text-studio-ink/40"
                }`}
              >
                {i + 1}
              </span>

              <span className="font-display font-semibold text-sm text-studio-ink flex-1">
                {item.q}
              </span>

              <span
                className={`shrink-0 text-studio-ink/40 transition-transform duration-200 ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            {open === i && (
              <div className="px-4 pb-4 pt-1 pl-12">
                <p className="font-body text-sm text-studio-ink/70 leading-relaxed">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
