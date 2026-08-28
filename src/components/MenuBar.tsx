"use client";

import { useState, useEffect } from "react";
import { BananaLineIcon } from "@/components/svgs/DockIcons";
import { siteConfig } from "@/lib/site";

interface MenuItem {
  label: string;
  action?: () => void;
  href?: string;
}

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

  /*
    Every item here now does something. "Discord Community" and "Contact
    Organizers" used to be actionless <button>s, dead UI in the one menu a
    confused visitor opens. See AUDIT.md T2.
  */
  const menus: Record<string, MenuItem[]> = {
    Help: [
      { label: "Get Info", action: () => onOpenWindow("info") },
      { label: "FAQ", action: () => onOpenWindow("faq") },
      { label: "—" },
      { label: "Email the organizers", href: `mailto:${siteConfig.contactEmail}` },
      { label: "Code of Conduct", href: "/code-of-conduct" },
    ],
  };

  return (
    <header
      className="menu-bar fixed top-0 left-0 right-0 h-9 flex items-center px-3 gap-1"
      style={{ height: 36, zIndex: 9999 }}
    >
      {/* App icon + name → go home */}
      <button
        className="flex items-center gap-1.5 min-h-[24px] px-1 font-display font-extrabold text-[15px] tracking-[-0.03em] text-studio-ink mr-2 select-none hover:text-vine-600 transition-colors"
        onClick={onGoHome}
      >
        <BananaLineIcon size={17} />
        <span>Banana Hacks</span>
      </button>

      {/* Menu items */}
      {Object.entries(menus).map(([name, items]) => (
        <div key={name} className="relative">
          <button
            className={`px-2.5 min-h-[24px] inline-flex items-center font-mono text-[11px] font-bold uppercase tracking-[0.08em] transition-colors select-none ${
              menuOpen === name
                ? "bg-studio-ink text-banana-400"
                : "text-studio-ink/75 hover:bg-banana-400"
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
              <div className="absolute top-full left-0 mt-1 z-50 min-w-48 bg-banana-50 hard-card-sm py-1 animate-bounce-in">
                {items.map((item, i) =>
                  item.label === "—" ? (
                    <div key={i} className="mx-2 my-1 border-t border-studio-ink/30" />
                  ) : item.href ? (
                    <a
                      key={i}
                      href={item.href}
                      className="block w-full text-left px-4 py-1.5 text-[13px] font-body text-studio-ink hover:bg-banana-400 transition-colors"
                      onClick={() => setMenuOpen(null)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={i}
                      className="w-full text-left px-4 py-1.5 text-[13px] font-body text-studio-ink hover:bg-banana-400 cursor-pointer transition-colors"
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
        <div className="hidden sm:flex items-center px-2 py-[1px] bg-banana-400 border-[1.5px] border-studio-ink">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-studio-ink">
            Worldwide · Oct 9-12
          </span>
        </div>
        <span suppressHydrationWarning className="font-mono text-[11px] font-bold text-studio-ink/70 tabular-nums">{time}</span>
      </div>
    </header>
  );
}
