"use client";

import { useState, useEffect } from "react";

interface MenuBarProps {
  onOpenWindow: (id: string) => void;
  onGoHome: () => void;
}

export default function MenuBar({ onOpenWindow, onGoHome }: MenuBarProps) {
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const menus: Record<string, { label: string; action?: () => void }[]> = {
    Help: [
      { label: "FAQ", action: () => onOpenWindow("faq") },
      { label: "Discord Community" },
      { label: "Contact Organizers" },
    ],
  };

  return (
    <div
      className="menu-bar fixed top-0 left-0 right-0 h-9 flex items-center px-3 gap-1"
      style={{ height: 36, zIndex: 9999 }}
    >
      {/* App icon + name → go home */}
      <button
        className="flex items-center gap-1.5 font-display font-bold text-sm text-studio-ink mr-3 select-none hover:opacity-75 transition-opacity active:scale-95"
        onClick={onGoHome}
      >
        <span className="text-lg leading-none">🍌</span>
        <span>Banana Hacks</span>
      </button>

      {/* Menu items */}
      {Object.entries(menus).map(([name, items]) => (
        <div key={name} className="relative">
          <button
            className={`px-2.5 py-0.5 rounded text-sm font-body font-medium transition-colors select-none ${
              menuOpen === name
                ? "bg-studio-ink text-white"
                : "text-studio-ink/70 hover:text-studio-ink hover:bg-studio-ink/5"
            }`}
            onClick={() => setMenuOpen(menuOpen === name ? null : name)}
          >
            {name}
          </button>

          {menuOpen === name && (
            <>
              {/* Backdrop to close */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(null)}
              />
              <div className="absolute top-full left-0 mt-1 z-50 min-w-48 bg-white/95 backdrop-blur border border-studio-ink/10 rounded-lg shadow-window py-1 animate-bounce-in">
                {items.map((item, i) =>
                  item.label === "—" ? (
                    <div key={i} className="mx-2 my-1 border-t border-studio-ink/08" />
                  ) : (
                    <button
                      key={i}
                      className={`w-full text-left px-4 py-1.5 text-sm font-body transition-colors ${
                        item.action
                          ? "text-studio-ink hover:bg-banana-400/20 cursor-pointer"
                          : "text-studio-ink/40 cursor-default"
                      }`}
                      onClick={() => {
                        item.action?.();
                        setMenuOpen(null);
                      }}
                    >
                      {item.label}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Right side: clock + MLH badge */}
      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-banana-400/15 border border-banana-400/30">
          <div className="w-1.5 h-1.5 rounded-full bg-studio-leaf animate-pulse" />
          <span className="text-xs font-mono font-medium text-studio-ink/70">
            Oct 9–16
          </span>
        </div>
        <span suppressHydrationWarning className="text-xs font-mono text-studio-ink/50 tabular-nums">{time}</span>
      </div>
    </div>
  );
}
