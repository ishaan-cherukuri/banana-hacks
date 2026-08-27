"use client";

import { JUDGING_CRITERIA } from "@/lib/content";

const CATEGORIES = [
  { title: "Best creative tool",     desc: "The generative AI tool someone would actually keep using" },
  { title: "Best fine-tune",         desc: "The sharpest custom model, LoRA, or training pipeline" },
  { title: "Most surprising output", desc: "The result nobody saw coming" },
  { title: "People's choice",        desc: "Participants vote for this one at demo day" },
];

export default function PrizesPanel() {
  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      <div className="px-6 pt-6 pb-4 bg-banana-300 border-b-[1.5px] border-studio-ink">
        <p className="eyebrow mb-1">Judging</p>
        <h2 className="font-display font-extrabold text-xl text-studio-ink mb-0.5">Prizes &amp; awards</h2>
        <p className="text-xs font-body text-studio-ink/75">
          Free to enter, worldwide · Every submission is judged
        </p>
      </div>

      <div className="px-6 pt-6 pb-8 space-y-6">
        {/* Prize pool status */}
        <div className="bg-banana-200 hard-card p-4 text-center">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#191A17" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
            <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" fill="#FDD835" />
            <path d="M7 5.5H4.5V7a3.5 3.5 0 0 0 3 3.4M17 5.5h2.5V7a3.5 3.5 0 0 1-3 3.4" />
            <path d="M12 14v3.5M8.5 20.5h7l-.6-3h-5.8l-.6 3Z" />
          </svg>
          <h3 className="font-display font-bold text-sm text-studio-ink mb-1">
            Prize pool coming soon
          </h3>
          <p className="text-xs font-body text-studio-ink/70 max-w-sm mx-auto">
            We&apos;re still working out the exact split with sponsors. It will be
            cash, compute credits, and tooling subscriptions, and we announce the
            breakdown before opening night.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-display font-extrabold text-sm text-studio-ink mb-2">
            Award categories
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <div
                key={c.title}
                className="hard-card-sm bg-banana-50 px-3 py-2"
              >
                <div className="font-display font-semibold text-xs text-studio-ink mb-0.5">
                  {c.title}
                </div>
                <div className="font-body text-[11px] text-studio-ink/70 leading-relaxed">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Judging criteria */}
        <div>
          <h3 className="font-display font-extrabold text-sm text-studio-ink mb-2">
            How projects are judged
          </h3>
          <div className="space-y-1.5">
            {JUDGING_CRITERIA.map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-between gap-3 hard-card-sm bg-banana-50 px-3 py-2"
              >
                <span className="font-body text-xs text-studio-ink/75">{c.label}</span>
                <span className="font-mono font-bold text-[11px] text-studio-ink shrink-0 bg-banana-400 border-[1.5px] border-studio-ink px-1.5 tabular-nums">
                  {c.weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
