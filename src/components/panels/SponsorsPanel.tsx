"use client";
import { HeartLineIcon, BananaLineIcon } from "@/components/svgs/DockIcons";

import { useState, useEffect } from "react";
import { SPONSORS } from "@/lib/content";

function SponsorInfoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9500, backgroundColor: "rgba(25,26,23,0.55)", backdropFilter: "blur(3px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-banana-100 rounded-[8px] flex flex-col"
        style={{
          width: "min(440px, 92vw)",
          maxHeight: "80vh",
          border: "1.5px solid #191A17", boxShadow: "6px 6px 0 rgba(25,26,23,0.88)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-studio-ink/25 shrink-0">
          <div className="flex items-center gap-2">
            <HeartLineIcon size={18} />
            <h2 className="font-display font-bold text-base text-studio-ink">Become a Banana Sponsor</h2>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-studio-ink/08 flex items-center justify-center hover:bg-studio-ink/15 transition-colors text-studio-ink/72 hover:text-studio-ink"
            aria-label="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 py-4 space-y-4 window-scroll">
          <p className="text-xs font-body text-studio-ink/70 leading-relaxed">
            Banana Hacks is a free, virtual weekend hackathon (Oct 9–12, 2026) bringing together 500+ generative AI
            builders. Sponsoring puts your brand, tools, and team directly in front of them.
          </p>

          <div>
            <h3 className="font-display font-semibold text-xs text-studio-ink tracking-wide uppercase mb-1.5">
              What sponsorship can look like
            </h3>
            <ul className="space-y-1.5">
              {[
                "Monetary support — cash prizes, event operations, or swag",
                "API tokens or usage credits for participants to build with",
                "Compute / GPU credits for training and inference",
                "Tool or product access (dev accounts, licenses, trials)",
                "Mentorship, workshops, or judging from your team",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-xs font-body text-studio-ink/70 leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-banana-400 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-xs text-studio-ink tracking-wide uppercase mb-1.5">
              What we&apos;d need from you
            </h3>
            <ul className="space-y-1.5">
              {[
                "A rough sense of budget or credit amount you can offer",
                "Any tokens, API keys, or credit codes to distribute to participants",
                "Your logo (SVG or PNG) and a short blurb for the sponsors page",
                "A point of contact for the hacking weekend",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-xs font-body text-studio-ink/70 leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-vine-400 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-banana-200 hard-card-sm p-3 text-center">
            <p className="text-xs font-body text-studio-ink/70">
              Email us at{" "}
              <a href="mailto:sponsorships@bananahacks.tech" className="font-semibold text-vine-500 hover:underline">
                sponsorships@bananahacks.tech
              </a>{" "}
              — we reply in under 12 hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pt-3 pb-4 border-t border-studio-ink/25 shrink-0">
          <a
            href="mailto:sponsorships@bananahacks.tech"
            className="w-full flex items-center justify-center py-2 rounded-[6px] font-display font-bold text-sm bg-banana-400 text-studio-ink border-[1.5px] border-studio-ink shadow-icon press"
          >
            Email Us to Sponsor
          </a>
        </div>
      </div>
    </div>
  );
}


export default function SponsorsPanel() {
  const [showDeck, setShowDeck] = useState(false);

  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {showDeck && <SponsorInfoModal onClose={() => setShowDeck(false)} />}

      <div className="px-6 pt-6 pb-2">
        <h2 className="font-display font-bold text-xl text-studio-ink mb-0.5">Sponsors</h2>
        <p className="text-xs font-body text-studio-ink/70 mb-4">
          Interested in sponsoring?{" "}
          <a href="mailto:sponsorships@bananahacks.tech" className="text-vine-500 hover:underline">
            sponsorships@bananahacks.tech
          </a>
        </p>
      </div>

      <div className="px-6 pb-8 space-y-8">
        {/* Sponsor logo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SPONSORS.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-[8px] border-[1.5px] border-studio-ink shadow-icon press"
              style={{ backgroundColor: sponsor.bg }}
            >
              <div className="flex-1 flex items-center justify-center px-4 py-11">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} — ${sponsor.tagline}. Sponsor of Banana Hacks 2026.`}
                  loading="lazy"
                  className="max-h-20 w-full object-contain"
                />
              </div>
              <div className={sponsor.light ? "px-4 py-2 bg-studio-ink/06" : "px-4 py-2 bg-black/15"}>
                <span className={sponsor.light ? "text-[11px] font-body text-studio-ink/72" : "text-[11px] font-body text-white/80"}>
                  {sponsor.tagline}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Become a sponsor CTA */}
        <div className="bg-banana-200 border-[1.5px] border-dashed border-studio-ink rounded-[8px] p-6 text-center">
          <div className="flex justify-center mb-2"><BananaLineIcon size={28} /></div>
          <h3 className="font-display font-bold text-studio-ink mb-1">
            Become a Banana Sponsor
          </h3>
          <p className="text-xs font-body text-studio-ink/70 max-w-xs mx-auto mb-3">
            Reach generative AI builders in 60+ countries. Provide compute credits, tools access, or cash prizes.
          </p>
          <button
            onClick={() => setShowDeck(true)}
            className="px-5 py-2 rounded-[6px] font-display font-bold text-sm bg-banana-400 text-studio-ink border-[1.5px] border-studio-ink shadow-icon press"
          >
            View Sponsor Deck
          </button>
        </div>
      </div>
    </div>
  );
}
