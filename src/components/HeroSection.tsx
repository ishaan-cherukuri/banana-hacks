"use client";

import { useState, useEffect } from "react";
import BananaMascot from "@/components/svgs/BananaMascot";
import NeuralNetSVG  from "@/components/svgs/NeuralNetSVG";
import { PixelSparkle, LeafDecor, BrushStroke, PixelCluster } from "@/components/svgs/StudioDecorations";

/* ─── Countdown ────────────────────────────────────────────── */
const HACKATHON_START = new Date("2026-10-09T00:00:00Z");

function useCountdown() {
  const calc = () => {
    const diff = HACKATHON_START.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const s = Math.floor(diff / 1000);
    return {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60,
    };
  };
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return t;
}

/* ─── Track cards data ─────────────────────────────────────── */
const TRACKS = [
  {
    icon: "🖼️",
    title: "Image Generation",
    desc: "Text-to-image, inpainting, style transfer",
    color: "bg-banana-400/15 border-banana-400/40",
    dot: "#FDD835",
  },
  {
    icon: "🤖",
    title: "Model Fine-tuning",
    desc: "LoRA, DreamBooth, ControlNet adapters",
    color: "bg-peri-100 border-peri-300/60",
    dot: "#4C6EF5",
  },
  {
    icon: "🎨",
    title: "Creative Tools",
    desc: "AI-assisted apps, prompt UIs, workflows",
    color: "bg-studio-ripe/10 border-studio-ripe/30",
    dot: "#FF6B35",
  },
];

/* ─── Stat tiles ───────────────────────────────────────────── */
const STATS = [
  { n: "7",    label: "Day Sprint",   sub: "Oct 9–16"    },
  { n: "$10K", label: "In Prizes",    sub: "cash + credits" },
  { n: "500+", label: "Participants", sub: "worldwide"   },
  { n: "∞",    label: "Creativity",   sub: "no limits"   },
];

