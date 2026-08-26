"use client";

import { useState } from "react";
import Image from "next/image";
import PolicyModal from "@/components/PolicyModal";
import { siteConfig } from "@/lib/site";
import { SPONSORS } from "@/lib/content";

/**
 * "Get Info" — the trust layer.
 *
 * The audit's sharpest finding was that the site never said who runs it: four
 * of the six ten-second questions passed, and the two that failed were both
 * trust questions ("who runs this?", "is it legitimate?"). The template answer
 * is a footer with an about blurb, but this homepage is a desktop OS, and an OS
 * already has a canonical place for provenance — Get Info.
 *
 * So the trust content lives where a user of this metaphor would look for it,
 * reached from the menu bar's app name exactly where an OS puts About. It is
 * written as an info panel, not as marketing.
 *
 * This is the *presentation*. The same facts ship server-rendered on the
 * (info) pages and in siteConfig, so they stay crawlable and available without
 * JavaScript. See DESIGN-SYSTEM.md §5.
 */

type PolicyType = "conduct" | "rules" | null;

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-2.5 border-b border-studio-ink/20 last:border-b-0">
      <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-studio-ink/65 sm:w-28 shrink-0 pt-0.5">
        {label}
      </dt>
      <dd className="font-body text-sm text-studio-ink/80 leading-relaxed min-w-0">{children}</dd>
    </div>
  );
}

export default function InfoPanel() {
  const [openPolicy, setOpenPolicy] = useState<PolicyType>(null);

  return (
    <>
      <PolicyModal type={openPolicy} onClose={() => setOpenPolicy(null)} />

      <div className="window-scroll h-full overflow-y-auto bg-banana-100">
        <div className="px-6 py-6 max-w-2xl">
          <p className="eyebrow mb-1">Get Info</p>
          <h2 className="font-display font-extrabold text-xl text-studio-ink mb-1">
            {siteConfig.name}
          </h2>
          <p className="font-body text-sm text-studio-ink/75 leading-relaxed mb-5">
            A free, international hackathon about generative AI and image creation,
            running {siteConfig.dateRangeLabel}, entirely online.
          </p>

          <dl className="bg-banana-50 hard-card px-4 py-1 mb-5">
            <Row label="Organised by">
              {siteConfig.organizerBlurb}
            </Row>

            <Row label="Contact">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-vine-600 underline underline-offset-2 hover:text-vine-700 break-all"
              >
                {siteConfig.contactEmail}
              </a>
              <span className="block text-xs text-studio-ink/65 mt-0.5">
                Sponsorship enquiries:{" "}
                <a
                  href={`mailto:${siteConfig.sponsorEmail}`}
                  className="text-vine-600 underline underline-offset-2 hover:text-vine-700 break-all"
                >
                  {siteConfig.sponsorEmail}
                </a>
              </span>
            </Row>

            <Row label="Who can enter">{siteConfig.eligibility}</Row>

            <Row label="Cost">Free. No entry fee, and nothing to travel to.</Row>

            <Row label="Community">
              {siteConfig.discordUrl ? (
                <a
                  href={siteConfig.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vine-600 underline underline-offset-2 hover:text-vine-700"
                >
                  Join the Discord
                </a>
              ) : (
                /* No invite link is rendered until one exists in siteConfig.
                   The previous UI shipped href="#" and a null-wired button —
                   dead links read as abandonment, which is the opposite of
                   what a trust panel is for. */
                <>
                  Discord is where team formation, mentoring and announcements happen.
                  The invite is emailed to you after you register.
                </>
              )}
              <span className="block text-xs text-studio-ink/65 mt-0.5">
                Also on{" "}
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vine-600 underline underline-offset-2 hover:text-vine-700"
                >
                  Instagram
                </a>
                .
              </span>
            </Row>

            <Row label="Policies">
              <button
                type="button"
                onClick={() => setOpenPolicy("conduct")}
                className="btn-tertiary text-sm"
              >
                Code of Conduct
              </button>
              <span className="mx-1.5 text-studio-ink/40">·</span>
              <button
                type="button"
                onClick={() => setOpenPolicy("rules")}
                className="btn-tertiary text-sm"
              >
                Submission Rules
              </button>
              <span className="block text-xs text-studio-ink/65 mt-0.5">
                We follow the{" "}
                <a
                  href={siteConfig.mlhCodeOfConductUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vine-600 underline underline-offset-2 hover:text-vine-700"
                >
                  MLH Code of Conduct
                </a>
                . Banana Hacks is not an MLH member event.
              </span>
            </Row>
          </dl>

          {/* Sponsors. On the hero these sit behind the dock and are never
              seen; here they are the legitimacy signal they were meant to be. */}
          <p className="eyebrow mb-2">Backed by</p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
            {SPONSORS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hard-card-sm flex items-center justify-center h-16 px-3 transition-transform hover:-translate-y-0.5"
                  style={{ background: s.bg }}
                  title={s.tagline}
                >
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={96}
                    height={32}
                    className="max-h-8 w-auto object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="font-body text-xs text-studio-ink/65">
            Want to support the event?{" "}
            <a
              href={`mailto:${siteConfig.sponsorEmail}`}
              className="text-vine-600 underline underline-offset-2 hover:text-vine-700"
            >
              Get in touch
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
