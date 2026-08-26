import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        banana: {
          50:  "#FFFEF5",
          100: "#FFFBF0",   // warm cream background
          200: "#FFF8DC",
          300: "#FFEE82",
          400: "#FDD835",   // primary banana yellow
          500: "#F9C900",
          600: "#E6B800",
          700: "#C49A00",
          800: "#7A5F00",
          900: "#3D2F00",
        },
        // Deep teal "banana vine". Deliberately NOT the periwinkle/indigo
        // that every generated landing page reaches for — it complements the
        // yellow without pulling the page toward the default AI-SaaS palette.
        vine: {
          50:  "#F3F8F7",
          100: "#E3F0ED",
          200: "#C4E0D9",
          300: "#8FC4BB",
          400: "#4E9A8D",
          500: "#2C7466",
          600: "#1F5C50",
          700: "#17463D",
          800: "#0F2F29",
          900: "#081A16",
        },
        studio: {
          ink:    "#191A17",   // near-black ink; warmer + darker than the old navy
          leaf:   "#2E7D32",   // banana leaf green
          ripe:   "#E2542A",   // ripe orange accent, desaturated off the neon
          // Darker sibling of `ripe` for error TEXT: `ripe` itself only hits
          // 3.7:1 on the cream page, under the 4.5:1 AA floor. Use `ripe` for
          // fills and borders, `alert` whenever it is set as type.
          alert:  "#B23617",
          mist:   "#F5F5F5",   // neutral light
          paper:  "#FFFBF0",   // warm cream page
          shadow: "rgba(25,26,23,0.08)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "'Bricolage Grotesque'", "Georgia", "system-ui", "sans-serif"],
        body:    ["var(--font-body)", "'Instrument Sans'", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "'Space Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Offset ink shadows, not diffuse glows. A hard edge reads as a
        // deliberate print/UI choice; a soft blur reads as a default.
        window:       "4px 4px 0 rgba(25,26,23,0.90)",
        "window-focus": "6px 6px 0 #FDD835, 6px 6px 0 1px rgba(25,26,23,0.90)",
        icon:         "2px 2px 0 rgba(25,26,23,0.85)",
        "icon-sm":    "1px 1px 0 rgba(25,26,23,0.85)",
        toolbar:      "2px 0 0 rgba(25,26,23,0.12)",
      },
      animation: {
        "float":        "float 6s ease-in-out infinite",
        "float-slow":   "float 9s ease-in-out infinite",
        "float-delay":  "float 7s ease-in-out 2s infinite",
        "pulse-ring":   "pulse-ring 2.4s ease-out infinite",
        "spin-slow":    "spin 12s linear infinite",
        "bounce-slow":  "bounce 3s ease-in-out infinite",
        "shimmer":      "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(0.9)", opacity: "1" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "banana-stripe":
          "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(253,216,53,0.06) 20px, rgba(253,216,53,0.06) 40px)",
        "graph-paper":
          "linear-gradient(rgba(25,26,23,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(25,26,23,0.055) 1px, transparent 1px)",
        "canvas-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