/* ─── Floating badge ───────────────────────────────────────── */
function Badge({ emoji, text, className = "" }: { emoji: string; text: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 border border-studio-ink/10 shadow-icon text-xs font-display font-semibold text-studio-ink/80 ${className}`}>
      <span>{emoji}</span>
      {text}
    </div>
  );
}

/* ─── Countdown cell ───────────────────────────────────────── */
function CountCell({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        suppressHydrationWarning
        className="font-display font-extrabold text-2xl leading-none text-studio-ink tabular-nums"
      >
        {String(n).padStart(2, "0")}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-wider text-studio-ink/40 mt-0.5">{label}</span>
    </div>
  );
}

/* ─── Main hero ────────────────────────────────────────────── */
interface HeroSectionProps {
  onOpenWindow: (id: string) => void;
}

export default function HeroSection({ onOpenWindow }: HeroSectionProps) {
  const { d, h, m, s } = useCountdown();

  return (
    <div className="absolute inset-0 flex overflow-hidden">

      {/* ══════════════════════════════════════════════════════ */}
      {/* LEFT — content column                                  */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col justify-center px-12 py-8 min-w-0 relative z-10">

        {/* Event badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-banana-400/20 border border-banana-400/50">
            <div className="w-1.5 h-1.5 rounded-full bg-studio-leaf animate-pulse" />
            <span className="font-mono text-xs font-semibold text-banana-800">Oct 9–16, 2026  ·  Virtual  ·  Free</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-2">
          <h1 className="font-display font-extrabold leading-[0.92] text-studio-ink select-text" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}>
            Build the<br />
            <span className="banana-gradient-text">Unseen.</span>
          </h1>
        </div>

        <BrushStroke color="#FDD835" width={160} className="mb-4 opacity-60" />

        {/* Subtext */}
        <p className="font-body text-base text-studio-ink/60 leading-relaxed max-w-md mb-6">
          A week-long virtual hackathon dedicated to{" "}
          <strong className="text-studio-ink font-semibold">generative AI</strong> and{" "}
          <strong className="text-studio-ink font-semibold">image creation</strong>.
          Sketch prompts, train diffusion models, ship creative tools — and make something
          the world hasn&apos;t seen yet.
        </p>

        {/* Countdown */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white/70 border border-studio-ink/10 rounded-2xl px-4 py-3 shadow-icon">
            <CountCell n={d} label="days"  />
            <span className="font-display font-black text-xl text-studio-ink/30 leading-none">:</span>
            <CountCell n={h} label="hours" />
            <span className="font-display font-black text-xl text-studio-ink/30 leading-none">:</span>
            <CountCell n={m} label="min"   />
            <span className="font-display font-black text-xl text-studio-ink/30 leading-none">:</span>
            <CountCell n={s} label="sec"   />
          </div>
          <span className="text-xs font-mono text-studio-ink/40">until hacking begins</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => onOpenWindow("apply")}
            className="px-6 py-3 rounded-xl font-display font-bold text-base bg-banana-400 text-studio-ink hover:bg-banana-500 active:scale-[0.97] transition-all shadow-icon hover:shadow-window-focus"
          >
            Apply Now 🍌
          </button>
          <button
            onClick={() => onOpenWindow("sketch")}
            className="px-6 py-3 rounded-xl font-display font-bold text-base bg-white border border-studio-ink/12 text-studio-ink hover:border-banana-400/60 hover:bg-banana-50 active:scale-[0.97] transition-all shadow-icon"
          >
            ✨ Try AI Studio
          </button>
          <button
            onClick={() => onOpenWindow("about")}
            className="px-6 py-3 rounded-xl font-display font-semibold text-base text-studio-ink/60 hover:text-studio-ink hover:bg-white/60 active:scale-[0.97] transition-all"
          >
            Learn More →
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 flex-wrap mb-8">
          {STATS.map((st) => (
            <div key={st.label} className="flex flex-col">
              <span className="font-display font-extrabold text-xl text-studio-ink leading-none">{st.n}</span>
              <span className="font-body text-xs font-semibold text-studio-ink/70">{st.label}</span>
              <span className="font-mono text-[9px] text-studio-ink/40">{st.sub}</span>
            </div>
          ))}
        </div>

        {/* Track cards */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-studio-ink/40 mb-2">Featured Tracks</p>
          <div className="flex gap-3 flex-wrap">
            {TRACKS.map((track) => (
              <div
                key={track.title}
                className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl border ${track.color} cursor-default group transition-all hover:shadow-icon`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-base shrink-0"
                  style={{ background: `${track.dot}22` }}
                >
                  {track.icon}
                </div>
                <div>
                  <div className="font-display font-semibold text-xs text-studio-ink">{track.title}</div>
                  <div className="font-body text-[10px] text-studio-ink/50">{track.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* RIGHT — illustration column                           */}
      {/* ══════════════════════════════════════════════════════ */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: "38%" }}
      >
        {/* Background blob */}
        <div
          className="absolute inset-6 rounded-3xl opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, #FDD835 0%, transparent 65%), radial-gradient(ellipse at 30% 70%, #BACBFF 0%, transparent 60%)",
          }}
        />

        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(26,26,46,0.3) 1px, transparent 0)", backgroundSize: "20px 20px" }}
        />

        {/* Neural net — top-right */}
        <div className="absolute top-6 right-6 opacity-40 animate-float-slow">
          <NeuralNetSVG size={150} animated />
        </div>

        {/* Floating badges */}
        <Badge emoji="⚡" text="GPU Credits"   className="absolute top-8  left-6  animate-float"      />
        <Badge emoji="🎓" text="Workshops"     className="absolute top-28 right-2 animate-float-slow" />
        <Badge emoji="🏆" text="$10K Prizes"   className="absolute bottom-28 left-4  animate-float-d2"  />
        <Badge emoji="🌍" text="500+ builders" className="absolute bottom-12 right-6 animate-float"    />

        {/* Decorative clusters */}
        <PixelCluster className="absolute top-16 left-16 opacity-50" size={48} />
        <PixelCluster className="absolute bottom-20 right-16 opacity-40" size={40} />
        <PixelSparkle className="absolute top-48 left-8 opacity-70 animate-float-d2" size={20} color="#FDD835" />
        <PixelSparkle className="absolute bottom-36 right-12 opacity-60 animate-float" size={16} color="#4C6EF5" />
        <LeafDecor    className="absolute bottom-8 left-8 opacity-35 animate-float-slow" size={42} />

        {/* Main mascot */}
        <div className="relative z-10 animate-float">
          <BananaMascot size={180} variant="painting" />
        </div>

        {/* Sponsor micro-strip at bottom */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 opacity-50">
          {["Replicate ⚡", "Modal 🔁", "Hugging Face 🤗", "AWS ☁️"].map((s) => (
            <span key={s} className="font-mono text-[9px] text-studio-ink/60 whitespace-nowrap">{s}</span>
          ))}
        </div>
      </div>

      {/* ── Desktop icon column (far right, always visible) ─── */}
      {/* Rendered by parent Desktop.tsx */}
    </div>
  );
}
