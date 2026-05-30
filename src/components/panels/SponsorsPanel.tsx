"use client";

export default function SponsorsPanel() {
  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      <div className="px-6 pt-6 pb-2">
        <h2 className="font-display font-bold text-xl text-studio-ink mb-0.5">Sponsors</h2>
        <p className="text-xs font-body text-studio-ink/50 mb-4">
          Interested in sponsoring?{" "}
          <span className="text-peri-500 cursor-pointer hover:underline">
            sponsor@bananahacks.tech
          </span>
        </p>
      </div>

      <div className="px-6 pb-8 space-y-8">
        {/* Coming soon placeholder */}
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <div className="text-5xl">🍌</div>
          <h3 className="font-display font-bold text-lg text-studio-ink">Sponsors Coming Soon</h3>
          <p className="text-sm font-body text-studio-ink/50 max-w-xs">
            We&apos;re finalizing our sponsor lineup. Check back closer to Oct 9!
          </p>
        </div>

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
