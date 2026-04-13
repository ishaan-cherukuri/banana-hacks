"use client";

import { useState } from "react";

interface Tool {
  id: string;
  icon: string;
  label: string;
  shortcut?: string;
}

const TOOLS: Tool[] = [
  { id: "brush",   icon: "✏️", label: "Brush",    shortcut: "B" },
  { id: "select",  icon: "⬚",  label: "Select",   shortcut: "V" },
  { id: "fill",    icon: "🪣", label: "Fill",     shortcut: "G" },
  { id: "text",    icon: "T",  label: "Text",     shortcut: "T" },
  { id: "eraser",  icon: "⬜", label: "Eraser",   shortcut: "E" },
  { id: "magic",   icon: "✨", label: "AI Magic", shortcut: "M" },
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
      {/* Logo mark */}
      <div className="mb-2 w-8 h-8 rounded-xl bg-banana-400 flex items-center justify-center shadow-icon text-sm">
        🍌
      </div>

      <div className="w-6 border-t border-studio-ink/10 mb-1" />

      {/* Tool buttons */}
      {TOOLS.map((tool) => (
        <div key={tool.id} className="relative group">
          <button
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-mono font-semibold transition-all duration-150 ${
              active === tool.id
                ? "bg-banana-400 text-studio-ink shadow-icon scale-105"
                : "text-studio-ink/50 hover:bg-banana-400/20 hover:text-studio-ink"
            }`}
            onClick={() => {
              setActive(tool.id);
              if (tool.id === "magic") onOpenWindow("sketch");
            }}
            onMouseEnter={() => setHovered(tool.id)}
            onMouseLeave={() => setHovered(null)}
            title={tool.label}
          >
            {tool.icon}
          </button>

          {/* Tooltip */}
          {hovered === tool.id && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-studio-ink text-white text-xs px-2 py-1 rounded-md pointer-events-none z-50 animate-bounce-in">
              {tool.label}
              {tool.shortcut && (
                <span className="ml-2 opacity-50">{tool.shortcut}</span>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="w-6 border-t border-studio-ink/10 my-1" />

      {/* Color swatches */}
      <div className="w-9 h-9 rounded-lg overflow-hidden relative cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-studio-ink" />
          <div className="bg-banana-400" />
          <div className="bg-peri-400" />
          <div className="bg-studio-ripe" />
        </div>
      </div>

      {/* Spacer + bottom actions */}
      <div className="flex-1" />

      <button
        className="w-9 h-9 rounded-lg text-sm bg-banana-400/10 hover:bg-banana-400/30 text-studio-ink/60 hover:text-studio-ink transition-all"
        onClick={() => onOpenWindow("about")}
        title="About"
      >
        ?
      </button>
    </div>
  );
}
