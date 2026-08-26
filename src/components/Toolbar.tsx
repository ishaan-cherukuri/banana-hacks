"use client";

import { useState } from "react";

interface Tool {
  id: string;
  label: string;
  shortcut: string;
}

// The shortcut key doubles as the tool's mark — a mono glyph, the way a
// real tool palette labels itself. Emoji would render differently on
// every platform and read as filler.
const TOOLS: Tool[] = [
  { id: "brush", label: "Brush", shortcut: "B" },
];

interface ToolbarProps {
  onOpenWindow: (id: string) => void;
}

export default function Toolbar({ onOpenWindow }: ToolbarProps) {
  const [active, setActive] = useState("brush");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="toolbar-strip fixed left-0 flex flex-col items-center py-3 gap-1"
      style={{ top: 36, bottom: 0, width: 52, zIndex: 9998 }}
    >
      {/* Tool buttons */}
      {TOOLS.map((tool) => (
        <div key={tool.id} className="relative group">
          <button
            className={`w-9 h-9 rounded-[4px] flex items-center justify-center font-mono text-sm font-bold transition-colors ${
              active === tool.id
                ? "bg-banana-400 text-studio-ink border-[1.5px] border-studio-ink shadow-icon-sm"
                : "text-studio-ink/72 border-[1.5px] border-transparent hover:bg-banana-400 hover:text-studio-ink"
            }`}
            onClick={() => setActive(tool.id)}
            onMouseEnter={() => setHovered(tool.id)}
            onMouseLeave={() => setHovered(null)}
            title={tool.label}
          >
            {tool.shortcut}
          </button>

          {/* Tooltip */}
          {hovered === tool.id && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-studio-ink text-banana-400 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 pointer-events-none z-50">
              {tool.label}
              <span className="ml-2 opacity-60">{tool.shortcut}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
