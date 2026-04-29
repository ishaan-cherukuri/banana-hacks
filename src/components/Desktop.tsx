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

interface WindowConfig {
  id: string;
  title: string;
  icon: string;
  w: number;
  h: number;
  component: React.ComponentType;
}

const WIN_W = 860;
const WIN_H = 580;

const WINDOW_DEFS: WindowConfig[] = [
  { id: "about",    title: "About",     icon: "🍌", w: WIN_W, h: WIN_H, component: AboutPanel    },
  { id: "schedule", title: "Schedule",  icon: "📅", w: WIN_W, h: WIN_H, component: SchedulePanel },
  { id: "faq",      title: "FAQ",       icon: "❓", w: WIN_W, h: WIN_H, component: FAQPanel      },
  { id: "prizes",   title: "Prizes",    icon: "🎖️", w: WIN_W, h: WIN_H, component: PrizesPanel   },
  { id: "apply",    title: "Apply",     icon: "📝", w: WIN_W, h: WIN_H, component: ApplyPanel    },
  { id: "sponsors", title: "Sponsors",  icon: "💛", w: WIN_W, h: WIN_H, component: SponsorsPanel },
  { id: "sketch",   title: "AI Studio", icon: "🎨", w: WIN_W, h: WIN_H, component: SketchPanel   },
];

const DESKTOP_ICONS = [
  { id: "about",    icon: "🍌", label: "About"     },
  { id: "sketch",   icon: "🎨", label: "AI Studio" },
  { id: "schedule", icon: "📅", label: "Schedule"  },
  { id: "prizes",   icon: "🎖️", label: "Prizes"    },
  { id: "apply",    icon: "📝", label: "Apply"     },
  { id: "faq",      icon: "❓", label: "FAQ"       },
  { id: "sponsors", icon: "💛", label: "Sponsors"  },
];

interface OpenWindow { id: string; zIndex: number; x: number; y: number; }

function topLeftPos() {
  // Position at top-left of desktop area (below menu bar, right of toolbar)
  return { x: 52, y: 36 };
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const zCounter = useRef(200);

  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === id)) {
        return prev.map((w) => w.id === id ? { ...w, zIndex: ++zCounter.current } : w);
      }
      const { x, y } = topLeftPos();
      return [...prev, { id, zIndex: ++zCounter.current, x, y }];
    });
  }, []);

  const goHome = useCallback(() => setOpenWindows([]), []);
  const closeWindow = useCallback((id: string) => setOpenWindows((p) => p.filter((w) => w.id !== id)), []);
  const focusWindow = useCallback((id: string) => setOpenWindows((p) => p.map((w) => w.id === id ? { ...w, zIndex: ++zCounter.current } : w)), []);

  const showHero = openWindows.length === 0;

  return (
    <div className="h-screen w-screen overflow-hidden relative desktop-wallpaper">

      {/* Menu bar */}
      <MenuBar onOpenWindow={openWindow} onGoHome={goHome} />

      {/* Left toolbar */}
      <Toolbar onOpenWindow={openWindow} />

      {/* Desktop surface */}
      <div
        className="absolute"
        style={{ top: 36, left: 52, right: 0, bottom: 52 }}
      >
        {showHero && <HeroSection onOpenWindow={openWindow} />}

        {/* Right-column desktop icons */}
        <div className="absolute top-4 right-3 flex flex-col gap-2.5 z-20">
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

        {/* Windows */}
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

      {/* Bottom dock */}
      <div
        className="fixed bottom-0 flex justify-center items-end pb-1.5"
        style={{ left: 52, right: 0, zIndex: 9000 }}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-md border border-banana-400/35 rounded-2xl shadow-window mb-1" style={{ background: "linear-gradient(90deg, rgba(255,251,240,0.92) 0%, rgba(253,216,53,0.18) 50%, rgba(255,251,240,0.92) 100%)" }}>
          {DESKTOP_ICONS.map((icon) => {
            const isOpen = openWindows.some((w) => w.id === icon.id);
            return (
              <div key={icon.id} className="relative flex flex-col items-center gap-0.5 group/dock">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-studio-ink text-white text-[11px] font-display font-semibold whitespace-nowrap pointer-events-none opacity-0 group-hover/dock:opacity-100 transition-opacity duration-150 shadow-lg">
                  {icon.label}
                </div>
                <button
                  className="w-10 h-10 rounded-xl bg-white border border-studio-ink/08 flex items-center justify-center text-xl icon-tile hover:bg-banana-50 hover:border-banana-400/50 hover:shadow-icon active:scale-90 transition-all"
                  onClick={() => openWindow(icon.id)}
                >
                  {icon.icon}
                </button>
                {isOpen && <div className="w-1 h-1 rounded-full bg-studio-ink/40" />}
              </div>
            );
          })}
          <div className="w-px h-6 bg-studio-ink/10 mx-1" />
          <div className="relative flex flex-col items-center gap-0.5 group/dock">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-studio-ink text-white text-[11px] font-display font-semibold whitespace-nowrap pointer-events-none opacity-0 group-hover/dock:opacity-100 transition-opacity duration-150 shadow-lg">
              Apply Now
            </div>
            <button
              className="w-10 h-10 rounded-xl bg-banana-400 flex items-center justify-center text-xl icon-tile hover:bg-banana-500 hover:shadow-icon active:scale-90 transition-all"
              onClick={() => openWindow("apply")}
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
