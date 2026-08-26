import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { FAQS } from "@/lib/content";

const PATH = "/faq";

export const metadata: Metadata = buildMetadata(PATH);

/**
 * FAQPage schema. Answers must match the visible copy exactly — Google treats
 * hidden or mismatched FAQ answers as a structured data violation, so both read
 * from the same FAQS array.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <PageShell
      path={PATH}
      heading="Frequently Asked Questions"
      lede="Everything people ask before signing up for Banana Hacks 2026 — eligibility, cost, team size, which AI tools are allowed, how judging works, and what you need to submit."
      jsonLd={[faqJsonLd]}
    >
      <div className="space-y-3 mb-12">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group bg-banana-50 hard-card-sm rounded-[6px] overflow-hidden"
          >
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center gap-3 hover:bg-banana-400/10 transition-colors">
              <h2 className="font-display font-semibold text-sm text-studio-ink flex-1">
                {item.q}
              </h2>
              <span
                aria-hidden="true"
                className="font-mono text-studio-ink/65 text-lg leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-4 pt-0">
              <p className="font-body text-sm text-studio-ink/70 leading-relaxed">
                {item.a}
              </p>
            </div>
          </details>
        ))}
      </div>

      <section
        aria-labelledby="still-asking"
        className="bg-banana-200 hard-card p-6"
      >
        <h2
          id="still-asking"
          className="font-display font-bold text-lg text-studio-ink mb-2"
        >
          Still have a question?
        </h2>
        <p className="font-body text-sm text-studio-ink/70 max-w-xl">
          The{" "}
          <Link href="/about" className="text-vine-500 hover:underline">
            about page
          </Link>{" "}
          covers the event in more depth, the{" "}
          <Link href="/schedule" className="text-vine-500 hover:underline">
            schedule
          </Link>{" "}
          has exact timings, and{" "}
          <Link href="/prizes" className="text-vine-500 hover:underline">
            prizes &amp; judging
          </Link>{" "}
          explains how projects are scored. Anything else — ask in our Discord
          once you&apos;ve{" "}
          <Link href="/register" className="text-vine-500 hover:underline">
            registered
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
