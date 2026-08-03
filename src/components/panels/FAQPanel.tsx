"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";


export default function FAQPanel() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {/* Header */}
      <div className="px-6 pt-6 pb-4" style={{ background: "linear-gradient(135deg, rgba(253,216,53,0.30) 0%, rgba(76,110,245,0.15) 100%)" }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🍌</span>
          <h2 className="font-display font-bold text-xl text-studio-ink">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xs font-body text-studio-ink/50 ml-7">
          Can't find your answer?{" "}
          <span className="text-peri-500 cursor-pointer hover:underline">
            Ask on Discord
          </span>
        </p>
      </div>

      {/* FAQ list */}
      <div className="px-6 pb-8 space-y-2">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              open === i
                ? "border-banana-400/70 bg-banana-50 shadow-icon"
                : "border-studio-ink/07 bg-white/60 hover:bg-white/90 hover:border-banana-400/40"
            }`}
          >
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {/* Number badge */}
              <span
                className={`shrink-0 w-5 h-5 rounded-md text-[10px] font-mono font-bold flex items-center justify-center transition-colors ${
                  open === i
                    ? "bg-banana-400 text-studio-ink"
                    : "bg-studio-ink/08 text-studio-ink/40"
                }`}
              >
                {i + 1}
              </span>

              <span className="font-display font-semibold text-sm text-studio-ink flex-1">
                {item.q}
              </span>

              <span
                className={`shrink-0 text-studio-ink/40 transition-transform duration-200 ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            {open === i && (
              <div className="px-4 pb-4 pt-1 pl-12">
                <p className="font-body text-sm text-studio-ink/70 leading-relaxed">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
