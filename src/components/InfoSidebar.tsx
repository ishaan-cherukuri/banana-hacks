"use client";

import { useState, useEffect } from "react";

const HACKATHON_START = new Date("2026-10-09T00:00:00Z");
const REG_CLOSE      = new Date("2026-10-08T23:59:00Z");

function useDaysLeft() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const calc = () => {
      const diff = HACKATHON_START.getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(diff / 86_400_000)));
    };
    calc();
    const id = setInterval(calc, 60_000);
    return () => clearInterval(id);
  }, []);
  return days;
}

const FACTS = [
  { icon: "📅", label: "Dates",   value: "Oct 9–16, 2026" },
  { icon: "🌐", label: "Format",  value: "100% Virtual"   },
  { icon: "👥", label: "Teams",   value: "1–4 people"     },
  { icon: "🆓", label: "Cost",    value: "Free to enter"  },
  { icon: "🏆", label: "Prizes",  value: "$10K+ total"    },
  { icon: "🤖", label: "Theme",   value: "Generative AI"  },
];

const SOCIALS = [
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
      </svg>
    ),
    color: "hover:bg-[#5865F2]/15 hover:text-[#5865F2]",
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "hover:bg-studio-ink/08 hover:text-studio-ink",
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: "hover:bg-studio-ink/08 hover:text-studio-ink",
  },
];

interface InfoSidebarProps {
  onOpenWindow: (id: string) => void;
}

export default function InfoSidebar({ onOpenWindow }: InfoSidebarProps) {
  const days = useDaysLeft();
  const regOpen = Date.now() < REG_CLOSE.getTime();

  return (
    <aside className="flex flex-col h-full py-4 px-3 gap-4 overflow-y-auto" style={{ width: 168 }}>

      {/* ── Registration status ──────────────────────────────── */}
      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold ${regOpen ? "bg-studio-leaf/12 text-studio-leaf border border-studio-leaf/25" : "bg-red-50 text-red-500 border border-red-200"}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${regOpen ? "bg-studio-leaf animate-pulse" : "bg-red-400"}`} />
        {regOpen ? "REG OPEN" : "REG CLOSED"}
      </div>

      {/* ── Days countdown ───────────────────────────────────── */}
      <div className="bg-white/70 border border-studio-ink/08 rounded-2xl p-4 text-center shadow-icon">
        <span
          suppressHydrationWarning
          className="font-display font-extrabold text-5xl leading-none text-studio-ink block"
        >
          {days}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-studio-ink/40 mt-1 block">
          days to go
        </span>
        <div className="mt-3 h-1.5 rounded-full bg-banana-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-banana-400 transition-all"
            style={{ width: `${Math.max(4, Math.min(100, 100 - (days / 365) * 100))}%` }}
          />
        </div>
      </div>

      {/* ── Apply CTA ────────────────────────────────────────── */}
      <button
        onClick={() => onOpenWindow("apply")}
        className="w-full py-2.5 rounded-xl font-display font-bold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 active:scale-95 transition-all shadow-icon"
      >
        Apply Now 🍌
      </button>

      {/* ── Key facts ────────────────────────────────────────── */}
      <div className="bg-white/50 border border-studio-ink/07 rounded-2xl overflow-hidden">
        {FACTS.map((f, i) => (
          <div
            key={f.label}
            className={`flex items-center gap-2.5 px-3 py-2 ${i < FACTS.length - 1 ? "border-b border-studio-ink/05" : ""}`}
          >
            <span className="text-sm shrink-0">{f.icon}</span>
            <div className="min-w-0">
              <div className="font-mono text-[9px] uppercase tracking-wider text-studio-ink/35 leading-none">
                {f.label}
              </div>
              <div className="font-body text-[11px] font-semibold text-studio-ink/80 leading-tight mt-0.5 truncate">
                {f.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Social links ─────────────────────────────────────── */}
      <div>
        <p className="font-mono text-[9px] uppercase tracking-widest text-studio-ink/30 mb-2 px-0.5">
          Community
        </p>
        <div className="flex flex-col gap-1.5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-studio-ink/50 transition-all ${s.color} border border-transparent hover:border-studio-ink/08`}
            >
              {s.icon}
              <span className="font-body text-xs font-medium">{s.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── MLH trust badge placeholder ──────────────────────── */}
      <div className="mt-auto pt-2 border-t border-studio-ink/07">
        <div className="flex items-center gap-2 px-1">
          <div className="w-6 h-8 rounded bg-studio-ink/08 flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-studio-ink/40">MLH</span>
          </div>
          <span className="font-mono text-[9px] text-studio-ink/30 leading-tight">
            MLH Member<br />Event 2026
          </span>
        </div>
      </div>
    </aside>
  );
}
