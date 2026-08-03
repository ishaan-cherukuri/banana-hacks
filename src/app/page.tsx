import type { Metadata } from "next";
import Desktop from "@/components/Desktop";
import SeoContent from "@/components/SeoContent";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <SeoContent />
      <Desktop />
    </>
  );
}
