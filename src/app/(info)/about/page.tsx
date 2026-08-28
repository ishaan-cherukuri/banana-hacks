import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { TRACKS, ELIGIBILITY } from "@/lib/content";

const PATH = "/about";

export const metadata: Metadata = buildMetadata(PATH);

const STATS = [
  { value: "4", label: "Days", sub: "Oct 9-12, 2026" },
  { value: String(siteConfig.registrationCount), label: "Registered", sub: "So far" },
  { value: "$0", label: "Entry fee", sub: "Free for everyone" },
  { value: "$10K+", label: "Prize pool", sub: "Cash, credits & tooling" },
];

export default function AboutPage() {
  return (
    <PageShell
      path={PATH}
      heading="About Banana Hacks 2026"
      lede="Banana Hacks is four days of building with generative AI. Join from anywhere, work by yourself or with a team, and finish the weekend with a project you can demo. It is free, and beginners are welcome."
    >
      <section aria-labelledby="at-a-glance" className="mb-12">
        <h2
          id="at-a-glance"
          className="font-display font-extrabold text-xl text-studio-ink mb-4"
        >
          At a glance
        </h2>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-banana-200 hard-card p-4 text-center"
            >
              <dd className="font-display font-extrabold text-2xl text-studio-ink mb-0.5">
                {s.value}
              </dd>
              <dt className="font-body font-semibold text-xs text-studio-ink">
                {s.label}
              </dt>
              <dd className="font-body text-[11px] text-studio-ink/70 mt-0.5">
                {s.sub}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="what-is" className="mb-12">
        <h2
          id="what-is"
          className="font-display font-extrabold text-xl text-studio-ink mb-3"
        >
          What is Banana Hacks?
        </h2>
        <div className="space-y-4 font-body text-studio-ink/75 leading-relaxed max-w-2xl">
          <p>
            Banana Hacks is a place to try the generative AI idea you have not
            had time to build. From {siteConfig.dateRangeLabel}, participants
            around the world will make image tools, train small models, and put
            together working demos.
          </p>
          <p>
            There is no venue, travel, or entry fee. We use Discord for the
            community and Zoom for workshops and ceremonies. Sessions are
            recorded, so you do not have to be awake for every live event.
            You can see the full breakdown on the{" "}
            <Link href="/schedule" className="text-vine-500 hover:underline">
              schedule page
            </Link>
            .
          </p>
          <p>
            <strong className="text-studio-ink">Who it&apos;s for:</strong>{" "}
            {siteConfig.eligibility} {siteConfig.organizerBlurb} If you&apos;re
            under 18, read the{" "}
            <Link href="/code-of-conduct" className="text-vine-600 hover:underline">
              Code of Conduct
            </Link>{" "}
            with a parent or guardian before you register.
          </p>
          <p>
            If this is your first hackathon, you will not be left to figure it
            out alone. We have beginner workshops, mentors during the weekend,
            and a team-forming session on opening night.
          </p>
        </div>
      </section>

      <section aria-labelledby="tracks" className="mb-12">
        <h2
          id="tracks"
          className="font-display font-extrabold text-xl text-studio-ink mb-2"
        >
          What you&apos;ll build
        </h2>
        <p className="font-body text-sm text-studio-ink/72 mb-4 max-w-2xl">
          These are suggestions, not boxes you have to fit into. Start with one
          or ignore them and make something else.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {TRACKS.map((track) => (
            <div
              key={track.title}
              className="bg-banana-50 hard-card-sm rounded-[6px] p-4"
            >
              <h3 className="font-display font-semibold text-sm text-studio-ink mb-1">
                {track.title}
              </h3>
              <p className="font-body text-xs text-studio-ink/72 leading-relaxed">
                {track.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="eligibility" className="mb-12">
        <h2
          id="eligibility"
          className="font-display font-extrabold text-xl text-studio-ink mb-3"
        >
          Who can participate
        </h2>
        <ul className="space-y-2 max-w-2xl">
          {ELIGIBILITY.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 font-body text-sm text-studio-ink/75"
            >
              <span className="text-banana-600 mt-0.5 shrink-0" aria-hidden="true">
                ◆
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="next"
        className="bg-banana-200 hard-card p-6"
      >
        <h2
          id="next"
          className="font-display font-bold text-lg text-studio-ink mb-2"
        >
          Want in?
        </h2>
        <p className="font-body text-sm text-studio-ink/70 mb-4 max-w-xl">
          {siteConfig.registrationCount} people have already registered. The form is free and takes about a minute. The{" "}
          <Link href="/faq" className="text-vine-500 hover:underline">
            FAQ
          </Link>{" "}
          covers eligibility, team rules, allowed tools, and how judging works.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center px-5 py-2.5 rounded-[6px] font-display font-semibold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 transition-colors"
        >
          Register for Banana Hacks 2026
        </Link>
      </section>
    </PageShell>
  );
}
