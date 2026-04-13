"use client";

interface DesktopIconProps {
  id: string;
  icon: string;
  label: string;
  onOpen: (id: string) => void;
}

export default function DesktopIcon({ id, icon, label, onOpen }: DesktopIconProps) {
  return (
    <button
      className="icon-tile flex flex-col items-center gap-1.5 w-20 group focus:outline-none"
      onClick={() => onOpen(id)}
    >
      {/* Icon container */}
      <div className="w-14 h-14 rounded-2xl bg-white/80 border border-studio-ink/08 shadow-icon flex items-center justify-center text-3xl group-hover:border-banana-400/40 group-hover:shadow-window-focus transition-all duration-200">
        {icon}
      </div>

      {/* Label */}
      <span className="text-xs font-body font-medium text-studio-ink/75 text-center leading-tight px-1 truncate w-full text-center drop-shadow-sm">
        {label}
      </span>
    </button>
  );
}
