"use client";

import { JUDGING_CRITERIA } from "@/lib/content";

const CATEGORIES = [
  { title: "Best Creative Tool",     desc: "Most useful generative AI tool for someone making something" },
  { title: "Best Fine-tune",         desc: "Most impressive custom model, LoRA, or training pipeline" },
  { title: "Most Surprising Output", desc: "The result nobody saw coming" },
  { title: "People's Choice",        desc: "Voted on by participants at demo day" },
];

export default function PrizesPanel() {
  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      <div className="px-6 pt-6 pb-2">
        <h2 className="font-display font-bold text-xl text-studio-ink mb-0.5">Prizes & Awards</h2>
        <p className="text-xs font-body text-studio-ink/50 mb-4">
          Free to enter · Every submission is judged
        </p>
      </div>

      <div className="px-6 pb-8 space-y-6">
        {/* Prize pool status */}
        <div className="bg-banana-400/12 border border-banana-400/40 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="font-display font-bold text-sm text-studio-ink mb-1">
            Prize pool coming soon
          </h3>
          <p className="text-xs font-body text-studio-ink/55 max-w-sm mx-auto">
            We&apos;re finalizing the pool with sponsors — expect cash, compute
            credits, and tooling subscriptions. Announced before opening night.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-display font-bold text-sm text-studio-ink mb-2">
            Award categories
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <div
                key={c.title}
                className="border border-studio-ink/12 bg-white/50 rounded-lg px-3 py-2"
              >
                <div className="font-display font-semibold text-xs text-studio-ink mb-0.5">
                  {c.title}
                </div>
                <div className="font-body text-[11px] text-studio-ink/55 leading-relaxed">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Judging criteria */}
        <div>
          <h3 className="font-display font-bold text-sm text-studio-ink mb-2">
            How projects are judged
          </h3>
          <div className="space-y-1.5">
            {JUDGING_CRITERIA.map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-between gap-3 border border-studio-ink/12 bg-white/50 rounded-lg px-3 py-2"
              >
                <span className="font-body text-xs text-studio-ink/75">{c.label}</span>
                <span className="font-display font-bold text-xs text-studio-ink shrink-0">
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
