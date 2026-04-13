"use client";

import { useState, useCallback, useRef } from "react";
import MenuBar      from "@/components/MenuBar";
import Toolbar      from "@/components/Toolbar";
import Window       from "@/components/Window";
import DesktopIcon  from "@/components/DesktopIcon";
import HeroSection  from "@/components/HeroSection";
import AboutPanel    from "@/components/panels/AboutPanel";
import SchedulePanel from "@/components/panels/SchedulePanel";
import FAQPanel      from "@/components/panels/FAQPanel";
import PrizesPanel   from "@/components/panels/PrizesPanel";
import ApplyPanel    from "@/components/panels/ApplyPanel";
import SponsorsPanel from "@/components/panels/SponsorsPanel";
import SketchPanel   from "@/components/panels/SketchPanel";

/* ─── Window registry ─────────────────────────────────────── */
interface WindowConfig {
  id: string;
  title: string;
  icon: string;
  w: number;
  h: number;
  component: React.ComponentType;
}

const WINDOW_DEFS: WindowConfig[] = [
  { id: "about",    title: "About.app",       icon: "🍌", w: 640, h: 520, component: AboutPanel    },
  { id: "schedule", title: "Schedule.ical",    icon: "📅", w: 620, h: 540, component: SchedulePanel },
  { id: "faq",      title: "FAQ.txt",          icon: "❓", w: 560, h: 500, component: FAQPanel      },
  { id: "prizes",   title: "Prizes.app",       icon: "🏆", w: 580, h: 520, component: PrizesPanel   },
  { id: "apply",    title: "Apply.exe",        icon: "📝", w: 520, h: 560, component: ApplyPanel    },
  { id: "sponsors", title: "Sponsors.pdf",     icon: "💛", w: 600, h: 500, component: SponsorsPanel },
  { id: "sketch",   title: "AI Studio.sketch", icon: "🎨", w: 740, h: 520, component: SketchPanel   },
];

const DESKTOP_ICONS = [
  { id: "about",    icon: "🍌", label: "About.app"  },
  { id: "sketch",   icon: "🎨", label: "AI Studio"  },
  { id: "schedule", icon: "📅", label: "Schedule"   },
  { id: "prizes",   icon: "🏆", label: "Prizes"     },
  { id: "apply",    icon: "📝", label: "Apply.exe"  },
  { id: "faq",      icon: "❓", label: "FAQ.txt"    },
  { id: "sponsors", icon: "💛", label: "Sponsors"   },
];

/* Cascade so every new window fans out instead of stacking */
const CASCADE_START = { x: 80, y: 56 };
const CASCADE_STEP  = 28;

interface OpenWindow {
  id: string;
  zIndex: number;
  x: number;
  y: number;
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const zCounter  = useRef(200);
  const openCount = useRef(0);

  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === id)) {
        return prev.map((w) => w.id === id ? { ...w, zIndex: ++zCounter.current } : w);
      }
      const cascade = openCount.current % 8;
      openCount.current += 1;
      return [
        ...prev,
        {
          id,
          zIndex: ++zCounter.current,
          x: CASCADE_START.x + cascade * CASCADE_STEP,
          y: CASCADE_START.y + cascade * CASCADE_STEP,
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => w.id === id ? { ...w, zIndex: ++zCounter.current } : w)
    );
  }, []);

  const showHero = openWindows.length === 0;

  return (
    <div className="h-screen w-screen overflow-hidden relative desktop-wallpaper">

      {/* ── Menu bar — always on top ──────────────────────────── */}
      <MenuBar onOpenWindow={openWindow} />

      {/* ── Left toolbar — always on top ─────────────────────── */}
      <Toolbar onOpenWindow={openWindow} />

      {/* ── Desktop surface (below menubar + toolbar) ─────────── */}
      <div
        className="absolute"
        style={{ top: 36, left: 52, right: 0, bottom: 52 }}
      >
        {/* Hero — shown when no windows are open */}
        {showHero && <HeroSection onOpenWindow={openWindow} />}

        {/* Desktop icon column — always visible in top-right */}
        <div
          className="absolute top-4 right-3 flex flex-col gap-2.5 z-20"
          style={{ pointerEvents: showHero ? "auto" : "auto" }}
        >
          {DESKTOP_ICONS.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              icon={icon.icon}
              label={icon.label}
              onOpen={openWindow}
            />
          ))}
        </div>

        {/* Open windows */}
        {openWindows.map((win) => {
          const def = WINDOW_DEFS.find((d) => d.id === win.id);
          if (!def) return null;
          const Panel = def.component;
          return (
            <Window
              key={win.id}
              id={win.id}
              title={def.title}
              icon={def.icon}
              initialX={win.x}
              initialY={win.y}
              initialW={def.w}
              initialH={def.h}
              zIndex={win.zIndex}
              onFocus={() => focusWindow(win.id)}
              onClose={() => closeWindow(win.id)}
            >
              <Panel />
            </Window>
          );
        })}
      </div>

      {/* ── Dock — pinned above everything ───────────────────── */}
      <div
        className="fixed bottom-0 flex justify-center items-end pb-1.5"
        style={{ left: 52, right: 0, zIndex: 9000 }}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-studio-ink/10 rounded-2xl shadow-window mb-1">
          {DESKTOP_ICONS.map((icon) => {
            const isOpen = openWindows.some((w) => w.id === icon.id);
            return (
              <div key={icon.id} className="relative flex flex-col items-center gap-0.5">
                <button
                  className="w-10 h-10 rounded-xl bg-white border border-studio-ink/08 flex items-center justify-center text-xl icon-tile hover:bg-banana-50 hover:border-banana-400/50 hover:shadow-icon active:scale-90 transition-all"
                  onClick={() => openWindow(icon.id)}
                  title={icon.label}
                >
                  {icon.icon}
                </button>
                {isOpen && <div className="w-1 h-1 rounded-full bg-studio-ink/40" />}
              </div>
            );
          })}
          <div className="w-px h-6 bg-studio-ink/10 mx-1" />
          <div className="relative flex flex-col items-center gap-0.5">
            <button
              className="w-10 h-10 rounded-xl bg-banana-400 flex items-center justify-center text-xl icon-tile hover:bg-banana-500 hover:shadow-icon active:scale-90 transition-all"
              onClick={() => openWindow("apply")}
              title="Apply Now"
            >
              📝
            </button>
            {openWindows.some((w) => w.id === "apply") && (
              <div className="w-1 h-1 rounded-full bg-studio-ink/40" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
