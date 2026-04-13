"use client";

import BananaMascot from "@/components/svgs/BananaMascot";
import NeuralNetSVG from "@/components/svgs/NeuralNetSVG";
import { PixelSparkle, BrushStroke, LeafDecor } from "@/components/svgs/StudioDecorations";

const STATS = [
  { value: "7",    label: "Days",     sub: "Oct 9–16" },
  { value: "∞",    label: "Tracks",   sub: "AI · Image · Creative" },
  { value: "$10K", label: "Prizes",   sub: "in cash & credits" },
  { value: "100%", label: "Virtual",  sub: "Join anywhere" },
];

export default function AboutPanel() {
  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {/* Hero section */}
      <div className="relative px-8 pt-8 pb-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-4 right-4 opacity-20">
          <NeuralNetSVG size={140} animated={false} />
        </div>
        <PixelSparkle className="absolute top-6 right-44 animate-float" size={20} color="#FDD835" />
        <PixelSparkle className="absolute bottom-8 right-20 animate-float-slow" size={16} color="#4C6EF5" />
        <LeafDecor className="absolute top-3 right-5 opacity-40 animate-float-d2" size={32} />

        {/* Mascot */}
        <div className="flex gap-6 items-start relative z-10">
          <div className="shrink-0 animate-float">
            <BananaMascot size={100} variant="painting" />
          </div>
          <div>
            <p className="text-xs font-mono font-medium text-banana-700 uppercase tracking-widest mb-1">
              Banana Hacks 2026
            </p>
            <h1 className="font-display font-extrabold text-3xl text-studio-ink leading-tight mb-2">
              Create the{" "}
              <span className="banana-gradient-text">Unseen</span>.
            </h1>
            <BrushStroke color="#FDD835" width={120} className="mb-3" />
            <p className="font-body text-studio-ink/70 text-sm leading-relaxed max-w-sm">
              A week-long virtual hackathon dedicated to generative AI and image
              creation. Sketch prompts, train diffusion models, build creative
              tools — then ship something the world hasn't seen yet.
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-8 pb-6">
        <div className="grid grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white/70 border border-banana-400/20 rounded-xl p-3 text-center hover:border-banana-400/50 hover:shadow-icon transition-all"
            >
              <div className="font-display font-extrabold text-2xl text-banana-600 mb-0.5">
                {s.value}
              </div>
              <div className="font-body font-semibold text-xs text-studio-ink">
                {s.label}
              </div>
              <div className="font-body text-[10px] text-studio-ink/50 mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What to build */}
      <div className="px-8 pb-6">
        <h2 className="font-display font-bold text-lg text-studio-ink mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-banana-400 flex items-center justify-center text-xs">🎨</span>
          What You'll Build
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "🖼️", title: "Image Generators",   desc: "Text-to-image tools, style transfer, inpainting systems" },
            { icon: "🤖", title: "AI Pipelines",        desc: "Fine-tuned diffusion models, LoRA adapters, controlnet workflows" },
            { icon: "✏️", title: "Creative Tools",      desc: "AI-assisted drawing apps, prompt engineering interfaces" },
            { icon: "🎭", title: "Multi-modal Apps",    desc: "Combine image + text + audio generation in novel ways" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/60 border border-studio-ink/06 rounded-xl p-4 hover:bg-white/90 hover:border-banana-400/30 transition-all group"
            >
              <div className="text-xl mb-1.5">{item.icon}</div>
              <div className="font-display font-semibold text-sm text-studio-ink mb-1">
                {item.title}
              </div>
              <div className="font-body text-xs text-studio-ink/55 leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility */}
      <div className="px-8 pb-8">
        <div className="bg-banana-400/12 border border-banana-400/30 rounded-xl p-4">
          <h3 className="font-display font-bold text-sm text-studio-ink mb-2">
            Who Can Participate
          </h3>
          <ul className="space-y-1.5">
            {[
              "Open to everyone, worldwide — students, professionals, hobbyists",
              "Teams of 1–4 people",
              "All skill levels welcome — first-timers encouraged",
              "Must submit by Oct 16, 2026 at 11:59 PM UTC",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs font-body text-studio-ink/70">
                <span className="text-banana-600 mt-0.5 shrink-0">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
