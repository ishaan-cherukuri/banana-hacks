"use client";

export default function PrizesPanel() {
  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      <div className="px-6 pt-6 pb-2">
        <h2 className="font-display font-bold text-xl text-studio-ink mb-0.5">Prizes & Awards</h2>
        <p className="text-xs font-body text-studio-ink/50 mb-4">
          Stay tuned for prize announcements!
        </p>
      </div>

      <div className="px-6 pb-8">
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <div className="text-5xl">🏆</div>
          <h3 className="font-display font-bold text-lg text-studio-ink">Prizes Coming Soon</h3>
          <p className="text-sm font-body text-studio-ink/50 max-w-xs">
            We&apos;re finalizing our prize pool. Check back closer to the event!
          </p>
        </div>
      </div>
    </div>
  );
}
