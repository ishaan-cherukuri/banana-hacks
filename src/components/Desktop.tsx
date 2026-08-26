"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
import InfoPanel     from "@/components/panels/InfoPanel";
import { DOCK_ICON_MAP, ApplyLineIcon } from "@/components/svgs/DockIcons";

interface WindowConfig {
  id: string;
  title: string;
  w: number;
  h: number;
  component: React.ComponentType;
}

const WIN_W = 860;
const WIN_H = 580;

const WINDOW_DEFS: WindowConfig[] = [
  { id: "about",    title: "About", w: WIN_W, h: WIN_H, component: AboutPanel    },
  { id: "schedule", title: "Schedule", w: WIN_W, h: WIN_H, component: SchedulePanel },
  { id: "faq",      title: "FAQ", w: WIN_W, h: WIN_H, component: FAQPanel      },
  { id: "prizes",   title: "Prizes", w: WIN_W, h: WIN_H, component: PrizesPanel   },
  { id: "apply",    title: "Apply", w: WIN_W, h: WIN_H, component: ApplyPanel    },
  { id: "sponsors", title: "Sponsors", w: WIN_W, h: WIN_H, component: SponsorsPanel },
  { id: "sketch",   title: "AI Studio", w: WIN_W, h: WIN_H, component: SketchPanel   },
  { id: "info",     title: "Get Info", w: 640,   h: 560,   component: InfoPanel     },
];

// Dock order. Icons come from DOCK_ICON_MAP — drawn marks, not emoji.
// Emoji are the fastest way to make a UI look auto-generated, and they
// render as a different typeface on every platform.
const DESKTOP_ICONS = [
  { id: "about",    label: "About"     },
  { id: "sketch",   label: "AI Studio" },
  { id: "schedule", label: "Schedule"  },
  { id: "prizes",   label: "Prizes"    },
  { id: "apply",    label: "Apply"     },
  { id: "faq",      label: "FAQ"       },
  { id: "sponsors", label: "Sponsors"  },
  { id: "info",     label: "Get Info"  },
];

interface OpenWindow { id: string; zIndex: number; x: number; y: number; minimized: boolean; }

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
        // Restore as well as raise. A minimized window is still in this list,
        // so without clearing the flag the dock icon looked live but did
        // nothing — see AUDIT.md C2.
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: ++zCounter.current, minimized: false } : w
        );
      }
      const { x, y } = topLeftPos();
      return [...prev, { id, zIndex: ++zCounter.current, x, y, minimized: false }];
    });
  }, []);

  const goHome = useCallback(() => setOpenWindows([]), []);
  const closeWindow = useCallback((id: string) => setOpenWindows((p) => p.filter((w) => w.id !== id)), []);
  const focusWindow = useCallback((id: string) => setOpenWindows((p) => p.map((w) => w.id === id ? { ...w, zIndex: ++zCounter.current } : w)), []);
  const minimizeWindow = useCallback((id: string) => setOpenWindows((p) => p.map((w) => w.id === id ? { ...w, minimized: true } : w)), []);

  // Deep link support: /?open=apply opens that window on load, so the
  // crawlable content pages can hand users straight into the right panel.
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("open");
    if (target && WINDOW_DEFS.some((w) => w.id === target)) openWindow(target);
  }, [openWindow]);

  // Minimized counts as "not on screen": with every window minimized the
  // desktop would otherwise be empty with no way back to the hero.
  const showHero = openWindows.every((w) => w.minimized);
  // Highest z-index is the active window; it gets the accent title bar.
  const focusedId = openWindows.reduce<OpenWindow | null>(
    (top, w) => (w.minimized ? top : !top || w.zIndex > top.zIndex ? w : top),
    null
  )?.id;

  return (
    <div className="os-desktop h-[100dvh] w-screen overflow-hidden relative desktop-wallpaper">

      {/*
        The homepage previously rendered no landmarks at all — no main, nav,
        header or skip link — so a screen-reader user got an unstructured pile
        of divs. See AUDIT.md A1.
      */}
      <a href="#desktop" className="skip-link">Skip to the desktop</a>

      {/* Menu bar */}
      <MenuBar onOpenWindow={openWindow} onGoHome={goHome} />

      {/* Desktop surface */}
      <main
        id="desktop"
        tabIndex={-1}
        aria-label="Banana Hacks desktop"
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
              focused={win.id === focusedId}
              minimized={win.minimized}
              onFocus={() => focusWindow(win.id)}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
            >
              <Panel />
            </Window>
          );
        })}
      </main>

      {/* Bottom dock */}
      <nav
        aria-label="Open a Banana Hacks window"
        className="fixed bottom-0 flex justify-center items-end overflow-x-auto"
        style={{ left: 0, right: 0, zIndex: 9000, paddingTop: "36px", paddingBottom: "calc(6px + env(safe-area-inset-bottom))" }}
      >
        {/* Flat paper on a hard ink rule. The old version was a
            translucent blurred pill over a three-stop gradient. */}
        <div
          className="flex items-end gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 hard-card mb-1 mx-auto shrink-0"
          style={{ background: "#FFFBF0" }}
        >
          {DESKTOP_ICONS.map((icon) => {
            const isOpen = openWindows.some((w) => w.id === icon.id);
            const IconWidget = DOCK_ICON_MAP[icon.id];
            return (
              <div key={icon.id} className="relative flex flex-col items-center gap-1 group/dock">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-studio-ink text-banana-400 font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap pointer-events-none opacity-0 group-hover/dock:opacity-100 transition-opacity duration-100">
                  {icon.label}
                </div>
                <button
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[6px] flex items-center justify-center icon-tile shadow-icon transition-colors ${
                    isOpen ? "bg-banana-400" : "bg-banana-200 hover:bg-banana-300"
                  }`}
                  style={{ border: "1.5px solid #191A17" }}
                  onClick={() => openWindow(icon.id)}
                  aria-label={icon.label}
                >
                  {IconWidget && <IconWidget size={26} />}
                </button>
                {/* Running indicator: a solid ink bar, visible at a glance. */}
                <div className={`h-[3px] w-4 ${isOpen ? "bg-studio-ink" : "bg-transparent"}`} />
              </div>
            );
          })}

          <div className="self-stretch w-[1.5px] bg-studio-ink/25 mx-1 my-0.5" />

          <div className="relative flex flex-col items-center gap-1 group/dock">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-studio-ink text-banana-400 font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap pointer-events-none opacity-0 group-hover/dock:opacity-100 transition-opacity duration-100">
              Apply Now
            </div>
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-[6px] bg-banana-400 flex items-center justify-center icon-tile shadow-icon hover:bg-banana-500 transition-colors"
              style={{ border: "1.5px solid #191A17" }}
              onClick={() => openWindow("apply")}
              aria-label="Apply Now"
            >
              <ApplyLineIcon size={26} />
            </button>
            <div className={`h-[3px] w-4 ${openWindows.some((w) => w.id === "apply") ? "bg-studio-ink" : "bg-transparent"}`} />
          </div>
        </div>
      </nav>
    </div>
  );
}
