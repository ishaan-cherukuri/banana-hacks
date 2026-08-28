"use client";
import { QuestionLineIcon } from "@/components/svgs/DockIcons";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { siteConfig } from "@/lib/site";


export default function FAQPanel() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-banana-300 border-b-[1.5px] border-studio-ink">
        <div className="flex items-center gap-2 mb-1">
          <QuestionLineIcon size={22} />
          <h2 className="font-display font-extrabold text-xl text-studio-ink">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xs font-body text-studio-ink/70 ml-7">
          Can&apos;t find your answer?{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-vine-500 hover:underline"
          >
            Email us
          </a>
        </p>
      </div>

      {/* FAQ list */}
      <div className="px-6 pb-8 space-y-2">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className={`hard-card-sm overflow-hidden transition-colors ${
              open === i ? "bg-banana-200" : "bg-banana-50 hover:bg-banana-100"
            }`}
          >
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {/* Number badge */}
              <span
                className={`shrink-0 w-5 h-5 rounded-[3px] border-[1.5px] border-studio-ink text-[10px] font-mono font-bold flex items-center justify-center tabular-nums transition-colors ${
                  open === i ? "bg-studio-ink text-banana-400" : "bg-banana-50 text-studio-ink"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="font-display font-semibold text-sm text-studio-ink flex-1">
                {item.q}
              </span>

              <span
                className={`shrink-0 font-mono font-bold text-studio-ink transition-transform duration-150 ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            {open === i && (
              <div className="px-4 pb-4 pt-1 pl-12">
                <p className="font-body text-sm text-studio-ink/80 leading-relaxed">
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
