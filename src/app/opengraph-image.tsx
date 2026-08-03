import { ImageResponse } from "next/og";

// Default (nodejs) runtime so the image is generated once at build time —
// the edge runtime opts the route out of static generation.
export const alt = "Banana Hacks 2026 — Generative AI & Image Creation Hackathon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFF7CC 0%, #FFE45C 60%, #FFD000 100%)",
          fontFamily: "sans-serif",
          color: "#3D2C00",
        }}
      >
        <div style={{ fontSize: 120 }}>🍌</div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 12 }}>
          Banana Hacks 2026
        </div>
        <div style={{ fontSize: 38, fontWeight: 600, marginTop: 8 }}>
          Generative AI &amp; Image Creation Hackathon
        </div>
        <div style={{ fontSize: 30, marginTop: 24, opacity: 0.85 }}>
          Oct 9–12, 2026 · 100% Virtual · Free to enter
        </div>
      </div>
    ),
    { ...size },
  );
}
