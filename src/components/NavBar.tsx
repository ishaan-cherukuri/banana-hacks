"use client";

interface NavBarProps {
  openWindows: string[];
  onOpenWindow: (id: string) => void;
}

const NAV_LINKS = [
  { id: "about",    label: "About"     },
  { id: "schedule", label: "Schedule"  },
  { id: "prizes",   label: "Prizes"    },
  { id: "faq",      label: "FAQ"       },
  { id: "sponsors", label: "Sponsors"  },
  { id: "sketch",   label: "AI Studio" },
];

export default function NavBar({ openWindows, onOpenWindow }: NavBarProps) {
  return (
    <div
      className="fixed bottom-0 flex items-center px-4 border-t border-studio-ink/08"
      style={{
        left: 52,
        right: 0,
        height: 44,
        zIndex: 9000,
        background: "rgba(255,253,245,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 mr-6 shrink-0">
        <span className="text-base leading-none">🍌</span>
        <span className="font-display font-bold text-sm text-studio-ink">Banana Hacks</span>
        <span className="font-mono text-[10px] text-studio-ink/35 border border-studio-ink/15 rounded px-1 py-0.5">2026</span>
      </div>

      {/* Separator */}
      <div className="w-px h-4 bg-studio-ink/12 mr-5 shrink-0" />

      {/* Nav links */}
      <nav className="flex items-center gap-1 flex-1 min-w-0">
        {NAV_LINKS.map((link) => {
          const isOpen = openWindows.includes(link.id);
          return (
            <button
              key={link.id}
              onClick={() => onOpenWindow(link.id)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all whitespace-nowrap ${
                isOpen
                  ? "bg-banana-400/20 text-studio-ink"
                  : "text-studio-ink/50 hover:text-studio-ink hover:bg-studio-ink/05"
              }`}
            >
              {link.label}
              {/* Active dot */}
              {isOpen && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-banana-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Apply CTA + socials */}
      <div className="flex items-center gap-2 ml-4 shrink-0">
        {/* Social icon buttons */}
        {[
          {
            label: "Discord",
            href: "#",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
              </svg>
            ),
          },
          {
            label: "Twitter",
            href: "#",
            icon: (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            ),
          },
          {
            label: "GitHub",
            href: "#",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            ),
          },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            title={s.label}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-studio-ink/40 hover:text-studio-ink hover:bg-studio-ink/08 transition-all"
          >
            {s.icon}
          </a>
        ))}

        <div className="w-px h-4 bg-studio-ink/12 mx-1" />

        {/* Apply CTA */}
        <button
          onClick={() => onOpenWindow("apply")}
          className={`px-4 py-1.5 rounded-lg font-display font-bold text-xs transition-all ${
            openWindows.includes("apply")
              ? "bg-banana-500 text-studio-ink"
              : "bg-banana-400 text-studio-ink hover:bg-banana-500"
          } active:scale-95 shadow-icon`}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
