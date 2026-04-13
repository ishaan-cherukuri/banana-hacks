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
        peri: {
          50:  "#F8F9FF",
          100: "#F0F4FF",   // periwinkle light
          200: "#E0E9FF",
          300: "#BACBFF",
          400: "#7B96F5",
          500: "#4C6EF5",
          600: "#3A56DB",
          700: "#2940B8",
          800: "#1B2D8F",
          900: "#0F1B5C",
        },
        studio: {
          ink:    "#1A1A2E",   // deep navy text
          leaf:   "#2E7D32",   // banana leaf green
          ripe:   "#FF6B35",   // ripe orange accent
          mist:   "#F5F5F5",   // neutral light
          shadow: "rgba(26,26,46,0.08)",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body:    ["'DM Sans'", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        window:
          "0 4px 6px -1px rgba(26,26,46,0.06), 0 20px 40px -8px rgba(26,26,46,0.12), 0 0 0 1px rgba(26,26,46,0.06)",
        "window-focus":
          "0 4px 6px -1px rgba(26,26,46,0.08), 0 24px 48px -8px rgba(26,26,46,0.18), 0 0 0 1px rgba(253,216,53,0.4)",
        icon:   "0 2px 8px rgba(26,26,46,0.12)",
        toolbar: "2px 0 12px rgba(26,26,46,0.06)",
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
        "dot-grid":
          "radial-gradient(circle, rgba(26,26,46,0.12) 1px, transparent 1px)",
        "canvas-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeBlend in='SourceGraphic' mode='overlay'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
