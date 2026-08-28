import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { SPONSORS } from "@/lib/content";

const PATH = "/sponsors";

export const metadata: Metadata = buildMetadata(PATH);

const OFFERINGS = [
  "Money for cash prizes, running the event, or swag",
  "API tokens or usage credits for participants to build with",
  "Compute / GPU credits for training and inference",
  "Tool or product access (dev accounts, licenses, trials)",
  "Mentorship, workshops, or judging from your team",
];

const NEEDED = [
  "A rough sense of budget or credit amount you can offer",
  "Any tokens, API keys, or credit codes to distribute to participants",
  "Your logo (SVG or PNG) and a short blurb for the sponsors page",
  "A point of contact for the hacking weekend",
];

export default function SponsorsPage() {
  return (
    <PageShell
      path={PATH}
      heading="Sponsors"
      lede={`Sponsors keep Banana Hacks free and give participants useful tools to build with. These are the companies helping this year, plus the details for anyone who wants to join them. We currently have ${siteConfig.registrationCount} people registered.`}
    >
      <section aria-labelledby="current" className="mb-12">
        <h2
          id="current"
          className="font-display font-extrabold text-xl text-studio-ink mb-4"
        >
          Our sponsors
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPONSORS.map((sponsor) => (
            <li key={sponsor.name}>
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full overflow-hidden rounded-[8px] border-2 border-studio-ink/25 hover:border-banana-400/60 transition-colors"
                style={{ backgroundColor: sponsor.bg }}
              >
                <div className="flex-1 flex items-center justify-center px-4 py-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name}: ${sponsor.tagline}. Sponsor of Banana Hacks 2026.`}
                    width={200}
                    height={80}
                    loading="lazy"
                    className="max-h-20 w-full object-contain"
                  />
                </div>
                <div
                  className={
                    sponsor.light
                      ? "px-4 py-2 bg-studio-ink/06"
                      : "px-4 py-2 bg-black/15"
                  }
                >
                  <span
                    className={
                      sponsor.light
                        ? "text-[11px] font-body text-studio-ink/72"
                        : "text-[11px] font-body text-white/80"
                    }
                  >
                    {sponsor.tagline}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="why" className="mb-12">
        <h2
          id="why"
          className="font-display font-extrabold text-xl text-studio-ink mb-3"
        >
          Why sponsor Banana Hacks?
        </h2>
        <p className="font-body text-sm text-studio-ink/75 leading-relaxed max-w-2xl mb-6">
          Banana Hacks runs online from {siteConfig.dateRangeLabel}. During the
          event, {siteConfig.registrationCount} registered builders will be
          choosing APIs, models, and tools for their projects. A useful credit,
          workshop, or prize gives them a real reason to try yours.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-display font-semibold text-sm text-studio-ink mb-2">
              What sponsorship can look like
            </h3>
            <ul className="space-y-2">
              {OFFERINGS.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 font-body text-xs text-studio-ink/70 leading-relaxed"
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full bg-banana-400 shrink-0"
                    aria-hidden="true"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-studio-ink mb-2">
              What we&apos;d need from you
            </h3>
            <ul className="space-y-2">
              {NEEDED.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 font-body text-xs text-studio-ink/70 leading-relaxed"
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full bg-vine-400 shrink-0"
                    aria-hidden="true"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact"
        className="bg-banana-200 hard-card p-6 text-center"
      >
        <h2
          id="contact"
          className="font-display font-bold text-lg text-studio-ink mb-2"
        >
          Become a Banana Sponsor
        </h2>
        <p className="font-body text-sm text-studio-ink/70 max-w-md mx-auto mb-4">
          Tell us what you have in mind. We usually reply within 12 hours.
        </p>
        <a
          href={`mailto:${siteConfig.sponsorEmail}`}
          className="inline-flex items-center px-5 py-2.5 rounded-[6px] font-display font-semibold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 transition-colors"
        >
          {siteConfig.sponsorEmail}
        </a>
        <p className="font-body text-xs text-studio-ink/70 mt-4">
          Curious what participants actually get up to? See the{" "}
          <Link href="/schedule" className="text-vine-500 hover:underline">
            schedule
          </Link>{" "}
          and{" "}
          <Link href="/prizes" className="text-vine-500 hover:underline">
            judging criteria
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
