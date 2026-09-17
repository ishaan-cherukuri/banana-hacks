import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { JUDGING_CRITERIA, PRIZES } from "@/lib/content";

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
      lede="Every submitted project gets judged. There is $500 in cash for the top project, plus licenses and domains from our sponsors. Here is everything you can win and what the judges look for."
    >
      <section
        aria-labelledby="prize-pool"
        className="mb-12 bg-banana-200 hard-card p-6"
      >
        <h2
          id="prize-pool"
          className="font-display font-extrabold text-xl text-studio-ink mb-2"
        >
          Prizes
        </h2>
        <p className="font-body text-sm text-studio-ink/75 leading-relaxed max-w-2xl mb-4">
          <strong className="text-studio-ink">$500 in cash</strong> for the top project, plus
          licenses and domains from our{" "}
          <Link href="/sponsors" className="text-vine-600 hover:underline">
            sponsors
          </Link>
          . Here is everything on the table:
        </p>
        <ul className="space-y-3 font-body text-sm text-studio-ink/75 max-w-2xl">
          {PRIZES.map((p) => (
            <li key={p.title} className="flex items-start gap-2.5">
              <span className="text-banana-600 mt-0.5 shrink-0" aria-hidden="true">◆</span>
              <span>
                <strong className="text-studio-ink">{p.title}</strong>
                <span className="text-studio-ink/55"> · {p.from}</span>
                <br />
                {p.desc}
              </span>
            </li>
          ))}
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
          Every project is scored 1 to 5 on each of five equally weighted
          criteria:
        </p>
        <dl className="space-y-2 max-w-2xl">
          {JUDGING_CRITERIA.map((c) => (
            <div
              key={c.label}
              className="bg-banana-50 hard-card-sm rounded-[6px] px-4 py-3"
            >
              <dt className="font-display font-semibold text-sm text-studio-ink mb-1">{c.label}</dt>
              <dd className="font-body text-xs text-studio-ink/72 leading-relaxed">{c.desc}</dd>
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
