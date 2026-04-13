"use client";

/** Floating pixel sparkle */
export function PixelSparkle({ className = "", size = 24, color = "#FDD835" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="10" y="2" width="4" height="4" rx="1" fill={color} />
      <rect x="10" y="18" width="4" height="4" rx="1" fill={color} />
      <rect x="2" y="10" width="4" height="4" rx="1" fill={color} />
      <rect x="18" y="10" width="4" height="4" rx="1" fill={color} />
      <rect x="5" y="5" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
      <rect x="16" y="16" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
      <rect x="5" y="16" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
      <rect x="16" y="5" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
      <rect x="11" y="11" width="2" height="2" rx="0.5" fill={color} />
    </svg>
  );
}

/** Paintbrush stroke */
export function BrushStroke({ className = "", width = 80, color = "#FDD835" }) {
  return (
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} fill="none" className={className}>
      <path
        d={`M4 8 Q${width * 0.25} 2 ${width * 0.5} 6 Q${width * 0.75} 10 ${width - 4} 5`}
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

/** AI generation loading bar */
export function GenerationBar({ className = "", progress = 60 }) {
  return (
    <div className={`relative h-2 rounded-full bg-banana-200 overflow-hidden ${className}`}>
      <div
        className="absolute inset-y-0 left-0 rounded-full shimmer-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/** Pixel art banana leaf */
export function LeafDecor({ className = "", size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 4 C28 8 36 16 34 28 C32 36 24 38 18 34 C12 30 8 22 10 14 C12 6 16 2 20 4 Z"
        fill="#2E7D32"
        opacity="0.7"
      />
      <path
        d="M20 4 C20 12 20 20 18 34"
        stroke="#1B5E20"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path d="M20 10 C24 12 28 16 30 22" stroke="#1B5E20" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M19 16 C16 18 13 20 12 24" stroke="#1B5E20" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/** Scattered pixel dots background element */
export function PixelCluster({ className = "", size = 60 }) {
  const dots = [
    { x: 5,  y: 5,  s: 3, o: 0.8 },
    { x: 15, y: 2,  s: 2, o: 0.5 },
    { x: 30, y: 8,  s: 4, o: 0.7 },
    { x: 50, y: 5,  s: 3, o: 0.6 },
    { x: 8,  y: 22, s: 2, o: 0.4 },
    { x: 40, y: 18, s: 3, o: 0.8 },
    { x: 55, y: 30, s: 2, o: 0.5 },
    { x: 20, y: 40, s: 4, o: 0.6 },
    { x: 45, y: 50, s: 3, o: 0.7 },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className={className}>
      {dots.map((d, i) => (
        <rect
          key={i}
          x={d.x}
          y={d.y}
          width={d.s}
          height={d.s}
          rx="0.5"
          fill={i % 3 === 0 ? "#FDD835" : i % 3 === 1 ? "#4C6EF5" : "#FF6B35"}
          opacity={d.o}
        />
      ))}
    </svg>
  );
}

/** Studio easel decoration */
export function EaselDecor({ className = "", size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 90" fill="none" className={className}>
      {/* Legs */}
      <line x1="40" y1="75" x2="20" y2="90" stroke="#7A5F00" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="75" x2="60" y2="90" stroke="#7A5F00" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="75" x2="40" y2="90" stroke="#7A5F00" strokeWidth="3" strokeLinecap="round" />
      {/* Vertical pole */}
      <line x1="40" y1="8" x2="40" y2="75" stroke="#7A5F00" strokeWidth="3" strokeLinecap="round" />
      {/* Canvas frame */}
      <rect x="12" y="8" width="56" height="44" rx="2" fill="white" stroke="#C49A00" strokeWidth="2" />
      {/* Mini painting inside */}
      <rect x="16" y="12" width="48" height="36" rx="1" fill="#FFF9E6" />
      {/* Simplified banana in painting */}
      <path d="M28 38 C24 30 26 22 32 18 C38 14 46 18 46 26 C46 34 38 40 30 38 Z" fill="#FDD835" />
      {/* Palette dots */}
      <circle cx="54" cy="20" r="3" fill="#FF6B35" />
      <circle cx="62" cy="20" r="3" fill="#4C6EF5" />
      <circle cx="54" cy="28" r="3" fill="#2E7D32" />
    </svg>
  );
}
