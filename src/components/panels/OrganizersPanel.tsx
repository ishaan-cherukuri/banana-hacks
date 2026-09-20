"use client";

import { useState, useEffect } from "react";
import { ORGANIZERS, ORGANIZER_APPLICATION_SECTIONS } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { BadgeLineIcon } from "@/components/svgs/DockIcons";

const MAILTO = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("ORGANIZER APPLICATION")}`;

/** Same chrome as PolicyModal on the Register panel, different copy and CTA. */
function JoinTeamModal({ onClose }: { onClose: () => void }) {
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
            <BadgeLineIcon size={18} />
            <h2 className="font-display font-bold text-base text-studio-ink">Join the Banana Hacks team</h2>
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
          {ORGANIZER_APPLICATION_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-xs text-studio-ink tracking-wide uppercase mb-1.5">
                {section.title}
              </h3>
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

          <div className="bg-banana-200 hard-card-sm p-3 text-center">
            <p className="text-xs font-body text-studio-ink/70">
              Email{" "}
              <a href={MAILTO} className="font-semibold text-vine-500 hover:underline">
                {siteConfig.contactEmail}
              </a>{" "}
              with the subject line{" "}
              <span className="font-mono font-bold text-studio-ink">ORGANIZER APPLICATION</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pt-3 pb-4 border-t border-studio-ink/25 shrink-0">
          <a
            href={MAILTO}
            className="w-full flex items-center justify-center py-2 rounded-[6px] font-display font-bold text-sm bg-banana-400 text-studio-ink border-[1.5px] border-studio-ink shadow-icon press"
          >
            Email Us to Apply
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrganizersPanel() {
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {showJoin && <JoinTeamModal onClose={() => setShowJoin(false)} />}

      <div className="px-6 pt-6 pb-2">
        <h2 className="font-display font-bold text-xl text-studio-ink mb-0.5">Organizers</h2>
        <p className="text-xs font-body text-studio-ink/70 mb-4">
          The team behind Banana Hacks. Say hi at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-vine-500 hover:underline">
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>

      <div className="px-6 pb-8 space-y-6">
        {/* One row of four. The window is pinned to a fixed size so this never wraps on desktop. */}
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ORGANIZERS.map((person) => (
            <li
              key={person.name}
              className="flex flex-col overflow-hidden rounded-[8px] border-[1.5px] border-studio-ink shadow-icon bg-banana-50"
            >
              <div className="aspect-square bg-banana-200 border-b-[1.5px] border-studio-ink overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.photo}
                  alt={`${person.name}, ${person.role} of Banana Hacks`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-3 py-2.5">
                <p className="font-display font-bold text-sm text-studio-ink leading-tight">{person.name}</p>
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-vine-500 mt-1">
                  {person.role}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Join the team */}
        <div className="bg-banana-200 border-[1.5px] border-dashed border-studio-ink rounded-[8px] p-5 text-center">
          <h3 className="font-display font-bold text-studio-ink mb-1">
            Want to be a part of the team?
          </h3>
          <p className="text-xs font-body text-studio-ink/70 max-w-sm mx-auto">
            We&apos;re recruiting organizers for Banana Hacks 2027.{" "}
            <button
              onClick={() => setShowJoin(true)}
              className="font-semibold text-vine-500 hover:underline"
            >
              See what to expect and how to apply
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
