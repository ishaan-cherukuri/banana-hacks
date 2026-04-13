"use client";

interface PaletteIconProps {
  className?: string;
  size?: number;
}

export default function PaletteIcon({ className = "", size = 48 }: PaletteIconProps) {
  const swatches = [
    { cx: 22, cy: 18, fill: "#FDD835" },
    { cx: 34, cy: 15, fill: "#FF6B35" },
    { cx: 42, cy: 24, fill: "#4C6EF5" },
    { cx: 42, cy: 36, fill: "#2E7D32" },
    { cx: 34, cy: 44, fill: "#E91E63" },
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Color palette"
    >
      {/* Palette body */}
      <path
        d="M10 30 C10 16 20 6 32 6 C44 6 54 16 54 28 C54 36 48 42 40 42 C36 42 34 46 30 46 C20 46 10 39 10 30 Z"
        fill="white"
        stroke="rgba(26,26,46,0.15)"
        strokeWidth="1.5"
      />
      {/* Thumb hole */}
      <ellipse cx="22" cy="38" rx="5" ry="6" fill="rgba(26,26,46,0.08)" stroke="rgba(26,26,46,0.12)" strokeWidth="1" />
      {/* Swatches */}
      {swatches.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="5" fill={s.fill} />
      ))}
    </svg>
  );
}
