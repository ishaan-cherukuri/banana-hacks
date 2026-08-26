"use client";

import { useEffect } from "react";
import { COC_SECTIONS, RULES_SECTIONS } from "@/lib/content";

interface PolicyModalProps {
  type: "conduct" | "rules" | null;
  onClose: () => void;
}

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
      style={{ backgroundColor: "rgba(25,26,23,0.55)", backdropFilter: "blur(3px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-banana-100 rounded-[8px] flex flex-col"
        style={{
          width: "min(420px, 92vw)",
          maxHeight: "72vh",
          border: "1.5px solid #191A17", boxShadow: "6px 6px 0 rgba(25,26,23,0.88)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-studio-ink/25 shrink-0">
          <h2 className="font-display font-bold text-base text-studio-ink">{title}</h2>
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
        <div className="px-5 pt-3 pb-4 border-t border-studio-ink/25 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-[6px] font-display font-semibold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 active:scale-[0.98] transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
