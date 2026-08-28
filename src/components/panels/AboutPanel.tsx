"use client";

import BananaMascot from "@/components/svgs/BananaMascot";
import NeuralNetSVG from "@/components/svgs/NeuralNetSVG";
import { PixelSparkle, BrushStroke, LeafDecor } from "@/components/svgs/StudioDecorations";
import { siteConfig } from "@/lib/site";

// Flat fills, not tint-over-tint. A translucent wash on a translucent
// wash is what makes generated cards read as one grey mush.
const STATS = [
  { value: "4",     label: "Days",      sub: "Oct 9-12",              color: "bg-banana-300 text-studio-ink" },
  { value: String(siteConfig.registrationCount), label: "Registered", sub: "and counting", color: "bg-vine-200 text-vine-800" },
  { value: "$10K",  label: "Prizes",    sub: "in cash & credits",     color: "bg-studio-ripe text-banana-50" },
  { value: "60+",   label: "Countries", sub: "Hack from anywhere",    color: "bg-banana-50 text-studio-ink"  },
];

export default function AboutPanel() {
  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {/* Hero section */}
      <div className="relative px-8 pt-8 pb-6 overflow-hidden bg-banana-300 border-b-[1.5px] border-studio-ink">
        {/* Background decoration */}
        <div className="absolute top-4 right-4 opacity-20">
          <NeuralNetSVG size={140} animated={false} />
        </div>
        <PixelSparkle className="absolute top-6 right-44 animate-float" size={20} color="#FDD835" />
        <PixelSparkle className="absolute bottom-8 right-20 animate-float-slow" size={16} color="#2C7466" />
        <LeafDecor className="absolute top-3 right-5 opacity-40 animate-float-d2" size={32} />

        {/* Mascot */}
        <div className="flex gap-6 items-start relative z-10">
          <div className="shrink-0 animate-float">
            <BananaMascot size={100} variant="painting" />
          </div>
          <div>
            <p className="eyebrow mb-1">
              Banana Hacks 2026
            </p>
            <h2 className="font-display font-extrabold text-3xl text-studio-ink leading-tight mb-2">
              Build something{" "}
              <span className="banana-gradient-text">worth showing off</span>.
            </h2>
            <BrushStroke color="#FDD835" width={120} className="mb-3" />
            <p className="font-body text-studio-ink/70 text-sm leading-relaxed max-w-sm">
              Four days to make something with generative AI. Join from
              anywhere, work solo or with a team, and show us what you built on
              demo day.
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-8 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className={`hard-card-sm p-3 text-center press ${s.color}`}
            >
              <div className="font-display font-extrabold text-2xl mb-0.5">
                {s.value}
              </div>
              <div className="font-body font-semibold text-xs text-studio-ink">
                {s.label}
              </div>
              <div className="font-body text-[10px] text-studio-ink/70 mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What to build */}
      <div className="px-8 pb-6">
        <h2 className="font-display font-extrabold text-lg text-studio-ink mb-3">
            A few places to start
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "1", title: "Image generators", desc: "Text-to-image tools, style transfer, or inpainting", color: "bg-banana-300" },
            { icon: "2", title: "Model workflows", desc: "Fine-tuned models, LoRA adapters, or ControlNet",     color: "bg-vine-200"   },
            { icon: "3", title: "Creative tools",  desc: "Drawing apps, prompt interfaces, or editing tools",  color: "bg-banana-50"  },
            { icon: "4", title: "Mixed media",     desc: "Projects that bring images, text, and audio together", color: "bg-vine-100"   },
          ].map((item) => (
            <div
              key={item.title}
              className={`hard-card p-4 ${item.color}`}
            >
              <div className="w-6 h-6 rounded-[3px] bg-studio-ink flex items-center justify-center font-mono font-bold text-[11px] text-banana-400 mb-1.5">{item.icon}</div>
              <div className="font-display font-semibold text-sm text-studio-ink mb-1">
                {item.title}
              </div>
              <div className="font-body text-xs text-studio-ink/70 leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility */}
      <div className="px-8 pb-8">
        <div className="bg-banana-200 hard-card p-4">
          <h3 className="font-display font-bold text-sm text-studio-ink mb-2">
            Who Can Participate
          </h3>
          <ul className="space-y-1.5">
            {[
              "Open to anyone in any country: students, professionals, hobbyists",
              "Teams of 1 to 4 people",
              "Any skill level. First-timers especially welcome",
              "Must submit by Oct 11, 2026 at 11:59 PM AoE",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs font-body text-studio-ink/70">
                <span className="text-studio-ink mt-0.5 shrink-0 font-mono font-bold">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
