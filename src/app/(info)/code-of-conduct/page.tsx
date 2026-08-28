import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { COC_SECTIONS, RULES_SECTIONS } from "@/lib/content";

const PATH = "/code-of-conduct";

export const metadata: Metadata = buildMetadata(PATH);

function Sections({
  id,
  heading,
  intro,
  sections,
}: {
  id: string;
  heading: string;
  intro: string;
  sections: { title: string; body: string[] }[];
}) {
  return (
    <section aria-labelledby={id} className="mb-12">
      <h2
        id={id}
        className="font-display font-extrabold text-xl text-studio-ink mb-2"
      >
        {heading}
      </h2>
      <p className="font-body text-sm text-studio-ink/75 mb-4 max-w-2xl leading-relaxed">
        {intro}
      </p>
      <div className="space-y-3">
        {sections.map((s) => (
          <div key={s.title} className="bg-banana-50 hard-card-sm p-4">
            <h3 className="font-display font-semibold text-sm text-studio-ink mb-2">
              {s.title}
            </h3>
            <ul className="space-y-1.5">
              {s.body.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 font-body text-xs text-studio-ink/75 leading-relaxed"
                >
                  <span className="text-vine-500 mt-0.5 shrink-0" aria-hidden="true">
                    ◆
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CodeOfConductPage() {
  return (
    <PageShell
      path={PATH}
      heading="Code of Conduct & Rules"
      lede="This Code of Conduct covers everyone at Banana Hacks: participants, mentors, judges, and organizers. It applies in Discord, on Zoom, in submitted work, and anywhere else the event happens. Read it before you register."
    >
      {/* Reporting sits first, not buried at the end. If someone needs this
          page urgently, this is what they need. */}
      <section
        aria-labelledby="reporting"
        className="mb-12 bg-banana-200 hard-card p-6"
      >
        <h2
          id="reporting"
          className="font-display font-extrabold text-xl text-studio-ink mb-2"
        >
          Reporting a problem
        </h2>
        <p className="font-body text-sm text-studio-ink/80 leading-relaxed max-w-2xl mb-3">
          If something happens that this document says should not, tell us. You can
          use the <code className="font-mono text-xs">#help</code> channel in Discord,
          or email the organizers directly. Reports are read only by the organizing
          team.
        </p>
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="btn-primary text-sm"
        >
          Email {siteConfig.contactEmail}
        </a>
      </section>

      <section aria-labelledby="who" className="mb-12">
        <h2
          id="who"
          className="font-display font-extrabold text-xl text-studio-ink mb-2"
        >
          Who this applies to
        </h2>
        <p className="font-body text-sm text-studio-ink/75 leading-relaxed max-w-2xl">
          {siteConfig.eligibility} If you are under 18, please read this page with a
          parent or guardian before registering. {siteConfig.organizerBlurb}
        </p>
      </section>

      <Sections
        id="conduct"
        heading="Code of Conduct"
        intro="Banana Hacks is a virtual event, and conduct online is held to the same standard as an in-person one."
        sections={COC_SECTIONS}
      />

      <Sections
        id="rules"
        heading="Submission rules"
        intro="What counts as an eligible project, and what you need to hand in."
        sections={RULES_SECTIONS}
      />

      <section aria-labelledby="next">
        <h2
          id="next"
          className="font-display font-extrabold text-xl text-studio-ink mb-3"
        >
          Ready?
        </h2>
        <p className="font-body text-sm text-studio-ink/75 leading-relaxed max-w-2xl">
          <Link href="/register" className="text-vine-600 hover:underline">
            Register for Banana Hacks
          </Link>
          , read{" "}
          <Link href="/about" className="text-vine-600 hover:underline">
            about the event
          </Link>
          , or check the{" "}
          <Link href="/faq" className="text-vine-600 hover:underline">
            FAQ
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
