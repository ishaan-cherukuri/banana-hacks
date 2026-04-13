"use client";

interface Sponsor {
  name: string;
  tier: "banana" | "gold" | "silver" | "friend";
  emoji: string;
  desc?: string;
}

const SPONSORS: Sponsor[] = [
  // Banana tier (top)
  { name: "Replicate",        tier: "banana", emoji: "🔁", desc: "Run AI models at scale"               },
  { name: "Modal",            tier: "banana", emoji: "⚡", desc: "Serverless GPU compute"               },
  // Gold
  { name: "Hugging Face",     tier: "gold",   emoji: "🤗", desc: "Open source AI"                      },
  { name: "Weights & Biases", tier: "gold",   emoji: "📊", desc: "ML experiment tracking"              },
  { name: "AWS",              tier: "gold",   emoji: "☁️", desc: "Cloud computing"                     },
  // Silver
  { name: "Stability AI",     tier: "silver", emoji: "🎨"  },
  { name: "Anthropic",        tier: "silver", emoji: "🤖"  },
  { name: "Midjourney",       tier: "silver", emoji: "🖼️" },
  { name: "Figma",            tier: "silver", emoji: "✏️"  },
  { name: "Vercel",           tier: "silver", emoji: "▲"   },
  // Friends
  { name: "GitHub",           tier: "friend", emoji: "🐙"  },
  { name: "Notion",           tier: "friend", emoji: "📝"  },
  { name: "Loom",             tier: "friend", emoji: "🎥"  },
  { name: "1Password",        tier: "friend", emoji: "🔐"  },
];

const TIER_META = {
  banana: { label: "🍌 Banana Tier",  size: "large",  cols: "grid-cols-2" },
  gold:   { label: "🥇 Gold Tier",    size: "medium", cols: "grid-cols-3" },
  silver: { label: "🥈 Silver Tier",  size: "small",  cols: "grid-cols-5" },
  friend: { label: "💛 Community",    size: "tiny",   cols: "grid-cols-4" },
};

export default function SponsorsPanel() {
  const tiers = (["banana", "gold", "silver", "friend"] as const);

  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      <div className="px-6 pt-6 pb-2">
        <h2 className="font-display font-bold text-xl text-studio-ink mb-0.5">Sponsors</h2>
        <p className="text-xs font-body text-studio-ink/50 mb-4">
          Interested in sponsoring?{" "}
          <span className="text-peri-500 cursor-pointer hover:underline">
            sponsor@bananahacks.io
          </span>
        </p>
      </div>

      <div className="px-6 pb-8 space-y-8">
        {tiers.map((tier) => {
          const tierSponsors = SPONSORS.filter((s) => s.tier === tier);
          const meta = TIER_META[tier];
          if (tierSponsors.length === 0) return null;

          return (
            <div key={tier}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold text-studio-ink/50 uppercase tracking-wider">
                  {meta.label}
                </span>
                <div className="flex-1 h-px bg-studio-ink/08" />
              </div>

              <div className={`grid ${meta.cols} gap-3`}>
                {tierSponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className={`bg-white/70 border border-studio-ink/06 rounded-xl hover:border-banana-400/40 hover:bg-white hover:shadow-icon transition-all cursor-pointer group flex flex-col items-center justify-center text-center ${
                      tier === "banana" ? "p-6" :
                      tier === "gold"   ? "p-4" :
                      tier === "silver" ? "p-3" : "p-2.5"
                    }`}
                  >
                    <div className={`mb-1 ${tier === "banana" ? "text-4xl" : tier === "gold" ? "text-2xl" : "text-xl"}`}>
                      {sponsor.emoji}
                    </div>
                    <div className={`font-display font-bold text-studio-ink ${
                      tier === "banana" ? "text-base" :
                      tier === "gold"   ? "text-sm" :
                      tier === "silver" ? "text-xs" : "text-[10px]"
                    }`}>
                      {sponsor.name}
                    </div>
                    {sponsor.desc && (
                      <div className="text-[10px] font-body text-studio-ink/45 mt-0.5">
                        {sponsor.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Become a sponsor CTA */}
        <div className="bg-banana-400/12 border-2 border-dashed border-banana-400/40 rounded-2xl p-6 text-center">
          <div className="text-2xl mb-2">🍌</div>
          <h3 className="font-display font-bold text-studio-ink mb-1">
            Become a Banana Sponsor
          </h3>
          <p className="text-xs font-body text-studio-ink/55 max-w-xs mx-auto mb-3">
            Reach 500+ generative AI builders. Provide compute credits, tools access, or cash prizes.
          </p>
          <button className="px-5 py-2 rounded-xl font-display font-semibold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 transition-all hover:shadow-icon">
            View Sponsor Deck
          </button>
        </div>
      </div>
    </div>
  );
}
