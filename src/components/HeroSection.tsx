"use client";

import { useState, useEffect, useRef } from "react";
import BananaMascot from "@/components/svgs/BananaMascot";
import NeuralNetSVG  from "@/components/svgs/NeuralNetSVG";
import { PixelSparkle, BrushStroke } from "@/components/svgs/StudioDecorations";
import { PeopleLineIcon, CapLineIcon, MedalLineIcon, GlobeLineIcon } from "@/components/svgs/DockIcons";
import { siteConfig } from "@/lib/site";
import { SPONSORS } from "@/lib/content";
import type { ReactNode } from "react";

/* ─── Countdown ────────────────────────────────────────────── */
/*
  Three states, not one. The old hook returned {0,0,0,0} both before hydration
  and forever after the start date, so the server HTML shipped a literal
  00:00:00:00 and the hero would have read "00:00:00:00 until hacking begins"
  every day from Oct 10 onwards. See AUDIT.md, suspected issue 1.
*/
const HACKATHON_START = new Date(siteConfig.startDate);
const HACKATHON_END = new Date(siteConfig.endDate);

type Phase = "pending" | "before" | "during" | "after";

interface Countdown {
  phase: Phase;
  d: number;
  h: number;
  m: number;
  s: number;
}

function useCountdown(): Countdown {
  const calc = (): Countdown => {
    const now = Date.now();
    if (now >= HACKATHON_END.getTime()) return { phase: "after", d: 0, h: 0, m: 0, s: 0 };
    if (now >= HACKATHON_START.getTime()) return { phase: "during", d: 0, h: 0, m: 0, s: 0 };
    const sec = Math.floor((HACKATHON_START.getTime() - now) / 1000);
    return {
      phase: "before",
      d: Math.floor(sec / 86400),
      h: Math.floor((sec % 86400) / 3600),
      m: Math.floor((sec % 3600) / 60),
      s: sec % 60,
    };
  };

  // "pending" is the pre-hydration state. The server can't know the client's
  // clock, so rather than render zeros it renders the date, and the digits
  // appear once we're mounted. No dead placeholder is ever painted.
  const [t, setT] = useState<Countdown>({ phase: "pending", d: 0, h: 0, m: 0, s: 0 });

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
  const { phase, d, h, m, s } = useCountdown();

  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth">
      <div className="flex min-h-full">

        {/* ════════════════════════════════════════════════════ */}
        {/* LEFT, scrollable content                           */}
        {/* ════════════════════════════════════════════════════ */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* ── Screen 1: above-fold hero ─────────────────── */}
          {/* pb clears the fixed dock, at 360 the sponsor row sat underneath it. */}
          <div
            className="flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 relative z-10"
            style={{
              minHeight: "calc(100dvh - 80px)",
              paddingBottom: "calc(90px + env(safe-area-inset-bottom))",
            }}
          >

            {/* Event badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex flex-wrap items-center bg-banana-400 border-[1.5px] border-studio-ink shadow-icon-sm">
                <span className="px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-studio-ink">
                  Oct 9-12, 2026
                </span>
                <span className="px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-banana-400 bg-studio-ink">
                  International · Free
                </span>
              </div>
              <span className="px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-studio-ink bg-banana-50 border-[1.5px] border-studio-ink shadow-icon-sm">
                {siteConfig.registrationCount} registered
              </span>
            </div>

            {/* Headline */}
            <div className="mb-2">
              {/* h2, not h1: the page's single H1 is the keyword-bearing one in
                  SeoContent, which comes first in the DOM. */}
              <h2 className="font-display font-extrabold leading-[0.92] text-studio-ink" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}>
                Build something<br />
                <span className="banana-gradient-text">worth showing off.</span>
              </h2>
            </div>

            <BrushStroke color="#FDD835" width={160} className="mb-4 opacity-60" />

            {/* Subtext */}
            <p className="font-body text-base text-studio-ink/75 leading-relaxed max-w-md mb-5">
              Spend a long weekend building with{" "}
              <strong className="text-studio-ink font-semibold">generative AI</strong>.
              Make an image tool, fine-tune a model, or try an idea that has
              been sitting in your notes. It&apos;s free and fully online.
            </p>

            {/* Countdown */}
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2 sm:gap-4 mb-5">
              {phase === "before" ? (
                <>
                  <div className="flex items-center gap-3 bg-banana-200 hard-card px-4 py-3">
                    <CountCell n={d} label="days"  />
                    <span className="font-mono font-bold text-xl text-studio-ink/65 leading-none">:</span>
                    <CountCell n={h} label="hours" />
                    <span className="font-mono font-bold text-xl text-studio-ink/65 leading-none">:</span>
                    <CountCell n={m} label="min"   />
                    <span className="font-mono font-bold text-xl text-studio-ink/65 leading-none">:</span>
                    <CountCell n={s} label="sec"   />
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-studio-ink/70">
                    until hacking begins
                  </span>
                </>
              ) : phase === "during" ? (
                <div className="flex items-center gap-2.5 bg-studio-leaf hard-card px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-banana-400 animate-pulse" aria-hidden="true" />
                  <span className="font-display font-extrabold text-base text-banana-50">
                    Hacking is live right now
                  </span>
                </div>
              ) : phase === "after" ? (
                <div className="bg-banana-200 hard-card px-4 py-3">
                  <span className="font-display font-extrabold text-base text-studio-ink">
                    That&apos;s a wrap on Banana Hacks 2026
                  </span>
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-studio-ink/70 mt-0.5">
                    Thanks to everyone who built with us
                  </span>
                </div>
              ) : (
                /* Pre-hydration: the dates, never a row of zeros. */
                <div className="bg-banana-200 hard-card px-4 py-3">
                  <span className="font-display font-extrabold text-base text-studio-ink">
                    {siteConfig.dateRangeLabel}
                  </span>
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-studio-ink/70 mt-0.5">
                    Free · fully online
                  </span>
                </div>
              )}
            </div>

            {/* CTAs, one primary. These were two identically-weighted
                buttons separated only by fill colour. Elevation now carries
                priority: primary sits on a shadow, secondary sits flat.
                See DESIGN-SYSTEM.md §3. */}
            {/*
              Once the event is over, "Apply now" is a dead end, registration
              is closed and the window it opens can do nothing useful. The
              primary action follows the phase.
            */}
            <div className="flex flex-wrap gap-3 mb-5">
              {phase === "after" ? (
                <>
                  <button onClick={() => onOpenWindow("sketch")} className="btn-primary">
                    Try the AI Studio
                  </button>
                  <button onClick={() => onOpenWindow("info")} className="btn-secondary">
                    About Banana Hacks
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => onOpenWindow("apply")} className="btn-primary">
                    Register now, it&apos;s free
                  </button>
                  <button onClick={() => onOpenWindow("sketch")} className="btn-secondary">
                    Try the AI Studio
                  </button>
                </>
              )}
            </div>

            {/* Sponsors, above the fold. They previously sat at the bottom of
                the illustration panel, permanently clipped by the dock, so the
                homepage's only third-party credibility signal was invisible.
                See AUDIT.md L2. */}
            <div className="mb-6">
              <p className="eyebrow mb-2">Backed by</p>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {SPONSORS.map((sp) => (
                  <li key={sp.name}>
                    <a
                      href={sp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center min-h-[24px] min-w-[24px] font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-studio-ink/75 hover:text-vine-600 underline decoration-studio-ink/25 underline-offset-2 whitespace-nowrap transition-colors"
                    >
                      {sp.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scroll cue. Was centred inside a stray 28rem box, which put it
                at no meaningful x, it now sits on the content's left rail. */}
            <div className="hidden sm:flex justify-start">
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
              <h2 className="font-display font-extrabold text-2xl text-studio-ink mb-6">A weekend to make the thing</h2>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mb-8">
              {[
                { title: "Four days", body: "We kick off Friday night and wrap with demos and awards on Monday.", color: "bg-banana-300" },
                { title: "One broad theme", body: "Build anything around generative AI, images, or the tools people use to make them.", color: "bg-vine-200" },
                { title: "Join from home", body: "Everything is online, and workshops are recorded for people in other time zones.", color: "bg-banana-50" },
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
              <h2 className="font-display font-extrabold text-2xl text-studio-ink mb-6">Pick a starting point</h2>
            </FadeUp>

            <div className="flex flex-col gap-3 max-w-md mb-10">
              {[
                { title: "Generate images", desc: "Text-to-image, inpainting, or style transfer", color: "bg-banana-300" },
                { title: "Tune a model",   desc: "LoRA, DreamBooth, or ControlNet",               color: "bg-vine-200"   },
                { title: "Make a tool", desc: "Drawing apps, prompt interfaces, or new workflows", color: "bg-banana-50"  },
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
                onClick={() => onOpenWindow(phase === "after" ? "info" : "apply")}
                className="btn-primary"
              >
                {phase === "after" ? "See what got built" : "Register now, it\u2019s free"}
              </button>
            </FadeUp>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════ */}
        {/* RIGHT, sticky illustration                         */}
        {/* ════════════════════════════════════════════════════ */}
        {/*
          lg:, not md:. At 768 this panel is ~292px, too narrow for the
          mascot, four badges and the neural net, which is why the badges
          collided with the plate worst at that width. See AUDIT.md L3.
        */}
        <div
          className="sticky top-0 self-start shrink-0 relative hidden lg:flex items-center justify-center overflow-hidden"
          style={{ width: "38%", height: "calc(100dvh - 80px)" }}
          aria-hidden="true"
        >
          {/*
            The plate is now a positioning context, so the badges sit inside
            it. They used to be positioned against the panel while the plate
            was inset 28px/20px, so every badge cut across the plate's ink
            border at every desktop width. See AUDIT.md L1.
          */}
          {/*
            Capped and centred rather than stretched to the full column height.
            At 1440 the plate was ~500x780 around a 190px mascot, a large
            empty rectangle with four badges stranded in its corners. A
            bounded box puts the badges back in relation to the mascot.
          */}
          <div
            className="absolute left-5 right-5 top-1/2 -translate-y-1/2"
            style={{
              height: "min(calc(100dvh - 140px), 620px)",
              borderRadius: "8px",
              background: "#FFF6D6",
              border: "1.5px solid #191A17",
              boxShadow: "6px 6px 0 rgba(25,26,23,0.85)",
            }}
          >
            {/* Neural net, clipped to the plate rather than overflowing it. */}
            <div className="absolute top-5 right-5 opacity-40 overflow-hidden">
              <NeuralNetSVG size={130} animated />
            </div>

            {/* Four facts, inset from the plate edge. Pinned, not bobbing. */}
            <Badge icon={<PeopleLineIcon size={14} />} text={`${siteConfig.registrationCount} registered`} className="absolute top-5 left-5" color="bg-banana-400 text-studio-ink" />
            <Badge icon={<CapLineIcon size={14} />}   text="Workshops"     className="absolute top-16 right-5"      color="bg-vine-200 text-studio-ink" />
            <Badge icon={<MedalLineIcon size={14} />} text="$10K Prizes"   className="absolute bottom-16 left-5"    color="bg-studio-ripe text-banana-50" />
            <Badge icon={<GlobeLineIcon size={14} />} text="60+ countries" className="absolute bottom-5 right-5"    color="bg-banana-50 text-studio-ink" />

            {/*
              One ornament, not six. This panel carried two PixelClusters, two
              PixelSparkles and a LeafDecor on top of the mascot and the net , 
              enough scattered decoration to read as noise rather than craft.
              Chanel's rule: take one thing off. See AUDIT.md §6.
            */}
            <PixelSparkle className="absolute top-1/3 left-6 opacity-70" size={20} color="#FDD835" />

            {/* The mascot is the one thing on this panel that moves. */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-float-hero">
                <BananaMascot size={200} variant="painting" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
