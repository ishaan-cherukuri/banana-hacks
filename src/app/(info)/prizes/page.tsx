import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { JUDGING_CRITERIA } from "@/lib/content";

const PATH = "/prizes";

export const metadata: Metadata = buildMetadata(PATH);

const CATEGORIES = [
  {
    title: "Best Creative Tool",
    desc: "The project that most usefully puts generative AI in the hands of someone making something.",
  },
  {
    title: "Best Fine-tune",
    desc: "The most impressive custom model, LoRA adapter, or training pipeline built during the weekend.",
  },
  {
    title: "Most Surprising Output",
    desc: "The project that produced something nobody expected, its own authors included.",
  },
  {
    title: "People's Choice",
    desc: "Voted on by participants during demo day.",
  },
];

export default function PrizesPage() {
  return (
    <PageShell
      path={PATH}
      heading="Prizes & Judging"
      lede="Every submitted project gets judged. More than $10,000 in cash, compute credits, and software is up for grabs. Here is what the judges look for and which awards they can give."
    >
      <section
        aria-labelledby="prize-pool"
        className="mb-12 bg-banana-200 hard-card p-6"
      >
        <h2
          id="prize-pool"
          className="font-display font-extrabold text-xl text-studio-ink mb-2"
        >
          Prize pool
        </h2>
        <p className="font-body text-sm text-studio-ink/75 leading-relaxed max-w-2xl mb-3">
          The total pool is <strong className="text-studio-ink">over $10,000</strong>, committed by
          our{" "}
          <Link href="/sponsors" className="text-vine-600 hover:underline">
            sponsors
          </Link>
          . The exact split between categories is published here ahead of{" "}
          <Link href="/schedule" className="text-vine-600 hover:underline">
            opening night
          </Link>
          . It is made up of:
        </p>
        <ul className="space-y-2 font-body text-sm text-studio-ink/75">
          <li className="flex items-start gap-2.5">
            <span className="text-banana-600 mt-0.5 shrink-0" aria-hidden="true">◆</span>
            Cash prizes for winning teams
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-banana-600 mt-0.5 shrink-0" aria-hidden="true">◆</span>
            Compute and GPU credits for training and inference
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-banana-600 mt-0.5 shrink-0" aria-hidden="true">◆</span>
            Tooling subscriptions and product access from our{" "}
            <Link href="/sponsors" className="text-vine-500 hover:underline">
              sponsors
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="categories" className="mb-12">
        <h2
          id="categories"
          className="font-display font-extrabold text-xl text-studio-ink mb-2"
        >
          Award categories
        </h2>
        <p className="font-body text-sm text-studio-ink/72 mb-4 max-w-2xl">
          Category awards call out projects that do one thing especially well.
          You do not need to apply for them; every submission is considered.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className="bg-banana-50 hard-card-sm rounded-[6px] p-4"
            >
              <h3 className="font-display font-semibold text-sm text-studio-ink mb-1">
                {c.title}
              </h3>
              <p className="font-body text-xs text-studio-ink/72 leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="criteria" className="mb-12">
        <h2
          id="criteria"
          className="font-display font-extrabold text-xl text-studio-ink mb-2"
        >
          How projects are judged
        </h2>
        <p className="font-body text-sm text-studio-ink/72 mb-4 max-w-2xl">
          Judges include working AI researchers, artists, and startup founders.
          Every project is scored against four weighted criteria:
        </p>
        <dl className="space-y-2 max-w-2xl">
          {JUDGING_CRITERIA.map((c) => (
            <div
              key={c.label}
              className="flex items-center justify-between gap-4 bg-banana-50 hard-card-sm rounded-[6px] px-4 py-3"
            >
              <dt className="font-body text-sm text-studio-ink/80">{c.label}</dt>
              <dd className="font-display font-bold text-sm text-studio-ink shrink-0">
                {c.weight}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="submit" className="mb-4">
        <h2
          id="submit"
          className="font-display font-extrabold text-xl text-studio-ink mb-3"
        >
          What you submit
        </h2>
        <p className="font-body text-sm text-studio-ink/75 leading-relaxed max-w-2xl">
          Send us a working demo (a live URL or video), your GitHub repository,
          and no more than 500 words on what you built and why. A working link
          is better than a polished video. Submissions close at 11:59 PM AoE
          on Sunday, October 11, 2026. See the full{" "}
          <Link href="/schedule" className="text-vine-500 hover:underline">
            schedule
          </Link>{" "}
          or the{" "}
          <Link href="/faq" className="text-vine-500 hover:underline">
            FAQ
          </Link>{" "}
          for details.
        </p>
      </section>
    </PageShell>
  );
}
