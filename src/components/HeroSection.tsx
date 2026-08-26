"use client";

import { useState, useEffect, useRef } from "react";
import BananaMascot from "@/components/svgs/BananaMascot";
import NeuralNetSVG  from "@/components/svgs/NeuralNetSVG";
import { PixelSparkle, LeafDecor, BrushStroke, PixelCluster } from "@/components/svgs/StudioDecorations";
import { BoltLineIcon, CapLineIcon, MedalLineIcon, GlobeLineIcon } from "@/components/svgs/DockIcons";
import type { ReactNode } from "react";

/* ─── Countdown ────────────────────────────────────────────── */
const HACKATHON_START = new Date("2026-10-10T00:00:00Z");

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


/* ─── useInView hook ───────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── FadeUp wrapper ───────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
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
      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-studio-ink/65 mt-0.5">{label}</span>
    </div>
  );
}

/* ─── Floating badge ───────────────────────────────────────── */
function Badge({ icon, text, className = "", color = "bg-banana-50 border-studio-ink/30 text-studio-ink" }: { icon: ReactNode; text: string; className?: string; color?: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border-[1.5px] border-studio-ink shadow-icon-sm text-[11px] font-mono font-bold uppercase tracking-[0.05em] ${color} ${className}`}>
      <span className="flex items-center shrink-0">{icon}</span>
      {text}
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
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth">
      <div className="flex min-h-full">

        {/* ════════════════════════════════════════════════════ */}
        {/* LEFT — scrollable content                           */}
        {/* ════════════════════════════════════════════════════ */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* ── Screen 1: above-fold hero ─────────────────── */}
          <div className="flex flex-col justify-center px-5 sm:px-8 md:px-12 py-8 relative z-10" style={{ minHeight: "calc(100dvh - 80px)" }}>

            {/* Event badge */}
            <div className="flex items-center gap-2 mb-5">
              <div className="inline-flex items-center bg-banana-400 border-[1.5px] border-studio-ink shadow-icon-sm">
                <span className="px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-studio-ink">
                  Oct 9–12, 2026
                </span>
                <span className="px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-banana-400 bg-studio-ink">
                  International · Free
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-2">
              {/* h2, not h1: the page's single H1 is the keyword-bearing one in
                  SeoContent, which comes first in the DOM. */}
              <h2 className="font-display font-extrabold leading-[0.92] text-studio-ink" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}>
                Build the<br />
                <span className="banana-gradient-text">Unseen.</span>
              </h2>
            </div>

            <BrushStroke color="#FDD835" width={160} className="mb-4 opacity-60" />

            {/* Subtext */}
            <p className="font-body text-base text-studio-ink/75 leading-relaxed max-w-md mb-6">
              An international weekend hackathon dedicated to{" "}
              <strong className="text-studio-ink font-semibold">generative AI</strong> and{" "}
              <strong className="text-studio-ink font-semibold">image creation</strong>.
              Hack from any country — sketch prompts, train models, ship creative tools.
            </p>

            {/* Countdown */}
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
              <div className="flex items-center gap-3 bg-banana-200 hard-card px-4 py-3">
                <CountCell n={d} label="days"  />
                <span className="font-mono font-bold text-xl text-studio-ink/65 leading-none">:</span>
                <CountCell n={h} label="hours" />
                <span className="font-mono font-bold text-xl text-studio-ink/65 leading-none">:</span>
                <CountCell n={m} label="min"   />
                <span className="font-mono font-bold text-xl text-studio-ink/65 leading-none">:</span>
                <CountCell n={s} label="sec"   />
              </div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-studio-ink/65">until hacking begins</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => onOpenWindow("apply")}
                className="px-6 py-3 rounded-[6px] font-display font-bold text-base bg-banana-400 text-studio-ink border-[1.5px] border-studio-ink shadow-icon press"
              >
                Apply Now
              </button>
              <button
                onClick={() => onOpenWindow("sketch")}
                className="px-6 py-3 rounded-[6px] font-display font-bold text-base bg-banana-50 text-studio-ink border-[1.5px] border-studio-ink shadow-icon press"
              >
                Try AI Studio
              </button>
            </div>

            {/* Scroll cue */}
            <div className="flex justify-center" style={{ maxWidth: "28rem" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#191A17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-scroll-cue" style={{ opacity: 0.65 }}>
                <line x1="12" y1="4" x2="12" y2="18" />
                <polyline points="6 12 12 18 18 12" />
              </svg>
            </div>
          </div>

          {/* ── Screen 2: quick facts ─────────────────────── */}
          <div className="px-5 sm:px-8 md:px-12 py-16 border-t-[1.5px] border-studio-ink/25">
            <FadeUp>
              <p className="eyebrow mb-1">The Basics</p>
              <h2 className="font-display font-extrabold text-2xl text-studio-ink mb-6">What is Banana Hacks?</h2>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mb-8">
              {[
                { title: "Weekend Sprint", body: "Hack from Oct 9–12. Build, iterate, and ship something real in a weekend.", color: "bg-banana-300" },
                { title: "Gen AI Theme", body: "All tracks center on generative AI — images, models, and creative tools.", color: "bg-vine-200" },
                { title: "Every Timezone", body: "International and fully online. Async-friendly, with workshops replayed for every region.", color: "bg-banana-50" },
              ].map((f, i) => (
                <FadeUp key={f.title} delay={i * 80}>
                  <div className={`hard-card p-4 h-full ${f.color}`}>
                    <div className="font-display font-bold text-sm text-studio-ink mb-1">{f.title}</div>
                    <div className="font-body text-[11px] text-studio-ink/70 leading-relaxed">{f.body}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* ── Screen 3: tracks + closing CTA ───────────── */}
          <div className="px-5 sm:px-8 md:px-12 py-12 pb-16 border-t-[1.5px] border-studio-ink/25">
            <FadeUp>
              <p className="eyebrow mb-1">What you&apos;ll build</p>
              <h2 className="font-display font-extrabold text-2xl text-studio-ink mb-6">All About Image AI</h2>
            </FadeUp>

            <div className="flex flex-col gap-3 max-w-md mb-10">
              {[
                { title: "Text-to-Image", desc: "Prompt-driven generation, inpainting, style transfer", color: "bg-banana-300" },
                { title: "Fine-tuning",   desc: "LoRA, DreamBooth, ControlNet adapters",              color: "bg-vine-200"   },
                { title: "Creative Tools", desc: "AI-assisted apps, prompt UIs, workflows",           color: "bg-banana-50"  },
              ].map((t, i) => (
                <FadeUp key={t.title} delay={i * 90}>
                  <div className={`flex items-baseline gap-3 px-4 py-3 hard-card-sm ${t.color}`}>
                    <span className="font-mono text-[11px] font-bold text-studio-ink/70 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-display font-semibold text-sm text-studio-ink">{t.title}</div>
                      <div className="font-body text-[11px] text-studio-ink/70">{t.desc}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={120}>
              <button
                onClick={() => onOpenWindow("apply")}
                className="px-6 py-3 rounded-[6px] font-display font-bold text-base bg-banana-400 text-studio-ink border-[1.5px] border-studio-ink shadow-icon press"
              >
                Apply Now — it&apos;s free
              </button>
            </FadeUp>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════ */}
        {/* RIGHT — sticky illustration                         */}
        {/* ════════════════════════════════════════════════════ */}
        <div
          className="sticky top-0 self-start shrink-0 relative hidden md:flex items-center justify-center overflow-hidden"
          style={{ width: "38%", height: "calc(100dvh - 80px)" }}
        >
          {/* Flat plate. Was a three-stop gradient card with an inset
              highlight and two bloom shadows — the stock "hero glass"
              treatment. Now it's a piece of tinted paper on the grid. */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "28px 20px",
              borderRadius: "8px",
              background: "#FFF6D6",
              border: "1.5px solid #191A17",
              boxShadow: "6px 6px 0 rgba(25,26,23,0.85)",
            }}
          />

          {/* Neural net */}
          <div className="absolute top-6 right-6 opacity-45">
            <NeuralNetSVG size={150} animated />
          </div>

          {/* Stat badges. Pinned, not bobbing — five independently
              floating chips is the single loudest "generated" cue on a
              hero, and it makes the numbers hard to read. */}
          <Badge icon={<BoltLineIcon size={14} />}  text="GPU Credits"   className="absolute top-8  left-6"      color="bg-banana-400 text-studio-ink" />
          <Badge icon={<CapLineIcon size={14} />}   text="Workshops"     className="absolute top-28 right-2"     color="bg-vine-200 text-studio-ink" />
          <Badge icon={<MedalLineIcon size={14} />} text="$10K Prizes"   className="absolute bottom-28 left-4"   color="bg-studio-ripe text-banana-50" />
          <Badge icon={<GlobeLineIcon size={14} />} text="60+ countries" className="absolute bottom-12 right-6"  color="bg-banana-50 text-studio-ink" />

          {/* Decorative clusters */}
          <PixelCluster className="absolute top-16 left-16 opacity-55" size={48} />
          <PixelCluster className="absolute bottom-20 right-16 opacity-45" size={40} />
          <PixelSparkle className="absolute top-48 left-8 opacity-75" size={20} color="#FDD835" />
          <PixelSparkle className="absolute bottom-36 right-12 opacity-65" size={16} color="#2C7466" />
          <LeafDecor    className="absolute bottom-8 left-8 opacity-40" size={42} />

          {/* Main mascot — the one thing on this panel that moves. */}
          <div className="relative z-10 animate-float-hero">
            <BananaMascot size={180} variant="painting" />
          </div>

          {/* Sponsor strip */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
            <a
              href="https://codecrafters.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-studio-ink/75 hover:text-vine-600 underline decoration-studio-ink/25 underline-offset-2 whitespace-nowrap transition-colors"
            >
              CodeCrafters
            </a>
            <span className="text-studio-ink/65">·</span>
            <a
              href="https://www.interviewcake.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-studio-ink/75 hover:text-vine-600 underline decoration-studio-ink/25 underline-offset-2 whitespace-nowrap transition-colors"
            >
              Interview Cake
            </a>
            <span className="text-studio-ink/65">·</span>
            <a
              href="https://gen.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-studio-ink/75 hover:text-vine-600 underline decoration-studio-ink/25 underline-offset-2 whitespace-nowrap transition-colors"
            >
              XYZ
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
