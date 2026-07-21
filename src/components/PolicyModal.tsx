"use client";

import { useEffect } from "react";

interface PolicyModalProps {
  type: "conduct" | "rules" | null;
  onClose: () => void;
}

const COC_SECTIONS = [
  {
    icon: "🌐",
    title: "Online Hackathon Standards",
    body: [
      "Banana Hacks is a virtual event — your conduct online is held to the same standard as an in-person event. Screen-share content, Discord messages, project demos, video calls, and submitted work are all covered.",
      "Do not record, screenshot, or share other participants' video feeds or private messages without explicit consent.",
      "Do not attempt to disrupt the event infrastructure — submission platforms, judging portals, Discord bots, or organizer tooling.",
    ],
  },
  {
    icon: "🤝",
    title: "Be Excellent to Each Other",
    body: [
      "We are committed to providing a harassment-free experience regardless of gender, gender identity, age, sexual orientation, disability, physical appearance, race, ethnicity, nationality, or religion.",
      "Harassment includes offensive verbal comments, deliberate intimidation, unwanted attention, sustained disruption of others' work, and inappropriate online contact.",
      "Sexualised language, imagery, or jokes are not acceptable in any event channel, DM, or submission.",
    ],
  },
  {
    icon: "🔒",
    title: "Privacy & Safety Online",
    body: [
      "Do not share personal information about other participants (doxxing) in any form.",
      "Phishing, social engineering, malware distribution, or any attack targeting participants or organizers is grounds for immediate removal.",
      "If you discover a security vulnerability in event infrastructure, disclose it privately to the organizers — do not exploit or publicise it.",
    ],
  },
  {
    icon: "⚖️",
    title: "Academic Integrity",
    body: [
      "All code, designs, and content submitted must be your team's original work created during the hackathon window.",
      "Properly attribute open-source libraries, datasets, and pre-trained models used in your project.",
      "Using generative AI tools is permitted and encouraged — disclose which tools you used in your submission.",
    ],
  },
  {
    icon: "🚨",
    title: "Enforcement",
    body: [
      "Violations may result in a warning, removal from the event, or disqualification from prizes at organizer discretion.",
      "Report concerns to a organizer via the #help channel on Discord or by emailing bananahacks@gmail.com.",
      "Banana Hacks also follows the MLH Code of Conduct, available at mlh.io/code-of-conduct.",
    ],
  },
];

const RULES_SECTIONS = [
  {
    icon: "👥",
    title: "Teams",
    body: [
      "Teams of 1–4 people. You may form a team with anyone — no school affiliation required.",
      "Each person may only be on one team.",
      "Team changes must be reported to organizers before hacking begins.",
    ],
  },
  {
    icon: "⏱️",
    title: "Hacking Window",
    body: [
      "Hacking begins at the opening ceremony and ends at the announced deadline (Sun Oct 11, 11:59 PM AoE).",
      "Any work started before the opening ceremony is not eligible for judging.",
      "Code must be in a public GitHub repository committed within the hacking window — commit timestamps are verified.",
    ],
  },
  {
    icon: "🛠️",
    title: "What You Can Build On",
    body: [
      "Open-source libraries, public APIs, and pre-trained models are all fair game — cite them in your README.",
      "Theme and challenge details are revealed at the opening ceremony. Projects must address the theme.",
      "Hardware is not required; all projects should be demonstrable via screen-share or a hosted link.",
    ],
  },
  {
    icon: "📦",
    title: "Submissions",
    body: [
      "Submit via the official submission portal before the deadline. Late submissions will not be considered.",
      "Required: project name, 1-paragraph description, GitHub link, and a short demo video (≤3 min).",
      "Judges will evaluate on Impact, Technical Complexity, Creativity, and Presentation.",
    ],
  },
  {
    icon: "🏆",
    title: "Prizes & Eligibility",
    body: [
      "Prize winners must be available for a short post-event demo call with sponsors.",
      "Organizers and judges are not eligible to win prizes.",
      "By submitting, you grant Banana Hacks permission to feature your project in promotional materials.",
    ],
  },
];

export default function PolicyModal({ type, onClose }: PolicyModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!type) return null;

  const isConductModal = type === "conduct";
  const title = isConductModal ? "Code of Conduct" : "Submission Rules";
  const sections = isConductModal ? COC_SECTIONS : RULES_SECTIONS;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(26,26,46,0.45)", backdropFilter: "blur(3px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-banana-100 rounded-2xl flex flex-col"
        style={{
          width: "min(420px, 92vw)",
          maxHeight: "72vh",
          boxShadow: "0 4px 6px -1px rgba(26,26,46,0.08), 0 24px 48px -8px rgba(26,26,46,0.22), 0 0 0 1px rgba(26,26,46,0.08)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-studio-ink/08 shrink-0">
          <h2 className="font-display font-bold text-base text-studio-ink">{title}</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-studio-ink/08 flex items-center justify-center hover:bg-studio-ink/15 transition-colors text-studio-ink/60 hover:text-studio-ink"
            aria-label="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 py-4 space-y-4 window-scroll">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <h3 className="font-display font-semibold text-xs text-studio-ink tracking-wide uppercase">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-1.5">
                {section.body.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-body text-studio-ink/70 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-banana-400 shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 pt-3 pb-4 border-t border-studio-ink/08 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl font-display font-semibold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 active:scale-[0.98] transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
