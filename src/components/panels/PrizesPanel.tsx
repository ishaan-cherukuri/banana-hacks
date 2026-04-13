"use client";

import { PixelSparkle } from "@/components/svgs/StudioDecorations";

const GRAND_PRIZES = [
  { place: "1st", emoji: "🥇", amount: "$3,000", extra: "+ $500 GPU credits", bg: "bg-banana-400", border: "border-banana-600/30" },
  { place: "2nd", emoji: "🥈", amount: "$1,500", extra: "+ $250 GPU credits", bg: "bg-studio-mist", border: "border-studio-ink/15" },
  { place: "3rd", emoji: "🥉", amount: "$750",   extra: "+ $100 GPU credits", bg: "bg-studio-ripe/10", border: "border-studio-ripe/25" },
];

const CATEGORY_PRIZES = [
  { icon: "🎨", title: "Best Creative Tool",       prize: "$500 + Figma Pro",      desc: "Most innovative UI for AI image creation" },
  { icon: "🧪", title: "Best Fine-tune",            prize: "$500 + Replicate credits", desc: "Most impressive custom model training" },
  { icon: "🤯", title: "Most Surprising Output",    prize: "$500 + Midjourney sub", desc: "Made us say \"I didn't know AI could do that\"" },
  { icon: "🌍", title: "Best Social Impact",        prize: "$400 + mentorship",     desc: "AI image tools for accessibility or social good" },
  { icon: "🔧", title: "Best Technical Achievement",prize: "$400 + AWS credits",    desc: "Most impressive engineering under the hood" },
  { icon: "❤️", title: "People's Choice",           prize: "$300 + swag pack",      desc: "Voted by participants on Discord" },
];

const CREDITS = [
  { provider: "Modal",     amount: "$200",  icon: "⚡" },
  { provider: "Replicate", amount: "$200",  icon: "🔁" },
  { provider: "AWS",       amount: "$300",  icon: "☁️" },
  { provider: "Hugging Face", amount: "PRO", icon: "🤗" },
  { provider: "Weights & Biases", amount: "Team", icon: "📊" },
];

export default function PrizesPanel() {
  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {/* Header */}
      <div className="relative px-6 pt-6 pb-4 overflow-hidden">
        <PixelSparkle className="absolute top-4 right-6 animate-float" size={24} color="#FDD835" />
        <PixelSparkle className="absolute top-12 right-20 animate-float-slow" size={16} color="#4C6EF5" />
        <p className="text-xs font-mono text-banana-700 uppercase tracking-widest mb-1">
          $10,000+ in prizes
        </p>
        <h2 className="font-display font-extrabold text-2xl text-studio-ink mb-0.5">
          Prizes & Awards
        </h2>
        <p className="text-xs font-body text-studio-ink/50">
          Cash, compute credits, and tooling for every category winner
        </p>
      </div>

      {/* Grand prize podium */}
      <div className="px-6 pb-6">
        <h3 className="font-display font-bold text-sm text-studio-ink/60 uppercase tracking-wider mb-3">
          Overall Winners
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {GRAND_PRIZES.map((p) => (
            <div
              key={p.place}
              className={`${p.bg} ${p.border} border-2 rounded-2xl p-4 text-center hover:scale-105 transition-transform`}
            >
              <div className="text-3xl mb-1">{p.emoji}</div>
              <div className="font-mono text-xs font-bold text-studio-ink/60 uppercase mb-1">
                {p.place} Place
              </div>
              <div className="font-display font-extrabold text-xl text-studio-ink">
                {p.amount}
              </div>
              <div className="font-body text-[11px] text-studio-ink/60 mt-0.5">
                {p.extra}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category prizes */}
      <div className="px-6 pb-6">
        <h3 className="font-display font-bold text-sm text-studio-ink/60 uppercase tracking-wider mb-3">
          Category Awards
        </h3>
        <div className="space-y-2">
          {CATEGORY_PRIZES.map((cat) => (
            <div
              key={cat.title}
              className="flex items-center gap-3 bg-white/60 border border-studio-ink/06 rounded-xl px-4 py-3 hover:bg-white/90 hover:border-banana-400/30 transition-all group"
            >
              <span className="text-xl shrink-0">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-sm text-studio-ink truncate">
                  {cat.title}
                </div>
                <div className="font-body text-xs text-studio-ink/50 truncate">
                  {cat.desc}
                </div>
              </div>
              <div className="shrink-0 font-mono text-xs font-bold text-banana-700 bg-banana-400/15 px-2.5 py-1 rounded-lg">
                {cat.prize}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compute credits */}
      <div className="px-6 pb-8">
        <h3 className="font-display font-bold text-sm text-studio-ink/60 uppercase tracking-wider mb-3">
          Free Compute Credits (All Participants)
        </h3>
        <div className="flex flex-wrap gap-2">
          {CREDITS.map((c) => (
            <div
              key={c.provider}
              className="flex items-center gap-2 bg-white/70 border border-studio-ink/08 rounded-xl px-3 py-2 hover:border-banana-400/40 transition-all"
            >
              <span>{c.icon}</span>
              <span className="font-body font-medium text-sm text-studio-ink">{c.provider}</span>
              <span className="font-mono text-xs font-bold text-peri-600">{c.amount}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] font-body text-studio-ink/40 mt-3">
          * Credits distributed after registration confirmation. Terms apply per provider.
        </p>
      </div>
    </div>
  );
}
