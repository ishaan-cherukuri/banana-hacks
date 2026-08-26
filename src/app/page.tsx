import type { Metadata } from "next";
import Desktop from "@/components/Desktop";
import SeoContent from "@/components/SeoContent";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/*
        First focusable element on the page. It has to sit ahead of SeoContent,
        whose eleven crawlable links would otherwise be the first eleven tab
        stops before a keyboard user reached anything they could act on.
      */}
      <a href="#desktop" className="skip-link">
        Skip to the desktop
      </a>
      <SeoContent />
      <Desktop />
    </>
  );
}
