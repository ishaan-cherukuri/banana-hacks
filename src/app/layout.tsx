import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Banana Hacks 2026 — Generative AI & Image Creation",
  description:
    "A week-long virtual hackathon exploring generative AI and image creation. Oct 9–16, 2026. Build, imagine, and create the future with AI.",
  keywords: ["hackathon", "generative AI", "image creation", "banana hacks", "2026"],
  openGraph: {
    title: "Banana Hacks 2026",
    description: "A week-long virtual hackathon on generative AI & image creation. Oct 9–16, 2026.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
