import { ImageResponse } from "next/og";

// Apple touch icons must be raster, iOS ignores SVG, so this is generated as
// a PNG at build time rather than shipped as a static apple-icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#191A17",
          fontSize: 116,
        }}
      >
        🍌
      </div>
    ),
    { ...size },
  );
}
