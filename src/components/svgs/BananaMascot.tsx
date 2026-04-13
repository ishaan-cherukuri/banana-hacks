"use client";

interface BananaMascotProps {
  className?: string;
  size?: number;
  variant?: "default" | "waving" | "painting";
}

export default function BananaMascot({
  className = "",
  size = 120,
  variant = "default",
}: BananaMascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Banana Hacks mascot"
    >
      {/* Subtle drop shadow */}
      <ellipse cx="60" cy="112" rx="28" ry="5" fill="rgba(26,26,46,0.08)" />

      {/* Banana body */}
      <path
        d="M38 72 C28 60 24 42 32 28 C40 14 58 10 72 18 C86 26 90 44 84 60 C78 76 62 84 48 80 Z"
        fill="#FDD835"
        stroke="#C49A00"
        strokeWidth="1.5"
      />
      {/* Banana inner curve highlight */}
      <path
        d="M44 68 C36 58 33 44 38 32 C43 22 56 18 66 24"
        stroke="#FFF176"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Banana tip top */}
      <path
        d="M70 18 C72 12 76 8 80 6 C78 10 76 15 72 18"
        fill="#7A5F00"
        opacity="0.6"
      />
      {/* Banana tip bottom */}
      <path
        d="M46 80 C44 86 46 92 50 96 C47 90 46 85 48 80"
        fill="#7A5F00"
        opacity="0.6"
      />

      {/* Eyes */}
      <circle cx="54" cy="44" r="5" fill="#1A1A2E" />
      <circle cx="70" cy="40" r="5" fill="#1A1A2E" />
      <circle cx="55.5" cy="42.5" r="1.5" fill="white" />
      <circle cx="71.5" cy="38.5" r="1.5" fill="white" />

      {/* Smile */}
      <path
        d="M54 54 Q62 60 70 54"
        stroke="#1A1A2E"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Rosy cheeks */}
      <circle cx="49" cy="52" r="4" fill="#FF6B35" opacity="0.35" />
      <circle cx="73" cy="48" r="4" fill="#FF6B35" opacity="0.35" />

      {/* Waving arm (only for waving variant) */}
      {variant === "waving" && (
        <path
          d="M84 36 C90 28 96 24 100 20 C98 26 92 32 88 38"
          stroke="#FDD835"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* Paintbrush (painting variant) */}
      {variant === "painting" && (
        <>
          <rect
            x="84"
            y="20"
            width="6"
            height="28"
            rx="2"
            fill="#7A5F00"
            transform="rotate(30 87 34)"
          />
          <ellipse
            cx="98"
            cy="14"
            rx="5"
            ry="8"
            fill="#4CAF50"
            transform="rotate(30 98 14)"
          />
          <circle cx="93" cy="45" r="4" fill="#4C6EF5" opacity="0.8" />
        </>
      )}

      {/* Small pixel sparkles */}
      <rect x="28" y="24" width="4" height="4" rx="1" fill="#FDD835" opacity="0.7" />
      <rect x="88" y="58" width="3" height="3" rx="0.5" fill="#4C6EF5" opacity="0.6" />
      <rect x="20" y="54" width="3" height="3" rx="0.5" fill="#FF6B35" opacity="0.5" />
    </svg>
  );
}
