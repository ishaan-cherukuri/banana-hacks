"use client";

import { useState, useCallback, useRef } from "react";
import MenuBar      from "@/components/MenuBar";
import Window       from "@/components/Window";
import HeroSection  from "@/components/HeroSection";
import AboutPanel    from "@/components/panels/AboutPanel";
import SchedulePanel from "@/components/panels/SchedulePanel";
import FAQPanel      from "@/components/panels/FAQPanel";
import PrizesPanel   from "@/components/panels/PrizesPanel";
import ApplyPanel    from "@/components/panels/ApplyPanel";
import SponsorsPanel from "@/components/panels/SponsorsPanel";
import SketchPanel   from "@/components/panels/SketchPanel";
import { DOCK_ICON_MAP, ApplyLineIcon } from "@/components/svgs/DockIcons";

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
    <div className="h-[100dvh] w-screen overflow-hidden relative desktop-wallpaper">

      {/* Menu bar */}
      <MenuBar onOpenWindow={openWindow} onGoHome={goHome} />

      {/* Desktop surface */}
      <div
        className="absolute"
        style={{ top: 36, left: 0, right: 0, bottom: 52 }}
      >
        {showHero && <HeroSection onOpenWindow={openWindow} />}

        {/* Windows */}
        {openWindows.map((win) => {
          const def = WINDOW_DEFS.find((d) => d.id === win.id);
          if (!def) return null;
          const Panel = def.component;
          const TitleIcon = DOCK_ICON_MAP[win.id];
          return (
            <Window
              key={win.id}
              id={win.id}
              title={def.title}
              icon={TitleIcon ? <TitleIcon size={16} /> : undefined}
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
        className="fixed bottom-0 flex justify-center items-end overflow-x-auto"
        style={{ left: 0, right: 0, zIndex: 9000, paddingBottom: "calc(6px + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 backdrop-blur-md border border-banana-400/35 rounded-2xl shadow-window mb-1 mx-auto shrink-0" style={{ background: "linear-gradient(90deg, rgba(255,251,240,0.92) 0%, rgba(253,216,53,0.18) 50%, rgba(255,251,240,0.92) 100%)" }}>
          {DESKTOP_ICONS.map((icon) => {
            const isOpen = openWindows.some((w) => w.id === icon.id);
            const IconWidget = DOCK_ICON_MAP[icon.id];
            return (
              <div key={icon.id} className="relative flex flex-col items-center gap-0.5 group/dock">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-studio-ink text-white text-[11px] font-display font-semibold whitespace-nowrap pointer-events-none opacity-0 group-hover/dock:opacity-100 transition-opacity duration-150 shadow-lg">
                  {icon.label}
                </div>
                <button
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-banana-300 border border-banana-400/40 flex items-center justify-center icon-tile hover:bg-banana-400 hover:border-banana-400/60 hover:shadow-icon active:scale-90 transition-all"
                  onClick={() => openWindow(icon.id)}
                >
                  {IconWidget ? <IconWidget size={26} /> : <span className="text-xl">{icon.icon}</span>}
                </button>
                {isOpen && <div className="w-1 h-1 rounded-full bg-studio-ink/40" />}
              </div>
            );
          })}
          <div className="w-px h-7 bg-studio-ink/10 mx-1" />
          <div className="relative flex flex-col items-center gap-0.5 group/dock">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-studio-ink text-white text-[11px] font-display font-semibold whitespace-nowrap pointer-events-none opacity-0 group-hover/dock:opacity-100 transition-opacity duration-150 shadow-lg">
              Apply Now
            </div>
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-banana-400 flex items-center justify-center icon-tile hover:bg-banana-500 hover:shadow-icon active:scale-90 transition-all"
              onClick={() => openWindow("apply")}
            >
              <ApplyLineIcon size={26} />
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
